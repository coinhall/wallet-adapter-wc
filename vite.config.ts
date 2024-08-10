import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(() => ({
  plugins: [react(), typescript(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      formats: ["es"],
      entry: [
        path.resolve(__dirname, "src/index.ts"),
        path.resolve(__dirname, "src/webcomponent.ts"),
      ],
      name: "index",
      fileName: (format, entryName) =>
        `${
          entryName.includes("webcomponent") ? "webcomponent" : "index"
        }.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "react",
        },
      },
    },
  },
}));
