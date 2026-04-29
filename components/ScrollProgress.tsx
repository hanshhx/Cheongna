"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setPct(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] no-print pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-brand via-dusty to-champagne transition-[width] duration-100"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
