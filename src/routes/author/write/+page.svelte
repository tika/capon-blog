<script lang="ts">
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import TipTap from '$lib/TipTap.svelte';

	let title = '';
	let isEditingTitle = false;
	let inputElement: HTMLInputElement;

	function startEditing() {
		isEditingTitle = true;
	}

	$: if (isEditingTitle && inputElement) {
		inputElement.focus();
	}
</script>

<ImageUpload />

<div
	class="font-panchang text-4xl font-bold"
	on:click={startEditing}
	on:keydown={(e) => e.key === 'Enter' && startEditing()}
	role="button"
	tabindex="0"
>
	{#if isEditingTitle}
		<input
			bind:value={title}
			bind:this={inputElement}
			placeholder="Enter your title"
			class="min-h-[1.2em] w-full resize-none overflow-hidden bg-transparent font-panchang text-4xl font-bold outline-none placeholder:text-gray-500"
			on:blur={() => (isEditingTitle = false)}
		/>
	{:else}
		<h1>{title || 'Enter your title'}</h1>
	{/if}
</div>

<TipTap />
