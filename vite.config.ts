/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-02-28 16:02:05
 * @Description: vi config。
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  server: {
    proxy: {
      // 配置单个代理
      "/api": {
        target: "http://121.41.6.6:8080", // 目标服务器地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写请求路径
      },
    },
  },
  worker: {
    format: "es",
  },
});
