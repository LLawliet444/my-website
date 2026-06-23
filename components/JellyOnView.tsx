"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** 触发后多久移除 data-jelly，避免重复抖动。默认 1000ms */
  duration?: number;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** 多次触发还是只触发一次，默认 false（每次进入都抖动） */
  once?: boolean;
  /** 是否在移动端禁用。默认 true（移动端 ≤768px 关闭），设为 false 在所有视口都启用 */
  disableOnMobile?: boolean;
};

/**
 * 让子元素在进入视口时摇晃一下。
 * 通过 IntersectionObserver 给元素加上 data-jelly=1，
 * 配合 globals.css 里的 @keyframes jelly / sway 即可。
 *
 * 实现：外层包裹一个 div，把 data-jelly 放在这个 div 上。
 * CSS 用 `:has()` 或 `.jelly-on-view[data-jelly="1"] .tech-logo-card` 选中子级。
 */
export default function JellyOnView({
  children,
  className,
  duration = 1000,
  threshold = 0.05,
  once = false,
  disableOnMobile = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") return;

    // 移动端（≤768px）默认关闭
    if (
      disableOnMobile &&
      typeof window !== "undefined" &&
      window.innerWidth <= 768
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute("data-jelly", "1");
            window.setTimeout(() => {
              el.removeAttribute("data-jelly");
            }, duration);
            if (once) {
              observer.unobserve(el);
            }
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [duration, threshold, once, disableOnMobile]);

  const wrapperClass = ["jelly-on-view", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={wrapperClass}>
      {children}
    </div>
  );
}
