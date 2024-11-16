<script lang="ts">
	import type { Simplex } from '@/simplex.svelte';
	import { Katex } from '@/components/ui/katex';

	interface Props {
		simplex: Simplex;
	}

	let { simplex }: Props = $props();
</script>

<div class="flex flex-col items-center gap-2">
	<div class="flex flex-col">
		<Katex math={`\\text{Liear Program: }`} />
		<Katex
			math={`\\text{Maximize } Z = ${simplex.objectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(' + ')}`}
		/>
		<Katex math={`\\text{Subject to }`} />
		{#each simplex.constraints as constraint, i}
			<Katex
				math={`\\quad ${constraint
					.slice(0, -1)
					.map((coef, j) => `${coef}x_${j + 1}`)
					.join(' + ')} \\leq ${constraint[constraint.length - 1]}`}
			/>
		{/each}
		<Katex math={`\\quad ${simplex.objectiveFunction.map((_, i) => `x_${i + 1}`)} \\geq 0`} />
	</div>

	<Katex math={`\\Downarrow`} />

	<div class="flex flex-col">
		<Katex math={`\\text{Canonical Form: }`} />
		<Katex
			math={`\\text{Maximize } Z = ${simplex.objectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(' + ')} + ${simplex.constraints.map((_, i) => `s_${i + 1}`).join(' + ')}`}
		/>
		<Katex math={`\\text{Subject to }`} />
		{#each simplex.constraints as constraint, i}
			<Katex
				math={`\\quad ${constraint
					.slice(0, -1)
					.map((coef, j) => `${coef}x_${j + 1}`)
					.join(' + ')} + s_${i + 1} = ${constraint[constraint.length - 1]}`}
			/>
		{/each}
		<Katex
			math={`\\quad ${simplex.objectiveFunction.map((_, i) => `x_${i + 1}`)},${simplex.constraints.map((_, i) => `s_${i + 1}`)} \\geq 0`}
		/>
	</div>
</div>
