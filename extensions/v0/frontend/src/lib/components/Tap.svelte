<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  // Function to handle keypress events
  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        console.log("ArrowUp");
        window.scrollBy(0, -20); // Scroll up by 10 pixels
        break;
      case "ArrowDown":
        console.log("ArrowDown");
        window.scrollBy(0, 20); // Scroll down by 10 pixels
        break;
    }
  };

  // Function to disable scroll
  const disableScroll = (event: Event) => {
    event.preventDefault();
  };

  onMount(() => {
    // Disable scroll on mouse wheel and touch move
    window.addEventListener("wheel", disableScroll, { passive: false });
    window.addEventListener("touchmove", disableScroll, { passive: false });

    // Add keypress event listener
    window.addEventListener("keydown", handleKeyPress);
  });

  onDestroy(() => {
    // Remove event listeners when component is destroyed
    window.removeEventListener("wheel", disableScroll);
    window.removeEventListener("touchmove", disableScroll);
    window.removeEventListener("keydown", handleKeyPress);
  });
</script>
