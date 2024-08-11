<script lang="ts">
  import { onMount } from "svelte";
  import { SERVER_BASE_URL } from "$lib/constants";

  import { sendUsage } from "$lib/apis/usage";
  import { startTracker } from "$lib/utils";
  import { Storage } from "$lib/utils/storage";

  import GrayscaleOverlay from "./lib/components/GrayscaleOverlay.svelte";

  import Timer from "$lib/components/Timer.svelte";
  import Tap from "$lib/components/Tap.svelte";

  const EXTENSION_IDS = ["timer", "gray", "tap"];

  let user_id = null;
  let extension_id = null;

  let installation_timestamp = null;

  onMount(async () => {
    console.log(import.meta.env.DEV);

    window.addEventListener("message", async (event) => {
      console.log("message", event.data);

      // Validate the event origin to ensure it's from the trusted iframe
      if (event.origin !== SERVER_BASE_URL) {
        console.log("Ignored message from untrusted origin:", event.origin);
        return;
      }

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

    if (installation_timestamp) {
      installation_timestamp = parseInt(installation_timestamp);
    }

    console.log(user_id);

    // Add a keyboard listener Ctrl + Shift + Q to reset the user_id
    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "Q") {
        Storage.remove("user_id");
        Storage.remove("installation_timestamp");
        Storage.remove("activated");
        user_id = "";
        installation_timestamp = null;
        extension_id = null;
      }
    });
  });

  const DAY_TS = 60 * 60 * 24;
  // const DAY_TS = 10;

  const initExtensionHandler = async (user_id, installation_timestamp) => {
    console.log(user_id, installation_timestamp);
    // if user_idx_in_group % 2 == 0, Activate the intervention now and disable after a week
    // if user_idx_in_group % 2 == 1, Activate the intervention after a week (60sec * 60 * 24 * 7)
    const current_timestamp = Math.round(Date.now() / 1000);

    const extensionIdx = user_id % 3;
    const user_idx_in_group =
      (user_id + (extensionIdx === 0 ? 0 : extensionIdx === 1 ? 2 : 1)) / 2;
    if (
      (user_idx_in_group % 2 === 0 &&
        current_timestamp < installation_timestamp + DAY_TS * 7) ||
      (user_idx_in_group % 2 === 1 &&
        current_timestamp > installation_timestamp + DAY_TS * 7)
    ) {
      console.log("The intervention is currently active");
      extension_id = EXTENSION_IDS[user_id % 3];

      // Alert the user that the intervention is active
      const activatedBeforeStatus = await Storage.get("activated");
      console.log(activatedBeforeStatus);
      if (!activatedBeforeStatus) {
        Storage.set("activated", true);
        let activationMessage = "The intervention is currently active";
        if (extension_id === "timer") {
          activationMessage =
            "From now on, every time you access Social Media websites, you will be prompted to set a time limit for yourself. The remaining time is visible on the bottom right-hand corner of the screen. Once your time is up, you will be prompted to close the app, but you may alternatively set an additional time limit for yourself and continue using them.";
        } else if (extension_id === "gray") {
          activationMessage =
            "From this moment on, with each interaction with the website, your screen will slowly turn grayscale. This visual cue is designed to raise awareness of your screen time and promote a healthier relationship with the website.";
        } else if (extension_id === "tap") {
          activationMessage =
            "From now on, traditional scrolling methods will be disabled, and you can now navigate through posts by tapping the top half of the screen to move to the previous post and the bottom half to move to the next post. This new interaction aims to encourage a more deliberate and mindful browsing experience, allowing users to engage with content in a controlled and intentional manner.";
        }
        alert(activationMessage);
      } else {
        console.log("The intervention is currently active");
      }
    } else {
      extension_id = "none";
    }
    startTracker(user_id, extension_id);
  };

  $: if (
    user_id !== null &&
    user_id !== "" &&
    installation_timestamp !== null &&
    installation_timestamp !== ""
  ) {
    initExtensionHandler(user_id, installation_timestamp);
  }
</script>

{#if extension_id}
  {#if extension_id === "timer"}
    <Timer
      on:done={() => {
        sendUsage(user_id, extension_id, "done");
      }}
      on:ignore={() => {
        sendUsage(user_id, extension_id, "ignore");
      }}
    />
  {:else if extension_id === "gray"}
    <GrayscaleOverlay />
  {:else if extension_id === "tap"}
    <Tap />
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
              src="{SERVER_BASE_URL}/logo.png"
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
            src="{SERVER_BASE_URL}/survey"
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
