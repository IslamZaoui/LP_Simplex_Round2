<script lang="ts">
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Button } from '@/components/ui/button';
	import Github from 'lucide-svelte/icons/github';

	let { children } = $props();
</script>

<svelte:head>
	<title>Simplex Calculator | Islam Zaoui</title>
	<meta name="description" content="Simplex Calculator made by Islam Zaoui" />
</svelte:head>

<Toaster />

<div class="min-h-screen w-full">
	{@render children()}
</div>

<footer class="mt-auto border-t py-6">
	<div class="container mx-auto px-4">
		<div class="flex flex-col items-center justify-between sm:flex-row">
			<p class="mb-2 text-sm sm:mb-0">
				© {new Date().getFullYear()} Simplex Calculator Website. All rights reserved.
			</p>
			<div class="flex items-center space-x-4">
				<p class="text-sm">
					Made with
					<a href="http://svelte.dev" target="_blank" rel="noopener noreferrer">❤️</a>
					by
					<a
						class="font-bold underline underline-offset-2 hover:no-underline"
						href="http://islamzaoui.top"
						target="_blank"
						rel="noopener noreferrer">Islam Zaoui</a
					>
				</p>
				<Button variant="outline" size="sm" class="flex items-center">
					<Github class="mr-2 h-4 w-4" />
					<a href="https://github.com/islamzaoui/simplex" target="_blank" rel="noopener noreferrer"
						>Source Code</a
					>
				</Button>
			</div>
		</div>
	</div>
</footer>
