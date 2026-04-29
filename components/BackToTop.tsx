"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icons";

/**
 * 페이지 50% 이상 스크롤 시 노출되는 맨 위로 가기 버튼.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrolled / docHeight : 0;
      setShow(ratio > 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const cls = [
    "fixed z-40 no-print bottom-[140px] right-3 md:bottom-8 md:right-8",
    "w-11 h-11 flex items-center justify-center bg-cream-light border border-line shadow-lg text-brand",
    "rounded-sm transition-all duration-300",
    "hover:bg-champagne hover:text-brand hover:border-champagne",
    show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
  ].join(" ");
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로"
      className={cls}
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
}
