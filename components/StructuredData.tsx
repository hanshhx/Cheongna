import { SITE } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/**
 * 검색엔진용 구조화 데이터 (JSON-LD).
 *  · RealEstateAgent — 분양 사이트의 본질
 *  · Place — 청라 SK V1 단지 자체
 *  · BreadcrumbList — 메인 페이지 기준
 * 키워드 포함된 description 으로 네이버/구글 스니펫 노출 강화.
 */
export default function StructuredData() {
  const agent = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    alternateName: ["청라SKV1", "청라skv1", "청라 SK V1 분양", "SK V1 청라"],
    description:
      "청라 SK V1 분양 — 인천 청라국제도시 도시첨단산업단지 내 신축 지식산업센터. 도어투도어 동선과 직선형 드라이브인(7층까지 3회 회전 직선 진입), 라이브오피스, 즉시 입주 가능. 청라하늘대교(제3연륙교)·7호선 청라 연장 수혜 단지.",
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: SITE.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "파랑로 451",
      addressLocality: "서구",
      addressRegion: "인천광역시",
      postalCode: "22744",
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.5398,
      longitude: 126.6363,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Place", name: "인천광역시" },
      { "@type": "Place", name: "수도권" },
      { "@type": "Place", name: "청라국제도시" },
    ],
    knowsAbout: [
      "지식산업센터", "라이브오피스", "도어투도어", "직선형 드라이브인",
      "청라국제도시", "자유경제구역", "IFEZ",
    ],
  };

  const place = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: "청라 SK V1",
    description:
      "청라국제도시 도시첨단산업단지 내 지식산업센터 단지. 지상 10층·지하 2층, 연면적 126,011㎡, 분양실수 646실, 주차 895대, 건축물 높이 57.80m, 철근콘크리트 구조.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "파랑로 451",
      addressLocality: "인천광역시 서구",
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.5398,
      longitude: 126.6363,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agent) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(place) }}
      />
    </>
  );
}
