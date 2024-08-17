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
		helpfulness: '',
		continuedUse: '',
		socialMediaEnjoyment: '',
		usagePatternChange: '',
		primaryGoal: '',
		goalAchievement: '',
		specificChanges: '',
		concentration: '',
		productivity: '',
		usability: '',
		designEngagement: '',
		selfAwareness: '',
		control: '',
		intrusiveness: '',
		wellBeingImprovement: '',
		likedMost: '',
		dislikedMost: '',
		improvementSuggestions: '',
		additionalComments: ''
	};

	const submitHandler = async () => {
		loading = true;

		if (formData.email !== '') {
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
			toast.error('Please enter your email.');
		}
		loading = false;
	};
</script>

<svelte:head>
	<title>Post-Experiment Survey | SFU</title>
</svelte:head>

<div class="mx-4 mb-20">
	<div class="">
		<div class="flex justify-center h-32">
			<img src="/sfu.png" alt="sfu logo" />
		</div>
		<div class="text-xl text-gray-600 font-semibold">Post-Experiment Survey</div>
		<div class="mt-2 text-sm text-gray-600">
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
			<div class="my-6">
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

			<div class="my-6">
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

			<div class="my-6">
				<label for="helpfulness" class="block mb-2 text-sm text-gray-900"
					>How helpful did you find the intervention in reducing your screen time?</label
				>
				<select
					id="helpfulness"
					bind:value={formData.helpfulness}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Not at all helpful">Not at all helpful</option>
					<option value="Slightly helpful">Slightly helpful</option>
					<option value="Moderately helpful">Moderately helpful</option>
					<option value="Very helpful">Very helpful</option>
					<option value="Extremely helpful">Extremely helpful</option>
				</select>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="continuedUse" class="block mb-2 text-sm text-gray-900"
					>How likely are you to continue using the intervention after the study?</label
				>
				<select
					id="continuedUse"
					bind:value={formData.continuedUse}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Not at all likely">Not at all likely</option>
					<option value="Slightly likely">Slightly likely</option>
					<option value="Moderately likely">Moderately likely</option>
					<option value="Very likely">Very likely</option>
					<option value="Extremely likely">Extremely likely</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="socialMediaEnjoyment" class="block mb-2 text-sm text-gray-900"
					>How did the intervention impact your enjoyment of social media?</label
				>
				<select
					id="socialMediaEnjoyment"
					bind:value={formData.socialMediaEnjoyment}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Significantly decreased">Significantly decreased</option>
					<option value="Slightly decreased">Slightly decreased</option>
					<option value="No change">No change</option>
					<option value="Slightly increased">Slightly increased</option>
					<option value="Significantly increased">Significantly increased</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="usagePatternChange" class="block mb-2 text-sm text-gray-900"
					>Did the intervention change your usage pattern on social media? If yes, how?</label
				>
				<textarea
					id="usagePatternChange"
					bind:value={formData.usagePatternChange}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				></textarea>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="primaryGoal" class="block mb-2 text-sm text-gray-900"
					>What was your primary goal with the usage of this intervention?</label
				>
				<select
					id="primaryGoal"
					bind:value={formData.primaryGoal}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Reduce screen time">Reduce screen time</option>
					<option value="Increase productivity">Increase productivity</option>
					<option value="Improve mental well-being">Improve mental well-being</option>
					<option value="Other">Other</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="goalAchievement" class="block mb-2 text-sm text-gray-900"
					>To what extent did you achieve your goal?</label
				>
				<select
					id="goalAchievement"
					bind:value={formData.goalAchievement}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Not at all">Not at all</option>
					<option value="Slightly">Slightly</option>
					<option value="Moderately">Moderately</option>
					<option value="Very much">Very much</option>
					<option value="Completely">Completely</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="specificChanges" class="block mb-2 text-sm text-gray-900"
					>What specific changes did you notice in your screen time or digital habits?</label
				>
				<textarea
					id="specificChanges"
					bind:value={formData.specificChanges}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				></textarea>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="concentration" class="block mb-2 text-sm text-gray-900"
					>Rate your perceived concentration while using the intervention compared to before.</label
				>
				<select
					id="concentration"
					bind:value={formData.concentration}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Significantly worse">Significantly worse</option>
					<option value="Worse">Worse</option>
					<option value="No change">No change</option>
					<option value="Better">Better</option>
					<option value="Significantly better">Significantly better</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="productivity" class="block mb-2 text-sm text-gray-900"
					>How would you rate your productivity with the intervention compared to before?</label
				>
				<select
					id="productivity"
					bind:value={formData.productivity}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Significantly decreased">Significantly decreased</option>
					<option value="Slightly decreased">Slightly decreased</option>
					<option value="No change">No change</option>
					<option value="Slightly increased">Slightly increased</option>
					<option value="Significantly increased">Significantly increased</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="usability" class="block mb-2 text-sm text-gray-900"
					>How easy or difficult was it to use the intervention?</label
				>
				<select
					id="usability"
					bind:value={formData.usability}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Very difficult">Very difficult</option>
					<option value="Difficult">Difficult</option>
					<option value="Neutral">Neutral</option>
					<option value="Easy">Easy</option>
					<option value="Very easy">Very easy</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="designEngagement" class="block mb-2 text-sm text-gray-900"
					>How attractive or engaging did you find the intervention design?</label
				>
				<select
					id="designEngagement"
					bind:value={formData.designEngagement}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Very unattractive">Very unattractive</option>
					<option value="Unattractive">Unattractive</option>
					<option value="Neutral">Neutral</option>
					<option value="Attractive">Attractive</option>
					<option value="Very attractive">Very attractive</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="selfAwareness" class="block mb-2 text-sm text-gray-900"
					>Did the intervention make you more aware of your digital habits?</label
				>
				<select
					id="selfAwareness"
					bind:value={formData.selfAwareness}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Not at all">Not at all</option>
					<option value="Slightly">Slightly</option>
					<option value="Moderately">Moderately</option>
					<option value="Very much">Very much</option>
					<option value="Completely">Completely</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="control" class="block mb-2 text-sm text-gray-900"
					>How much control did you feel you had over your social media use with the intervention?</label
				>
				<select
					id="control"
					bind:value={formData.control}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="No control">No control</option>
					<option value="Little control">Little control</option>
					<option value="Moderate control">Moderate control</option>
					<option value="Significant control">Significant control</option>
					<option value="Complete control">Complete control</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="intrusiveness" class="block mb-2 text-sm text-gray-900"
					>How intrusive did you find the intervention?</label
				>
				<select
					id="intrusiveness"
					bind:value={formData.intrusiveness}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="Not intrusive at all">Not intrusive at all</option>
					<option value="Slightly intrusive">Slightly intrusive</option>
					<option value="Moderately intrusive">Moderately intrusive</option>
					<option value="Very intrusive">Very intrusive</option>
					<option value="Extremely intrusive">Extremely intrusive</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="wellBeingImprovement" class="block mb-2 text-sm text-gray-900"
					>Did you perceive any improvement in your general well-being while using the intervention?</label
				>
				<select
					id="wellBeingImprovement"
					bind:value={formData.wellBeingImprovement}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				>
					<option value="" disabled>Select an option</option>
					<option value="No improvement">No improvement</option>
					<option value="Slight improvement">Slight improvement</option>
					<option value="Moderate improvement">Moderate improvement</option>
					<option value="Significant improvement">Significant improvement</option>
					<option value="Complete improvement">Complete improvement</option>
				</select>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="likedMost" class="block mb-2 text-sm text-gray-900"
					>What did you like most about the intervention?</label
				>
				<textarea
					id="likedMost"
					bind:value={formData.likedMost}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				></textarea>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="dislikedMost" class="block mb-2 text-sm text-gray-900"
					>What did you dislike most about the intervention?</label
				>
				<textarea
					id="dislikedMost"
					bind:value={formData.dislikedMost}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					required
				></textarea>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class="my-6">
				<label for="improvementSuggestions" class="block mb-2 text-sm text-gray-900"
					>Do you have any suggestions for improving the intervention?</label
				>
				<textarea
					id="improvementSuggestions"
					bind:value={formData.improvementSuggestions}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
				></textarea>
			</div>

			<div class="my-6">
				<label for="additionalComments" class="block mb-2 text-sm text-gray-900"
					>Any other comments or feedback you would like to share?</label
				>
				<textarea
					id="additionalComments"
					bind:value={formData.additionalComments}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
				></textarea>
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
		</form>
	{/if}
</div>
