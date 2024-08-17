import "./app.css";
import "tippy.js/dist/tippy.css";

import App from "./App.svelte";

const app = new App({
  target: document.getElementById("extension-app")!,
});

export default app;
