import PageHero from "@/components/PageHero";
import ConsultForm from "@/components/ConsultForm";
import QuickConsult from "@/components/QuickConsult";
import SectionTitle from "@/components/SectionTitle";
import SmartImage from "@/components/SmartImage";
import { PROJECT_INFO } from "@/lib/data";

export const metadata = {
  title: "청라 SK V1 사업개요 · 분양실수 · 평면도 면적표",
  description:
    "청라 SK V1 분양 사업개요 — 대지면적 16,159㎡, 연면적 126,011㎡, 지상 10층·지하 2층, 건축물 높이 57.80m, 주차 895대. 분양실수 646실(공장 574/부대창고 26/근린생활 46). 청라국제도시 도시첨단산업단지 신축 지식산업센터.",
  keywords: [
    "청라 SK V1 사업개요", "청라 SK V1 분양실수", "청라 SK V1 분양면적", "청라 SK V1 평형",
    "청라 SK V1 분양가", "청라 SK V1 평면도", "청라 SK V1 면적표",
    "청라 지식산업센터 분양", "청라 지산 분양", "인천 지식산업센터 분양",
    "청라 신축 지식산업센터", "청라skv1 분양",
  ],
  alternates: { canonical: "/business" },
  openGraph: {
    title: "청라 SK V1 사업개요 · 분양정보 · 분양실수 646실",
    description: "청라국제도시 자유경제구역 신축 지식산업센터의 공식 사업개요와 용도별 분양면적표.",
    url: "/business",
  },
};

export default function BusinessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "홈", href: "/" }, { label: "분양정보" }, { label: "사업개요" }]}
        title="사업개요"
        emphasis="청라 SK V1"
        intro="청라국제도시 도시첨단산업단지 안에 들어선 지식산업센터입니다. 핵심 수치만 깔끔히 정리했습니다."
        bgImage="/uploads/business-overview-2.png"
      />

      <section className="bg-paper border-b border-line">
        <div className="wrap py-8 sm:py-10">
          <QuickConsult source="사업개요" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionTitle
            eyebrow="PROJECT"
            title="프로젝트 개요"
            desc="아래 수치는 사업개요 자료에 명시된 공식 수치입니다."
          />

          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-5 lg:gap-7 reveal">
            <div className="card overflow-hidden">
              <div className="bg-brand text-cream-light px-6 py-4 text-[0.96rem] font-semibold tracking-tight">
                ■ 설계개요
              </div>
              <table className="w-full text-[0.9rem]">
                <tbody>
                  {PROJECT_INFO.rows.map(([k, v], i) => (
                    <tr key={k} className={`${i % 2 === 0 ? "bg-cream-light" : "bg-paper/40"} hover:bg-brand/[0.03] transition`}>
                      <th className="text-ink py-3.5 px-5 text-left font-semibold w-[36%] align-top tracking-tight border-b border-line">
                        {k}
                      </th>
                      <td className="text-ink-light py-3.5 px-5 align-top leading-relaxed border-b border-line">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card overflow-hidden">
              <div className="bg-brand text-cream-light px-6 py-4 text-[0.96rem] font-semibold tracking-tight">
                ■ 용도별 분양면적
              </div>
              <table className="w-full text-[0.88rem]">
                <thead>
                  <tr className="bg-paper text-ink">
                    <th className="py-3 px-3 text-left font-semibold">구분</th>
                    <th className="py-3 px-3 text-right font-semibold">비율</th>
                    <th className="py-3 px-3 text-right font-semibold">실수</th>
                    <th className="py-3 px-3 text-right font-semibold">면적(㎡)</th>
                    <th className="py-3 px-3 text-right font-semibold">평</th>
                  </tr>
                </thead>
                <tbody>
                  {PROJECT_INFO.units.map((u) => {
                    const isTotal = u.label === "합계";
                    return (
                      <tr
                        key={u.label}
                        className={`border-t border-line ${isTotal ? "bg-brand/[0.05] font-semibold text-brand" : "hover:bg-brand/[0.03]"} transition`}
                      >
                        <td className="py-3 px-3">{u.label}</td>
                        <td className="py-3 px-3 text-right tabular-nums">{u.ratio}</td>
                        <td className="py-3 px-3 text-right tabular-nums">{u.count}</td>
                        <td className="py-3 px-3 text-right tabular-nums">{u.area}</td>
                        <td className="py-3 px-3 text-right tabular-nums">{u.py}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="px-6 py-5 bg-paper/60 text-[0.82rem] text-ink-light leading-relaxed border-t border-line">
                ※ 평형은 ㎡ × 0.3025 기준 환산값입니다. 실제 분양면적은 분양계약서 기준을 따릅니다.
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-12 reveal">
            <div className="card overflow-hidden">
              <SmartImage
                src="/uploads/business-overview-2.png"
                alt="청라 SK V1 단지 외관 — 사업개요 자료의 주요 사양 인포그래픽"
                caption="사업개요 자료 — 청라 SK V1 단지 외관과 주요 사양"
                ratio="3 / 2"
              />
            </div>
            <div className="card overflow-hidden">
              <SmartImage
                src="/uploads/business-overview-1.png"
                alt="청라 SK V1 사업개요 표지 — 설계개요 및 분양면적표"
                caption="사업개요 자료 — 설계개요 및 용도별 분양면적표"
                ratio="3 / 2"
              />
            </div>
          </div>

          <div className="mt-12 p-6 md:p-7 bg-brand/[0.04] border-l-4 border-brand text-ink-light text-[0.9rem] leading-relaxed reveal">
            <strong className="text-brand">알려드립니다.</strong> 본 페이지의 수치·이미지는 인쇄물·홍보자료에서 발췌한 것입니다. 계약 단계에서 일부 변경될 수 있으며, 최종 사양과 면적은 분양계약서가 기준입니다.
          </div>
        </div>
      </section>

      <ConsultForm source="사업개요" />
    </>
  );
}
