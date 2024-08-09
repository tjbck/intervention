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

<div class="overlay">
  <div
    class=" flex items-center gap-1 absolute top-0 right-0 p-4 pointer-events-auto"
  >
    <p>Time remaining: {formatTime(remainingTime)}</p>
  </div>
</div>
