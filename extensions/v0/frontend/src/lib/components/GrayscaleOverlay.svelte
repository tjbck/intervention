<script lang="ts">
  import { onMount } from "svelte";

  export let delta = 0.1;
  let grayscale = 0;

  let isScrolling = false;
  let scrollTimeout = null;

  onMount(() => {
    const mouseDownHandler = (e) => {
      console.log("mousedown", e);
      grayscale = Math.min(1, grayscale + delta);
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
        console.log("Grayscale", grayscale);
      }, 50); // 50 ms of no wheel events
    };

    window.addEventListener("wheel", scrollHandler);
    // window.addEventListener("mousedown", mouseDownHandler);

    return () => {
      window.removeEventListener("wheel", scrollHandler);
      // window.removeEventListener("mousedown", mouseDownHandler);
    };
  });
</script>

<div
  class="tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999999999] tw-overflow-hidden tw-overscroll-contain tw-pointer-events-none"
  style="backdrop-filter: grayscale({grayscale});"
></div>
