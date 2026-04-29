import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ConsultForm from "@/components/ConsultForm";
import QuickConsult from "@/components/QuickConsult";
import SmartImage from "@/components/SmartImage";
import { Icon } from "@/components/Icons";
import { FEATURES, PHOTOS } from "@/lib/data";

const METRICS = [
  { val: 10, suffix: "F", label: "최고층", note: "지상 10층 / 지하 2층" },
  { val: 646, suffix: "", label: "총 분양실수", note: "공장·부대창고·근생 합산" },
  { val: 895, suffix: "", label: "주차대수", note: "전기차 22대 별도" },
  { val: 57.8, suffix: "m", label: "건축물 높이", note: "철근콘크리트 구조", decimals: 1 },
];

export default function HomePage() {
  const highlight = PHOTOS.slice(0, 4);

  return (
    <>
      <Hero />

      <section className="bg-cream-light border-b border-line">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`px-5 py-8 md:py-10 group ${i >= 2 ? "border-t md:border-t-0 border-line" : ""}`}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-champagne-deep font-mono text-[0.7rem] tracking-[0.22em] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-6 h-[1px] bg-champagne/60" />
                </div>
                <div className="text-[2.1rem] md:text-[2.8rem] font-bold tracking-tighter text-brand leading-none">
                  <span
                    className="fx-count"
                    data-to={String(m.val)}
                    data-suffix={m.suffix}
                    data-decimals={String(m.decimals ?? 0)}
                    data-dur="1500"
                  >
                    0{m.suffix}
                  </span>
                </div>
                <div className="text-ink font-bold text-[0.95rem] mt-3 tracking-tight">{m.label}</div>
                <div className="text-mist text-[0.78rem] mt-1 leading-relaxed">{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-md bg-paper-warm">
        <div className="wrap grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-champagne" />
              <span className="eyebrow">INTRODUCTION</span>
            </div>
            <h2 className="h-display text-[1.7rem] md:text-[2rem] leading-[1.18]">
              청라국제도시
              <br />
              <span className="text-champagne-deep">도시첨단산업단지</span> 안.
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-ink-light text-[0.98rem] leading-[1.95]">
              청라 SK V1 은 인천 서구 파랑로 451 에 자리한 지식산업센터 단지입니다. 대지면적 16,159㎡ 위에 연면적 126,011㎡ 규모로 들어섰고, 공장(지식산업센터·부대창고)과 근린생활시설을 합쳐 총 646 호실이 분양 대상입니다. 지상 10층·지하 2층, 건축물 높이 57.80m, 철근콘크리트 구조로, 도어투도어 동선과 직선형 드라이브인을 갖춘 비즈니스 캠퍼스입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <SectionTitle
            eyebrow="QUICK MENU"
            title="원하는 정보로 바로 가기"
            desc="가장 자주 보시는 메뉴를 모았습니다."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/business", label: "사업개요", note: "프로젝트 규모·면적" },
              { href: "/special", label: "특화설계", note: "도어투도어·드라이브인" },
              { href: "/floor", label: "층별계획", note: "B2 ~ 10F 도면" },
              { href: "/photos", label: "현장사진", note: "완공 실물 갤러리" },
            ].map((q, i) => (
              <Link
                key={q.href}
                href={q.href}
                className={`bg-cream-light border border-line lift fx-edge p-6 md:p-7 group reveal d-${(i % 4) + 1} relative`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-champagne-deep text-[0.74rem] font-mono tracking-widest font-bold">
                    N°{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-mist group-hover:text-champagne transition" aria-hidden>
                    <Icon name="arrow-up-right" size={16} />
                  </span>
                </div>
                <div className="text-ink font-bold text-[1.1rem] mt-2 group-hover:text-brand transition tracking-tight">
                  {q.label}
                </div>
                <div className="text-mist text-[0.84rem] mt-1.5">{q.note}</div>
                <div className="mt-5 text-brand text-[0.82rem] inline-flex items-center gap-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  바로가기 <Icon name="arrow-right" size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-cream relative overflow-hidden">
        <div className="wrap relative">
          <SectionTitle
            eyebrow="FEATURES — 특화설계"
            title={
              <>
                현장에서 작동하는,
                <br />
                <span className="text-champagne-deep">실제로 쓰는 설계.</span>
              </>
            }
            desc="물류 효율과 일하는 사람의 편의를 모두 챙긴 설계 포인트입니다."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-0 lg:gap-y-0 border-t border-line-warm">
            {FEATURES.map((f, i) => {
              const isLastRow = i >= FEATURES.length - 3;
              return (
                <article
                  key={f.n}
                  className={`p-7 md:p-8 reveal d-${(i % 3) + 1} group bg-cream hover:bg-cream-light transition relative border-b border-line-warm ${isLastRow ? "lg:border-b-0" : ""} ${i % 3 !== 0 ? "lg:border-l border-line-warm" : ""}`}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-champagne-deep text-[0.84rem] font-mono tracking-[0.22em] font-bold">
                      {f.n}
                    </span>
                    <span className="w-8 h-[2px] bg-champagne/40 group-hover:bg-champagne group-hover:w-12 transition-all" aria-hidden />
                  </div>
                  <h3 className="text-[1.18rem] font-bold text-brand mb-3 tracking-tight">
                    {f.t}
                  </h3>
                  <p className="text-ink-light text-[0.92rem] leading-[1.85]">{f.d}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper-warm border-y border-line">
        <div className="wrap py-12 md:py-16">
          <QuickConsult source="홈" />
        </div>
      </section>

      <section className="sec bg-paper relative">
        <div className="wrap">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <SectionTitle
              eyebrow="GALLERY — 현장사진"
              title={
                <>
                  완공된 실물을
                  <br />
                  <span className="text-champagne-deep">사진과 설명으로</span>.
                </>
              }
            />
            <Link href="/photos" className="btn-ghost reveal d-2 self-start mb-3">
              전체 사진 보기 →
            </Link>
          </div>

          <div className="grid gap-12 md:gap-16">
            <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center reveal">
              <div className="md:col-span-7">
                <SmartImage
                  src={highlight[0].src}
                  alt={(highlight[0] as any).alt || highlight[0].title}
                  caption={highlight[0].caption}
                  ratio="4 / 3"
                  priority
                  group={highlight.map((p) => ({ src: p.src, caption: `${p.title} — ${p.caption}` }))}
                  index={0}
                />
              </div>
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-champagne-deep text-[0.78rem] tracking-[0.22em] font-bold">
                    PLATE 01
                  </span>
                  <span className="w-8 h-[1px] bg-champagne/60" />
                </div>
                <h3 className="text-brand font-bold text-[1.3rem] md:text-[1.55rem] tracking-tight leading-[1.25] mb-4">
                  {highlight[0].title}
                </h3>
                <p className="text-ink-light text-[0.94rem] leading-[1.95]">
                  {highlight[0].caption}
                </p>
                {highlight[0].tags && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {highlight[0].tags.map((t) => (
                      <span
                        key={t}
                        className="text-[0.7rem] tracking-[0.16em] text-mist border border-line px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-7 md:gap-8 border-t border-line pt-12">
              {highlight.slice(1, 4).map((p, i) => (
                <div key={p.id} className={`reveal d-${i + 1}`}>
                  <SmartImage
                    src={p.src}
                    alt={(p as any).alt || p.title}
                    caption={p.caption}
                    ratio="4 / 3"
                    group={highlight.map((h) => ({ src: h.src, caption: `${h.title} — ${h.caption}` }))}
                    index={i + 1}
                  />
                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="font-mono text-champagne-deep text-[0.7rem] tracking-[0.2em] font-bold">
                      PLATE 0{i + 2}
                    </span>
                    <span className="w-5 h-[1px] bg-champagne/60" />
                  </div>
                  <div className="mt-2 text-brand font-bold text-[1.02rem] tracking-tight leading-snug">
                    {p.title}
                  </div>
                  <p className="text-ink-light text-[0.86rem] mt-2 leading-[1.8]">
                    {p.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConsultForm source="홈" />
    </>
  );
}
