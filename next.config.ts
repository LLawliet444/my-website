import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 纯静态导出：build 后产物在 ./out，可直接放到任何静态托管（EdgeOne Pages / Vercel / 任何 CDN）
  output: "export",
  // 静态导出要求图片不优化（不能用 next/image 的运行时优化器）
  images: {
    unoptimized: true
  },
  // 静态导出的资源前缀，留空表示用相对路径
  assetPrefix: "",
  outputFileTracingRoot: path.join(__dirname),
  // 启用 React 严格模式（开发时检查）
  reactStrictMode: true
};

export default nextConfig;
