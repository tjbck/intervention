<script lang="ts">
  import { onMount } from "svelte";

  import { API_BASE_URL } from "$lib/constants";

  import { Storage } from "$lib/utils/storage";
  import GrayscaleOverlay from "./lib/components/GrayscaleOverlay.svelte";

  import Timer from "$lib/components/Timer.svelte";
  import Tap from "$lib/components/Tap.svelte";

  let user_id = null;
  let extension_id = null;

  let installation_timestamp = null;

  const INTERVENTIONS = ["timer", "gray", "tap"];

  let tab = "";

  onMount(async () => {
    console.log(import.meta.env.DEV);

    window.addEventListener("message", async (event) => {
      console.log("message", event.data);

      const data = JSON.parse(event.data);
      if (data?.user_id) {
        await Storage.set("user_id", data?.user_id);
        await Storage.set(
          "installation_timestamp",
          Math.round(Date.now() / 1000)
        );
        user_id = data.user_id;
        installation_timestamp = Math.round(Date.now() / 1000);
      }
    });

    user_id = (await Storage.get("user_id")) ?? "";
    installation_timestamp =
      (await Storage.get("installation_timestamp")) ?? "";

    console.log(user_id);

    // Add a keyboard listener Ctrl + Shift + Q to reset the user_id
    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "Q") {
        Storage.remove("user_id");
        Storage.remove("installation_timestamp");
        user_id = "";
        installation_timestamp = null;
      }
    });
  });
</script>

{#if user_id}
  {#if user_id % 2 === 0}
    <Timer userId={user_id} />
  {:else if user_id % 1 === 0}
    <GrayscaleOverlay userId={user_id} />
  {:else if user_id % 3 === 0}
    <Tap userId={user_id} />
  {/if}
{:else if user_id === ""}
  <div
    class="modal fixed top-0 right-0 left-0 bottom-0 bg-black/60 w-full min-h-screen h-screen flex justify-center z-[9999] overflow-hidden overscroll-contain"
  >
    <div
      class=" m-auto rounded-2xl w-[36rem] max-w-full mx-2 bg-white shadow-2xl max-h-[100dvh] overflow-y-auto"
    >
      <div class=" flex flex-col p-4 mb-4">
        <div class=" w-full flex items-center gap-3">
          <div class="flex justify-center">
            <img
              src="{API_BASE_URL}/logo.png"
              alt="logo"
              class=" size-12 rounded-full"
            />
          </div>
          <div class="text-xl text-gray-600 font-semibold">
            <!-- Pre-Experiment Survey -->
          </div>
        </div>

        <div class=" flex flex-col">
          <iframe
            src="{API_BASE_URL}/survey"
            style="border-style: none;width: 100%; height: 30rem; overflow: hidden;"
          />
        </div>
      </div>
    </div>
  </div>
{:else}
  <div
    class="modal fixed top-0 right-0 left-0 bottom-0 bg-black/60 w-full min-h-screen h-screen flex justify-center z-[9999] overflow-hidden overscroll-contain"
  >
    <div
      class=" m-auto rounded-2xl w-[36rem] max-w-full mx-2 bg-white shadow-2xl max-h-[100dvh] overflow-y-auto"
    >
      <div class=" flex flex-col p-4 text-center">Loading...</div>
    </div>
  </div>
{/if}

<!-- <div
  class="fixed top-0 right-0 left-0 bottom-0 w-full min-h-screen h-screen flex justify-center z-[9999999999] overflow-hidden overscroll-contain pointer-events-none"
>
  <div
    class=" flex items-center gap-1 absolute bottom-0 right-0 p-4 pointer-events-auto"
  >
    {#if tab !== ""}
      <div
        class=" px-3 py-1.5 text-xs bg-white text-gray-800 rounded-lg"
      >
        {tab}
      </div>
    {/if}
    <button
      class=" px-3 py-2 rounded-lg outline-none border-none bg-white hover:bg-gray-100 text-gray-800 transition cursor-pointer"
      on:click={() => {
        tab = "timer";
      }}>Timer</button
    >
    <button
      class=" px-3 py-2 rounded-lg outline-none border-none bg-white hover:bg-gray-100 text-gray-800 transition cursor-pointer"
      on:click={() => {
        tab = "gray";
      }}>Grayscale</button
    >
    <button
      class=" px-3 py-2 rounded-lg outline-none border-none bg-white hover:bg-gray-100 text-gray-800 transition cursor-pointer"
      on:click={() => {
        tab = "tap";
      }}>Tap</button
    >
  </div>
</div> -->
