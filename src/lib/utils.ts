export function formatProperDate(date: Date) {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function encodeTitle(title: string) {
	// Replace spaces with dashes
	const encoded = title.replace(/\s+/g, '-');
	return encodeURIComponent(encoded);
}

export function decodeTitle(title: string) {
	// Replace dashes with spaces
	const decoded = title.replace(/-/g, ' ');
	return decodeURIComponent(decoded);
}
