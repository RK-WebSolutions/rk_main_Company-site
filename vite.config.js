import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        erode: resolve(__dirname, "website-developer-erode/index.html"),
        coimbatore: resolve(__dirname, "website-developer-coimbatore/index.html"),
        namakkal: resolve(__dirname, "website-developer-namakkal/index.html"),
        tiruchirappalli: resolve(
          __dirname,
          "website-developer-tiruchirappalli/index.html",
        ),
      },
    },
  },
});
