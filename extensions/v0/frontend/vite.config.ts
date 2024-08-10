import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      output: {
        dir: "../build/",
        entryFileNames: "main.js",
        assetFileNames: "style.css",
        chunkFileNames: "chunk.js",
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $utils: path.resolve("./src/utils"),
    },
  },
});
