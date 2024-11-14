<script lang="ts">
	let { data } = $props();
</script>

<div class="mx-auto max-w-4xl p-4">
	<h1 class="mb-8 text-6xl font-semibold"><span class="text-amber-100">blog</span></h1>
	<p class="text-xl font-light">A collection of my opinions, thoughts, and ideas.</p>

	<div class="space-y-8">
		{#each data.posts as post}
			<article class="rounded-lg border p-6 shadow-sm">
				<a href="/post/{post.id}" class="hover:text-blue-600">
					<h2 class="mb-2 text-2xl font-semibold">{post.title}</h2>
				</a>
				<p class="mb-4 text-gray-600">
					{new Date(post.createdAt).toLocaleDateString()}
				</p>
				<p class="line-clamp-3 whitespace-pre-wrap">{post.content}</p>
				<div class="mt-4">
					<a href="/post/{post.id}" class="text-blue-500 hover:text-blue-600"> Read more → </a>
				</div>
			</article>
		{:else}
			<p class="text-gray-600">No posts yet!</p>
		{/each}
	</div>

	<div class="mt-8">
		<a
			href="/sign-in"
			class="inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		>
			Sign in to write a post
		</a>
	</div>
</div>
