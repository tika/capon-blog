<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { encodeTitle, formatProperDate } from '$lib/utils';
	import { ExternalLink, Github } from 'lucide-svelte';

	let { data } = $props();
</script>

<div>
	<div class="flex items-center gap-4">
		<a href={env.PUBLIC_PORTFOLIO_URL} class="flex items-center gap-2 py-4 hover:text-blue-600">
			Portfolio <ExternalLink size={16} />
		</a>
		<a href={env.PUBLIC_GITHUB_URL} class="flex items-center gap-2 py-4 hover:text-blue-600">
			Inspect Repo <Github size={16} />
		</a>
	</div>
	<div class="flex flex-col gap-2">
		<h1 class="font-panchang text-6xl font-bold">tika's blog</h1>
		<p class="text-lg text-gray-600">A collection of my opinions, thoughts, and ideas.</p>
	</div>

	<hr class="my-8" />

	<div class="space-y-8">
		{#each data.articles as article}
			<article class="rounded-lg border p-6 shadow-sm">
				<a href="/article/{encodeTitle(article.title)}" class="hover:text-blue-600">
					<h2 class="mb-2 text-2xl font-semibold">{article.title}</h2>
				</a>
				<p class="mb-4 text-gray-600">
					{formatProperDate(new Date(article.createdAt))}
				</p>
				<p class="line-clamp-3 whitespace-pre-wrap">
					{@html article.content.replace(/<[^>]*>/g, '')}
				</p>
				<div class="mt-4">
					<a href="/article/{encodeTitle(article.title)}" class="text-blue-500 hover:text-blue-600">
						Read more →
					</a>
				</div>
			</article>
		{:else}
			<p class="text-gray-600">No articles yet!</p>
		{/each}
	</div>
</div>
