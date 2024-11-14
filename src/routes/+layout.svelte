<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { ClerkProvider } from 'svelte-clerk';
	import '../app.css';

	const { children } = $props();
</script>

<ClerkProvider publishableKey={env.PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
</ClerkProvider>
