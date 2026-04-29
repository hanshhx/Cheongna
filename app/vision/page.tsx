import PageHero from "@/components/PageHero";
import ConsultForm from "@/components/ConsultForm";
import QuickConsult from "@/components/QuickConsult";
import SectionTitle from "@/components/SectionTitle";
import SmartImage from "@/components/SmartImage";

export const metadata = {
  title: "청라 SK V1 미래가치 · 투자가치 · 청라 IFEZ 인프라 로드맵",
  description:
    "청라 SK V1 미래비전 — 청라국제도시(IFEZ) 자유경제구역 개발 로드맵, 청라하늘대교(제3연륙교) 개통, 7호선 청라 연장, GTX-B, 인천 2호선 연장, LG·GS·롯데 R&D 클러스터 인접. 청라 지식산업센터 투자가치 분석.",
  keywords: [
    "청라 SK V1 미래가치", "청라 SK V1 투자", "청라 SK V1 투자가치",
    "청라 미래가치", "청라 호재", "청라 7호선",
    "청라 자유경제구역", "청라 IFEZ", "청라국제도시 개발",
    "청라하늘대교", "제3연륙교", "GTX-B 청라",
    "청라 R&D 클러스터", "청라 LG", "청라 GS", "청라 롯데",
    "청라 지식산업센터 투자",
  ],
  alternates: { canonical: "/vision" },
  openGraph: {
    title: "청라 SK V1 미래비전 — 청라 IFEZ·교통 인프라 로드맵",
    description: "청라하늘대교·7호선 연장·R&D 클러스터 — 청라지구 인프라 확충 로드맵.",
    url: "/vision",
  },
};

const VISIONS = [
  {
    src: "/uploads/vision-1.png",
    title: "청라국제도시 마스터플랜",
    caption:
      "인천경제자유구역(IFEZ) 안에서 진행되고 있는 청라국제도시의 권역별 토지이용 계획도.",
  },
  {
    src: "/uploads/vision-2.png",
    title: "주변 개발 로드맵",
    caption:
      "주거·상업·산업이 같이 들어오는 입지 — 직주근접 동선과 산업 클러스터의 시너지 그림.",
  },
];

export default function VisionPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "홈", href: "/" }, { label: "입지환경" }, { label: "미래비전" }]}
        title="미래비전"
        emphasis="청라의 내일"
        intro="단기간이 아니라, 길게 보면서 자리잡을 만한 곳인지가 더 중요합니다."
        bgImage="/uploads/vision-wide.png"
      />

      <section className="bg-paper border-b border-line">
        <div className="wrap py-8 sm:py-10">
          <QuickConsult source="미래비전" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionTitle
            eyebrow="FUTURE VISION"
            title="청라지구 개발 계획"
            desc="청라국제도시(IFEZ) 안에서 인프라 확충과 기업 유치가 계속 진행되고 있습니다."
          />

          <div className="grid md:grid-cols-2 gap-3 reveal">
            {VISIONS.map((v, i) => (
              <div key={v.src} className="card overflow-hidden">
                <SmartImage
                  src={v.src}
                  alt={`청라 SK V1 미래비전 — ${v.title}`}
                  caption={v.caption}
                  ratio="4 / 3"
                  group={VISIONS.map((x) => ({ src: x.src, caption: `${x.title} — ${x.caption}` }))}
                  index={i}
                />
                <div className="p-5">
                  <div className="text-brand font-semibold">{v.title}</div>
                  <p className="text-ink-light text-[0.86rem] mt-1.5 leading-relaxed">{v.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card overflow-hidden mt-3 reveal">
            <SmartImage
              src="/uploads/vision-wide.png"
              alt="청라지구 광역 비전 인포그래픽 — 공항·항만·서울축"
              caption="공항·항만·서울축이 동시에 묶이는 청라지구의 광역 비전 인포그래픽."
              ratio="2 / 1"
            />
          </div>

          <div className="mt-12 p-6 md:p-8 bg-cream border border-line-warm reveal">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-champagne" />
              <span className="eyebrow">INFRA TIMELINE</span>
            </div>
            <h3 className="h-display text-[1.3rem] md:text-[1.55rem] mb-4">교통 인프라 로드맵</h3>
            <ul className="grid md:grid-cols-3 gap-4 text-[0.92rem]">
              <li className="border-l-2 border-brand pl-4">
                <div className="font-mono text-[0.72rem] tracking-wider text-champagne-deep mb-1">2026.01</div>
                <div className="text-brand font-bold mb-1">청라하늘대교 개통</div>
                <p className="text-ink-light leading-relaxed">제3연륙교 — 영종~청라 직접 연결, 인천공항 접근성 개선.</p>
              </li>
              <li className="border-l-2 border-mist pl-4">
                <div className="font-mono text-[0.72rem] tracking-wider text-mist mb-1">진행 중</div>
                <div className="text-brand font-bold mb-1">7호선 청라 연장</div>
                <p className="text-ink-light leading-relaxed">개통 시점은 변동 가능 — 강남권까지 환승 없이 연결되는 미래 수혜.</p>
              </li>
              <li className="border-l-2 border-mist pl-4">
                <div className="font-mono text-[0.72rem] tracking-wider text-mist mb-1">계획 단계</div>
                <div className="text-brand font-bold mb-1">청라 R&D 클러스터</div>
                <p className="text-ink-light leading-relaxed">LG·GS·롯데 등 글로벌 R&D 인접 — 자유경제구역 세제 혜택 환경.</p>
              </li>
            </ul>
            <p className="text-mist text-[0.74rem] mt-5 leading-relaxed">
              ※ 일정·노선은 행정·정책 변화에 따라 일부 조정될 수 있습니다.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-3 mt-12 reveal">
            {[
              {
                tag: "경제자유구역",
                head: "IFEZ 비즈니스 허브",
                body:
                  "청라지구는 인천경제자유구역(IFEZ) 안의 핵심 클러스터로 분류돼 국제 비즈니스·첨단산업·물류가 함께 자리잡고 있습니다.",
              },
              {
                tag: "광역 교통",
                head: "교통망 지속 확충",
                body:
                  "GTX-B 노선, 인천지하철 2호선 연장 등 광역 교통 인프라가 단계적으로 보강될 예정입니다.",
              },
              {
                tag: "물류",
                head: "공항·항만 연계 클러스터",
                body:
                  "인천신항 개발과 인천공항 확장에 맞춘 물류 클러스터 조성이 함께 진행되고 있습니다.",
              },
              {
                tag: "산업",
                head: "바이오·IT·제조 집적",
                body:
                  "청라지구 안에서 바이오·IT·첨단 제조업체의 입주가 이어지면서 자체적인 산업 생태계가 형성되고 있습니다.",
              },
            ].map((v, i) => (
              <li
                key={v.head}
                className={`card card-edge p-6 md:p-7 lift reveal d-${(i % 4) + 1} group`}
              >
                <div className="eyebrow text-ink mb-3 group-hover:text-brand transition">{v.tag}</div>
                <h3 className="text-brand font-bold text-[1.1rem] mb-2.5 tracking-tight">{v.head}</h3>
                <p className="text-ink-light text-[0.92rem] leading-[1.85]">{v.body}</p>
              </li>
            ))}
          </ul>

          <p className="text-mist text-[0.78rem] mt-8 leading-relaxed reveal">
            ※ 본 페이지의 인프라·교통 계획은 행정·정책 변화에 따라 일부 조정될 수 있습니다.
          </p>
        </div>
      </section>

      <ConsultForm source="미래비전" />
    </>
  );
}
