<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import TimerModal from "./common/TimerModal.svelte";
  import { formatTime } from "$lib/utils";

  const dispatch = createEventDispatcher();

  let duration: number = 0;
  let interval: NodeJS.Timeout | null = null;
  let remainingTime: number = 0;

  let showTimerModal = false;
  let showTimerDoneOverlay = false;

  const startTimer = () => {
    if (interval) {
      clearInterval(interval);
    }
    remainingTime = duration;
    interval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        sessionStorage.timer_duration = remainingTime;
      } else {
        clearInterval(interval);
        dispatch("done");
        showTimerDoneOverlay = true;
        sessionStorage.timer_duration = 0;
        duration = 0;
      }
    }, 1000);
  };

  onMount(() => {
    if (
      sessionStorage.timer_duration &&
      parseInt(sessionStorage.timer_duration) > 0
    ) {
      duration = parseInt(sessionStorage.timer_duration);
      startTimer();
    } else if (parseInt(sessionStorage.timer_duration) === 0) {
      showTimerDoneOverlay = true;
    } else {
      showTimerModal = true;
    }
  });

  const handleConfirm = (_duration) => {
    showTimerModal = false;
    duration = parseInt(_duration * 60);
    startTimer();
  };

  const ignoreLimitHandler = () => {
    dispatch("ignore");
    sessionStorage.removeItem("timer_duration");
    showTimerDoneOverlay = false;
    showTimerModal = true;
  };
</script>

<div class="overlay">
  <div class="timer-display-container">
    <div class="timer-display">
      Time remaining: {formatTime(remainingTime)}
    </div>
  </div>
</div>

<TimerModal
  bind:show={showTimerModal}
  on:confirm={(e) => {
    handleConfirm(e.detail);
  }}
/>

{#if showTimerDoneOverlay}
  <div class="full-screen-overlay">
    <div class="flex">
      <div class=" my-auto text-center">
        <div class="text-center">
          <svg
            class=" size-10 text-gray-800 font-medium"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
            />
          </svg>
        </div>
        <div class=" text-3xl font-medium">Time Limit</div>

        <div class="mt-2">You've reached your limit on this page.</div>

        <div class="mt-2">
          <button
            class="timer-ignore-button"
            on:click={() => {
              ignoreLimitHandler();
            }}
          >
            Ignore Timer
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
