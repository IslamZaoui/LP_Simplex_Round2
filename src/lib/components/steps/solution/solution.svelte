<script lang="ts">
	import * as Card from '@/components/ui/card';
	import { Button } from '@/components/ui/button';
	import { Simplex } from '@/simplex.svelte';
	import Table from './table.svelte';
	import Form from './form.svelte';

	interface Props {
		simplex: Simplex;
		step: number;
	}

	let { simplex = $bindable(), step = $bindable() }: Props = $props();
	let varNum = $derived(simplex.objectiveFunction.length);
	let constNum = $derived(simplex.constraints.length);
	let iterations = $derived([...simplex.solve()]);
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Simplex Solution</Card.Title>
		<Card.Description>Step-by-step solution tables</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Form {simplex} />

		{#each iterations as iteration, i}
			<Table {varNum} {constNum} {iteration} />
			<div class="mt-4">
				{#if i === iterations.length - 1}
					{#if iteration.error}
						<h3 class="mb-2 font-semibold">Error: {iteration.error}</h3>
					{:else}
						<h3 class="mb-2 font-semibold">Final Solution</h3>
						<p>
							Variables: {simplex
								.getSolution()
								.map((val, i) => `x${i + 1} = ${val.toFixed(2)}`)
								.join(', ')}
						</p>
						<p class="mt-1">
							Optimal Z value: {simplex.tableau[simplex.tableau.length - 1][
								simplex.tableau[0].length - 1
							].toFixed(2)}
						</p>
					{/if}
				{/if}
			</div>
		{/each}
	</Card.Content>
	<Card.Footer class="flex justify-end gap-4">
		<Button onclick={() => (step = 1)} variant="outline">Back</Button>
		<Button onclick={() => (step = 0)}>New Problem</Button>
	</Card.Footer>
</Card.Root>
