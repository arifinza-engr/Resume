import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// outDir "build" dipertahankan agar `gh-pages -d build` tetap bekerja.
// Phase 3A: .ts/.tsx files are handled natively by esbuild (default include /\.(m?ts|[jt]sx)$/).
// Remaining .js src files still need jsx loader — handled via a custom transform plugin.
// The top-level esbuild.include is NOT set so Vite's default covers .ts/.tsx/.jsx.
// A separate plugin applies jsx loader only to .js files in src/.
function jsxForDotJsPlugin() {
  return {
    name: "jsx-for-dot-js",
    async transform(code, id) {
      if (/src\/.*\.js$/.test(id) && !id.includes("node_modules")) {
        const {transformWithEsbuild} = await import("vite");
        return transformWithEsbuild(code, id, {loader: "jsx"});
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), jsxForDotJsPlugin()],
  build: {outDir: "build"},
  server: {port: 3000, open: true},
  optimizeDeps: {
    esbuildOptions: {loader: {".js": "jsx"}}
  }
});
