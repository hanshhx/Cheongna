"use client";

import Script from "next/script";
import { useEffect } from "react";
import { ANALYTICS } from "@/lib/site";

/**
 * production 빌드에서만 GA4 + 네이버 전환 스크립트 로드.
 * 개발 환경에서는 console 만 노출 → 디버깅 편의.
 *
 * 모든 전환 이벤트 (전화 클릭, 폼 제출, 카카오 클릭) 는 `trackEvent` 헬퍼 사용.
 * window.dataLayer / window.wcs 둘 다 발화.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    wcs_add?: Record<string, string>;
    wcs?: { inflow?: (host: string) => void; cnv?: (type: string, value: string) => void };
    wcs_do?: (cnv?: any) => void;
  }
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  // GA4
  if (window.gtag) window.gtag("event", name, params);
  // 네이버 전환 (단순 cnv "1" / "2" 매핑은 사이트 설정에서 조정)
  if (window.wcs_do) {
    try {
      window.wcs_do();
    } catch {}
  }
  // 개발 환경에서 콘솔 로그 (운영에서는 침묵)
  if (process.env.NODE_ENV !== "production") {

    console.debug("[track]", name, params);
  }
}

/** 전화 클릭 이벤트 어디서나 부르기 좋게 */
export function trackCall(source: string) {
  trackEvent("click_call", { source });
}

/** 폼 제출 성공 */
export function trackFormSubmit(source: string, type: "quick" | "full") {
  trackEvent("submit_form", { source, type });
}

/** 카카오 채널 클릭 */
export function trackKakao(source: string) {
  trackEvent("click_kakao", { source });
}

export default function Analytics() {
  const isProd = process.env.NODE_ENV === "production";

  // UTM 파라미터를 sessionStorage 에 저장 (분양 영업이 첫 광고 채널을 추적할 수 있게)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const utm: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = url.searchParams.get(k);
      if (v) utm[k] = v;
    });
    if (Object.keys(utm).length) {
      sessionStorage.setItem("utm", JSON.stringify({ ...utm, ts: new Date().toISOString() }));
    }
  }, []);

  if (!isProd) return null;
  if (!ANALYTICS.ga4 && !ANALYTICS.naverWcs) return null;

  return (
    <>
      {ANALYTICS.ga4 && (
        <>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${ANALYTICS.ga4}', { send_page_view: true });
            `}
          </Script>
        </>
      )}

      {ANALYTICS.naverWcs && (
        <>
          <Script id="naver-wcs-init" strategy="afterInteractive">
            {`
              if (!wcs_add) var wcs_add = {};
              wcs_add["wa"] = "${ANALYTICS.naverWcs}";
              if (window.wcs) {
                wcs.inflow("${typeof window !== "undefined" ? window.location.host : ""}");
                wcs_do();
              }
            `}
          </Script>
          <Script
            id="naver-wcs-loader"
            src="https://wcs.naver.net/wcslog.js"
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  );
}
