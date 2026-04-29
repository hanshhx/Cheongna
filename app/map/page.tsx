import PageHero from "@/components/PageHero";
import ConsultForm from "@/components/ConsultForm";
import QuickConsult from "@/components/QuickConsult";
import SectionTitle from "@/components/SectionTitle";
import SmartImage from "@/components/SmartImage";

export const metadata = {
  title: "청라 SK V1 위치 · 광역 입지 · 청라하늘대교(제3연륙교) 수혜",
  description:
    "청라 SK V1 광역 위치도 — 인천공항·인천신항·서울 도심 동선. 청라하늘대교(제3연륙교) 개통, 7호선 청라 연장 추진. 경인고속도로·제2경인고속도로·인천공항고속도로 교차 지점.",
  keywords: [
    "청라 SK V1 위치", "청라 SK V1 입지", "청라 SK V1 교통", "청라 SK V1 광역위치도",
    "청라하늘대교", "제3연륙교 청라", "청라 7호선", "청라 7호선 연장",
    "청라 인천공항", "청라 인천신항", "청라 자유경제구역",
    "청라국제도시 입지", "청라 IFEZ", "청라 R&D 클러스터",
  ],
  alternates: { canonical: "/map" },
  openGraph: {
    title: "청라 SK V1 광역위치 · 인천공항·청라하늘대교·7호선",
    description: "공항·항만·서울이 한 시간 안에 들어오는 자리. 청라하늘대교 개통 수혜 단지.",
    url: "/map",
  },
};

const MAPS = [
  {
    src: "/uploads/map-wide-1.png",
    title: "광역 도로망",
    caption:
      "경인고속도로·제2경인고속도로·인천공항고속도로의 교차 지점. 차량 동선이 어느 방향으로도 빠릅니다.",
  },
  {
    src: "/uploads/map-wide-2.png",
    title: "주변 산업·생활 인프라",
    caption:
      "청라국제도시 안의 산업단지 클러스터, 상업지구, 주거지가 함께 묶여 있는 구조입니다.",
  },
  {
    src: "/uploads/map-wide-3.png",
    title: "광역 위치 종합도",
    caption:
      "인천공항 / 인천신항 / 서울 도심까지의 거리·소요시간을 한 장에 정리한 광역도. 청라하늘대교(제3연륙교)로 영종~청라가 직접 연결됩니다.",
  },
];

export default function MapPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "홈", href: "/" }, { label: "입지환경" }, { label: "광역위치도" }]}
        title="광역위치도"
        emphasis="청라의 입지 가치"
        intro="공항·항만·서울이 한 시간 거리 안에 다 들어오는 자리입니다."
        bgImage="/uploads/map-wide-3.png"
      />

      <section className="bg-paper border-b border-line">
        <div className="wrap py-8 sm:py-10">
          <QuickConsult source="광역위치도" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionTitle
            eyebrow="LOCATION"
            title="인천 청라지구 — 비즈니스 중심 입지"
            desc={
              <>
                경인고속도로·제2경인고속도로·인천공항고속도로의 교차 지점.{" "}
                <br className="hidden md:block" />
                물류 동선과 임직원 출퇴근 동선이 동시에 가벼워집니다.
              </>
            }
          />

          <div className="grid md:grid-cols-2 gap-3 reveal">
            <div className="card overflow-hidden">
              <SmartImage
                src={MAPS[0].src}
                alt={`청라 SK V1 ${MAPS[0].title} — 고속도로 교차 지점`}
                caption={MAPS[0].caption}
                ratio="16 / 10"
                group={MAPS.map((m) => ({ src: m.src, caption: `${m.title} — ${m.caption}` }))}
                index={0}
              />
              <div className="p-5">
                <div className="text-brand font-semibold">{MAPS[0].title}</div>
                <p className="text-ink-light text-[0.86rem] mt-1.5 leading-relaxed">{MAPS[0].caption}</p>
              </div>
            </div>
            <div className="card overflow-hidden">
              <SmartImage
                src={MAPS[1].src}
                alt={`청라 SK V1 ${MAPS[1].title} — 산업 클러스터와 생활 인프라`}
                caption={MAPS[1].caption}
                ratio="16 / 10"
                group={MAPS.map((m) => ({ src: m.src, caption: `${m.title} — ${m.caption}` }))}
                index={1}
              />
              <div className="p-5">
                <div className="text-brand font-semibold">{MAPS[1].title}</div>
                <p className="text-ink-light text-[0.86rem] mt-1.5 leading-relaxed">{MAPS[1].caption}</p>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden mt-3 reveal">
            <SmartImage
              src={MAPS[2].src}
              alt={`청라 SK V1 ${MAPS[2].title} — 인천공항·인천신항·서울 도심 거리`}
              caption={MAPS[2].caption}
              ratio="21 / 9"
              group={MAPS.map((m) => ({ src: m.src, caption: `${m.title} — ${m.caption}` }))}
              index={2}
            />
            <div className="p-5">
              <div className="text-brand font-semibold">{MAPS[2].title}</div>
              <p className="text-ink-light text-[0.86rem] mt-1.5 leading-relaxed">{MAPS[2].caption}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 md:gap-4 mt-12">
            {[
              {
                head: "인천공항",
                metric: "약 20분대",
                detail:
                  "글로벌 출장 / 수출입 통관까지 빠르게 이동. 청라하늘대교(제3연륙교) 개통으로 영종~청라가 직접 연결됩니다.",
              },
              {
                head: "인천항·인천신항",
                metric: "근거리",
                detail:
                  "해상물류 기업이라면 컨테이너 운송 동선이 짧아져 운임·시간 모두 유리합니다.",
              },
              {
                head: "서울 도심",
                metric: "약 30분대",
                detail:
                  "본사·거래처가 서울이라면 출퇴근 / 미팅 이동 부담을 줄여줍니다. 7호선 청라 연장 추진 중.",
              },
            ].map((c, i) => (
              <article key={c.head} className={`card lift card-edge p-7 reveal d-${i + 1}`}>
                <div className="eyebrow text-ink mb-2">DISTANCE</div>
                <div className="text-brand font-bold text-[1.15rem] mb-1.5">{c.head}</div>
                <div className="text-[1.6rem] font-bold tracking-tight text-ink mb-3 tabular-nums">
                  {c.metric}
                </div>
                <p className="text-ink-light text-[0.9rem] leading-relaxed">{c.detail}</p>
              </article>
            ))}
          </div>

          <p className="text-mist text-[0.78rem] mt-8 leading-relaxed reveal">
            ※ 이동 시간은 도로 상황·교통수단에 따라 차이가 있을 수 있습니다. 분양 자료 기준 표기.
          </p>
        </div>
      </section>

      <ConsultForm source="광역위치도" />
    </>
  );
}
