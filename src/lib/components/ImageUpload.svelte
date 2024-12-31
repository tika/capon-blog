<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import type { OurFileRouter } from '$lib/server/uploadthing';
	import { getCroppedImg } from '$lib/utils/crop-image';
	import imageCompression from 'browser-image-compression';
	import { Image, Loader, Trash } from 'lucide-svelte';
	import Cropper from 'svelte-easy-crop';
	import toast from 'svelte-french-toast';
	import { genUploader } from 'uploadthing/client';

	// When editing, the cloud URL must show the current image provided
	let { cloudUrl = $bindable() } = $props();

	// If there is a cloud URL, start loading
	let loading = $state<boolean>(cloudUrl);
	let image: File | null = $state(null);
	let imageUrl = $derived(image ? URL.createObjectURL(image) : undefined);

	// Keep track to see if anything has changed about the image
	let changesMade = $state(false);

	let croppedImage: Blob | null = $state(null);
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

		// set cloud url to nothing
		cloudUrl = null;
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
			changesMade = true;
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

			// If the upload was successful, changes made resets
			changesMade = false;

			toast.success('Uploaded new image');
		} catch (error) {
			console.error('Upload failed:', error);
			// Handle error
		}
	};

	$effect(() => {
		if (cloudUrl) {
			// Pull the cloud image and set the file to be this image
			fetch(cloudUrl)
				.then((res) => res.blob())
				.then((blob) => (image = blob as File))
				.then(() => (loading = false));
		}
	});
</script>

<div class="flex min-h-36 items-center justify-center">
	{#if loading}
		<div class="flex items-center gap-2">
			<Loader class="animate-spin" />
			<span>Loading image from cloud</span>
		</div>
	{:else if image}
		<div class="relative">
			<Trash class="absolute right-2 top-2 z-10" onclick={handleFileRemove} />

			<img
				src={croppedImage ? URL.createObjectURL(croppedImage) : imageUrl}
				alt="Uploaded"
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
					class="flex items-center gap-2 rounded-md
          disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200
          {changesMade ? 'bg-red-500' : 'bg-blue-500'} px-4 py-2 text-white {processing &&
						'opacity-50'}
            "
					disabled={!changesMade}
					onclick={handleUpload}
				>
					{#if processing}
						Processing...
						<Loader class="animate-spin" />
					{:else if changesMade}
						Upload unsaved changes
					{:else}
						Upload new image
					{/if}
				</button>
			</div>

			<Dialog bind:dialog class="h-[85vh] w-full">
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
</div>
