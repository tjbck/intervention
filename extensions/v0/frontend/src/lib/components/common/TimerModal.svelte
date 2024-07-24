<script lang="ts">
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import { flyAndScale } from "$lib/utils/transitions";

  const dispatch = createEventDispatcher();

  export let title = "";
  export let message = "";

  export let cancelLabel = "Cancel";
  export let confirmLabel = "Confirm";

  export let input = false;
  export let inputPlaceholder = "";

  export let show = false;

  let modalElement = null;
  let mounted = false;
  let inputValue = "";

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      console.log("Escape");
      show = false;
    }
  };

  onMount(() => {
    mounted = true;
  });

  $: if (mounted) {
    if (show) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", handleKeyDown);
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
    on:mousedown={() => {
      show = false;
    }}
  >
    <div
      class=" tw-m-auto tw-rounded-2xl tw-max-w-full tw-w-[32rem] tw-mx-2 tw-bg-gray-50 tw-dark:bg-gray-950 tw-shadow-3xl tw-border tw-border-gray-850"
      in:flyAndScale
      on:mousedown={(e) => {
        e.stopPropagation();
      }}
    >
      <div class="tw-px-[1.75rem] tw-py-6">
        <div
          class=" tw-text-lg tw-font-semibold tw-dark:text-gray-200 tw-mb-2.5"
        >
          {#if title !== ""}
            {title}
          {:else}
            {"Confirm your action"}
          {/if}
        </div>

        <slot>
          <div class=" tw-text-sm tw-text-gray-500">
            {#if message !== ""}
              {message}
            {:else}
              {"This action cannot be undone. Do you wish to continue?"}
            {/if}

            {#if input}
              <textarea
                bind:value={inputValue}
                placeholder={inputPlaceholder
                  ? inputPlaceholder
                  : "Enter your message"}
                class="tw-w-full tw-mt-2 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm dark:tw-text-gray-300 dark:tw-bg-gray-900 tw-outline-none tw-resize-none"
                rows="3"
                required
              />
            {/if}
          </div>
        </slot>

        <div class="tw-mt-6 tw-flex tw-justify-between tw-gap-1.5">
          <button
            class="tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-800 dark:tw-bg-gray-850 dark:hover:tw-bg-gray-800 dark:tw-text-white tw-font-medium w-full tw-py-2.5 tw-rounded-lg tw-transition"
            on:click={() => {
              show = false;
              dispatch("cancel");
            }}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            class="tw-bg-gray-900 hover:tw-bg-gray-800 tw-text-gray-100 dark:tw-bg-gray-100 dark:hover:tw-bg-white dark:tw-text-gray-800 tw-font-medium tw-w-full tw-py-2.5 tw-rounded-lg tw-transition"
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
