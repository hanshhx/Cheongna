"use client";
import { useEffect, useState, useRef } from "react";
import { SITE } from "@/lib/data";
import { trackCall } from "@/components/Analytics";
import { Icon } from "@/components/Icons";

export default function FloatingCall() {
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setVisible(true);
      else if (y > lastY.current + 6) setVisible(false);
      else if (y < lastY.current - 6) setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <aside
        className={`hidden md:flex fixed top-1/2 -translate-y-1/2 right-4 z-40 no-print shadow-[0_18px_44px_-14px_rgba(20,39,85,0.45)] transition-all duration-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="빠른 상담 전화"
      >
        <a
          href={`tel:${SITE.tel}`}
          onClick={() => trackCall("floating-desktop")}
          className="group relative bg-brand text-cream-light flex items-center gap-3.5 pr-5 pl-4 py-4 hover:bg-brand-600 transition-colors duration-300 fx-shine overflow-hidden border border-champagne/30"
          aria-label={`전화 상담 ${SITE.tel}`}
        >
          <span
            className="relative w-11 h-11 rounded-full bg-champagne text-brand flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
          >
            <span className="absolute inset-0 rounded-full bg-champagne/40 animate-ping2" aria-hidden />
            <span className="relative"><Icon name="phone" size={18} filled /></span>
          </span>

          <div className="flex flex-col leading-tight">
            <span className="text-[0.66rem] tracking-[0.22em] uppercase text-champagne-light/90 font-medium">
              QUICK CALL
            </span>
            <span className="text-cream-light font-bold text-[1.08rem] tracking-tight fx-num">
              {SITE.tel}
            </span>
            <span className="text-cream-light/60 text-[0.7rem] mt-0.5">
              평일·주말 09 - 18시
            </span>
          </div>

          <span
            className={`text-champagne ml-1 transition-all duration-300 ${hover ? "translate-x-1 opacity-100" : "translate-x-0 opacity-70"}`}
            aria-hidden
          >
            <Icon name="arrow-right" size={18} />
          </span>
        </a>
      </aside>

      <a
        href={`tel:${SITE.tel}`}
        onClick={() => trackCall("floating-mobile")}
        className={`md:hidden fixed left-3 right-3 z-40 no-print bg-brand text-cream-light px-5 py-3.5 rounded-full shadow-[0_14px_32px_-8px_rgba(20,39,85,0.55)] flex items-center justify-center gap-2.5 text-[0.94rem] font-semibold transition-all duration-300 active:scale-[0.98] fx-shine overflow-hidden border border-champagne/30 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 64px)" }}
        aria-label={`전화 상담 ${SITE.tel}`}
      >
        <span className="fx-pulse-dot" aria-hidden />
        <Icon name="phone" size={16} filled />
        <span className="fx-num">{SITE.tel}</span>
        <span className="text-champagne-light/80 ml-1 text-[0.82rem]">바로 상담</span>
      </a>
    </>
  );
}
