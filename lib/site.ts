/**
 * 사이트 전역 상수 (URL, 운영시간, 분석 ID).
 * 환경 변수 (NEXT_PUBLIC_*) 가 우선 적용되고, 없으면 기본값 사용.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cnskv1.com";

export const ANALYTICS = {
  // GA4 측정 ID 예: G-XXXXXXXXXX
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  // 네이버 검색광고 전환스크립트 사이트 ID
  naverWcs: process.env.NEXT_PUBLIC_NAVER_WCS_ID || "",
  // 네이버 사이트 등록 메타 코드
  naverVerify: process.env.NEXT_PUBLIC_NAVER_VERIFY || "",
  // 구글 서치콘솔 메타 코드
  googleVerify: process.env.NEXT_PUBLIC_GOOGLE_VERIFY || "",
  // 카카오 채널 ID — "_xxxxxx" 같은 형식
  kakaoChannel: process.env.NEXT_PUBLIC_KAKAO_CHANNEL || "",
};

/**
 * web3forms 액세스 키 — 폼 제출 시 사용.
 * 클라이언트에서 실행되므로 NEXT_PUBLIC_* 접두어 필요.
 * 키 자체는 web3forms 가 도메인 화이트리스트로 보호하기 때문에 클라이언트 노출 자체는 치명적이지 않으나,
 * 깃 저장소에 평문으로 올리지 않기 위해 환경변수로 분리. (.env.local 로 주입)
 */
export const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

/**
 * 운영시간 — 평일/주말 09:00 ~ 18:00.
 * "지금 영업 중" 라이브 표시용 헬퍼.
 */
export const BUSINESS_HOURS = {
  // 모든 요일 동일 (홍보관 운영 정보 기준)
  open: 9, // 09:00
  close: 18, // 18:00
};
