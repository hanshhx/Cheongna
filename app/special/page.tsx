import PageHero from "@/components/PageHero";
import ConsultForm from "@/components/ConsultForm";
import QuickConsult from "@/components/QuickConsult";
import SectionTitle from "@/components/SectionTitle";
import SmartImage from "@/components/SmartImage";

export const metadata = {
  title: "청라 SK V1 도어투도어 · 직선형 드라이브인 · 부대시설",
  description:
    "청라 SK V1 특화설계 — 도어투도어 동선, 직선형 드라이브인(차량 3회 회전 7층까지 직선 진입), 옥상정원·8층 휴게라운지·1층 세미나실 부대시설, 24h 통합관제·로이복층 유리·광케이블 인입. 청라 라이브오피스의 차이를 만드는 설계 포인트.",
  keywords: [
    "청라 SK V1 도어투도어", "청라 도어투도어", "청라 SK V1 드라이브인", "청라 직선형 드라이브인",
    "청라 SK V1 라이브오피스", "청라 라이브오피스",
    "청라 SK V1 부대시설", "청라 SK V1 옥상정원", "청라 SK V1 휴게라운지", "청라 SK V1 세미나실",
    "청라 SK V1 특화설계", "청라 지식산업센터 도어투도어",
    "지식산업센터 드라이브인", "지식산업센터 도어투도어",
  ],
  alternates: { canonical: "/special" },
  openGraph: {
    title: "청라 SK V1 특화설계 — 도어투도어·드라이브인·라이브오피스",
    description: "물류 효율의 차이를 만드는 동선·부대시설 설계 포인트. 차량 3회 회전 7층까지 직선 진입.",
    url: "/special",
  },
};

const SECTIONS = [
  {
    eyebrow: "DOOR TO DOOR",
    title: "도어투도어 동선",
    src: "/uploads/feat-ddtd.png",
    captionAlt:
      "좌측에 CG 단면도(차량이 호실 앞까지 진입하는 동선), 우측 위에 실제 주차층 사진(분홍 진행라인 + 차량 진입), 우측 아래에 호실 출입문 앞 주차구획 사진 — 차에서 내려 곧장 호실로 들어가는 흐름이 한 장에 정리돼 있습니다.",
    body:
      "차량을 세운 자리에서 호실 출입문까지의 거리가 짧습니다. 외부 통로를 거치지 않으니 비·눈 같은 날씨 영향이 줄고, 짐을 옮기는 시간도 같이 줄어듭니다.",
    bullets: [
      "주차한 자리에서 사업장 출입문까지 직선 동선",
      "외부에 노출되지 않은 채 입출고 가능",
      "외부인 접근 차단 — 보안 측면에서 유리",
      "악천후에도 작업 흐름이 끊기지 않음",
    ],
    flip: false,
  },
  {
    eyebrow: "DRIVE-IN",
    title: "직선형 드라이브인",
    src: "/uploads/feat-drivein.png",
    captionAlt:
      "직선형 드라이브인 시스템 안내 자료. 차량이 회전을 최소화하면서 상층부까지 도달할 수 있는 진입 구조와 호실 양쪽 배치를 보여줍니다.",
    body:
      "차량이 단 3번의 회전으로 7층까지 직선 진입할 수 있는 구조입니다. 진입로 양쪽으로 호실이 배치돼 상하차 동선이 짧아집니다.",
    bullets: [
      "단 3번의 회전으로 7층까지 직선 진입 (보도자료 출처)",
      "대형 화물차·트럭이 들어오는 폭과 높이",
      "진입로 양쪽으로 호실이 배치돼 상하차 효율 ↑",
      "비상 출구·안전 설비 별도 구성",
    ],
    flip: true,
  },
  {
    eyebrow: "AMENITIES",
    title: "프리미엄 부대시설",
    src: "/uploads/feat-amenities.png",
    captionAlt:
      "옥상 하늘정원·8층 휴게라운지·8층 테라스정원·1층 세미나실의 실제 사진. 잔디·플랜터·벤치·의자·세미나실 인테리어를 한 장에 정리한 비주얼.",
    body:
      "직원 휴식·외부 미팅·간단한 산책까지 단지 안에서 해결됩니다. 1층 로비 라운지 2개소, 2~7층 포켓 휴게데크 4개소, 옥상 정원, 입주사 컨퍼런스룸이 분산 배치돼 있어 동선 부담이 적습니다.",
    bullets: [
      "1층 로비 라운지 (2개소)",
      "2~7층 포켓 휴게데크 (4개소)",
      "옥상 하늘정원 — 외부 산책·휴식",
      "8층 휴게라운지 + 테라스정원, 1층 세미나실",
      "입주사 컨퍼런스룸",
    ],
    flip: false,
  },
  {
    eyebrow: "SMART SYSTEM",
    title: "스마트 시스템 특화",
    src: "/uploads/feat-smart-system.png",
    captionAlt:
      "단지 운영 시스템 인포그래픽 — 24시간 통합 관제, 출입통제, 에너지 절감 시스템, 광케이블 인입 등 운영 인프라를 정리한 자료.",
    body:
      "관제·보안·에너지·통신을 입주 전부터 깔아둔 시스템으로 묶어 둡니다. 입주 후 추가로 깔거나 신경 써야 할 일이 줄어듭니다.",
    bullets: [
      "24시간 통합 관제 CCTV",
      "에너지 절감 — 로이복층 유리·고기밀 창호",
      "광케이블 인입 — 통신 인프라 사전 구축",
      "출입통제 시스템 — 호실·층별 권한 분리",
    ],
    flip: true,
  },
];

const ALL_GROUP = SECTIONS.map((s) => ({ src: s.src, caption: `${s.title} — ${s.captionAlt}` }));

export default function SpecialPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "홈", href: "/" }, { label: "단지정보" }, { label: "특화설계" }]}
        title="특화설계"
        emphasis="물류 효율의 차이"
        intro="‘다 비슷한 지식산업센터 아닌가’ 싶을 수 있지만, 동선 한 단계가 줄어드는 게 매일의 운영비를 바꿉니다."
        bgImage="/uploads/ddtd-parking.jpg"
      />

      <section className="bg-paper border-b border-line">
        <div className="wrap py-8 sm:py-10">
          <QuickConsult source="특화설계" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap space-y-20 md:space-y-24">
          {SECTIONS.map((s, idx) => (
            <article
              key={s.title}
              className="grid lg:grid-cols-2 gap-7 md:gap-10 items-center reveal"
            >
              <div className={`card overflow-hidden ${s.flip ? "lg:order-2" : ""}`}>
                <SmartImage
                  src={s.src}
                  alt={`청라 SK V1 ${s.title} 안내 — ${s.eyebrow}`}
                  caption={s.captionAlt}
                  ratio="3 / 2"
                  group={ALL_GROUP}
                  index={idx}
                />
              </div>
              <div className={s.flip ? "lg:order-1" : ""}>
                <div className="eyebrow mb-3">{s.eyebrow}</div>
                <h2 className="h-display text-[1.7rem] md:text-[2.05rem] mb-5">{s.title}</h2>
                <p className="text-ink-light leading-[1.9] text-[0.96rem] mb-6">{s.body}</p>
                <ul className="space-y-2.5 text-[0.92rem] text-ink">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 items-start">
                      <span className="mt-2 w-1.5 h-1.5 bg-brand rounded-full flex-shrink-0" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 p-5 bg-paper border-l-4 border-brand text-[0.86rem] text-ink leading-relaxed">
                  <strong className="text-brand">사진 정확도</strong> · 상단 이미지의 캐션은 실제 화면을 보고 직접 정리한 설명입니다. 마감재·색상은 시공 단계에서 일부 변경될 수 있습니다.
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ConsultForm source="특화설계" />
    </>
  );
}
