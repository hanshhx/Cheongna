"use client";

import { useState, useMemo } from "react";
import PageHero from "@/components/PageHero";
import ConsultForm from "@/components/ConsultForm";
import QuickConsult from "@/components/QuickConsult";
import SectionTitle from "@/components/SectionTitle";
import SmartImage from "@/components/SmartImage";
import { Icon } from "@/components/Icons";
import { FLOORS } from "@/lib/data";

const ALL_GROUP = FLOORS.map((f) => ({
  src: f.src,
  caption: `${f.label} — ${f.use}`,
}));

export default function FloorPage() {
  const [active, setActive] = useState<string>("ALL");
  const [q, setQ] = useState("");

  const showAll = active === "ALL";
  const current = FLOORS.find((f) => f.id === active);

  const filteredFloors = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return FLOORS;
    return FLOORS.filter(
      (f) =>
        f.label.toLowerCase().includes(k) ||
        f.use.toLowerCase().includes(k) ||
        f.id.toLowerCase().includes(k),
    );
  }, [q]);

  return (
    <>
      <PageHero
        crumbs={[{ label: "홈", href: "/" }, { label: "단지정보" }, { label: "층별계획" }]}
        title="층별계획"
        emphasis="B2 ~ 10F 전체 도면"
        intro="원하시는 층을 골라 도면을 크게 보실 수 있습니다. 좌측 인덱스 또는 검색으로 빠르게 이동하세요. 직선형 드라이브인은 2~7층까지 차량이 직선 진입 가능합니다."
        bgImage="/uploads/unit-10f-corridor.jpg"
      />

      <section className="bg-paper border-b border-line">
        <div className="wrap py-8 sm:py-10">
          <QuickConsult source="층별계획" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionTitle eyebrow="FLOOR PLAN" title="층별 도면" />

          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-12">
            <aside className="hidden lg:block">
              <div className="sticky top-[120px]">
                <div className="text-[0.72rem] tracking-[0.26em] uppercase font-bold text-champagne-deep mb-4">
                  Floor Index
                </div>

                <div className="relative mb-4">
                  <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
                  <label htmlFor="floor-search" className="sr-only">층 검색</label>
                  <input
                    id="floor-search"
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="검색 (층 / 용도)"
                    className="w-full bg-cream-light border border-line pl-9 pr-3 py-2 text-[0.84rem] focus:border-brand focus:ring-2 focus:ring-brand/15 outline-none"
                  />
                </div>

                <ol className="border-l border-line">
                  <li>
                    <button
                      onClick={() => setActive("ALL")}
                      className={`w-full text-left px-4 py-2 text-[0.84rem] transition relative ${showAll ? "text-brand font-bold" : "text-ink-light hover:text-brand"}`}
                      aria-current={showAll ? "true" : undefined}
                    >
                      {showAll && (
                        <span className="absolute left-[-1px] top-1 bottom-1 w-[2px] bg-champagne" />
                      )}
                      전체보기
                    </button>
                  </li>
                  {filteredFloors.map((f) => {
                    const isActive = active === f.id;
                    return (
                      <li key={f.id}>
                        <button
                          onClick={() => setActive(f.id)}
                          className={`w-full text-left px-4 py-2 text-[0.84rem] transition relative flex items-center gap-2 ${isActive ? "text-brand font-bold" : "text-ink-light hover:text-brand"}`}
                          aria-current={isActive ? "true" : undefined}
                        >
                          {isActive && (
                            <span className="absolute left-[-1px] top-1 bottom-1 w-[2px] bg-champagne" />
                          )}
                          <span className="font-mono w-9 shrink-0 text-[0.78rem]">{f.id}</span>
                          <span className="truncate">{f.use}</span>
                          {f.premium && <span className="text-champagne text-[0.68rem]">★</span>}
                        </button>
                      </li>
                    );
                  })}
                </ol>
                {filteredFloors.length === 0 && (
                  <p className="text-mist text-[0.78rem] mt-3 px-4">검색 결과 없음</p>
                )}
              </div>
            </aside>

            <div>
              <div className="lg:hidden flex flex-wrap gap-2 mb-8 reveal">
                <button
                  onClick={() => setActive("ALL")}
                  className={`px-5 py-2.5 text-[0.86rem] font-semibold border transition ${showAll ? "bg-brand text-cream-light border-brand" : "bg-cream-light text-ink border-line hover:border-brand hover:text-brand"}`}
                >
                  전체보기
                </button>
                {FLOORS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActive(f.id)}
                    className={`px-4 py-2.5 text-[0.86rem] font-semibold border transition ${active === f.id ? "bg-brand text-cream-light border-brand" : `bg-cream-light text-ink border-line hover:border-brand hover:text-brand ${f.premium ? "border-brand/40 text-brand" : ""}`}`}
                  >
                    {f.id}
                    {f.premium && <span className="ml-1 text-[0.62rem]">★</span>}
                  </button>
                ))}
              </div>

              {showAll && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {FLOORS.map((f, i) => (
                    <button
                      key={f.id}
                      onClick={() => setActive(f.id)}
                      className={`text-left card lift overflow-hidden group reveal d-${(i % 4) + 1} ${f.premium ? "border-brand/50 ring-2 ring-brand/10" : ""}`}
                    >
                      <div className="overflow-hidden bg-paper">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={f.src}
                          alt={`청라 SK V1 ${f.label} 도면 — ${f.use}`}
                          className="w-full aspect-[4/3] object-contain bg-cream-light p-2 transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3.5 border-t border-line">
                        <div className={`text-[0.84rem] font-semibold ${f.premium ? "text-brand" : "text-ink"}`}>
                          {f.label} {f.premium && <span>★ 라이브오피스</span>}
                        </div>
                        <div className="text-mist text-[0.74rem] mt-0.5 line-clamp-1">{f.use}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {!showAll && current && (
                <div className="reveal">
                  <div
                    className={`mb-5 px-6 py-4 border-l-4 bg-paper/70 ${current.premium ? "border-brand text-brand" : "border-ink text-ink"}`}
                  >
                    <strong className="font-bold">{current.label}</strong>
                    <span className="mx-2 text-mist">·</span>
                    <span className="text-ink-light">{current.use}</span>
                    {current.premium && (
                      <span className="ml-2 inline-block px-2 py-0.5 bg-brand text-cream-light text-[0.7rem] font-semibold tracking-wider">
                        PREMIUM
                      </span>
                    )}
                  </div>

                  <div className={`card overflow-hidden ${current.premium ? "ring-2 ring-brand/30" : ""}`}>
                    <SmartImage
                      src={current.src}
                      alt={`청라 SK V1 ${current.label} 도면 — ${current.use}`}
                      caption={`${current.label} — ${current.use}`}
                      ratio="4 / 3"
                      group={ALL_GROUP}
                      index={FLOORS.findIndex((f) => f.id === current.id)}
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    {(() => {
                      const idx = FLOORS.findIndex((f) => f.id === current.id);
                      const prev = FLOORS[idx - 1];
                      const next = FLOORS[idx + 1];
                      return (
                        <>
                          <button
                            onClick={() => prev && setActive(prev.id)}
                            disabled={!prev}
                            className="text-brand text-[0.88rem] font-semibold disabled:text-mist disabled:cursor-not-allowed hover:opacity-70 transition flex items-center gap-2"
                          >
                            <Icon name="chevron-left" size={16} />
                            {prev ? prev.label : "이전 층 없음"}
                          </button>
                          <button
                            onClick={() => setActive("ALL")}
                            className="text-ink text-[0.84rem] hover:text-brand transition"
                          >
                            전체 보기
                          </button>
                          <button
                            onClick={() => next && setActive(next.id)}
                            disabled={!next}
                            className="text-brand text-[0.88rem] font-semibold disabled:text-mist disabled:cursor-not-allowed hover:opacity-70 transition flex items-center gap-2"
                          >
                            {next ? next.label : "다음 층 없음"}
                            <Icon name="chevron-right" size={16} />
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-mist text-[0.78rem] mt-10 leading-relaxed reveal">
            ※ 도면은 인쇄·홍보용 자료를 옮긴 것으로, 실제 시공 단계에서 일부 변경될 수 있습니다. 세부 사양은 분양계약서 기준입니다. ★ 표시된 층은 라이브오피스가 운영되는 프리미엄 층입니다.
          </p>
        </div>
      </section>

      <ConsultForm source="층별계획" />
    </>
  );
}
