<script lang="ts">
	import '$lib/styles/carta-styles.css';
	import { Carta, MarkdownEditor } from 'carta-md';
	import DOMPurify from 'isomorphic-dompurify';

	import { attachment } from '@cartamd/plugin-attachment';
	import { code } from '@cartamd/plugin-code';
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';

	import type { OurFileRouter } from '$lib/server/uploadthing';
	import 'carta-md/default.css';
	import { genUploader } from 'uploadthing/client';

	const { uploadFiles } = genUploader<OurFileRouter>({
		package: 'blog',
		url: '/api/uploadthing'
	});

	const carta = new Carta({
		theme: 'andromeeda',
		sanitizer: DOMPurify.sanitize,
		extensions: [
			attachment({
				async upload(file) {
					const response = await uploadFiles('imageUploader', {
						files: [file]
					});

					return response[0].url;
				}
			}),
			emoji(),
			slash(),
			code()
		]
	});

	let { value = $bindable() }: { value: string } = $props();
</script>

<MarkdownEditor bind:value mode="tabs" theme="github" {carta} />

<style>
	/* Or in global stylesheet */
	/* Set your monospace font (Required to have the editor working correctly!) */
	:global(.carta-font-code) {
		font-family: 'Amulya', monospace;
		font-size: 1.1rem;
	}
</style>
