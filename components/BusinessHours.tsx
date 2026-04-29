"use client";

import { useEffect, useState } from "react";
import { BUSINESS_HOURS } from "@/lib/site";

/**
 * 클라이언트 시각 기준 — 지금 영업 중인지 표시.
 * 운영시간 표 (평일·주말 09:00~18:00) 와 함께 라이브 dot 노출.
 */
export default function BusinessHours({
  variant = "light",
  showLabel = true,
}: {
  variant?: "light" | "dark";
  showLabel?: boolean;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  if (!now) {
    // SSR — 정적 표시 (hydration mismatch 방지)
    return (
      <span className={`inline-flex items-center gap-2 text-[0.78rem] ${variant === "dark" ? "text-cream-light/65" : "text-ink-light"}`}>
        <span className="w-2 h-2 rounded-full bg-mist" />
        평일·주말 09:00 ~ 18:00
      </span>
    );
  }

  const h = now.getHours();
  const m = now.getMinutes();
  const minutesNow = h * 60 + m;
  const openMin = BUSINESS_HOURS.open * 60;
  const closeMin = BUSINESS_HOURS.close * 60;
  const isOpen = minutesNow >= openMin && minutesNow < closeMin;
  const minsToClose = closeMin - minutesNow;
  const minsToOpen = (openMin + (minutesNow >= closeMin ? 24 * 60 : 0)) - minutesNow;

  const closingSoon = isOpen && minsToClose <= 60;
  const openingSoon = !isOpen && minsToOpen <= 60;

  const dotColor = isOpen
    ? closingSoon
      ? "bg-amber-400"
      : "bg-emerald-500"
    : openingSoon
      ? "bg-amber-400"
      : variant === "dark"
        ? "bg-cream-light/30"
        : "bg-mist";

  let label = "평일·주말 09:00 ~ 18:00";
  if (showLabel) {
    if (isOpen) {
      label = closingSoon
        ? `지금 영업 중 — 마감 ${minsToClose}분 전`
        : `지금 영업 중 — ~ 18:00`;
    } else {
      const hh = Math.floor(minsToOpen / 60);
      const mm = minsToOpen % 60;
      label = openingSoon
        ? `잠시 후 영업 시작 — ${mm}분 후`
        : `현재 영업 종료 — 09:00 부터 다시 운영`;
      if (hh > 0 && !openingSoon) label = `현재 영업 종료 — 약 ${hh}시간 ${mm}분 후 시작`;
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.78rem] ${
        variant === "dark" ? "text-cream-light/75" : "text-ink-light"
      }`}
      aria-live="polite"
    >
      <span className={`relative w-2 h-2 rounded-full ${dotColor}`}>
        {isOpen && !closingSoon && (
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping2 opacity-70" />
        )}
      </span>
      <span>{label}</span>
    </span>
  );
}
