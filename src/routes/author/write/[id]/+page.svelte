<script lang="ts">
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import TipTap from '$lib/TipTap.svelte';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let title = $state(data.article.title);
	let coverImageUrl = $state(data.article.coverImageUrl);
	let content = $state(data.article.content);

	let isEditingTitle = $state(false);
	let inputElement: HTMLInputElement | null = $state(null);

	function startEditing() {
		isEditingTitle = true;
	}

	$effect(() => {
		if (isEditingTitle && inputElement) {
			inputElement.focus();
		}
	});

	const editArticle = () => {
		console.log(coverImageUrl);
		console.log(title);
		console.log(content);

		toast.promise(
			fetch(`/api/articles/${data.article.id}/edit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					content,
					coverImageUrl
				})
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				}),
			{
				loading: 'Updating...',
				success: 'Succesfully updated article!',
				error: 'Could not update article'
			}
		);
	};
</script>

<div class="flex flex-col gap-8">
	<ImageUpload bind:cloudUrl={coverImageUrl} />

	<div
		class="font-panchang text-4xl font-bold"
		onclick={startEditing}
		onkeydown={(e) => e.key === 'Enter' && startEditing()}
		role="button"
		tabindex="0"
	>
		{#if isEditingTitle}
			<input
				bind:value={title}
				bind:this={inputElement}
				placeholder="Enter your title"
				class="min-h-[1.2em] w-full resize-none overflow-hidden bg-transparent font-panchang text-4xl font-bold outline-none placeholder:text-gray-500"
				onblur={() => (isEditingTitle = false)}
			/>
		{:else}
			<h1>{title || 'Enter your title'}</h1>
		{/if}
	</div>

	<TipTap bind:content />

	<button class="rounded-md bg-blue-500 px-4 py-2 text-white" onclick={editArticle}
		>Update article</button
	>
</div>
