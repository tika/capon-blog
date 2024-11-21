<script lang="ts">
	import { goto } from '$app/navigation';
	import TipTap from '$lib/TipTap.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let title = $state('');
	let content = $state('');
	let error = $state('');
	let success = $state('');
	let editingArticle = $state<number | null>(null);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		success = '';

		const endpoint = editingArticle ? `/api/articles/${editingArticle}` : '/api/create-article';

		const method = editingArticle ? 'PUT' : 'POST';

		try {
			const response = await fetch(endpoint, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, content })
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(
					data.message || `Failed to ${editingArticle ? 'update' : 'create'} article`
				);
			}

			success = `Article ${editingArticle ? 'updated' : 'created'} successfully!`;
			title = '';
			content = '';
			editingArticle = null;
			await goto('/author', { invalidateAll: true });
		} catch (e) {
			error = e instanceof Error ? e.message : 'Something went wrong';
		}
	}

	async function handleDelete(id: number) {
		if (!confirm('Are you sure you want to delete this article?')) return;

		try {
			const response = await fetch(`/api/articles/${id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Failed to delete article');
			}

			await goto('/author', { invalidateAll: true });
		} catch (e) {
			error = e instanceof Error ? e.message : 'Something went wrong';
		}
	}

	function handleEdit(article: any) {
		editingArticle = article.id;
		title = article.title;
		content = article.content;
	}

	let body = `<p>The initial html content.</p>`;
</script>

<div class="mx-auto max-w-2xl p-4">
	<h1 class="mb-4 text-2xl">Welcome, {data.user.firstName}</h1>

	<form onsubmit={handleSubmit} class="space-y-4">
		<div>
			<label for="title" class="mb-1 block text-sm font-medium">Title</label>
			<input id="title" type="text" bind:value={title} class="w-full rounded border p-2" required />
		</div>

		<div>
			<label for="content" class="mb-1 block text-sm font-medium">Content</label>
			<TipTap bind:content />
		</div>

		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			{editingArticle ? 'Update' : 'Create'} Article
		</button>

		{#if editingArticle}
			<button
				type="button"
				onclick={() => {
					editingArticle = null;
					title = '';
					content = '';
				}}
				class="ml-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
			>
				Cancel
			</button>
		{/if}
	</form>

	{#if error}
		<p class="mt-4 text-red-500">{error}</p>
	{/if}

	{#if success}
		<p class="mt-4 text-green-500">{success}</p>
	{/if}

	<div class="mt-8 space-y-4">
		<h2 class="text-xl font-semibold">Your Articles</h2>
		{#each data.articles as article}
			<div class="rounded-lg border p-4">
				<h3 class="text-lg font-medium">{article.title}</h3>
				<div class="mt-2 flex gap-2">
					<button onclick={() => handleEdit(article)} class="text-blue-500 hover:text-blue-600">
						Edit
					</button>
					<button onclick={() => handleDelete(article.id)} class="text-red-500 hover:text-red-600">
						Delete
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
