<script lang="ts">
  import { onMount } from "svelte";

  export let show = true;
  let modalElement = null;
  let mounted = false;

  export let closeOnEsc = false;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isTopModal()) {
      console.log("Escape");
      show = false;
    }
  };

  const isTopModal = () => {
    const modals = document.getElementsByClassName("modal");
    return modals.length && modals[modals.length - 1] === modalElement;
  };

  onMount(() => {
    mounted = true;
  });

  $: if (show && modalElement) {
    if (closeOnEsc) {
      window.addEventListener("keydown", handleKeyDown);
    }
  } else if (modalElement) {
    if (closeOnEsc) {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }
</script>

{#if show}
  <div
    bind:this={modalElement}
    class="modal tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-bg-black/60 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999] tw-overflow-hidden tw-overscroll-contain"
  >
    <div
      class=" tw-m-auto tw-rounded-2xl tw-w-[48rem] tw-max-w-full tw-mx-2 tw-bg-white tw-shadow-3xl tw-max-h-[100dvh] tw-overflow-y-auto"
    >
      <slot />
    </div>
  </div>
{/if}
