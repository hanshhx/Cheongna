import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── 메인 ───
        brand: {
          DEFAULT: "#142755", // 메인 네이비
          50:  "#eef1f8",
          100: "#dde2ec",
          200: "#b9c2d8",
          300: "#94a2c4",
          400: "#5b6fa0", // 라이트 네이비 (액센트)
          500: "#142755",
          600: "#101f44",
          700: "#0c1733",
          800: "#080f22",
          900: "#040811",
        },
        // ─── 차콜 텍스트 ───
        ink: {
          DEFAULT: "#444655",
          light: "#5a5c6c",
          soft:  "#6e7081",
        },
        // ─── 미스트 (보조) ───
        mist: {
          DEFAULT: "#A9AABC",
          light:   "#bdbece",
          softer:  "#cdced9",
          softest: "#dcdde5",
        },
        // ─── 페이퍼 블루 (배경) ── 흰색 대신
        paper: {
          DEFAULT: "#eef1f8", // 메인 배경
          warm:    "#f4f1ea", // 따뜻한 종이톤 (대비 섹션용)
        },
        // ─── 크림 (카드 배경) ── 흰색 대신 ──
        cream: {
          DEFAULT: "#faf6ec",
          deep:    "#f3eeda",
          light:   "#fdfaf2",
        },
        // ─── 샴페인 골드 (액센트) ── 핵심 강조에만 절제 사용 ──
        champagne: {
          DEFAULT: "#c9a96e",
          light:   "#d8bd87",
          // deep 은 텍스트 대비 강화 (cream 위에 #b08f55 = AA 근접)
          deep:    "#9c7d4a",
          softer:  "#e7d6b4",
        },
        // ─── 더스티 블루 (서브 액센트) ───
        dusty: {
          DEFAULT: "#9eb0c9",
          light:   "#bccada",
          deep:    "#7e93b3",
        },
        // ─── 라인 / 분리선 ───
        line: "#dde0ea",
        "line-warm": "#e7e1d2",
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', '"Pretendard"', '"Noto Sans KR"', "system-ui", "sans-serif"],
        serif: ['"Noto Serif KR"', "serif"],
        mono: ['"JetBrains Mono"', '"D2Coding"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      maxWidth: {
        wrap: "1320px",
        narrow: "880px",
      },
      keyframes: {
        // ─── 히어로 ───
        kenburns: {
          "0%":   { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.16)" },
        },
        // ─── 진입 ───
        fadeUp:    { "0%": { opacity: "0", transform: "translateY(28px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeDown:  { "0%": { opacity: "0", transform: "translateY(-20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeLeft:  { "0%": { opacity: "0", transform: "translateX(24px)" },  "100%": { opacity: "1", transform: "translateX(0)" } },
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideDown: { "0%": { opacity: "0", transform: "translateY(-12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        // ─── 펄스 / 인디케이터 ───
        ping2: { "0%": { transform: "scale(1)", opacity: "0.6" }, "100%": { transform: "scale(2.6)", opacity: "0" } },
        bounceSoft: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(6px)" } },
        // ─── 인터랙션 ───
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "20%,60%": { transform: "translateX(-4px)" },
          "40%,80%": { transform: "translateX(4px)" },
        },
        spin360: { to: { transform: "rotate(360deg)" } },
        modalIn: {
          "0%":   { opacity: "0", transform: "scale(0.94) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        // ─── skel (skeleton) ───
        skel: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        kenburns:  "kenburns 9s ease-out forwards",
        fadeUp:    "fadeUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards",
        fadeDown:  "fadeDown 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) forwards",
        fadeLeft:  "fadeLeft 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards",
        fadeIn:    "fadeIn 0.5s ease forwards",
        slideDown: "slideDown 0.3s ease forwards",
        ping2:     "ping2 1.6s cubic-bezier(0,0,0.2,1) infinite",
        bounceSoft:"bounceSoft 2s ease-in-out infinite",
        shake:     "shake 0.4s ease",
        spin360:   "spin360 0.8s linear infinite",
        modalIn:   "modalIn 0.25s ease forwards",
        skel:      "skel 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
