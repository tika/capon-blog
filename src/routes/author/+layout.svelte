<script lang="ts">
	import { page } from '$app/stores';

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';

	import '@friendofsvelte/tipex/styles/Controls.css';
	import '@friendofsvelte/tipex/styles/EditLink.css';
	import '@friendofsvelte/tipex/styles/ProseMirror.css';
	import '@friendofsvelte/tipex/styles/Tipex.css';

	let { children } = $props();
</script>

<div class="flex items-center justify-between">
	<a href="/author" class="font-panchang text-lg font-bold">Blog</a>

	{#if $page.url.pathname === '/author/write'}
		<span class="animate-pulse text-gray-400">Writing new article</span>
	{/if}

	<div class="flex items-center gap-2">
		<SignedIn let:user>
			{user?.firstName}
			<UserButton afterSignOutUrl="/" />
		</SignedIn>
	</div>
</div>

<SignedOut>
	<a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
</SignedOut>

{@render children()}
