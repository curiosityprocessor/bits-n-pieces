<script lang="ts">
	import { spring } from 'svelte/motion';

	export let date: Date = new Date('2024-01-01');
	export let version: string = '0.0.0';

	let count = 0;
	$: isEven = count % 2 === 0;

	$: {
		console.log(`count: ${count}`);
		console.log(`count is even: ${isEven}`);
	}

	$: if (count % 3 === 0) {
		console.log(`is divisible by three`);
	}

	let operationsHistory: string[] = [];
	$: console.log(`list of operations: ${operationsHistory.join(',')}`);

	let stats: Record<string, number> = {};
	$: console.log(`stats:\n${JSON.stringify(stats, null, 2)}`);

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	function add() {
		// operations.push('multiply'); // does NOT trigger reactive variables $: console.log...
		operationsHistory = [...operationsHistory, 'add']; // DOES trigger reactive variables $: console.log...

		// let addCount = stats['add']; // does NOT trigger reactive variables
		// addCount = addCount+1; // does NOT trigger reactive variables
		stats['add'] = (stats['add'] ?? 0) + 1; // DOES trigger reactive variables

		count += 1;
	}

	function subtract() {
		operationsHistory = [...operationsHistory, 'subtract'];
		stats['subtract'] = (stats['subtract'] ?? 0) + 1;
		count -= 1;
	}

	function multiplyBy2() {
		operationsHistory = [...operationsHistory, 'multiply'];
		stats['multiply'] = (stats['multiply'] ?? 0) + 1;
		count *= 2;
	}
</script>

<p>Today is {date.toLocaleDateString()}</p>
<p>version: {version}</p>
<div class="counter">
	<button on:click={subtract} aria-label="Decrease the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5" />
		</svg>
	</button>

	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
			<strong>{Math.floor($displayed_count)}</strong>
		</div>
	</div>

	<button on:click={add} aria-label="Increase the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
		</svg>
	</button>
	<button on:click={multiplyBy2} aria-label="Multiply the counter by two">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,1 L1,0 M0,0 L1,1" />
		</svg>
	</button>
</div>
<p>is even? <strong>{isEven}</strong></p>
{#if count >= 10}
	<p>counter reached two digits!</p>
{:else}
	<p>counter is a single digit</p>
{/if}

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
