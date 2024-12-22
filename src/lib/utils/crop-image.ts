// utils/cropImage.ts
export const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.src = url;
	});

export async function getCroppedImg(
	imageSrc: string,
	percentCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob> {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('No 2d context');
	}

	// Calculate pixel values from percentages
	const pixelCrop = {
		x: Math.round((percentCrop.x * image.naturalWidth) / 100),
		y: Math.round((percentCrop.y * image.naturalHeight) / 100),
		width: Math.round((percentCrop.width * image.naturalWidth) / 100),
		height: Math.round((percentCrop.height * image.naturalHeight) / 100)
	};

	// Set canvas size to the cropped size
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	// Draw the cropped image
	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	// Convert canvas to blob
	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
		}, 'image/png');
	});
}
