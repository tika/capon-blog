<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { dark } from '@clerk/themes';

	import { ClerkProvider } from 'svelte-clerk';
	import '../styles/amulya.css';
	import '../styles/app.css';
	import '../styles/panchang.css';

	const { children } = $props();
</script>

<ClerkProvider
	publishableKey={env.PUBLIC_CLERK_PUBLISHABLE_KEY}
	appearance={{
		baseTheme: dark
	}}
>
	<div class="mx-auto max-w-4xl p-4 font-amulya">
		{@render children()}
	</div>
</ClerkProvider>
