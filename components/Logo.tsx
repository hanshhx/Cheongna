type Props = {
  variant?: "dark" | "light";
  className?: string;
  /** stack: 워드마크 + 작은 별 / mark: 별만 / wordmark: 글자만 */
  layout?: "stack" | "mark" | "wordmark";
  /** 텍스트 색을 강제. 미지정 시 variant 기준 자동 */
  forceInk?: string;
};

/**
 * 청라 SK V1 워드마크.
 *  · "청라"  →  잉크 (다크 변형은 검정 #1a1a1a, 라이트 변형은 크림)
 *  · "SK V1" →  SK 레드 #EA002C
 *  · 우상단 작은 4-pointed star 액센트 (sparkle)
 */
export default function Logo({
  variant = "dark",
  className = "",
  layout = "stack",
  forceInk,
}: Props) {
  const ink = forceInk || (variant === "dark" ? "#1a1a1a" : "#fdfaf2");
  const accent = "#EA002C"; // SK 레드 톤

  // 우상단 4-pointed sparkle 마크
  const Star = (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M12 1.5 L13.7 10.3 L22.5 12 L13.7 13.7 L12 22.5 L10.3 13.7 L1.5 12 L10.3 10.3 Z"
        fill={accent}
      />
    </svg>
  );

  if (layout === "mark") {
    return (
      <span className={`inline-block w-5 h-5 ${className}`}>{Star}</span>
    );
  }

  return (
    <span
      className={`inline-flex items-baseline gap-2 ${className}`}
      aria-label="청라 SK V1"
    >
      {/* 청라 — 한글, 잉크 색 */}
      <span
        className="font-extrabold tracking-[-0.02em] text-[1.5rem] sm:text-[1.75rem]"
        style={{ color: ink }}
      >
        청라
      </span>

      {/* SK V1 — 레드. V1 위 우상단에 작은 sparkle */}
      <span
        className="relative font-extrabold tracking-[-0.04em] text-[1.55rem] sm:text-[1.85rem] leading-none"
        style={{ color: accent, fontStyle: "italic" }}
      >
        SK&nbsp;V1
        {layout === "stack" && (
          <span
            className="absolute -top-1.5 -right-2.5 w-2.5 h-2.5 sm:w-3 sm:h-3"
            aria-hidden
          >
            {Star}
          </span>
        )}
      </span>
    </span>
  );
}
