<script>
	import dayjs from 'dayjs';
	import { toast } from 'svelte-sonner';

	import { API_BASE_URL } from '$lib/constants';
	import Overlay from '$lib/components/common/Overlay.svelte';

	let loading = false;
	let submitted = false;

	let formData = {
		date: dayjs().format('YYYY-MM-DD'),
		email: '',
		intervention_uninstalled: null,
		uninstall_date: null,
		uninstall_reason: '',
		intervention_ux_impact: '',
		mindless_consumption_changes: '',
		intervention_effect: '',
		perception_with_notifications: '',
		future_intervention_usage_likelihood: '',
		habit_awareness: null,
		additional_comments: ''
	};

	let uninstall_reason_detailed = '';

	const submitHandler = async () => {
		// TODO: validate formdata

		loading = true;

		if (
			formData.email !== '' &&
			formData.intervention_ux_impact !== '' &&
			formData.mindless_consumption_changes !== '' &&
			formData.intervention_effect !== '' &&
			formData.perception_with_notifications !== '' &&
			formData.future_intervention_usage_likelihood !== '' &&
			formData.habit_awareness !== null
		) {
			if (
				formData.intervention_uninstalled === false ||
				(formData.intervention_uninstalled === true &&
					formData.uninstall_date !== null &&
					formData.uninstall_reason !== '')
			) {
				if (formData.uninstall_reason === '6') {
					formData.uninstall_reason = uninstall_reason_detailed;
				}

				const res = await fetch(`${API_BASE_URL}/users/survey/exit`, {
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
				}
			} else {
				toast.error('Please complete all required form inputs.');
			}
		} else {
			toast.error('Please complete all required form inputs.');
		}
		loading = false;
	};
</script>

<svelte:head>
	<title>Post-Experiment Survey | SFU</title>
</svelte:head>

<div class="mx-4 mb-20">
	<div class="">
		<div class="flex justify-center">
			<img src="/sfu.png" alt="sfu logo" />
		</div>
		<div class="text-xl text-gray-600 font-semibold">Post-Experiment Survey</div>
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
			<div class=" tw-my-6">
				<label for="date" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900">Date</label>
				<input
					disabled
					type="date"
					id="date"
					bind:value={formData.date}
					class="tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
					required
				/>
			</div>

			<div class=" tw-my-6">
				<label for="email" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>Participant Email</label
				>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					class="tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
					placeholder="Your email address"
					required
					autocomplete="email"
				/>
				<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" tw-my-6">
				<label for="intervention-uninstalled" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>Did you uninstall or stop using the intervention at any point in the study?
				</label>

				<div id="intervention-uninstalled" class="tw-mt-5">
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_uninstalled}
							value={true}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">Yes</div>
					</div>
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_uninstalled}
							value={false}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">No</div>
					</div>
				</div>

				<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			{#if formData.intervention_uninstalled}
				<div class=" tw-my-6">
					<label for="uninstall-date" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
						>If so, what date? (approximate is fine)
					</label>

					<input
						type="date"
						id="uninstall-date"
						bind:value={formData.uninstall_date}
						class="tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
						required
					/>

					<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
						<span>REQUIRED</span>
					</div>
				</div>

				<div class=" tw-my-6">
					<label for="uninstall-reason" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
						>What was the reason?
					</label>

					<div id="uninstall-reason" class="tw-mt-5">
						<div class="tw-flex tw-items-center tw-mb-2">
							<input
								type="radio"
								bind:group={formData.uninstall_reason}
								value={'1'}
								class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
							/>
							<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
								Inconvenience
							</div>
						</div>

						<div class="tw-flex tw-items-center tw-mb-2">
							<input
								type="radio"
								bind:group={formData.uninstall_reason}
								value={'2'}
								class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
							/>
							<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
								Loss of Interest or Motivation
							</div>
						</div>

						<div class="tw-flex tw-items-center tw-mb-2">
							<input
								type="radio"
								bind:group={formData.uninstall_reason}
								value={'3'}
								class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
							/>
							<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
								Technical Issues
							</div>
						</div>

						<div class="tw-flex tw-items-center tw-mb-2">
							<input
								type="radio"
								bind:group={formData.uninstall_reason}
								value={'4'}
								class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
							/>
							<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
								Lack of Effectiveness
							</div>
						</div>

						<div class="tw-flex tw-items-center tw-mb-2">
							<input
								type="radio"
								bind:group={formData.uninstall_reason}
								value={'5'}
								class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
							/>
							<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
								Preference for Different Solutions
							</div>
						</div>

						<div class="tw-flex tw-items-center">
							<input
								type="radio"
								bind:group={formData.uninstall_reason}
								value={'6'}
								class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
							/>
							<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">Other</div>
						</div>
					</div>

					{#if formData.uninstall_reason === '6'}
						<div class="flex items-center mt-2">
							<textarea
								id="uninstall-reason-detailed"
								bind:value={uninstall_reason_detailed}
								class="tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
								placeholder="Your answer"
								required
								rows="6"
								autocomplete="off"
							/>
						</div>
					{/if}

					<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
						<span>REQUIRED</span>
					</div>
				</div>
			{/if}

			<div class=" tw-my-6">
				<label for="intervention-ux-impact" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>How did the interventions impact your overall user experience of Tiktok?</label
				>
				<div id="intervention-ux-impact" class="tw-mt-5">
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_ux_impact}
							value={'1'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Greatly Improved User Experience
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_ux_impact}
							value={'2'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Slightly Improved User Experience
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_ux_impact}
							value={'3'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							No Significant Change in User Experience
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_ux_impact}
							value={'4'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Slightly Decreased User Experience
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_ux_impact}
							value={'5'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Greatly Decreased User Experience
						</div>
					</div>

					<div class="tw-flex tw-items-center">
						<input
							type="radio"
							bind:group={formData.intervention_ux_impact}
							value={'6'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Not Sure / Can't Tell
						</div>
					</div>
				</div>

				<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" tw-my-6">
				<label
					for="mindless-consumption-changes"
					class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>Did you notice a change in how often you mindlessly consumed social media, both in terms
					of the length of each consumption session and the number of times the sessions were
					initiated?
				</label>

				<div id="mindless-consumption-changes" class="tw-mt-5">
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.mindless_consumption_changes}
							value={'1'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Noticeably Increased
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.mindless_consumption_changes}
							value={'2'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Slightly Increased
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.mindless_consumption_changes}
							value={'3'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							No Significant Change
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.mindless_consumption_changes}
							value={'4'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Slightly Decreased
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.mindless_consumption_changes}
							value={'5'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Noticeably Decreased
						</div>
					</div>

					<div class="tw-flex tw-items-center">
						<input
							type="radio"
							bind:group={formData.mindless_consumption_changes}
							value={'6'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Not Sure / Can't Tell
						</div>
					</div>
				</div>
				<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" tw-my-6">
				<label for="intervention-effect" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>Did the intervention change anything in regard to social media addiction for you?
				</label>

				<div id="intervention-effect" class="tw-mt-5">
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_effect}
							value={'1'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Significantly Reduced Addiction
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_effect}
							value={'2'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Slightly Reduced Addiction
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_effect}
							value={'3'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							No Significant Change in Addiction
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_effect}
							value={'4'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Slightly Increased Addiction
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_effect}
							value={'5'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Significantly Increased Addiction
						</div>
					</div>

					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.intervention_effect}
							value={'6'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Not Sure / Can't Tell
						</div>
					</div>
					<div class="tw-flex tw-items-center">
						<input
							type="radio"
							bind:group={formData.intervention_effect}
							value={'7'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Not Applicable / Not Addicted to Social Media
						</div>
					</div>
				</div>

				<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" tw-my-6">
				<label
					for="perception_with_notifications"
					class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>How would your perception of the intervention change if notifications were enabled?
				</label>
				<div id="app-usage-frequency" class="tw-mt-5">
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.perception_with_notifications}
							value={'1'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Significantly More Positive
						</div>
					</div>
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.perception_with_notifications}
							value={'2'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Slightly More Positive
						</div>
					</div>
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.perception_with_notifications}
							value={'3'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							No Significant Change
						</div>
					</div>
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.perception_with_notifications}
							value={'4'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Slightly More Negative
						</div>
					</div>
					<div class="tw-flex tw-items-center">
						<input
							type="radio"
							bind:group={formData.perception_with_notifications}
							value={'5'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Significantly More Negative
						</div>
					</div>
				</div>
				<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" tw-my-6">
				<label
					for="future-intervention-usage-likelihood"
					class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>How likely are you to use a method like this in the future in order to curb excessive
					social media usage?
				</label>
				<div id="habit-awareness" class="tw-mt-5">
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.future_intervention_usage_likelihood}
							value={'1'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Very likely
						</div>
					</div>
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.future_intervention_usage_likelihood}
							value={'2'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Somewhat likely
						</div>
					</div>
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.future_intervention_usage_likelihood}
							value={'3'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Somewhat unlikely
						</div>
					</div>
					<div class="tw-flex tw-items-center">
						<input
							type="radio"
							bind:group={formData.future_intervention_usage_likelihood}
							value={'4'}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">
							Very unlikely
						</div>
					</div>
				</div>
				<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" tw-my-6">
				<label for="habit-awareness" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>Has this method brought forth awareness of your social media habits in any way?
				</label>
				<div id="habit-awareness" class="tw-mt-5">
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.habit_awareness}
							value={true}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">Yes</div>
					</div>
					<div class="tw-flex tw-items-center tw-mb-2">
						<input
							type="radio"
							bind:group={formData.habit_awareness}
							value={false}
							class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
						/>
						<div class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700">No</div>
					</div>
				</div>
				<div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
					<span>REQUIRED</span>
				</div>
			</div>
			<div class=" tw-my-6">
				<label for="additional-comments" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
					>Please provide us with any additional comments, if you have any.
				</label>
				<textarea
					id="additional-comments"
					bind:value={formData.additional_comments}
					class="tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
					placeholder="Your answer"
					rows="6"
					autocomplete="off"
				/>
			</div>

			<hr />

			<div class=" tw-my-6">
				<div class=" text-gray-600 text-sm">
					If you would like to reschedule or cancel your participation in the study for any reason,
					please notify the student lead (jaeryang_baek@sfu.ca) or the principle investigator
					(lawkim@sfu.ca).
				</div>
			</div>

			<hr />

			<div class="flex justify-end my-6">
				<div>
					<Overlay show={loading}>
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

						<!-- <button
                        type="submit"
                        class="mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                        >Submit</button
                    > -->
					</Overlay>
				</div>
			</div>

			<div class="text-white">
				<div class="mt-2 text-sm break-words">{JSON.stringify(formData)}</div>
			</div>
		</form>
	{/if}
</div>
