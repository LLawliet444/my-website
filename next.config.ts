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
  reactStrictMode: true,
  // 允许 127.0.0.1 / 局域网 IP 访问 dev 资源（HMR 不会因跨源被拒）
  allowedDevOrigins: ["127.0.0.1", "192.168.0.113", "localhost"]
};

export default nextConfig;
