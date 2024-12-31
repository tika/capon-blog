<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

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
			// error = e instanceof Error ? e.message : 'Something went wrong';
		}
	}
</script>

<div class="mx-auto max-w-2xl p-4">
	<div class="mt-8 space-y-4">
		<h2 class="text-xl font-semibold">Your Articles</h2>
		{#each data.articles as article}
			<div class="rounded-lg border p-4">
				<h3 class="text-lg font-medium">{article.title}</h3>
				<div class="mt-2 flex gap-2">
					<a href="/author/write/{article.id}" class="text-blue-500 hover:text-blue-600"> Edit </a>
					<button onclick={() => handleDelete(article.id)} class="text-red-500 hover:text-red-600">
						Delete
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
