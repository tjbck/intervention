<script>
	import dayjs from 'dayjs';
	import { toast } from 'svelte-sonner';

	import { API_BASE_URL } from '$lib/constants';

	let loading = false;
	let submitted = false;

	let formData = {
		date: dayjs().format('YYYY-MM-DD'),
		email: '',
	};

	const submitHandler = async () => {
		loading = true;

		if (formData.email !== '') {
			console.log({ ...formData });

			const res = await fetch(`${API_BASE_URL}/users/survey`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ...formData })
			})
				.then(async (res) => {
					if (!res.ok) throw await res.json();
					return await res.json();
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.detail);
					return null;
				});

			if (res && res.id) {
				submitted = true;
				toast.success('Survey successfully registered. You may now close this tab.', {
					duration: 6000
				});

				if (window.parent) {
					parent.postMessage(JSON.stringify({ user_id: res.id }), '*');
				}
			}
		} else {
			toast.error('Please enter your email.');
		}
		loading = false;
	};
</script>

<svelte:head>
	<title>Pre-Experiment Survey | SFU</title>
</svelte:head>

<div class="mx-4 mb-20">
	<div class="">
		<div class="flex justify-center">
			<img src="/sfu.png" alt="sfu logo" />
		</div>
		<div class="text-xl text-gray-600 font-semibold">Pre-Experiment Survey</div>
		<div class="mt-2 text-sm text-gray-600 break-words">
			Comparing Invisible Interventions with Empowering Interventions: How Can Reduced Visibility or
			Enhanced Agency allow Users to Take Control of their Social Media Usage?
		</div>
	</div>

	<hr class="my-6" />

	{#if submitted}
		<div class="text-center text-gray-700 text-2xl font-semibold">
			Survey successfully registered.<br /> You may now close this tab.
		</div>
	{:else}
		<form on:submit|preventDefault={submitHandler}>
			<div class=" my-6">
				<label for="date" class="block mb-2 text-sm text-gray-900">Date</label>
				<input
					disabled
					type="date"
					id="date"
					bind:value={formData.date}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				/>
			</div>

			<div class=" my-6">
				<label for="email" class="block mb-2 text-sm text-gray-900">Participant Email</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
					placeholder="Your email address"
					required
					autocomplete="email"
				/>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="text-center mt-8">
				<button
					type="submit"
					class="bg-blue-600 text-white px-4 py-2 rounded-md"
					disabled={loading}
				>
					{#if loading}Submitting...{#else}Submit Survey{/if}
				</button>
			</div>
		</form>
	{/if}
</div>
