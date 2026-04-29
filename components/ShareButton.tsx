"use client";

import { useState } from "react";
import { Icon } from "@/components/Icons";
import { trackEvent } from "@/components/Analytics";

/**
 * 호실 사진/페이지 카톡·문자 공유 — navigator.share 우선,
 * 미지원 환경에선 URL 복사 fallback.
 */
export default function ShareButton({
  title,
  text,
  url,
  className = "",
  iconOnly = false,
}: {
  title: string;
  text?: string;
  url?: string;
  className?: string;
  iconOnly?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    trackEvent("click_share", { title });
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, text, url: shareUrl });
        return;
      } catch {
        // 사용자가 취소 → 무시
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // 클립보드 실패 시 무음
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label={`${title} 공유`}
      title={`${title} 공유`}
      className={`inline-flex items-center gap-1.5 text-[0.78rem] text-ink-light hover:text-brand transition ${className}`}
    >
      <Icon name="share" size={14} />
      {!iconOnly && <span>{copied ? "복사됨" : "공유"}</span>}
    </button>
  );
}
