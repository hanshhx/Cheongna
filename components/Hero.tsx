"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { HERO_SLIDES, SITE } from "@/lib/data";
import { trackCall } from "@/components/Analytics";
import { Icon } from "@/components/Icons";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timer = useRef<number | null>(null);

  const total = HERO_SLIDES.length;
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused || hovered) return;
    timer.current = window.setTimeout(next, 6500);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [idx, paused, hovered, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const cur = HERO_SLIDES[idx];

  return (
    <section
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-brand text-cream-light"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-roledescription="carousel"
      aria-label="청라 SK V1 메인 비주얼"
    >
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(.7,0,.3,1)] ${i === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-hidden={i !== idx}
        >
          {(s as any).type === "video" ? (
            <video
              key={s.src}
              src={s.src}
              autoPlay
              muted
              loop
              playsInline
              poster={(s as any).poster}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-cover bg-center will-change-transform ${i === idx ? "fx-kb" : ""}`}
              style={{ backgroundImage: `url('${s.src}')` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-brand/[0.94] via-brand/55 to-brand/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-brand/20" />
        </div>
      ))}

      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />

      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-3 text-cream-light/65 text-[0.7rem] tracking-[0.28em] uppercase font-medium z-10">
        <span className="w-6 h-[1px] bg-cream-light/50" />
        <span>SK V1 — Cheongna</span>
      </div>

      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-4 z-10">
        <span className="inline-flex items-center gap-2 bg-champagne text-brand px-3 py-1.5 text-[0.66rem] tracking-[0.22em] uppercase font-bold">
          <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
          Move-in Ready
        </span>
        <div className="hidden md:flex items-center gap-3 text-cream-light/55 text-[0.7rem] tracking-[0.22em] uppercase font-medium">
          <span>37.5398°N</span>
          <span className="w-[1px] h-3 bg-cream-light/30" />
          <span>126.6363°E</span>
        </div>
      </div>

      <div className="relative h-full w-full grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1 md:col-span-8 lg:col-span-7 flex flex-col justify-end px-6 sm:px-10 md:px-16 lg:px-24 pb-32 md:pb-32">
          <div className="flex items-center gap-5 mb-7 md:mb-9">
            <span className="text-champagne text-[0.78rem] tracking-[0.32em] font-bold fx-num">
              N°{String(idx + 1).padStart(2, "0")}
            </span>
            <span className="w-12 h-[1px] bg-champagne" />
            <span className="text-cream-light/85 text-[0.75rem] sm:text-[0.8rem] tracking-[0.24em] uppercase font-medium">
              {SITE.tagline}
            </span>
          </div>

          <h1
            key={`head-${idx}`}
            className="animate-fadeUp font-bold tracking-tighter text-cream-light"
            style={{ lineHeight: "1.02" }}
          >
            <span className="block text-[2.4rem] sm:text-[3.6rem] md:text-[4.8rem] lg:text-[5.4rem] xl:text-[6rem]">
              {cur.headline}
            </span>
            <span
              className="block mt-3 md:mt-4 text-champagne-light font-serif italic font-normal text-[1.4rem] sm:text-[1.9rem] md:text-[2.4rem] lg:text-[2.7rem] tracking-[-0.01em]"
              style={{ lineHeight: "1.18" }}
            >
              — {cur.sub}
            </span>
          </h1>

          <p
            key={`p-${idx}`}
            className="mt-9 md:mt-11 max-w-[42ch] text-cream-light/85 text-[0.96rem] sm:text-[1.04rem] leading-[1.85] animate-fadeUp"
            style={{ animationDelay: "0.18s", opacity: 0 }}
          >
            조감도가 아닌 완공된 호실을 직접 보고 결정합니다. 도어투도어 동선과 직선형 드라이브인이 실제 작동하는지, 현장에서 확인하실 수 있습니다.
          </p>

          <div
            className="mt-10 md:mt-12 flex flex-wrap gap-3 animate-fadeUp"
            style={{ animationDelay: "0.34s", opacity: 0 }}
          >
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackCall("hero-cta")}
              className="group inline-flex items-center gap-3 bg-champagne text-brand font-bold px-7 py-4 hover:bg-champagne-light transition"
            >
              <span className="w-6 h-[1px] bg-brand transition-all group-hover:w-9" />
              지금 바로 상담하기
              <span className="font-mono text-[0.85rem] tracking-wider">{SITE.tel}</span>
            </a>
            <Link
              href="/photos"
              className="group inline-flex items-center gap-2.5 border border-cream-light/40 text-cream-light px-7 py-4 hover:bg-cream-light hover:text-brand transition"
            >
              현장사진 보기
              <Icon name="arrow-right" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <aside className="hidden md:flex md:col-span-4 lg:col-span-5 items-end justify-end pb-32 pr-10 lg:pr-16">
          <div className="border-l border-cream-light/20 pl-7 lg:pl-9 max-w-[320px]">
            <div className="text-cream-light/55 text-[0.7rem] tracking-[0.28em] uppercase mb-5 font-semibold">
              Featured Units
            </div>
            <ol className="space-y-3">
              {HERO_SLIDES.map((s, i) => (
                <li key={s.src}>
                  <button
                    onClick={() => setIdx(i)}
                    className={`w-full text-left flex items-baseline gap-3 group transition ${i === idx ? "text-cream-light" : "text-cream-light/45 hover:text-cream-light/80"}`}
                    aria-current={i === idx ? "true" : undefined}
                  >
                    <span className="font-mono text-[0.74rem] tracking-wider w-8 shrink-0">
                      N°{String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`h-[1px] transition-all duration-500 ${i === idx ? "w-10 bg-champagne" : "w-4 bg-cream-light/30 group-hover:w-6"}`}
                    />
                    <span className="text-[0.92rem] leading-snug font-medium tracking-tight">
                      {s.headline}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="md:hidden absolute left-0 right-0 bottom-[60px] px-6 z-10">
          <div className="flex gap-2.5 overflow-x-auto scrollbar-none -mx-6 px-6 pb-2" style={{ scrollbarWidth: "none" }}>
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setIdx(i)}
                className={`shrink-0 px-3.5 py-2.5 border transition text-left min-w-[160px] ${i === idx ? "bg-cream-light/15 border-champagne text-cream-light" : "border-cream-light/25 text-cream-light/55"}`}
                aria-current={i === idx ? "true" : undefined}
              >
                <div className="font-mono text-[0.66rem] tracking-wider mb-0.5 text-champagne">
                  N°{String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-[0.78rem] font-semibold leading-tight line-clamp-1">
                  {s.headline}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="hidden md:flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center text-cream-light/55 hover:text-cream-light hover:bg-cream-light/10 transition"
        aria-label="이전 슬라이드"
      >
        <Icon name="chevron-left" size={28} />
      </button>
      <button
        onClick={next}
        className="hidden md:flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center text-cream-light/55 hover:text-cream-light hover:bg-cream-light/10 transition"
        aria-label="다음 슬라이드"
      >
        <Icon name="chevron-right" size={28} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 border-t border-cream-light/15 z-10 bg-brand/30 backdrop-blur-[2px]">
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-4 flex items-center justify-between gap-4 text-cream-light/65 text-[0.72rem] tracking-[0.18em] uppercase font-medium">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{SITE.address}</span>
            <span className="sm:hidden">청라국제도시</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "자동 슬라이드 재생" : "자동 슬라이드 정지"}
              className="text-cream-light/65 hover:text-cream-light transition"
            >
              <Icon name={paused ? "play" : "pause"} size={14} />
            </button>
            <span className="font-mono text-cream-light/85 fx-num">
              {String(idx + 1).padStart(2, "0")} <span className="text-cream-light/30">/</span> {String(total).padStart(2, "0")}
            </span>
            <div className="hidden sm:flex gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="w-8 h-[2px] bg-cream-light/20 relative overflow-hidden"
                  aria-label={`슬라이드 ${i + 1}`}
                  aria-current={i === idx ? "true" : undefined}
                >
                  <span
                    className={`absolute inset-y-0 left-0 bg-champagne transition-[width] ease-linear ${i === idx ? "w-full" : i < idx ? "w-full opacity-50" : "w-0"}`}
                    style={i === idx && !paused && !hovered ? { transitionDuration: "6500ms" } : undefined}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })}
        className="hidden md:flex absolute bottom-24 left-1/2 -translate-x-1/2 text-cream-light/55 hover:text-cream-light text-[0.68rem] tracking-[0.32em] flex-col items-center gap-2 group z-10"
        aria-label="아래로 스크롤"
      >
        <span>SCROLL</span>
        <span className="w-[1px] h-10 bg-cream-light/30 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-champagne animate-bounceSoft" />
        </span>
      </button>
    </section>
  );
}
