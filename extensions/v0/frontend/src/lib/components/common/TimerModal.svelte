<script lang="ts">
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import { flyAndScale } from "$lib/utils/transitions";

  const dispatch = createEventDispatcher();

  export let message = "";

  export let cancelLabel = "Cancel";
  export let confirmLabel = "Set";

  export let input = false;
  export let inputPlaceholder = "";

  export let show = false;

  let modalElement = null;
  let mounted = false;

  let hourValue = "0";
  let minuteValue = "20";

  onMount(() => {
    mounted = true;
  });

  $: if (mounted) {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    bind:this={modalElement}
    class="overlay-modal"
    in:fade={{ duration: 10 }}
  >
    <div
      class="overlay-modal-container"
      in:flyAndScale
      on:mousedown={(e) => {
        e.stopPropagation();
      }}
    >
      <div class="px-[1.75rem] py-6">
        <div class="flex justify-between items-center">
          <div class="timer-modal-title self-center">Timer</div>

          <button
            class="timer-set-button"
            on:click={() => {
              show = false;

              const minutes = parseInt(hourValue) * 60 + parseInt(minuteValue);
              dispatch("confirm", minutes);
            }}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>

        <div>
          <div class=" text-sm text-gray-500">Set a duration for the timer</div>

          <div class="timer-input-container">
            <div class="flex items-center gap-2 w-full">
              <input
                bind:value={hourValue}
                placeholder={"0"}
                class="timer-input"
                type="number"
                min="0"
                max="2"
                step="1"
                required
              />

              <div class=" translate-y-1 text-gray-500 text-sm">hours</div>
            </div>

            <div class="flex items-center gap-2 w-full">
              <input
                bind:value={minuteValue}
                placeholder={"0"}
                class="timer-input"
                type="number"
                min="0"
                max="59"
                step="1"
                required
              />

              <div class=" translate-y-1 text-gray-500 text-sm">min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-content {
    animation: scaleUp 0.1s ease-out forwards;
  }

  @keyframes scaleUp {
    from {
      transform: scale(0.985);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
