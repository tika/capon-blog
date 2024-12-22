<script lang="ts">
	export let dialog;
	let className;
	export { className as class };
</script>

<dialog bind:this={dialog} class={className}>
	<slot />
</dialog>
