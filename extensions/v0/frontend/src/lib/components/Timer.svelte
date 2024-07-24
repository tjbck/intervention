<script lang="ts">
  import { onMount } from "svelte";
  import TimerModal from "./common/TimerModal.svelte";

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

  $: if (show) {
    showTimerModal = true;
  }

  const handleConfirm = (_duration) => {
    showTimerModal = false;
    duration = parseInt(_duration);
    startTimer();
  };
</script>

<TimerModal
  show={showTimerModal}
  on:confirm={(e) => {
    handleConfirm(e.detail);
  }}
/>

<p>Time remaining: {remainingTime} seconds</p>
