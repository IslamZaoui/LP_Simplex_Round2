<script lang="ts">
	import * as Card from '@/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import { Simplex } from '@/simplex.svelte';
	import { Katex } from '@/components/ui/katex';

	interface Props {
		simplex: Simplex;
		step: number;
	}

	let { simplex = $bindable(), step = $bindable() }: Props = $props();
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Simplex Values</Card.Title>
		<Card.Description>Enter simplex values</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<Select.Root type="single" bind:value={simplex.objectiveState}>
				<Select.Trigger>{simplex.objectiveState ?? 'Objective'}</Select.Trigger>
				<Select.Content>
					{#each ['Max', 'Min'] as p}
						<Select.Item value={p}>{p}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Katex math={`\\Z =`} />
			{#each Array(simplex.objectiveFunctionState.length) as _, index}
				<Input
					type="number"
					bind:value={simplex.objectiveFunctionState[index]}
					placeholder={`Coefficient for x${index + 1}`}
				/>
				<Katex math={`x${index + 1}`} />
				{#if index !== simplex.objectiveFunctionState.length - 1}
					<Katex math={`+`} />
				{/if}
			{/each}
		</div>
		<div class="ml-[75px] flex flex-col gap-2">
			{#each simplex.constraintsState as constraint}
				<div class="flex items-center gap-2">
					{#each Array(simplex.objectiveFunctionState.length) as _, varIndex}
						<Input
							type="number"
							bind:value={constraint[varIndex]}
							placeholder={`Coefficient for x${varIndex + 1}`}
						/>
						<Katex math={`x${varIndex + 1}`} />
						{#if varIndex !== simplex.objectiveFunctionState.length - 1}
							<Katex math={`+`} />
						{/if}
					{/each}
					<Katex math={simplex.objectiveState === 'Min' ? '\\geq' : '\\leq'} />
					<Input type="number" bind:value={constraint[simplex.objectiveFunctionState.length]} />
				</div>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-end gap-4">
		<Button onclick={() => (step = 0)} variant="outline">Cancel</Button>
		<Button class="w-1/4" onclick={() => (step = 2)}>Solve</Button>
	</Card.Footer>
</Card.Root>
