<script lang="ts">
	import type { Simplex } from '@/simplex.svelte';

	//@ts-ignore
	import Katex from 'svelte-katex';

	interface Props {
		simplex: Simplex;
	}

	let { simplex }: Props = $props();
</script>

<div class="flex flex-col items-center gap-2">
	<div class="flex flex-col">
		<Katex>{`\\text{Liear Program: }`}</Katex>
		<Katex>
			{`\\text{Maximize } Z = ${simplex.objectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(' + ')}`}
		</Katex>
		<Katex>{`\\text{Subject to }`}</Katex>
		{#each simplex.constraints as constraint, i}
			<Katex>
				{`\\quad ${constraint
					.slice(0, -1)
					.map((coef, j) => `${coef}x_${j + 1}`)
					.join(' + ')} \\leq ${constraint[constraint.length - 1]}`}
			</Katex>
		{/each}
		<Katex>
			{`\\quad ${simplex.objectiveFunction.map((_, i) => `x_${i + 1}`)} \\geq 0`}
		</Katex>
	</div>
	<Katex>{`\\Downarrow`}</Katex>
	<div class="flex flex-col">
		<Katex>{`\\text{Canonical Form: }`}</Katex>
		<Katex>
			{`\\text{Maximize } Z = ${simplex.objectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(' + ')}`}
			{` + ${simplex.constraints.map((_, i) => `s_${i + 1}`).join(' + ')}`}
		</Katex>
		<Katex>{`\\text{Subject to }`}</Katex>
		{#each simplex.constraints as constraint, i}
			<Katex>
				{`\\quad ${constraint
					.slice(0, -1)
					.map((coef, j) => `${coef}x_${j + 1}`)
					.join(' + ')} + s_${i + 1} = ${constraint[constraint.length - 1]}`}
			</Katex>
		{/each}
		<Katex>
			{`\\quad ${simplex.objectiveFunction.map((_, i) => `x_${i + 1}`)},${simplex.constraints.map((_, i) => `s_${i + 1}`)} \\geq 0`}
		</Katex>
	</div>
</div>
