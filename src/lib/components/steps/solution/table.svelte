<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	interface Props {
		varNum: number;
		constNum: number;
		iteration: SimplexIteration;
	}

	let { iteration, varNum, constNum }: Props = $props();
</script>

<div class="p-4">
	<h3 class="mb-2 font-semibold">
		Iteration {iteration.iteration}
		{#if iteration.isOptimal}
			(Optimal Solution)
		{/if}
	</h3>

	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="rounded text-center">Basic</Table.Head>
				{#each Array(iteration.tableau[0].length - 1) as _, j}
					<Table.Head class="rounded text-center">
						{#if j < varNum}
							x{j + 1}
						{:else if j < varNum + constNum}
							s{j - varNum + 1}
						{:else if j >= varNum + constNum}
							a
						{/if}
					</Table.Head>
				{/each}
				<Table.Head class="rounded text-center">RHS</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each iteration.tableau.slice(0, -1) as row, i}
				<Table.Row>
					<Table.Cell class="rounded text-center">
						{#if iteration.basis[i] < varNum}
							x{iteration.basis[i] + 1}
						{:else}
							s{iteration.basis[i] - varNum + 1}
						{/if}
					</Table.Cell>
					{#each row as cell, j}
						{@const isPivot = i === iteration.pivot[0] && j === iteration.pivot[1]}
						<Table.Cell
							class={`rounded text-center ${isPivot && !iteration.isOptimal ? 'bg-muted text-muted-foreground' : ''}`}
						>
							{cell.toFixed(2)}
						</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
			<Table.Row>
				<Table.Cell class="rounded text-center">Z</Table.Cell>
				{#each iteration.tableau[iteration.tableau.length - 1] as cell, j}
					{@const isLast = j === iteration.tableau[0].length - 1}
					<Table.Cell
						class={`rounded text-center ${isLast && iteration.isOptimal ? 'bg-primary text-primary-foreground' : ''}`}
					>
						{cell.toFixed(2)}
					</Table.Cell>
				{/each}
			</Table.Row>
		</Table.Body>
	</Table.Root>
</div>
