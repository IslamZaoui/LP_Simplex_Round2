<script lang="ts">
	import GenerateModel from '@/components/steps/generate-model.svelte';
	import SetValues from '@/components/steps/set-values.svelte';
	import Solution from '@/components/steps/solution/solution.svelte';
	import type { Simplex } from '@/simplex.svelte';

	let step = $state(0);

	let simplex: Simplex | undefined = $state(undefined);
</script>

<div class="mx-auto flex min-h-screen w-full flex-col items-center gap-4 p-8">
	<h1 class="text-4xl font-bold">Simplex Calculator</h1>

	<div class="w-full max-w-[750px]">
		{#if step === 0}
			<GenerateModel bind:simplex bind:step />
		{:else if step === 1 && simplex}
			<SetValues bind:simplex bind:step />
		{:else if step === 2 && simplex}
			<Solution bind:simplex bind:step />
		{/if}
	</div>
</div>
