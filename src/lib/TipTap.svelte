<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { onMount } from 'svelte';
	import { Editor } from 'svelte-tiptap';

	let { content = $bindable() } = $props();
	let element: HTMLDivElement | undefined = $state();
	let editor: Editor | undefined = $state();

	onMount(() => {
		editor = new Editor({
			element: element ?? undefined,
			extensions: [StarterKit],
			editorProps: {
				attributes: {
					class: 'outline-none'
				}
			},
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			},
			content: content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});
</script>

{#if editor}
	<div class="mb-4 flex flex-wrap gap-2 text-black">
		<button
			onclick={() => editor?.chain().focus().toggleBold().run()}
			disabled={!editor.can().chain().focus().toggleBold().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 {editor.isActive(
				'bold'
			)
				? 'bg-gray-300'
				: ''}"
		>
			Bold
		</button>
		<button
			onclick={() => editor?.chain().focus().toggleItalic().run()}
			disabled={!editor.can().chain().focus().toggleItalic().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 {editor.isActive(
				'italic'
			)
				? 'bg-gray-300'
				: ''}"
		>
			Italic
		</button>
		<button
			onclick={() => editor?.chain().focus().toggleStrike().run()}
			disabled={!editor.can().chain().focus().toggleStrike().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 {editor.isActive(
				'strike'
			)
				? 'bg-gray-300'
				: ''}"
		>
			Strike
		</button>
		<button
			onclick={() => editor?.chain().focus().toggleCode().run()}
			disabled={!editor.can().chain().focus().toggleCode().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 {editor.isActive(
				'code'
			)
				? 'bg-gray-300'
				: ''}"
		>
			Code
		</button>
		<button
			onclick={() => editor?.chain().focus().unsetAllMarks().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		>
			Clear marks
		</button>
		<button
			onclick={() => editor?.chain().focus().clearNodes().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		>
			Clear nodes
		</button>
		<!-- Headings -->
		<button
			onclick={() => editor?.chain().focus().setParagraph().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor?.isActive('paragraph')
				? 'bg-gray-300'
				: ''}"
		>
			Paragraph
		</button>
		{#each Array(6) as _, i}
			<button
				onclick={() =>
					editor
						?.chain()
						.focus()
						.toggleHeading({ level: (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 })
						.run()}
				class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('heading', {
					level: i + 1
				})
					? 'bg-gray-300'
					: ''}"
			>
				H{i + 1}
			</button>
		{/each}
		<!-- Lists -->
		<button
			onclick={() => editor?.chain().focus().toggleBulletList().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('bulletList')
				? 'bg-gray-300'
				: ''}"
		>
			Bullet list
		</button>
		<button
			onclick={() => editor?.chain().focus().toggleOrderedList().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('orderedList')
				? 'bg-gray-300'
				: ''}"
		>
			Ordered list
		</button>
		<!-- Code block -->
		<button
			onclick={() => editor?.chain().focus().toggleCodeBlock().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('codeBlock')
				? 'bg-gray-300'
				: ''}"
		>
			Code block
		</button>
		<!-- Other formatting -->
		<button
			onclick={() => editor?.chain().focus().toggleBlockquote().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('blockquote')
				? 'bg-gray-300'
				: ''}"
		>
			Blockquote
		</button>
		<button
			onclick={() => editor?.chain().focus().setHorizontalRule().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		>
			Horizontal rule
		</button>
		<button
			onclick={() => editor?.chain().focus().setHardBreak().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		>
			Hard break
		</button>
		<!-- Undo/Redo -->
		<button
			onclick={() => editor?.chain().focus().undo().run()}
			disabled={!editor.can().chain().focus().undo().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
		>
			Undo
		</button>
		<button
			onclick={() => editor?.chain().focus().redo().run()}
			disabled={!editor.can().chain().focus().redo().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
		>
			Redo
		</button>
	</div>
{/if}

<div bind:this={element} class="prose max-w-none outline-none first:mt-0"></div>
