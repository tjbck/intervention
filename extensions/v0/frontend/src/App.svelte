<script>
  import { onMount } from "svelte";

  import GrayscaleOverlay from "./lib/components/GrayscaleOverlay.svelte";
  import Survey from "./lib/components/Survey.svelte";

  let user = null;
</script>

{#if user}
  <GrayscaleOverlay show={true} />
{:else}
  <div
    class="modal tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-bg-black/60 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999] tw-overflow-hidden tw-overscroll-contain"
  >
    <div
      class=" tw-m-auto tw-rounded-2xl tw-w-[32rem] tw-max-w-full tw-mx-2 tw-bg-white tw-shadow-3xl tw-max-h-[100dvh] tw-overflow-y-auto"
    >
      <div class=" tw-flex tw-flex-col tw-p-4 tw-mb-4">
        <div class=" tw-w-full tw-flex tw-items-center tw-gap-3">
          <div class="tw-flex tw-justify-center">
            <img
              src="/logo.png"
              alt="logo"
              class=" tw-size-12 tw-rounded-full"
            />
          </div>
          <div class="tw-text-xl tw-text-gray-600 tw-font-semibold">
            Pre-Experiment Survey
          </div>
        </div>

        <div class=" tw-flex tw-flex-col tw-max-h-[26rem] tw-overflow-y-scroll">
          <Survey />
        </div>
      </div>
    </div>
  </div>
{/if}
