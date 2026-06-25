/// <reference types="vitest/config" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({command}) => ({
  // GitHub Pages project site is served from /<repo>/. Only the production
  // build needs that base path; dev/preview/test stay at "/".
  base: command === "build" ? "/Resume/" : "/",
  plugins: [react()],
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks: {
          lottie: ["lottie-react", "lottie-web"],
          reveal: ["react-awesome-reveal", "@emotion/react"]
        }
      }
    }
  },
  server: {port: 3001, strictPort: true, open: true},
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["import", "legacy-js-api", "global-builtin", "color-functions"]
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts"
  }
}));
