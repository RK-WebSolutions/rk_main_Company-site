import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
