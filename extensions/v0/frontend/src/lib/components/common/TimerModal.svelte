<script lang="ts">
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import { flyAndScale } from "$lib/utils/transitions";

  const dispatch = createEventDispatcher();

  export let message = "";

  export let cancelLabel = "Cancel";
  export let confirmLabel = "Confirm";

  export let input = false;
  export let inputPlaceholder = "";

  export let show = false;

  let modalElement = null;
  let mounted = false;
  let inputValue = "";

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
    class=" tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-bg-black/60 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999] tw-overflow-hidden tw-overscroll-contain"
    in:fade={{ duration: 10 }}
  >
    <div
      class=" tw-m-auto tw-rounded-2xl tw-max-w-full tw-w-[32rem] tw-mx-2 tw-bg-white tw-shadow-3xl tw-border tw-border-gray-850"
      in:flyAndScale
      on:mousedown={(e) => {
        e.stopPropagation();
      }}
    >
      <div class="tw-px-[1.75rem] tw-py-6">
        <div
          class=" tw-text-lg tw-font-semibold tw-dark:text-gray-200 tw-mb-2.5"
        >
          Set a duration
        </div>

        <slot>
          <div class=" tw-text-sm tw-text-gray-500">
            Set a duration for the timer in minutes

            <input
              bind:value={inputValue}
              placeholder={"Enter duration in minutes"}
              class="tw-w-full tw-mt-2 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-bg-gray-100 tw-outline-none tw-border-none tw-resize-none"
              type="number"
              required
            />
          </div>
        </slot>

        <div class="tw-mt-3 tw-flex tw-justify-between tw-gap-1.5">
          <button
            class="  tw-bg-gray-200 hover:tw-bg-gray-300 tw-text-gray-800 tw-border-none tw-font-medium tw-w-full tw-py-2.5 tw-rounded-lg tw-transition tw-cursor-pointer"
            on:click={() => {
              show = false;
              dispatch("confirm", inputValue);
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
