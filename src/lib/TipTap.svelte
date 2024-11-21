<script lang="ts">
	import FloatingMenuExtension from '@tiptap/extension-floating-menu';
	import StarterKit from '@tiptap/starter-kit';
	import { onMount } from 'svelte';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import type { Readable } from 'svelte/store';

	let editor = $state() as Readable<Editor>;

	// Should be able to pass in content as a prop

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit, FloatingMenuExtension],
			content: `Hello world!`
		});
	});

	let { content = $bindable() }: { content: string } = $props();

	$effect(() => {
		if ($editor && content) {
			$editor.commands.setContent(content);
		}
	});

	$effect(() => {
		if ($editor) {
			$editor.on('update', ({ editor }) => {
				content = editor.getHTML();
			});
		}
	});
</script>

<div class="prose prose-invert rounded-md border px-4 py-4">
	<EditorContent editor={$editor} class="px-4" />
</div>
