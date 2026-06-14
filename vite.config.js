import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// outDir "build" dipertahankan agar `gh-pages -d build` tetap bekerja.
// loader jsx untuk file .js dipakai SEMENTARA selama Fase 1-2 (sebelum rename ke .tsx).
export default defineConfig({
  plugins: [react()],
  build: {outDir: "build"},
  server: {port: 3000, open: true},
  esbuild: {loader: "jsx", include: /src\/.*\.js$/, exclude: []},
  optimizeDeps: {
    esbuildOptions: {loader: {".js": "jsx"}}
  }
});
