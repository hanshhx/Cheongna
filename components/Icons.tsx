/**
 * 인하우스 아이콘 셋 — lucide-react 와 호환되는 24×24 stroke 스타일.
 * 외부 의존성 없이 자체 SVG 로 가벼움 (각 아이콘 ~200B).
 *
 * 사용법: <Icon name="phone" size={18} className="text-brand" />
 */

type IconName =
  | "phone"
  | "phone-outgoing"
  | "x"
  | "menu"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-up"
  | "play"
  | "pause"
  | "share"
  | "check"
  | "search"
  | "map-pin"
  | "calendar"
  | "clock"
  | "home"
  | "image"
  | "layers"
  | "building"
  | "info"
  | "kakao"
  | "external"
  | "alert-circle";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  filled?: boolean;
};

export function Icon({ name, size = 18, className = "", strokeWidth = 1.7, filled }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: filled ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: `inline-block flex-shrink-0 ${className}`,
    "aria-hidden": true,
  };
  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.91.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7a2 2 0 011.72 2z" />
        </svg>
      );
    case "phone-outgoing":
      return (
        <svg {...common}>
          <polyline points="22 8 22 2 16 2" />
          <line x1="16" y1="8" x2="22" y2="2" />
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.91.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7a2 2 0 011.72 2z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg {...common}>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      );
    case "chevron-up":
      return (
        <svg {...common}>
          <polyline points="18 15 12 9 6 15" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common}>
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      );
    case "arrow-up":
      return (
        <svg {...common}>
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      );
    case "pause":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "image":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
          <path d="M3 18l9 5 9-5" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21h16" />
          <path d="M6 21V8l6-4 6 4v13" />
          <path d="M10 21v-7h4v7" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case "alert-circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      );
    case "kakao":
      // 카카오 아이콘 — 단순화된 공식 컬러 모티프 (말풍선)
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 3C6.48 3 2 6.58 2 11c0 2.85 1.86 5.34 4.66 6.74L5.5 21.5l4.5-2.79c.66.06 1.32.09 2 .09 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
        </svg>
      );
  }
}

export type { IconName };
