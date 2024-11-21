<script lang="ts">
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';

	import '@friendofsvelte/tipex/styles/Controls.css';
	import '@friendofsvelte/tipex/styles/EditLink.css';
	import '@friendofsvelte/tipex/styles/ProseMirror.css';
	import '@friendofsvelte/tipex/styles/Tipex.css';

	let { children } = $props();
</script>

<SignedIn>
	<UserButton afterSignOutUrl="/" />
</SignedIn>
<SignedOut>
	<a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
</SignedOut>

{@render children()}
