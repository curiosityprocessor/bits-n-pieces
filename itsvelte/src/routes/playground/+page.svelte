<script lang="ts">
	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = colors[0];
	$: {
		console.log(`selected: ${selected}`);
	}
</script>

<svelte:head>
	<title>Playground</title>
	<meta name="description" content="Svelte Playground" />
</svelte:head>
<div>
	<h1 class="color-picker">Color picker</h1>
	<div class="color-picker">
		{#each colors as color, i}
			<button
				aria-current={selected === color}
				aria-label={color}
				style="background: {color}"
				on:click={() => (selected = color)}>{i + 1}</button
			>
		{/each}
	</div>
</div>

<style >
	h1.color-picker {
		transition: color 0.2s;
	}

	div.color-picker {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

	button {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px, -2px);
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
		transition: all 0.1s;
	}

	button[aria-current='true'] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);
	}
</style>
