<script>
	import { SignedOut, SignIn } from 'svelte-clerk';
</script>

<div>
	<h1>Index Route</h1>
	<SignedOut>
		<p>You are signed out</p>
		<SignIn redirectUrl="/author" />
	</SignedOut>
</div>
