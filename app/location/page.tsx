import PageHero from "@/components/PageHero";
import ConsultForm from "@/components/ConsultForm";
import QuickConsult from "@/components/QuickConsult";
import SmartImage from "@/components/SmartImage";
import KakaoMap from "@/components/KakaoMap";
import { SITE } from "@/lib/data";
import { Icon, type IconName } from "@/components/Icons";

export const metadata = {
  title: "청라 SK V1 분양홍보관 · 모델하우스 위치 · 오시는길",
  description:
    "청라 SK V1 분양홍보관(인천 서구 파랑로 451, 105호) 위치, 약도, 자동차·대중교통 안내, 사전예약 오피스 투어. 청라IC에서 약 5분, 청라하늘대교 직결.",
  keywords: [
    "청라 SK V1 홍보관", "청라 SK V1 분양홍보관", "청라 SK V1 모델하우스",
    "청라 SK V1 분양사무실", "청라 SK V1 오시는길", "청라 SK V1 위치",
    "청라 SK V1 주소", "청라 SK V1 약도", "청라 SK V1 투어",
    "청라 지식산업센터 모델하우스", "청라 분양홍보관",
    "파랑로 451",
  ],
  alternates: { canonical: "/location" },
  openGraph: {
    title: "청라 SK V1 분양홍보관 · 사전예약 오피스 투어",
    description: "현장 사전예약제로 운영. 한 호실씩 직접 보면서 결정하세요. (인천 서구 파랑로 451)",
    url: "/location",
  },
};

export default function LocationPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "홈", href: "/" }, { label: "분양정보" }, { label: "오시는길" }]}
        title="오시는길"
        emphasis="& 오피스 투어"
        intro="현장 사전예약제로 운영합니다. 한 호실씩 직접 보면서 결정하실 수 있도록 안내드립니다."
        bgImage="/uploads/location-office-tour.png"
      />

      <section className="bg-paper border-b border-line">
        <div className="wrap py-8 sm:py-10">
          <QuickConsult source="오시는길" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-10 items-start">
            <div className="reveal">
              <div className="eyebrow mb-3">LOCATION</div>
              <h2 className="h-display text-[1.6rem] md:text-[1.95rem] mb-4">
                청라 SK V1 위치
              </h2>
              <p className="text-ink-light leading-[1.85] text-[0.95rem] mb-5">
                {SITE.address}
                <br />
                남청라IC 인근, 청라호반베르디움 4차 옆에 위치합니다.
              </p>
              <KakaoMap />
            </div>

            <div className="reveal d-1">
              <div className="eyebrow mb-3">OFFICE TOUR</div>
              <h2 className="h-display text-[1.6rem] md:text-[1.95rem] mb-4">
                완공된 호실을 직접 보실 수 있습니다
              </h2>
              <p className="text-ink-light leading-[1.85] text-[0.95rem]">
                도면이나 조감도로 결정하면, 들어와서 ‘생각했던 것과 다른데’가 종종 생깁니다. 저희는 호실 마감이 끝난 상태이기 때문에 천장 높이·창 면적·동선을 직접 보고 비교하실 수 있습니다.
              </p>

              <ul className="mt-6 space-y-3 text-[0.92rem]">
                {[
                  "공장·오피스 투어 사전예약 필수 (당일 방문도 가능하나 예약 방문이 우선)",
                  "현장 전문 상담사가 호실까지 동행 안내",
                  "A·B·C·D 타입 비교 둘러보기 가능",
                  "층별 실물 + 특화 동선 체험",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-brand rounded-full flex-shrink-0" />
                    <span className="text-ink leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 p-5 bg-brand text-cream-light">
                <div className="text-[0.78rem] tracking-[0.18em] uppercase text-mist mb-1">
                  공장·오피스 투어 예약문의
                </div>
                <a
                  href={`tel:${SITE.tel}`}
                  className="block text-[2.2rem] sm:text-[2.4rem] font-bold tracking-tight hover:text-mist transition tabular-nums"
                >
                  {SITE.tel}
                </a>
                <div className="text-cream-light/65 text-[0.82rem] mt-1">{SITE.hours}</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 items-start mt-16">
            <div className="reveal">
              <div className="eyebrow mb-3">PROMOTION CENTER</div>
              <h2 className="h-display text-[1.6rem] md:text-[1.95rem] mb-4">
                홍보관에서 단지 모형도 함께 보실 수 있습니다
              </h2>
              <p className="text-ink-light leading-[1.85] text-[0.95rem]">
                홍보관 안에는 단지 실물 모형이 전시돼 있고, A·B·C·D 타입을 한눈에 비교할 수 있는 패널이 벽면에 걸려 있습니다. 모형으로 전체 배치를 본 다음, 실제 호실로 내려가 비교해 보시는 흐름이 가장 효율적입니다.
              </p>
              <ul className="mt-5 space-y-2 text-[0.9rem] text-ink leading-relaxed">
                <li>· 운영시간 : 평일·주말 09:00 ~ 18:00</li>
                <li>· 주차 : 가능 (방문 시 직원 안내)</li>
                <li>· 예약 없이도 방문 가능 — 다만 사전예약 시 대기 없이 진행</li>
              </ul>
            </div>

            <div className="card overflow-hidden reveal d-1">
              <SmartImage
                src="/uploads/model.png"
                alt="청라 SK V1 홍보관 단지 모형 — 글라스 커튼월 외관과 가로형 매스"
                caption="홍보관에 전시된 단지 모형 — 글라스 커튼월 외관과 가로형 매스가 그대로 재현. 뒤편 벽에 A·B·C·D 타입 패널 부착."
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-14 reveal">
            {([
              {
                t: "자동차",
                d: "경인고속도로 청라IC에서 약 5분, 제2경인고속도로·인천공항고속도로 접근이 모두 용이합니다.",
                ic: "building" as IconName,
              },
              {
                t: "대중교통",
                d: "인천지하철·공항철도와 연계 가능. 지하철 7호선 청라 연장이 추진 중이며, 청라하늘대교(제3연륙교) 개통으로 영종~청라가 직결됐습니다.",
                ic: "layers" as IconName,
              },
              {
                t: "홍보관 위치",
                d: `${SITE.hallAddress} — 단지 내 주차 가능합니다.`,
                ic: "map-pin" as IconName,
              },
            ]).map((c) => (
              <div key={c.t} className="card lift card-edge p-6">
                <div className="mb-4 inline-flex w-10 h-10 items-center justify-center bg-brand/[0.06] text-brand">
                  <Icon name={c.ic} size={20} />
                </div>
                <div className="text-brand font-bold text-[1.05rem] mb-2">{c.t}</div>
                <p className="text-ink-light text-[0.88rem] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultForm source="오시는길" />
    </>
  );
}
