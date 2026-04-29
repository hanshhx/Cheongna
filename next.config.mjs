/** @type {import('next').NextConfig} */

// 운영 도메인 — Pretendard CDN, 카카오맵, GA4, 네이버 WCS 허용
const cspDirectives = [
  "default-src 'self'",
  "img-src 'self' data: blob: https://*.daumcdn.net https://*.kakao.com https://*.kakaocdn.net https://*.googletagmanager.com https://*.google-analytics.com",
  // dangerouslySetInnerHTML 의 JSON-LD 와 next/script 인라인 → 'unsafe-inline' 필요. nonce 도입 시 제거 가능.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.kakao.com https://*.daumcdn.net https://wcs.naver.net https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "font-src 'self' data: https://cdn.jsdelivr.net",
  // web3forms 폼 전송, 카카오맵 API, 네이버 WCS, GA4
  "connect-src 'self' https://api.web3forms.com https://*.kakao.com https://*.daumcdn.net https://wcs.naver.net https://*.google-analytics.com https://*.googletagmanager.com",
  "frame-src 'self' https://*.kakao.com https://*.daumcdn.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // ASCII 슬러그로 통일했으므로 next/image 최적화 활성화
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30일
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

// `npm run analyze` 시에만 번들 분석 활성화. 미설치 시에는 그냥 nextConfig 반환.
let exported = nextConfig;
if (process.env.ANALYZE === "true") {
  try {
    const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({ enabled: true });
    exported = withBundleAnalyzer(nextConfig);
  } catch {
    console.warn("[next.config] @next/bundle-analyzer not installed — run `npm i -D @next/bundle-analyzer`");
  }
}

export default exported;
