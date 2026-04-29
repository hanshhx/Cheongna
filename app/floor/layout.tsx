import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "청라 SK V1 층별계획 · 평면도 · 도면 (B2 ~ 10F)",
  description:
    "청라 SK V1 층별 도면(B2 ~ 10F) 전체. 직선형 드라이브인은 2~7층까지 차량 직선 진입. 10층 라이브오피스 프리미엄 / 8층 휴게라운지·테라스 / 1층 로비 라운지·세미나실.",
  keywords: [
    "청라 SK V1 층별계획", "청라 SK V1 도면", "청라 SK V1 평면도", "청라 SK V1 호실 도면",
    "청라 SK V1 1층", "청라 SK V1 10층", "청라 SK V1 라이브오피스 10층",
    "청라 SK V1 드라이브인 층",
    "청라 지식산업센터 도면", "청라 지산 평면도",
  ],
  alternates: { canonical: "/floor" },
  openGraph: {
    title: "청라 SK V1 층별 도면 · 라이브오피스 10층 · DRIVE-IN 2~7F",
    description: "B2 ~ 10F 전체 도면을 한 페이지에서 확인.",
    url: "/floor",
  },
};

export default function FloorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
