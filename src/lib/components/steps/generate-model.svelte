<script lang="ts">
	import * as Card from '@/components/ui/card';
	import { Label } from '@/components/ui/label';
	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import { Simplex } from '@/simplex.svelte';
	import { toast } from 'svelte-sonner';

	interface Props {
		simplex: Simplex | undefined;
		step: number;
	}

	let { simplex = $bindable(), step = $bindable() }: Props = $props();
	let varNum = $state(3);
	let constNum = $state(2);

	function createSimplex() {
		if (varNum <= 0 || constNum <= 0) {
			toast.error('Number of variables and constraints must be greater than 0');
			return;
		}

		simplex = new Simplex(varNum, constNum);

		step = 1;
	}
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Generate model</Card.Title>
		<Card.Description>Enter number of variables & constraints</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-3">
		<div>
			<Label for="variables">Number of variables</Label>
			<Input id="variables" type="number" bind:value={varNum} />
		</div>

		<div>
			<Label for="variables">Number of constraints</Label>
			<Input id="variables" type="number" bind:value={constNum} />
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-end gap-4">
		<Button class="w-1/4" onclick={createSimplex}>Generate Model</Button>
	</Card.Footer>
</Card.Root>
