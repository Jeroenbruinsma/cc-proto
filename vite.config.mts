import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: true
  },
  plugins: [react(), svgr({
    include: '**/*.svg'
  }), sentryVitePlugin({
    org: "cavotec",
    project: "cc-proto"
  })],
});