<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let title = $state('');
	let content = $state('');
	let error = $state('');
	let success = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		success = '';

		try {
			const response = await fetch('/api/create-post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, content })
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Failed to create post');
			}

			success = 'Post created successfully!';
			title = '';
			content = '';
		} catch (e) {
			error = e instanceof Error ? e.message : 'Something went wrong';
		}
	}
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
			<textarea id="content" bind:value={content} class="h-32 w-full rounded border p-2" required
			></textarea>
		</div>

		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Create Post
		</button>
	</form>

	{#if error}
		<p class="mt-4 text-red-500">{error}</p>
	{/if}

	{#if success}
		<p class="mt-4 text-green-500">{success}</p>
	{/if}
</div>
