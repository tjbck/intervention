<script>
	import dayjs from 'dayjs';
	import { toast } from 'svelte-sonner';

	import { API_BASE_URL } from '$lib/constants';
	import Overlay from '$lib/components/common/Overlay.svelte';

	let loading = false;
	let submitted = false;

	let requirementCheckboxElement = null;
	let consentFormCheckboxElement = null;

	let formData = {
		date: dayjs().format('YYYY-MM-DD'),
		email: '',
		age: '',
		gender: '', // 'M','F','N','OTHER','NA'
		race: [], // "B", "EA", "I-F", "I-M", "I-I", "I-OTHER", "I-NA", "L", "M", "SA", "W", "OTHER", "NA"
		app_usage_frequency: '', // "1", "2", "3", "4"
		mindless_usage_frequency: '', // "1", "2", "3", "4"
		average_mindless_usage_duration_minutes: ''
	};

	const submitHandler = async () => {
		loading = true;
		if (
			requirementCheckboxElement.checked &&
			consentFormCheckboxElement.checked &&
			formData.email !== '' &&
			formData.age !== '' &&
			formData.gender !== '' &&
			formData.race.length > 0 &&
			formData.app_usage_frequency !== '' &&
			formData.mindless_usage_frequency !== '' &&
			formData.average_mindless_usage_duration_minutes !== ''
		) {
			console.log({ ...formData, race: formData.race.join(',') });

			const res = await fetch(`${API_BASE_URL}/users/signup`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					date: formData.date,
					email: formData.email,
					survey: {
						...formData,
						race: formData.race.join(',')
					}
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

			if (res && res.id) {
				submitted = true;
				toast.success('Survey successfully registered. You may now close this tab.', {
					duration: 6000
				});

				console.log(window);
				if (window.parent) {
					parent.postMessage(JSON.stringify({ user_id: res.id }), '*');
				}
			}
		} else {
			toast.error('Please complete all required form inputs.');
		}
		loading = false;
	};
</script>

<svelte:head>
	<title>Pre-Experiment Survey | SFU</title>
</svelte:head>

<div class="mx-4 mb-20">
	<div class="">
		<div class="flex justify-center h-32">
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
			<div class="my-6">
				<label for="eligibility" class="block mb-2 text-sm text-gray-900"
					>Eligibility Requirements</label
				>
				<div class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg p-3">
					<ul class="pl-5 font-medium">
						<li>
							· <span>Regular user of Chrome browser</span>
						</li>
						<li>
							· <span>Access social media websites from a computer</span>
						</li>
						<li>
							· <span
								>Use at least one of the following (Reddit, Twitter (X), Instagram, Facebook) for at
								least 15 minutes every day</span
							>
						</li>
						<li>
							· <span>Can participate in the study for 2 weeks</span>
						</li>
					</ul>
				</div>

				<div class="flex text-sm text-gray-600">
					<input
						type="checkbox"
						bind:this={requirementCheckboxElement}
						class="w-4 h-4 mt-1.5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						required
					/>
					<div class=" mt-1">
						I meet all the eligibility requirements and am willing to participate in the study.
					</div>
				</div>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

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
						bind:this={consentFormCheckboxElement}
						class="w-4 h-4 mt-1.5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						required
					/>
					<div class=" mt-1">
						I have thoroughly read and understood the content of the consent form for the research
						study. I hereby acknowledge and agree with all the terms and conditions outlined in the
						document. I willingly consent to participate in the research and understand my rights
						and responsibilities as a participant. I agree to fully participate in the study.
					</div>
				</div>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<hr class="my-6" />

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
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					placeholder="Your email address"
					required
					autocomplete="email"
				/>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" my-6">
				<label for="age" class="block mb-2 text-sm text-gray-900">Age</label>
				<input
					type="number"
					id="age"
					bind:value={formData.age}
					min="0"
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					placeholder="Your age"
					required
					autocomplete="off"
				/>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" my-6">
				<label for="gender" class="block mb-2 text-sm text-gray-900">Gender</label>
				<div id="gender" class="mt-5">
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.gender}
							value={'M'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Man</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.gender}
							value={'F'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Woman</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.gender}
							value={'N'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Non-binary</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.gender}
							value={'O'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Other</div>
					</div>
					<div class="flex items-center">
						<input
							type="radio"
							bind:group={formData.gender}
							value={'NA'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Prefer not to answer</div>
					</div>
				</div>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>

			<div class=" my-6">
				<label for="race" class="block mb-2 text-sm text-gray-900"
					>What is your race?<br /> (One or more categories may be selected)
				</label>

				<div id="race" class="mt-5">
					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'B'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Black</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'EA'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">East/Southeast Asian</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'I'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Indigenous</div>
					</div>

					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'L'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Latino</div>
					</div>

					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'M'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Middle Eastern</div>
					</div>

					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'SA'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">South Asian</div>
					</div>

					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'W'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">White</div>
					</div>

					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'O'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Other</div>
					</div>

					<div class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={formData.race}
							value={'NA'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Prefer not to say</div>
					</div>
				</div>

				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>
			<div class=" my-6">
				<label for="app-usage-frequency" class="block mb-2 text-sm text-gray-900"
					>How often do you use Social Media?
				</label>
				<div id="app-usage-frequency" class="mt-5">
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.app_usage_frequency}
							value={'1'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Never</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.app_usage_frequency}
							value={'2'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Infrequently</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.app_usage_frequency}
							value={'3'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">A moderate amount</div>
					</div>
					<div class="flex items-center">
						<input
							type="radio"
							bind:group={formData.app_usage_frequency}
							value={'4'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Frequently</div>
					</div>
				</div>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>
			<div class=" my-6">
				<label for="mindless-usage-frequency" class="block mb-2 text-sm text-gray-900"
					>How often do you catch yourself consuming content on Social Media without being aware of
					what you are doing?
				</label>
				<div id="mindless-usage-frequency" class="mt-5">
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.mindless_usage_frequency}
							value={'1'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Never</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.mindless_usage_frequency}
							value={'2'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Infrequently</div>
					</div>
					<div class="flex items-center mb-2">
						<input
							type="radio"
							bind:group={formData.mindless_usage_frequency}
							value={'3'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">A moderate amount</div>
					</div>
					<div class="flex items-center">
						<input
							type="radio"
							bind:group={formData.mindless_usage_frequency}
							value={'4'}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<div class="ml-2 text-sm font-medium text-gray-700">Frequently</div>
					</div>
				</div>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>
			<div class=" my-6">
				<label
					for="average-mindless-usage-duration-minutes"
					class="block mb-2 text-sm text-gray-900"
					>On average, how long do these sessions of content consumption last?</label
				>
				<input
					type="number"
					id="average-mindless-usage-duration-minutes"
					bind:value={formData.average_mindless_usage_duration_minutes}
					class="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-3"
					placeholder="Duration minutes"
					min="0"
					required
					autocomplete="off"
				/>
				<div class="mt-2 text-xs text-gray-500 text-right">
					<span>REQUIRED</span>
				</div>
			</div>
			<hr />
			<div class=" my-6">
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
