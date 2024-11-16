<script lang="ts">
	import * as Card from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import { Simplex } from '@/simplex.svelte';
	//@ts-ignore
	import Katex from 'svelte-katex';

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
			<Katex>\max Z =</Katex>
			{#each Array(simplex.objectiveFunction.length) as _, index}
				<Input
					type="number"
					bind:value={simplex.objectiveFunction[index]}
					placeholder={`Coefficient for x${index + 1}`}
				/>
				<Katex>x{index + 1}</Katex>
				{#if index !== simplex.objectiveFunction.length - 1}
					<Katex>+</Katex>
				{/if}
			{/each}
		</div>
		<div class="ml-[75px] flex flex-col gap-2">
			{#each simplex.constraints as constraint}
				<div class="flex items-center gap-2">
					<Katex>{'{'}</Katex>
					{#each Array(simplex.objectiveFunction.length) as _, varIndex}
						<Input
							type="number"
							bind:value={constraint[varIndex]}
							placeholder={`Coefficient for x${varIndex + 1}`}
						/>
						<Katex>x{varIndex + 1}</Katex>
						{#if varIndex !== simplex.objectiveFunction.length - 1}
							<Katex>+</Katex>
						{/if}
					{/each}
					<Katex>\eqslantless</Katex>
					<Input type="number" bind:value={constraint[simplex.objectiveFunction.length]} />
				</div>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-end gap-4">
		<Button onclick={() => (step = 0)} variant="outline">Cancel</Button>
		<Button class="w-1/4" onclick={() => (step = 2)}>Solve</Button>
	</Card.Footer>
</Card.Root>
