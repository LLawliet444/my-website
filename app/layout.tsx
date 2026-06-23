import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "张嘉鱼的小站 | Crayon Dev Diary",
  description: "张嘉鱼的 Golang 后端开发、AI Agent 工程化、项目与 debug 日记。",
  openGraph: {
    title: "张嘉鱼的小站",
    description: "写代码的人随手画出来的生活笔记本。",
    images: ["/images/crayon-dev-diary-reference.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
