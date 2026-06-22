import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // 关闭图片优化：避免开发时改了图片看不到效果
    // 生产环境仍会输出 AVIF/WebP（因为 NODE_ENV 在 build 时为 'production'）
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
