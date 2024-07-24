<script>
  import { onMount } from "svelte";

  import GrayscaleOverlay from "./lib/components/GrayscaleOverlay.svelte";
  import Survey from "./lib/components/Survey.svelte";
  import { API_BASE_URL } from "$lib/constants";
  import Timer from "$lib/components/Timer.svelte";
  import Tap from "$lib/components/Tap.svelte";

  let user = true;

  const INTERVENTIONS = ["timer", "gray", "tap"];

  let tab = "";
</script>

{#if user}
  {#if tab === "gray"}
    <GrayscaleOverlay show={true} />
  {:else if tab === "timer"}
    <Timer show={true} />
  {:else if tab === "tap"}
    <Tap show={true} />
  {/if}
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
            <!-- Pre-Experiment Survey -->
          </div>
        </div>

        <div class=" tw-flex tw-flex-col tw-max-h-[26rem] tw-overflow-y-scroll">
          <iframe
            src="{API_BASE_URL}/survey"
            frameborder="0"
            border="0"
            cellspacing="0"
            style="border-style: none;width: 100%; height: 26rem;"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

<div
  class="modal tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999] tw-overflow-hidden tw-overscroll-contain"
>
  <div
    class=" tw-flex tw-items-center tw-gap-1 tw-absolute tw-bottom-0 tw-right-0 tw-p-4"
  >
    {#if tab !== ""}
      <div
        class=" tw-px-3 tw-py-1.5 tw-text-xs tw-bg-white tw-text-gray-800 tw-rounded-lg"
      >
        {tab}
      </div>
    {/if}
    <button
      class=" tw-px-3 tw-py-2 tw-rounded-lg tw-outline-none tw-border-none tw-bg-white hover:tw-bg-gray-100 tw-text-gray-800 tw-transition tw-cursor-pointer"
      on:click={() => {
        tab = "timer";
      }}>Timer</button
    >
    <button
      class=" tw-px-3 tw-py-2 tw-rounded-lg tw-outline-none tw-border-none tw-bg-white hover:tw-bg-gray-100 tw-text-gray-800 tw-transition tw-cursor-pointer"
      on:click={() => {
        tab = "gray";
      }}>Grayscale</button
    >
    <button
      class=" tw-px-3 tw-py-2 tw-rounded-lg tw-outline-none tw-border-none tw-bg-white hover:tw-bg-gray-100 tw-text-gray-800 tw-transition tw-cursor-pointer"
      on:click={() => {
        tab = "tap";
      }}>Tap</button
    >
  </div>
</div>
