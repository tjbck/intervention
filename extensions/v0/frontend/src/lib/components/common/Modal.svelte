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
    class="modal fixed top-0 right-0 left-0 bottom-0 bg-black/60 w-full min-h-screen h-screen flex justify-center z-[9999] overflow-hidden overscroll-contain"
  >
    <div
      class=" m-auto rounded-2xl w-[48rem] max-w-full mx-2 bg-white shadow-3xl max-h-[100dvh] overflow-y-auto"
    >
      <slot />
    </div>
  </div>
{/if}
