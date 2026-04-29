"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { SITE } from "@/lib/data";

// 카카오 디벨로퍼스 JavaScript 키
const KAKAO_KEY = "ed46603fb133bbedb6eb40c5fe4b0278";

// 청라 SK V1 좌표 — 인천광역시 서구 파랑로 451 인근
// (정확 좌표는 페이지 로드시 카카오 지오코더로 보정)
const FALLBACK_LAT = 37.5288;
const FALLBACK_LNG = 126.6435;

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    if (!window.kakao || !window.kakao.maps) {
      setFailed(true);
      return;
    }

    window.kakao.maps.load(() => {
      if (!ref.current) return;

      const init = (lat: number, lng: number) => {
        if (!ref.current) return;
        const center = new window.kakao.maps.LatLng(lat, lng);
        const map = new window.kakao.maps.Map(ref.current, {
          center,
          level: 4,
        });

        // 컨트롤
        map.addControl(
          new window.kakao.maps.ZoomControl(),
          window.kakao.maps.ControlPosition.RIGHT
        );
        map.addControl(
          new window.kakao.maps.MapTypeControl(),
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        // 마커
        const marker = new window.kakao.maps.Marker({ position: center });
        marker.setMap(map);

        // 인포윈도우
        const iw = new window.kakao.maps.InfoWindow({
          content:
            `<div style="padding:10px 14px;font-size:13px;font-weight:600;color:#142755;line-height:1.5;min-width:160px;">
              청라 SK V1<br/>
              <span style="font-weight:400;color:#444655;font-size:12px;">${SITE.address}</span>
            </div>`,
        });
        iw.open(map, marker);

        // 지도 클릭 시 인포윈도우 다시 열기 (편의)
        window.kakao.maps.event.addListener(marker, "click", () => iw.open(map, marker));
      };

      // 주소 → 좌표 시도, 실패하면 fallback
      try {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(SITE.address, (result: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            init(parseFloat(result[0].y), parseFloat(result[0].x));
          } else {
            init(FALLBACK_LAT, FALLBACK_LNG);
          }
        });
      } catch {
        init(FALLBACK_LAT, FALLBACK_LNG);
      }
    });
  }, [loaded]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`}
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />

      <div className="relative">
        <div
          ref={ref}
          className="w-full h-[380px] sm:h-[440px] md:h-[520px] bg-mist-softest"
          aria-label="청라 SK V1 지도"
          role="application"
        >
          {!loaded && !failed && (
            <div className="w-full h-full flex items-center justify-center text-mist text-[0.86rem]">
              <span className="inline-block w-4 h-4 border-2 border-brand/20 border-t-brand rounded-full animate-spin360 mr-2" />
              지도를 불러오는 중…
            </div>
          )}
          {failed && (
            <div className="w-full h-full flex items-center justify-center text-mist text-[0.86rem] px-6 text-center">
              지도를 불러오지 못했습니다. 카카오맵 길찾기 버튼을 이용해 주세요.
            </div>
          )}
        </div>

        {/* 모바일에서 지도 위 손가락 핀치-스크롤 충돌을 막는 안내는 별도 스킵 — 카카오 SDK가 자체 처리 */}

        {/* 지도 하단 바로가기 */}
        <div className="flex flex-wrap gap-2 mt-3">
          <a
            href={`https://map.kakao.com/link/search/${encodeURIComponent(SITE.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FEE500] text-black/90 px-4 py-2.5 font-semibold text-[0.86rem] hover:brightness-95 transition"
          >
            카카오맵에서 보기
          </a>
          <a
            href={`https://map.kakao.com/link/to/청라 SK V1,${FALLBACK_LAT},${FALLBACK_LNG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-cream-light px-4 py-2.5 font-semibold text-[0.86rem] hover:bg-brand-600 transition"
          >
            카카오맵 길찾기 →
          </a>
          <a
            href={`https://map.naver.com/p/search/${encodeURIComponent(SITE.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#03C75A] text-white px-4 py-2.5 font-semibold text-[0.86rem] hover:brightness-95 transition"
          >
            네이버지도
          </a>
        </div>
      </div>
    </>
  );
}
