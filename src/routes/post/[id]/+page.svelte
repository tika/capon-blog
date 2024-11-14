<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props();
</script>

<article class="mx-auto max-w-3xl p-4">
	<h1 class="mb-4 text-3xl font-bold">{data.post.title}</h1>

	<div class="mb-8 text-gray-600">
		Posted on {new Date(data.post.createdAt).toLocaleDateString()}
	</div>

	<div class="prose prose-lg max-w-none">
		<p class="whitespace-pre-wrap">{data.post.content}</p>
	</div>

	<div class="mt-8">
		<a
			href="/"
			class="text-blue-500 hover:text-blue-600"
		>
			← Back to all posts
		</a>
	</div>
</article> 
