<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import type { OurFileRouter } from '$lib/server/uploadthing';
	import { getCroppedImg } from '$lib/utils/crop-image';
	import imageCompression from 'browser-image-compression';
	import { Image, Loader, Trash } from 'lucide-svelte';
	import Cropper from 'svelte-easy-crop';
	import { genUploader } from 'uploadthing/client';

	let image: File | null = $state(null);
	let imageUrl = $derived(image ? URL.createObjectURL(image) : undefined);
	let croppedImage: Blob | null = $state(null);
	let { cloudUrl = $bindable() } = $props();
	let processing = $state(false);

	let inputElement: HTMLInputElement | null = $state(null);
	let dialog: HTMLDialogElement | null = $state(null);

	// Store the current crop data
	let currentCropData: { percent: any } | null = $state(null);

	const { uploadFiles } = genUploader<OurFileRouter>({
		package: 'blog',
		url: '/api/uploadthing'
	});

	const uploadToCloud = async (file: File | Blob) => {
		const fileToUpload =
			file instanceof Blob ? new File([file], 'cropped-image.png', { type: 'image/png' }) : file;

		const compressedFile = await imageCompression(fileToUpload, {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
			fileType: 'image/png'
		});

		const response = await uploadFiles('imageUploader', {
			files: [compressedFile]
		});

		return response[0].url;
	};

	const handleFileChange = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			image = files[0];
			croppedImage = null;
			currentCropData = null;
		}
	};

	const handleFileRemove = () => {
		image = null;
		croppedImage = null;
		currentCropData = null;
	};

	let crop = $state({ x: 0, y: 0 });
	let zoom = $state(1);

	// This now just stores the crop data without processing it
	const handleCropComplete = (cropData: { detail: { percent: any } }) => {
		currentCropData = cropData.detail;
	};

	// New function to handle the "Done" button click
	const handleCropDone = async () => {
		if (!imageUrl || !currentCropData) return;

		try {
			croppedImage = await getCroppedImg(imageUrl, currentCropData.percent);
			dialog?.close();
		} catch (error) {
			console.error('Error cropping image:', error);
			// Handle error appropriately
		}
	};

	const handleUpload = async () => {
		if (!croppedImage && !image) return;

		const fileToUpload = croppedImage || image;
		if (!fileToUpload) return;

		processing = true;

		try {
			const url = await uploadToCloud(fileToUpload);
			console.log('Uploaded successfully:', url);
			cloudUrl = url;
			processing = false;
			// Handle successful upload (e.g., save URL to your form state)
		} catch (error) {
			console.error('Upload failed:', error);
			// Handle error
		}
	};
</script>

{#if image}
	<div class="relative">
		<Trash class="absolute right-2 top-2 z-10" onclick={handleFileRemove} />
		<img
			src={croppedImage ? URL.createObjectURL(croppedImage) : imageUrl}
			alt="Uploaded image"
			class="h-auto w-full"
		/>

		<div class="mt-2 flex gap-2">
			<button
				type="button"
				class="rounded-md bg-gray-200 px-4 py-2"
				onclick={() => {
					dialog?.showModal();
				}}
			>
				Crop
			</button>

			<button
				type="button"
				class={'flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white' +
					(processing ? 'opacity-50' : '')}
				onclick={handleUpload}
			>
				{#if processing}
					Processing...
					<Loader class="animate-spin" />
				{:else}
					Upload
				{/if}
			</button>
		</div>

		<Dialog bind:dialog class="h-96 w-full">
			<div class="flex h-full flex-col">
				<div class="relative flex-grow bg-black">
					<Cropper
						image={imageUrl ?? ''}
						on:cropcomplete={handleCropComplete}
						bind:crop
						bind:zoom
						aspect={16 / 9}
					/>
				</div>
				<div class="flex justify-end border-t p-4">
					<button
						type="button"
						class="rounded-md bg-blue-500 px-4 py-2 text-white"
						onclick={handleCropDone}
					>
						Done
					</button>
				</div>
			</div>
		</Dialog>
	</div>
{:else}
	<button
		class="flex w-full justify-center rounded-lg border border-dotted py-16 text-gray-400"
		onclick={() => inputElement?.click()}
		type="button"
	>
		<div class="flex items-center gap-2">
			<Image />
			<p>Upload an image</p>
		</div>
	</button>
	<input
		type="file"
		accept="image/*"
		onchange={handleFileChange}
		class="hidden"
		bind:this={inputElement}
	/>
{/if}
