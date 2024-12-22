<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onMount } from 'svelte';

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			editorProps: {
				attributes: {
					class: 'outline-none'
				}
			},
			content: `
        <h2 class="mt-14 mb-6 text-xl leading-tight">
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul class="pl-4 pr-4 my-5 ml-1.5">
          <li class="py-1">
            <p class="my-1">That's a bullet list with one …</p>
          </li>
          <li class="py-1">
            <p class="my-1">… or two list items.</p>
          </li>
        </ul>
        <p>
          Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
        </p>
        <pre class="bg-black rounded-lg text-white font-mono my-6 p-4"><code class="text-sm">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
        </p>
        <blockquote class="border-l-4 border-gray-300 my-6 pl-4">
          Wow, that's amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,
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
			on:click={() => editor.chain().focus().toggleBold().run()}
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
			on:click={() => editor.chain().focus().toggleItalic().run()}
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
			on:click={() => editor.chain().focus().toggleStrike().run()}
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
			on:click={() => editor.chain().focus().toggleCode().run()}
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
			on:click={() => editor.chain().focus().unsetAllMarks().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		>
			Clear marks
		</button>
		<button
			on:click={() => editor.chain().focus().clearNodes().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		>
			Clear nodes
		</button>
		<!-- Headings -->
		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('paragraph')
				? 'bg-gray-300'
				: ''}"
		>
			Paragraph
		</button>
		{#each Array(6) as _, i}
			<button
				on:click={() =>
					editor
						.chain()
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
			on:click={() => editor.chain().focus().toggleBulletList().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('bulletList')
				? 'bg-gray-300'
				: ''}"
		>
			Bullet list
		</button>
		<button
			on:click={() => editor.chain().focus().toggleOrderedList().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('orderedList')
				? 'bg-gray-300'
				: ''}"
		>
			Ordered list
		</button>
		<!-- Code block -->
		<button
			on:click={() => editor.chain().focus().toggleCodeBlock().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('codeBlock')
				? 'bg-gray-300'
				: ''}"
		>
			Code block
		</button>
		<!-- Other formatting -->
		<button
			on:click={() => editor.chain().focus().toggleBlockquote().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 {editor.isActive('blockquote')
				? 'bg-gray-300'
				: ''}"
		>
			Blockquote
		</button>
		<button
			on:click={() => editor.chain().focus().setHorizontalRule().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		>
			Horizontal rule
		</button>
		<button
			on:click={() => editor.chain().focus().setHardBreak().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		>
			Hard break
		</button>
		<!-- Undo/Redo -->
		<button
			on:click={() => editor.chain().focus().undo().run()}
			disabled={!editor.can().chain().focus().undo().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
		>
			Undo
		</button>
		<button
			on:click={() => editor.chain().focus().redo().run()}
			disabled={!editor.can().chain().focus().redo().run()}
			class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
		>
			Redo
		</button>
	</div>
{/if}

<div bind:this={element} class="prose max-w-none outline-none first:mt-0"></div>
