import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "./src/assets/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  worker: {
    format: "es",
  },
});
