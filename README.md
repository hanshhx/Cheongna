# 청라 SK V1 — 분양 사이트

청라국제도시 도시첨단산업단지 내 지식산업센터 **청라 SK V1** 의 분양 사이트.
도어투도어 동선 / 직선형 드라이브인 / 라이브오피스 등 특화설계 안내, 사업개요·층별계획·현장사진·오시는길·미래비전 페이지 + 빠른 상담 폼.

## Stack

- **Next.js 14 (App Router)** · React 18 · TypeScript
- **Tailwind CSS 3** + 인하우스 디자인 토큰 (네이비 / 크림 / SK 레드)
- **next/image** AVIF·WebP 자동 변환
- **web3forms** 폼 제출 (도메인 화이트리스트 기반)
- **GA4 + 네이버 검색광고 WCS** 전환 추적 (선택, 환경변수 주입)
- **JSON-LD** 구조화 데이터 (RealEstateAgent + Place)

## Getting started

```bash
# 의존성 설치
npm install

# 환경변수 셋업 — .env.example 복사 후 실제 값 채우기
cp .env.example .env.local
# (.env.local 은 .gitignore 에 포함돼 깃에 안 올라감)

# 개발 서버
npm run dev          # → http://localhost:3000

# 프로덕션 빌드 / 실행
npm run build
npm run start

# 번들 분석
npm run analyze
```

## Environment variables

| 변수 | 설명 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 운영 도메인 (sitemap / OG / canonical) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | 폼 제출 액세스 키 ([web3forms.com](https://web3forms.com)) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 측정 ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_NAVER_WCS_ID` | 네이버 검색광고 전환 스크립트 사이트 ID |
| `NEXT_PUBLIC_NAVER_VERIFY` | 네이버 사이트 등록 메타 코드 |
| `NEXT_PUBLIC_GOOGLE_VERIFY` | 구글 서치콘솔 메타 코드 |
| `NEXT_PUBLIC_KAKAO_CHANNEL` | 카카오 채널 ID (`_xxxxxx`) |

분석/추적 환경변수는 **production 빌드에서만** 로드 — 개발 중에는 콘솔에만 이벤트 디버그 출력.

## 페이지 구성

| 경로 | 설명 |
|---|---|
| `/` | 홈 — 풀스크린 히어로 + 핵심 지표 + 인트로 + 특화 + 갤러리 |
| `/business` | 사업개요 — 설계개요표 + 분양면적표 |
| `/special` | 특화설계 — 도어투도어 / 드라이브인 / 부대시설 / 스마트 시스템 |
| `/floor` | 층별계획 — B2 ~ 10F 도면 + 좌측 sticky 인덱스 + 검색 |
| `/photos` | 현장사진 — 실물 호실·복도·주차층 갤러리 + 공유 |
| `/location` | 오시는길 — 카카오맵 + 홍보관 + 교통 안내 |
| `/map` | 광역위치도 — 인천공항·인천신항·서울 동선 |
| `/vision` | 미래비전 — IFEZ 로드맵 + 교통 인프라 타임라인 |

## 핵심 컴포넌트

- `components/Hero.tsx` — 풀스크린 캐러셀 (prev/next/pause·키보드 ←/→·MOVE-IN READY 배지)
- `components/Logo.tsx` — 워드마크 SVG (`청라` 검정 + `SK V1` SK 레드 + sparkle)
- `components/SmartImage.tsx` — next/image fill 모드 + 라이트박스 트리거
- `components/Lightbox.tsx` — 키보드/스와이프 갤러리
- `components/ConsultForm.tsx` / `QuickConsult.tsx` — web3forms 폼 + UTM 보존
- `components/Analytics.tsx` — GA4 + 네이버 WCS 로더 + `trackCall`/`trackFormSubmit` 헬퍼
- `components/PrivacyPolicy.tsx` — 개인정보 처리방침 모달 (페이지 추가 X)
- `components/StructuredData.tsx` — JSON-LD (RealEstateAgent + Place)
- `app/sitemap.ts` / `app/robots.ts` / `app/opengraph-image.tsx` — SEO 자동 생성

## 보안

- 모든 시크릿(WEB3FORMS / GA4 / 네이버 ID 등)은 `.env.local` 에서만 주입
- `.gitignore` 가 `.env`, `.env.*` 패턴 모두 차단 (`.env.example` 만 추적)
- `next.config.mjs` 에 CSP / Permissions-Policy / Referrer-Policy / X-Frame-Options 헤더

## 라이선스 / 면책

본 사이트의 이미지·수치는 분양사 자료를 기반으로 정리한 것이며, 시공·계약 과정에서 일부 변경될 수 있습니다. 최종 사양은 분양계약서를 따릅니다.
