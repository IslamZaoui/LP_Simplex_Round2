<script lang="ts">
	import { transpose, type Simplex } from '@/simplex.svelte';
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
			math={`\\text{${simplex.objectiveState === 'Max' ? 'Maximize' : 'Minimize'} } Z = ${simplex.objectiveFunctionState.map((coef, i) => `${coef}x_${i + 1}`).join(' + ')}`}
		/>
		<Katex math={`\\text{Subject to }`} />
		{#each simplex.constraintsState as constraint, i}
			<Katex
				math={`\\quad ${constraint
					.slice(0, -1)
					.map((coef, j) => `${coef}x_${j + 1}`)
					.join(
						' + '
					)} \\${simplex.objectiveState === 'Max' ? 'leq' : 'geq'} ${constraint[constraint.length - 1]}`}
			/>
		{/each}
		<Katex math={`\\quad ${simplex.objectiveFunctionState.map((_, i) => `x_${i + 1}`)} \\geq 0`} />
	</div>

	<Katex math={`\\Downarrow`} />

	{#if simplex.objectiveState === 'Max'}
		<div class="flex flex-col">
			<Katex math={`\\text{Canonical Form: }`} />
			<Katex
				math={`\\text{Maximize } Z = ${simplex.objectiveFunctionState.map((coef, i) => `${coef}x_${i + 1}`).join(' + ')} + ${simplex.constraintsState.map((_, i) => `s_${i + 1}`).join(' + ')}`}
			/>
			<Katex math={`\\text{Subject to }`} />
			{#each simplex.constraintsState as constraint, i}
				<Katex
					math={`\\quad ${constraint
						.slice(0, -1)
						.map((coef, j) => `${coef}x_${j + 1}`)
						.join(' + ')} + s_${i + 1} = ${constraint[constraint.length - 1]}`}
				/>
			{/each}
			<Katex
				math={`\\quad ${simplex.objectiveFunctionState.map((_, i) => `x_${i + 1}`)},${simplex.constraintsState.map((_, i) => `s_${i + 1}`)} \\geq 0`}
			/>
		</div>
	{:else if simplex.objectiveState === 'Min'}
		{@const augmentedObjective = [...simplex.objectiveFunctionState, 1]}
		{@const fullMatrix: Matrix<number> = [...simplex.constraintsState, augmentedObjective]}
		{@const transposed = transpose<number>(fullMatrix)}
		{@const newConstraints = transposed.slice(0, -1)}
		{@const newObjectiveFunction = [...transposed[transposed.length - 1].slice(0, -1)]}
		<div class="flex flex-col">
			<Katex math={`\\text{Dual: }`} />
			<Katex
				math={`\\text{Maximize } Z = ${newObjectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(' + ')}`}
			/>
			<Katex math={`\\text{Subject to }`} />
			{#each newConstraints as constraint, i}
				<Katex
					math={`\\quad ${constraint
						.slice(0, -1)
						.map((coef, j) => `${coef}x_${j + 1}`)
						.join(' + ')} \\leq ${constraint[constraint.length - 1]}`}
				/>
			{/each}
			<Katex math={`\\quad ${newObjectiveFunction.map((_, i) => `x_${i + 1}`)} \\geq 0`} />
		</div>

		<Katex math={`\\Downarrow`} />

		<div class="flex flex-col">
			<Katex math={`\\text{Canonical Form: }`} />
			<Katex
				math={`\\text{Maximize } Z = ${newObjectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(' + ')} + ${newConstraints.map((_, i) => `s_${i + 1}`).join(' + ')} + a`}
			/>
			<Katex math={`\\text{Subject to }`} />
			{#each newConstraints as constraint, i}
				<Katex
					math={`\\quad ${constraint
						.slice(0, -1)
						.map((coef, j) => `${coef}x_${j + 1}`)
						.join(' + ')} + s_${i + 1} = ${constraint[constraint.length - 1]}`}
				/>
			{/each}
			<Katex
				math={`\\quad ${newObjectiveFunction.map((_, i) => `x_${i + 1}`)},${newConstraints.map((_, i) => `s_${i + 1}`)},a \\geq 0`}
			/>
		</div>
	{/if}
</div>
