<script>
	import Spinner from './Spinner.svelte';

	export let show = false;
	export let content = '';

	export let opacity = 0.75;
</script>

<div class="relative ">
	{#if show}
		<div class="absolute w-full h-full flex">
			<div
				class="absolute bg-white rounded outline outline-4 outline-white"
				style="inset: 0px; opacity: {opacity}; backdrop-filter: blur(2px);"
			/>

			<div class="flex w-full flex-col justify-center">
				<div class="m-auto py-3">
					<Spinner className="ml-2" />
				</div>

				{#if content !== ''}
					<div class="m-auto text-black z-50">
						{content}
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<slot />
</div>
