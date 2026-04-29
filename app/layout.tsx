import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import FloatingCall from "@/components/FloatingCall";
import MobileBottomNav from "@/components/MobileBottomNav";
import RevealRoot from "@/components/RevealRoot";
import Effects from "@/components/Effects";
import Lightbox from "@/components/Lightbox";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";
import { SITE_URL, ANALYTICS } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "청라 SK V1 분양 | 청라 지식산업센터 · 도어투도어 · 즉시입주",
    template: "%s | 청라 SK V1 분양",
  },
  description:
    "청라 SK V1 분양 — 인천 청라국제도시 도시첨단산업단지 내 신축 지식산업센터. 도어투도어 동선과 직선형 드라이브인(7층까지 3회 회전 직선 진입), 라이브오피스, 즉시 입주 가능. 분양홍보관(파랑로 451) 사전예약 안내. 청라하늘대교(제3연륙교) 개통, 7호선 청라 연장 수혜 단지.",
  keywords: [
    // 메인 브랜드
    "청라 SK V1", "청라SKV1", "청라skv1", "SK V1 청라", "skv1 청라", "청라 SK V1 분양", "청라 SK V1 분양가",
    // 카테고리
    "청라 지식산업센터", "청라 지산", "인천 지식산업센터", "청라 신축 지식산업센터",
    "청라 라이브오피스", "청라 분양", "인천 분양", "청라국제도시 지식산업센터",
    // 특장점
    "청라 도어투도어", "청라 드라이브인", "직선형 드라이브인", "청라 즉시입주",
    // 입지 키워드
    "청라하늘대교", "제3연륙교", "청라 7호선", "청라 자유경제구역", "청라 IFEZ",
    "청라 첨단산업단지", "인천 청라 신축",
    // 행동 의도
    "청라 SK V1 모델하우스", "청라 SK V1 홍보관", "청라 SK V1 분양사무실",
    "청라 SK V1 평면도", "청라 SK V1 사업개요", "청라 SK V1 위치",
    // 시공/시행
    "SK에코플랜트 청라", "SK 청라 분양",
  ],
  alternates: {
    canonical: "/",
    languages: { "ko-KR": "/" },
  },
  openGraph: {
    title: "청라 SK V1 분양 | 청라 지식산업센터 도어투도어·드라이브인·즉시입주",
    description:
      "청라 지식산업센터 청라 SK V1 분양 안내. 도어투도어, 직선형 드라이브인(7층까지 3회 회전), 라이브오피스. 청라국제도시 자유경제구역 입지, 즉시 입주 가능. 분양홍보관 사전예약.",
    locale: "ko_KR",
    type: "website",
    url: SITE_URL,
    siteName: "청라 SK V1",
  },
  twitter: {
    card: "summary_large_image",
    title: "청라 SK V1 분양 | 청라 지식산업센터 · 즉시입주",
    description:
      "도어투도어·직선형 드라이브인 시스템의 청라 지식산업센터 청라 SK V1. 즉시 입주 가능, 분양홍보관 사전예약.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: {
    google: ANALYTICS.googleVerify || undefined,
    other: ANALYTICS.naverVerify
      ? { "naver-site-verification": ANALYTICS.naverVerify }
      : undefined,
  },
  icons: {
    icon: [
      {
        // 검정 배경 + 레드 4-pointed sparkle (브랜드 워드마크와 동일 톤)
        url:
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%231a1a1a'/><path d='M16 4 L18 14 L28 16 L18 18 L16 28 L14 18 L4 16 L14 14 Z' fill='%23EA002C'/></svg>",
      },
    ],
  },
  category: "real estate",
  applicationName: "청라 SK V1",
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" as="image" href="/uploads/unit-interior-2.jpg" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:bg-brand focus:text-cream-light focus:px-4 focus:py-2 focus:rounded-sm"
        >
          본문으로 건너뛰기
        </a>
        <ScrollProgress />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <FloatingCall />
        <MobileBottomNav />
        <RevealRoot />
        <Effects />
        <Lightbox />
        <Analytics />
      </body>
    </html>
  );
}
