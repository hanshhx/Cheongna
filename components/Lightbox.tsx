"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { Icon } from "@/components/Icons";

export type LightboxItem = { src: string; caption?: string };

type Ctx = {
  open: (items: LightboxItem[], index: number) => void;
};

let ctxRef: Ctx | null = null;

export function openLightbox(items: LightboxItem[], index = 0) {
  ctxRef?.open(items, index);
}

export default function Lightbox() {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    ctxRef = {
      open: (its, i) => {
        setItems(its);
        setIdx(i);
        setOpen(true);
      },
    };
    return () => {
      ctxRef = null;
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );
  const next = useCallback(() => setIdx((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || items.length === 0) return null;
  const cur = items[idx];

  return (
    <div
      className="fixed inset-0 z-[200] lb-back flex items-center justify-center animate-fadeIn no-print"
      onClick={close}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 56) {
          dx > 0 ? prev() : next();
        }
        touchStartX.current = null;
      }}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 크게 보기"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white"
        aria-label="닫기"
      >
        <Icon name="x" size={26} />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white"
            aria-label="이전 이미지"
          >
            <Icon name="chevron-left" size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white"
            aria-label="다음 이미지"
          >
            <Icon name="chevron-right" size={32} />
          </button>
        </>
      )}

      <div
        className="relative max-w-[92vw] max-h-[82vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={cur.src}
          src={cur.src}
          alt={cur.caption || ""}
          className="max-w-full max-h-[78vh] object-contain animate-fadeIn"
        />
        {cur.caption && (
          <div className="mt-4 px-4 text-center text-white/85 text-[0.92rem] max-w-[680px]">
            {cur.caption}
          </div>
        )}
        {items.length > 1 && (
          <div className="mt-2 text-white/55 text-[0.82rem] tabular-nums">
            {idx + 1} / {items.length}
          </div>
        )}
      </div>
    </div>
  );
}
