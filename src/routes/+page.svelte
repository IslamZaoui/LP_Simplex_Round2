<script lang="ts">
	import { GenerateModel, SetValues, Solution } from '@/components/steps';
	import type { Simplex } from '@/simplex.svelte';
	import { fade } from 'svelte/transition';

	let step = $state(0);

	let simplex: Simplex | undefined = $state(undefined);
</script>

<div class="mx-auto flex min-h-screen w-full flex-col items-center gap-8 p-8">
	<h1 class="text-4xl font-bold">Simplex Calculator</h1>

	<div class="w-full max-w-[750px]">
		{#if step === 0}
			<div in:fade>
				<GenerateModel bind:simplex bind:step />
			</div>
		{:else if step === 1 && simplex}
			<div in:fade>
				<SetValues bind:simplex bind:step />
			</div>
		{:else if step === 2 && simplex}
			<div in:fade>
				<Solution bind:simplex bind:step />
			</div>
		{/if}
	</div>
</div>
