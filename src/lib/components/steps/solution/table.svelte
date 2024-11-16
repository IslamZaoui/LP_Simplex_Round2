<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	interface Props {
		varNum: number;
		constNum: number;
		iteration: SimplexIteration;
	}

	let { iteration, varNum, constNum }: Props = $props();
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="text-center rounded">Basic</Table.Head>
			{#each Array(iteration.tableau[0].length - 1) as _, j}
				<Table.Head class="text-center rounded">
					{#if j < varNum}
						x{j + 1}
					{:else if j < varNum + constNum}
						s{j - varNum + 1}
					{/if}
				</Table.Head>
			{/each}
			<Table.Head class="text-center rounded">RHS</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each iteration.tableau.slice(0, -1) as row, i}
			<Table.Row>
				<Table.Cell class="text-center rounded">
					{#if iteration.basis[i] < varNum}
						x{iteration.basis[i] + 1}
					{:else}
						s{iteration.basis[i] - varNum + 1}
					{/if}
				</Table.Cell>
				{#each row as cell, j}
					{@const isPivot = i === iteration.pivot[0] && j === iteration.pivot[1]}
					<Table.Cell
						class={`text-center rounded ${isPivot && !iteration.isOptimal ? 'bg-muted text-muted-foreground' : ''}`}
					>
						{cell.toFixed(2)}
					</Table.Cell>
				{/each}
			</Table.Row>
		{/each}
		<Table.Row>
			<Table.Cell class="text-center rounded">Z</Table.Cell>
			{#each iteration.tableau[iteration.tableau.length - 1] as cell, j}
				{@const isLast = j === iteration.tableau[0].length - 1}
				<Table.Cell class={`text-center rounded ${isLast && iteration.isOptimal ? 'bg-primary text-primary-foreground' : ''}`}>
					{cell.toFixed(2)}
				</Table.Cell>
			{/each}
		</Table.Row>
	</Table.Body>
</Table.Root>
