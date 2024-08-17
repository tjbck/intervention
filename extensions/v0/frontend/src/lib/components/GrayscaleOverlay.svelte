<script lang="ts">
  import { onMount } from "svelte";

  export let delta = 0.01;
  let grayscale = 0;

  let isScrolling = false;
  let scrollTimeout = null;

  onMount(() => {
    grayscale = parseFloat(sessionStorage.getItem("grayscale") ?? "0") || 0;

    const mouseDownHandler = (e) => {
      console.log("mousedown", e);
      grayscale = Math.min(1, grayscale + delta);
      console.log("Grayscale", grayscale);
      sessionStorage.setItem("grayscale", grayscale);
    };

    // listen to scroll
    const scrollHandler = (e) => {
      if (!isScrolling) {
        isScrolling = true;
      }

      // Clear our timeout throughout the scroll so it keeps resetting
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        isScrolling = false;
        grayscale = Math.min(1, grayscale + delta);
        sessionStorage.setItem("grayscale", grayscale);
        console.log("Grayscale", grayscale);
      }, 100);
    };

    window.addEventListener("wheel", scrollHandler);
    window.addEventListener("mousedown", mouseDownHandler);

    return () => {
      window.removeEventListener("wheel", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
    };
  });
</script>

<div
  class="fixed top-0 right-0 left-0 bottom-0 w-full min-h-screen h-screen flex justify-center z-[9999999999] overflow-hidden overscroll-contain pointer-events-none"
  style="backdrop-filter: grayscale({grayscale});"
></div>
