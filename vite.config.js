import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "Reaquiti.createElement",
    jsxFragment: "Fragment", // Define this if you support fragments
  },
});
