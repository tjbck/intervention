<script>
	import { SERVER_BASE_URL, API_BASE_URL } from '$lib/constants';
	import { toast } from 'svelte-sonner';
	import dayjs from 'dayjs';
	import ConfirmDialog from '$lib/components/common/ConfirmDialog.svelte';
	import { copyToClipboard } from '$lib/utils';

	let requirementCheckboxElement = null;
	let consentFormCheckboxElement = null;

	let reviewed = null;

	$: if (reviewed == false) {
		window.location.reload();
	}

	let showConfirm = false;
	let submitted = false;

	let user = null;
	let formData = {
		date: dayjs().format('YYYY-MM-DD'),
		email: '',
		externalId: ''
	};

	const downloadExtension = () => {
		window.open(`${SERVER_BASE_URL}/static/extension.zip`, '_self');
	};

	const submitForm = async () => {
		if (requirementCheckboxElement.checked && consentFormCheckboxElement.checked) {
			if (formData.email !== '') {
				const res = await fetch(`${API_BASE_URL}/users/signup`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						date: formData.date,
						email: formData.email,
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
			toast.error(
				'Please consent to the consent form and ensure all eligibility requirements are met.'
			);
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

	<div class="mb-10">
		<div class="text-xl text-gray-600 font-semibold">Participate in a Study!</div>
		<div class="my-2">
			<div class="text-sm text-gray-700">
				<div>
					<div>To qualify for compensation, please note the following requirements:</div>
					<ol class=" list-decimal pl-5 font-medium py-2">
						<li>You MUST use the extension every day during the study period.</li>
						<li>
							The total duration of usage over the 2 week period should exceed a minimum of 3.5
							hours.
						</li>
					</ol>
					We will be closely monitoring your usage, and failure to use the app every day will result
					in automatic disqualification. Ensure you use the app for at least 30 minutes each day throughout
					the study to remain eligible for compensation.
				</div>
			</div>
		</div>
	</div>

	<iframe
		id="ytplayer"
		type="text/html"
		width="100%"
		height="400"
		src="https://www.youtube.com/embed/VapVPCmOeLU?autoplay=1"
		frameborder="0"
	></iframe>

	<div class="">
		<div class="text-center text-gray-700 flex flex-col justify-center">
			<div class=" my-6">
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
</div>
