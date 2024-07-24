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
  <div class="tw-text-center tw-text-gray-700 tw-text-2xl tw-font-semibold">
    Survey successfully registered.<br /> You may now close this tab.
  </div>
{:else}
  <form on:submit|preventDefault={submitHandler}>
    <div class=" tw-my-6">
      <label for="date" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >Date</label
      >
      <input
        disabled
        type="date"
        id="date"
        bind:value={formData.date}
        class="tw-bg-gray-50 tw-text-sm tw-rounded-lg tw-w-full tw-p-2 tw-border-none tw-outline-none"
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
        class="tw-bg-gray-50 tw-text-sm tw-rounded-lg tw-w-full tw-p-2 tw-border-none tw-outline-none"
        placeholder="Your email address"
        required
        autocomplete="email"
      />
      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" tw-my-6">
      <label for="age" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >Age</label
      >
      <input
        type="number"
        id="age"
        bind:value={formData.age}
        min="0"
        class="tw-bg-gray-50 tw-text-sm tw-rounded-lg tw-w-full tw-p-2 tw-border-none tw-outline-none"
        placeholder="Your age"
        required
        autocomplete="off"
      />
      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" tw-my-6">
      <label for="gender" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >Gender</label
      >
      <div id="gender" class="tw-mt-5">
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"M"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Man
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"F"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Woman
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"N"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Non-binary
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"O"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Other
          </div>
        </div>
        <div class="tw-flex tw-items-center">
          <input
            type="radio"
            bind:group={formData.gender}
            value={"NA"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Prefer not to answer
          </div>
        </div>
      </div>

      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" tw-my-6">
      <label for="race" class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >What is your race?<br /> (One or more categories may be selected)
      </label>

      <div id="race" class="tw-mt-5">
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"B"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Black
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"EA"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            East/Southeast Asian
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"I"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Indigenous
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"L"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Latino
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"M"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Middle Eastern
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"SA"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            South Asian
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"W"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            White
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"O"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Other
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="checkbox"
            bind:group={formData.race}
            value={"NA"}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Prefer not to say
          </div>
        </div>
      </div>

      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" tw-my-6">
      <label
        for="income-bracket"
        class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >Which of these describes your income last year?
      </label>
      <div id="income-bracket" class="tw-mt-5">
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"0"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            $0 to $9,999
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"10"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            $10,000 to $24,999
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"25"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            $25,000 to 49,999
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"50"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            $50,000 to 74,999
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"75"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            $75,000 to 99,999
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"100"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            $100,000 to 149,999
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"150"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            $150,000 and greater
          </div>
        </div>

        <div class="tw-flex tw-items-center">
          <input
            type="radio"
            bind:group={formData.income_bracket}
            value={"NA"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Prefer not to answer
          </div>
        </div>
      </div>
      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" tw-my-6">
      <label
        for="app-usage-frequency"
        class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >How often do you use TikTok?
      </label>
      <div id="app-usage-frequency" class="tw-mt-5">
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.app_usage_frequency}
            value={"1"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Never
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.app_usage_frequency}
            value={"2"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Infrequently
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.app_usage_frequency}
            value={"3"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            A moderate amount
          </div>
        </div>
        <div class="tw-flex tw-items-center">
          <input
            type="radio"
            bind:group={formData.app_usage_frequency}
            value={"4"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Frequently
          </div>
        </div>
      </div>
      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>
    <div class=" tw-my-6">
      <label
        for="mindless-usage-frequency"
        class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >How often do you catch yourself consuming content on TikTok without
        being aware of what you are doing?
      </label>
      <div id="mindless-usage-frequency" class="tw-mt-5">
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.mindless_usage_frequency}
            value={"1"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Never
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.mindless_usage_frequency}
            value={"2"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Infrequently
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.mindless_usage_frequency}
            value={"3"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            A moderate amount
          </div>
        </div>
        <div class="tw-flex tw-items-center">
          <input
            type="radio"
            bind:group={formData.mindless_usage_frequency}
            value={"4"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Frequently
          </div>
        </div>
      </div>
      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>
    <div class=" tw-my-6">
      <label
        for="average-mindless-usage-duration-minutes"
        class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >On average, how long do these sessions of content consumption last?</label
      >
      <input
        type="number"
        id="average-mindless-usage-duration-minutes"
        bind:value={formData.average_mindless_usage_duration_minutes}
        class="tw-bg-gray-50 tw-text-sm tw-rounded-lg tw-w-full tw-p-2 tw-border-none tw-outline-none"
        placeholder="Duration minutes"
        min="0"
        required
        autocomplete="off"
      />
      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>

    <div class=" tw-my-6">
      <label
        for="social-media-health-impact"
        class="tw-block tw-mb-2 tw-text-sm tw-text-gray-900"
        >How do you feel your social media usage affects your physical and
        mental health and well-being?</label
      >
      <div id="social-media-health-impact" class="tw-mt-5">
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.social_media_health_impact}
            value={"1"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Social media positively affects my health
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <input
            type="radio"
            bind:group={formData.social_media_health_impact}
            value={"2"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Social media has no effect on my health
          </div>
        </div>
        <div class="tw-flex tw-items-center">
          <input
            type="radio"
            bind:group={formData.social_media_health_impact}
            value={"3"}
            class="tw-size-3 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300"
          />
          <div
            class="tw-ml-2 tw-mt-0.5 tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Social media negatively affects my health
          </div>
        </div>
      </div>
      <div class="tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right">
        <span>REQUIRED</span>
      </div>
    </div>
    <hr />

    <div class=" tw-my-6">
      <div class=" tw-text-gray-600 tw-text-sm">
        If you would like to reschedule or cancel your participation in the
        study for any reason, please notify the student lead
        (jaeryang_baek@sfu.ca) or the principle investigator (lawkim@sfu.ca).
      </div>
    </div>

    <hr />

    <div class="tw-flex tw-justify-end tw-my-6">
      <div>
        <button
          class="tw-flex tw-text-sm tw-w-full tw-font-normal tw-border-none tw-rounded-lg tw-py-1.5 tw-px-3 tw-bg-blue-500 tw-hover:bg-blue-600 tw-text-white tw-transition-all tw-cursor-pointer"
          type="submit"
        >
          <div class="">Submit</div>

          <div class="tw-mt-0.5 tw-ml-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class=" tw-size-4"
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
