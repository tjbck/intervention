<script>
	import { SERVER_BASE_URL, API_BASE_URL } from '$lib/constants';
	import { toast } from 'svelte-sonner';
	import dayjs from 'dayjs';
	import ConfirmDialog from '$lib/components/common/ConfirmDialog.svelte';
	import { copyToClipboard } from '$lib/utils';

	let checkboxElement = null;
	let reviewed = null;

	$: if (reviewed == false) {
		window.location.reload();
	}

	let showConfirm = false;
	let submitted = false;

	let user = null;
	let formData = {
		date: dayjs().format('YYYY-MM-DD'),
		name: '',
		email: '',
		externalId: ''
	};

	const downloadExtension = () => {
		window.open(`${SERVER_BASE_URL}/static/extension.zip`, '_self');
	};

	const submitForm = async () => {
		console.log(checkboxElement);
		if (checkboxElement.checked) {
			if (formData.email !== '' && formData.name !== '') {
				const res = await fetch(`${API_BASE_URL}/users/signup`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						date: formData.date,
						email: formData.email,
						name: formData.name,
						external_id: formData.externalId
					})
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

				if (res && res.id !== undefined) {
					submitted = true;

					user = res;
				}
			} else {
				toast.error('Please complete all required form inputs.');
			}
		} else {
			toast.error('Please consent to the consent form.');
		}
	};
</script>

<svelte:head>
	<title>Interventions | SFU</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<ConfirmDialog
	bind:show={showConfirm}
	on:confirm={() => {
		submitForm();
	}}
	><div class="text-sm text-gray-500">
		<div class=" bg-red-500/20 text-red-700 dark:text-red-200 rounded-lg px-4 py-3">
			<div class="  font-semibold">Before you continue!</div>

			<div class=" my-2 text-xs">
				Please sign up and submit the form only if you are fully committed to participating in the
				study. 
			</div>

			<div class=" font-semibold">Ensure your commitment before proceeding.</div>
		</div>
	</div>
</ConfirmDialog>

<div class="mx-4 mb-20">
	<div class="flex justify-center h-32">
		<img src="/sfu.png" alt="sfu logo" />
	</div>

	{#if submitted}
		<div class="">
			<div class="text-center text-gray-700 flex flex-col justify-center">
				<div class=" my-20">
					<div class="text-xl font-semibold">Hello, {user?.name ?? 'User'}</div>
					<div class="text-lg">Thanks for signing up!</div>

					<div class=" my-3">
						<div class="flex justify-center">
							<button
								class=" flex justify-center gap-2 items-center text-center text-sm font-semibold rounded-full py-2 px-5 text-green-800 bg-green-100 hover:bg-green-200 transition-all cursor-pointer"
								on:click={() => {
									downloadExtension();
								}}
							>
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
										/>
									</svg>
								</div>

								<div>Click here to download the extension</div>
							</button>
						</div>
					</div>
					<div class="text-sm">
						Once you have downloaded the extension, please follow the instructions below to install
						it.
					</div>
				</div>

				<div class="flex justify-center">
					<div class=" w-96">
						<hr class="my-3" />
					</div>
				</div>

				<div class="text-sm">
					Unzip the downloaded extension and follow the instructions below to install it.
				</div>

				<div class="my-4 rounded-lg">
					<img class="rounded-lg" src="/assets/images/instruction-1.png" alt="chrome extensions" />
				</div>

				<div class="text-sm">
					<div class="mb-2">
						Visit: <button
							class="text-base font-semibold rounded-lg px-2 py-0.5 bg-gray-100"
							on:click={() => {
								copyToClipboard('chrome://extensions');
								toast.success('Copied to clipboard!');
							}}>chrome://extensions</button
						> in your browser and enable Developer Mode.
					</div>
					<div>1. Toggle the Developer Mode switch in the top right corner of the page.</div>
					<div>2. Click the "Load unpacked" button in the top left corner of the page.</div>
					<div>3. Select the unzipped extension folder and click "Select Folder".</div>
				</div>

				<div class="text-sm my-4">
					The extension should now be installed and ready to use. If you have any questions or
					concerns, please contact us at <a href="mailto:jaeryang_baek@sfu.com">
						jaeryang_baek@sfu.ca
					</a>
				</div>
			</div>
		</div>
	{:else}
		<div class="">
			<div class="text-xl text-gray-600 font-semibold">Participate in a Study!</div>

			<div class="my-2">
				<div class="text-sm text-gray-700">
					<div>
						<div>To qualify for compensation, please note the following requirements:</div>

						<ol class=" list-decimal pl-5 font-medium py-2">
							<li>You MUST use the extension every day during the study period.</li>
							<li>
								The total duration of usage over the 2 week period should exceed a minimum of 7
								hours.
							</li>
						</ol>

						We will be closely monitoring your usage, and failure to use the app every day will
						result in automatic disqualification. Ensure you use the app for at least 30 minutes each day
						throughout the study to remain eligible for compensation.
					</div>
				</div>
			</div>
		</div>

		<hr class="my-6" />

		<form
			on:submit|preventDefault={() => {
				showConfirm = true;
			}}
		>
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
				<label for="name" class="block mb-2 text-sm text-gray-900">Participant Name</label>
				<input
					type="text"
					id="name"
					bind:value={formData.name}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					placeholder="Your full name"
					required
					autocomplete="name"
				/>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" my-6">
				<label for="email" class="block mb-2 text-sm text-gray-900">Participant Email</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					placeholder="Your email address"
					required
					autocomplete="email"
				/>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<!-- <div class=" my-6">
				<label for="name" class="block mb-2 text-sm text-gray-900"
					>Participant ID (Prolific ID)</label
				>
				<input
					type="text"
					bind:value={formData.externalId}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					placeholder="Your participant ID"
					required
				/>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div> -->

			<div class=" my-6">
				<label for="email" class="block mb-2 text-sm text-gray-900">Consent Form</label>

				<div class=" text-sm text-purple-900 underline">
					<a
						href="https://drive.google.com/file/d/1uaMbJW2bvGACYqTpKc21L6F0vZDiQHsP/view?usp=sharing"
						target="_blank">Consent Form Link</a
					>
				</div>
				<div class="flex text-sm text-gray-600">
					<input
						type="checkbox"
						bind:this={checkboxElement}
						class="w-4 h-4 mt-1.5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						required
					/>
					<div class=" mt-1">
						I have thoroughly read and understood the content of the consent form for the research
						study. I hereby acknowledge and agree with all the terms and conditions outlined in the
						document. I willingly consent to participate in the research and understand my rights
						and responsibilities as a participant.
					</div>
				</div>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" my-6">
				<div class="flex text-sm text-gray-600">
					<input
						type="radio"
						value={false}
						bind:group={reviewed}
						class="w-4 h-4 mt-1.5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						required
					/>
					<div class=" mt-1">
						I have not reviewed the instruction materials below, and I don't want to participate in
						the study.
					</div>
				</div>

				<div class="flex text-sm text-gray-600">
					<input
						type="radio"
						value={true}
						bind:group={reviewed}
						class="w-4 h-4 mt-1.5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						required
					/>
					<div class=" mt-1">
						I have thoroughly reviewed the instruction materials below, and I agree to fully
						participate in the study.
					</div>
				</div>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			{#if reviewed}
				<div class="flex justify-end my-6">
					<div>
						<button
							class="flex text-sm w-full font-normal rounded-lg py-1.5 px-3 bg-blue-500 hover:bg-blue-600 text-white transition-all cursor-pointer"
							type="submit"
						>
							<div class="">Submit</div>

							<div class="my-auto ml-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="w-4 h-4"
								>
									<path
										d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"
									/>
								</svg>
							</div>
						</button>
					</div>
				</div>
			{/if}
		</form>
	{/if}
</div>
