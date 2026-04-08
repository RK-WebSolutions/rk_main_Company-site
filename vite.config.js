import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        erode: "website-developer-erode/index.html",
        coimbatore: "website-developer-coimbatore/index.html",
        namakkal: "website-developer-namakkal/index.html",
        tiruchirappalli: "website-developer-tiruchirappalli/index.html",
      },
    },
  },
});