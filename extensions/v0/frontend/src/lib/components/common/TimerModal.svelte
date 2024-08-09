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
  let minuteValue = "0";

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
      class="m-auto rounded-2xl max-w-full w-[32rem] mx-2 bg-white shadow-3xl border border-gray-850"
      in:flyAndScale
      on:mousedown={(e) => {
        e.stopPropagation();
      }}
    >
      <div class="px-[1.75rem] py-6">
        <div class=" text-lg font-semibold text-gray-900 mb-2.5">Timer</div>

        <slot>
          <div>
            <div class=" text-sm text-gray-500">
              Set a duration for the timer
            </div>

            <div class="timer-input">
              <div class="flex items-center gap-2 w-full">
                <input
                  bind:value={hourValue}
                  placeholder={"0"}
                  class="w-full mt-2 rounded-lg px-4 py-2 text-sm bg-gray-100 outline-none border-none resize-none"
                  type="number"
                  min="0"
                  max="23"
                  step="1"
                  required
                />

                <div class=" translate-y-1 text-gray-500 text-sm">hours</div>
              </div>

              <div class="flex items-center gap-2 w-full">
                <input
                  bind:value={minuteValue}
                  placeholder={"0"}
                  class="w-full mt-2 rounded-lg px-4 py-2 text-sm bg-gray-100 outline-none border-none resize-none"
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
        </slot>

        <div class="mt-3 flex justify-between gap-1.5">
          <button
            class="  bg-gray-200 hover:bg-gray-300 text-gray-800 border-none font-medium w-full py-2.5 rounded-lg transition cursor-pointer"
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
