<script lang="ts">
	import type { OurFileRouter } from '$lib/server/uploadthing';
	import imageCompression from 'browser-image-compression';
	import { genUploader } from 'uploadthing/client';

	let image: File | null = $state(null);

	const { uploadFiles } = genUploader<OurFileRouter>({
		package: 'blog',
		url: '/api/uploadthing'
	});

	const uploadToCloud = async (file: File) => {
		const response = await uploadFiles('imageUploader', {
			files: [file]
		});

		return response[0].url;
	};

	const handleFileChange = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			image = files[0];
			// Compress the image

			console.log('image', image.size);

			const compressedFile = await imageCompression(image, {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
				fileType: 'image/png'
			});

			console.log('compressedFile', compressedFile.size);

			await uploadToCloud(compressedFile);
		}
	};

	const handleFileRemove = () => {
		image = null;
		// Ignore deleting from cloud for now
	};
</script>

{#if image}
	<button onclick={handleFileRemove}>Remove</button>
	<img accept="image/*" src={URL.createObjectURL(image)} alt="Uploaded image" />
{:else}
	<input type="file" accept="image/*" onchange={handleFileChange} />
{/if}
