<script lang="ts">
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	let { children } = $props();
</script>

<SignedIn>
	<UserButton afterSignOutUrl="/" />
</SignedIn>
<SignedOut>
	<a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
</SignedOut>

{@render children()}
