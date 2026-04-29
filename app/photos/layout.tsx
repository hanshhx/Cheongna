import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "청라 SK V1 현장사진 · 실물 호실 · 도어투도어 · 드라이브인",
  description:
    "청라 SK V1 완공 현장 사진 — 호실 내부(라이브오피스, 코너 통창, 단층 대공간), 10층 복도, 도어투도어 전용 주차구획, 직선형 드라이브인 통로, 단지 모형. 조감도가 아닌 실제 마감된 공간.",
  keywords: [
    "청라 SK V1 현장사진", "청라 SK V1 실물", "청라 SK V1 인테리어", "청라 SK V1 호실",
    "청라 SK V1 외관", "청라 SK V1 라이브오피스 사진", "청라 SK V1 도어투도어 사진",
    "청라 SK V1 드라이브인 사진", "청라 SK V1 주차장",
    "청라 SK V1 모형도", "청라 지식산업센터 사진",
  ],
  alternates: { canonical: "/photos" },
  openGraph: {
    title: "청라 SK V1 현장사진 — 완공된 실물 그대로",
    description: "조감도가 아닌 실제 마감된 호실·복도·주차층 사진.",
    url: "/photos",
  },
};

export default function PhotosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
