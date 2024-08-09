<script lang="ts">
  import { onMount } from "svelte";
  import TimerModal from "./common/TimerModal.svelte";
  import { formatTime } from "$lib/utils";

  let duration: number = 0;
  let interval: NodeJS.Timeout | null = null;
  let remainingTime: number = 0;

  let showTimerModal = true;

  const startTimer = () => {
    if (interval) {
      clearInterval(interval);
    }

    remainingTime = duration;
    interval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
      } else {
        clearInterval(interval);
        alert("Time's up! Please set the duration again.");
        showTimerModal = true;
        duration = 0;
      }
    }, 1000);
  };

  onMount(() => {
    showTimerModal = true;
  });

  const handleConfirm = (_duration) => {
    showTimerModal = false;
    duration = parseInt(_duration * 60);
    startTimer();
  };
</script>

<TimerModal
  bind:show={showTimerModal}
  on:confirm={(e) => {
    handleConfirm(e.detail);
  }}
/>

<div
  class="tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999999999] tw-overflow-hidden tw-overscroll-contain tw-pointer-events-none"
>
  <div
    class=" tw-flex tw-items-center tw-gap-1 tw-absolute tw-top-0 tw-right-0 tw-p-4 tw-pointer-events-auto"
  >
    <p>Time remaining: {formatTime(remainingTime)}</p>
  </div>
</div>
