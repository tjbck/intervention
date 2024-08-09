<script>
  import dayjs from "dayjs";
  import { toast } from "svelte-sonner";
  import { postSurvey } from "../apis/users";

  let loading = false;
  let submitted = false;

  let formData = {
    date: dayjs().format("YYYY-MM-DD"),
    email: "",
    age: "",
    gender: "", // 'M','F','N','OTHER','NA'
    race: [], // "B", "EA", "I-F", "I-M", "I-I", "I-OTHER", "I-NA", "L", "M", "SA", "W", "OTHER", "NA"
    income_bracket: "", // "0", "10", "25", "50", "75", "100", "150", "NA"
    app_usage_frequency: "", // "1", "2", "3", "4"
    mindless_usage_frequency: "", // "1", "2", "3", "4"
    average_mindless_usage_duration_minutes: "",
    social_media_health_impact: "", // "1", "2", "3"
  };

  const submitHandler = async () => {
    loading = true;

    if (
      formData.email !== "" &&
      formData.age !== "" &&
      formData.gender !== "" &&
      formData.race.length > 0 &&
      formData.income_bracket !== "" &&
      formData.app_usage_frequency !== "" &&
      formData.mindless_usage_frequency !== "" &&
      formData.average_mindless_usage_duration_minutes !== "" &&
      formData.social_media_health_impact !== ""
    ) {
      console.log({ ...formData, race: formData.race.join(",") });

      const res = await postSurvey({
        ...formData,
        race: formData.race.join(","),
      }).catch((error) => {
        console.error(error);
        toast.error(error);
      });

      if (res && res.id) {
        submitted = true;
        toast.success("Survey successfully registered.", {
          duration: 6000,
        });

        // Save User to Local Storage
      }
    } else {
      toast.error("Please complete all required form inputs.");
    }
    loading = false;
  };
</script>

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
        class="bg-gray-50 text-sm rounded-lg w-full p-2 border-none outline-none"
        required
      />
    </div>

    <div class=" my-6">
      <label for="email" class="block mb-2 text-sm text-gray-900"
        >Participant Email</label
      >
      <input
        type="email"
        id="email"
        bind:value={formData.email}
        class="bg-gray-50 text-sm rounded-lg w-full p-2 border-none outline-none"
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
        class="bg-gray-50 text-sm rounded-lg w-full p-2 border-none outline-none"
        placeholder="Your age"
        required
        autocomplete="off"
      />
      <div class="mt-2 text-xs text-gray-500 text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" my-6">
      <label for="gender" class="block mb-2 text-sm text-gray-900">Gender</label
      >
      <div id="gender" class="mt-5">
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"M"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">Man</div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"F"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">Woman</div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"N"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Non-binary
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"O"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">Other</div>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"NA"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Prefer not to answer
          </div>
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
            value={"B"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">Black</div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"EA"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            East/Southeast Asian
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"I"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Indigenous
          </div>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"L"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Latino
          </div>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"M"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Middle Eastern
          </div>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"SA"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            South Asian
          </div>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"W"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">White</div>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"O"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">Other</div>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"NA"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Prefer not to say
          </div>
        </div>
      </div>

      <div class="mt-2 text-xs text-gray-500 text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" my-6">
      <label for="income-bracket" class="block mb-2 text-sm text-gray-900"
        >Which of these describes your income last year?
      </label>
      <div id="income-bracket" class="mt-5">
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"0"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            $0 to $9,999
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"10"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            $10,000 to $24,999
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"25"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            $25,000 to 49,999
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"50"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            $50,000 to 74,999
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"75"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            $75,000 to 99,999
          </div>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"100"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            $100,000 to 149,999
          </div>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"150"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            $150,000 and greater
          </div>
        </div>

        <div class="flex items-center">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"NA"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Prefer not to answer
          </div>
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
            value={"1"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">Never</div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.app_usage_frequency}
            value={"2"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Infrequently
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.app_usage_frequency}
            value={"3"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            A moderate amount
          </div>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            bind:group={formData.app_usage_frequency}
            value={"4"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Frequently
          </div>
        </div>
      </div>
      <div class="mt-2 text-xs text-gray-500 text-right">
        <span>REQUIRED</span>
      </div>
    </div>
    <div class=" my-6">
      <label
        for="mindless-usage-frequency"
        class="block mb-2 text-sm text-gray-900"
        >How often do you catch yourself consuming content on Social Media
        without being aware of what you are doing?
      </label>
      <div id="mindless-usage-frequency" class="mt-5">
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.mindless_usage_frequency}
            value={"1"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">Never</div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.mindless_usage_frequency}
            value={"2"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Infrequently
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.mindless_usage_frequency}
            value={"3"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            A moderate amount
          </div>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            bind:group={formData.mindless_usage_frequency}
            value={"4"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Frequently
          </div>
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
        class="bg-gray-50 text-sm rounded-lg w-full p-2 border-none outline-none"
        placeholder="Duration minutes"
        min="0"
        required
        autocomplete="off"
      />
      <div class="mt-2 text-xs text-gray-500 text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" my-6">
      <label
        for="social-media-health-impact"
        class="block mb-2 text-sm text-gray-900"
        >How do you feel your social media usage affects your physical and
        mental health and well-being?</label
      >
      <div id="social-media-health-impact" class="mt-5">
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.social_media_health_impact}
            value={"1"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Social media positively affects my health
          </div>
        </div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            bind:group={formData.social_media_health_impact}
            value={"2"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Social media has no effect on my health
          </div>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            bind:group={formData.social_media_health_impact}
            value={"3"}
            class="size-3 text-blue-600 bg-gray-100 border-gray-300"
          />
          <div class="ml-2 mt-0.5 text-sm font-medium text-gray-700">
            Social media negatively affects my health
          </div>
        </div>
      </div>
      <div class="mt-2 text-xs text-gray-500 text-right">
        <span>REQUIRED</span>
      </div>
    </div>
    <hr />

    <div class=" my-6">
      <div class=" text-gray-600 text-sm">
        If you would like to reschedule or cancel your participation in the
        study for any reason, please notify the student lead
        (jaeryang_baek@sfu.ca) or the principle investigator (lawkim@sfu.ca).
      </div>
    </div>

    <hr />

    <div class="flex justify-end my-6">
      <div>
        <button
          class="flex text-sm w-full font-normal border-none rounded-lg py-1.5 px-3 bg-blue-500 hover:bg-blue-600 text-white transition-all cursor-pointer"
          type="submit"
        >
          <div class="">Submit</div>

          <div class="mt-0.5 ml-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class=" size-4"
            >
              <path
                d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- <div class="text-white">
      <div class="mt-2 text-sm break-words">
        {JSON.stringify(formData)}
      </div>
    </div> -->
  </form>
{/if}
