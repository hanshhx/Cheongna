import { ImageResponse } from "next/og";

// 1200×630 OG 이미지 — Next.js 14 가 빌드 시 자동 생성
export const runtime = "edge";
export const alt = "청라 SK V1 — 청라지구 마지막 비즈니스 캠퍼스";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #142755 0%, #0c1733 60%, #142755 100%)",
          color: "#fdfaf2",
          padding: 72,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* 상단 — 좌표/태그 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: "rgba(253,250,242,0.6)", fontSize: 22, letterSpacing: 6 }}>
            <div style={{ width: 48, height: 1, background: "rgba(253,250,242,0.5)" }} />
            <span>SK V1 — CHEONGNA</span>
          </div>
          <div style={{ color: "rgba(253,250,242,0.5)", fontSize: 18, letterSpacing: 4, fontFamily: "monospace" }}>
            37.5398°N · 126.6363°E
          </div>
        </div>

        {/* 가운데 — 헤드라인 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <span style={{ color: "#c9a96e", fontSize: 22, fontWeight: 700, letterSpacing: 8 }}>N° 01</span>
            <div style={{ width: 64, height: 1, background: "#c9a96e" }} />
            <span style={{ color: "rgba(253,250,242,0.85)", fontSize: 22, letterSpacing: 6 }}>
              청라지구 마지막 비즈니스 캠퍼스
            </span>
          </div>
          <div style={{ fontSize: 110, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, display: "flex", alignItems: "baseline", gap: 18 }}>
            <span>청라</span>
            <span style={{ color: "#EA002C", fontStyle: "italic", letterSpacing: -5 }}>SK V1</span>
          </div>
          <div style={{ fontSize: 38, color: "#d8bd87", fontStyle: "italic", letterSpacing: -0.5, marginTop: -4 }}>
            — 도어투도어 · 직선형 드라이브인 · 즉시 입주
          </div>
        </div>

        {/* 하단 — 메타 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(253,250,242,0.18)", paddingTop: 22 }}>
          <div style={{ color: "rgba(253,250,242,0.7)", fontSize: 22 }}>
            인천광역시 서구 파랑로 451
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#c9a96e", fontSize: 26, fontWeight: 700, fontFamily: "monospace" }}>
            ☎ 1800-3357
          </div>
        </div>
      </div>
    ),
    size,
  );
}
