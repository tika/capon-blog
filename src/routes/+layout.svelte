<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { ClerkProvider } from 'svelte-clerk';
	import '../app.css';
	import '../styles/zodiak.css';

	const { children } = $props();
</script>

<ClerkProvider publishableKey={env.PUBLIC_CLERK_PUBLISHABLE_KEY}>
	<div class="font-zodiak">
		{@render children()}
	</div>
</ClerkProvider>
