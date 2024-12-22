<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

	let { data } = $props();
</script>

<article>
	<h1 class="mb-4 text-3xl font-bold">{data.article.title}</h1>

	<div class="mb-8 text-gray-600">
		Posted on {new Date(data.article.createdAt).toLocaleDateString()}
	</div>

	<img src={data.article.coverImageUrl} alt="Cover image" />

	<div class="prose prose-lg max-w-none">
		{@html data.article.content}
	</div>

	<div class="mt-8">
		<a href="/" class="flex items-center gap-2 text-blue-500 hover:text-blue-600">
			<ArrowLeft size={16} /> Back to all articles
		</a>
	</div>
</article>
