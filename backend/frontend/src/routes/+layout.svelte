<script>
	import '../tailwind.css';
	import '../app.css';

	import { Toaster } from 'svelte-sonner';
</script>

<div class="flex justify-center">
	<div class="min-h-screen w-screen max-w-4xl">
		<slot />
	</div>
</div>
<Toaster richColors position="top-center" />
