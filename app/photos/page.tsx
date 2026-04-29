"use client";

import { useState, useMemo } from "react";
import PageHero from "@/components/PageHero";
import ConsultForm from "@/components/ConsultForm";
import QuickConsult from "@/components/QuickConsult";
import SectionTitle from "@/components/SectionTitle";
import SmartImage from "@/components/SmartImage";
import { PHOTOS, SITE } from "@/lib/data";
import { Icon } from "@/components/Icons";
import { trackCall } from "@/components/Analytics";
import ShareButton from "@/components/ShareButton";

export default function PhotosPage() {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    PHOTOS.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const [filter, setFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return PHOTOS;
    return PHOTOS.filter((p) => p.tags?.includes(filter));
  }, [filter]);

  const group = filtered.map((p) => ({
    src: p.src,
    caption: `${p.title} — ${p.caption}`,
  }));

  return (
    <>
      <PageHero
        crumbs={[{ label: "홈", href: "/" }, { label: "홍보센터" }, { label: "현장사진" }]}
        title="현장사진"
        emphasis="실물 그대로"
        intro="조감도가 아닌, 완공된 호실·복도·주차층의 사진입니다. 캐션은 실제 화면을 보고 직접 정리했습니다."
        bgImage="/uploads/unit-interior-2.jpg"
      />

      <section className="bg-paper border-b border-line">
        <div className="wrap py-8 sm:py-10">
          <QuickConsult source="현장사진" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionTitle
            eyebrow="SITE PHOTOS"
            title="완공된 실물 공간"
            desc="이미지를 클릭하면 크게 보실 수 있고, 키보드 ←·→ 또는 터치 스와이프로 다음 사진으로 넘길 수 있습니다."
          />

          <div className="flex flex-wrap gap-2 mb-8 reveal">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-4 py-2 text-[0.84rem] font-semibold border transition ${filter === "ALL" ? "bg-brand text-cream-light border-brand" : "bg-cream-light text-ink border-line hover:border-brand hover:text-brand"}`}
            >
              전체 ({PHOTOS.length})
            </button>
            {allTags.map((t) => {
              const count = PHOTOS.filter((p) => p.tags?.includes(t)).length;
              return (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 text-[0.84rem] font-semibold border transition ${filter === t ? "bg-brand text-cream-light border-brand" : "bg-cream-light text-ink border-line hover:border-brand hover:text-brand"}`}
                >
                  {t} <span className="text-mist ml-0.5">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filtered.map((p, i) => (
              <article
                key={p.id}
                className={`card lift card-edge overflow-hidden flex flex-col reveal d-${(i % 4) + 1}`}
              >
                <SmartImage
                  src={p.src}
                  alt={(p as any).alt || p.title}
                  caption={`${p.title} — ${p.caption}`}
                  ratio="4 / 3"
                  group={group}
                  index={i}
                />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-brand text-[1rem] tracking-tight leading-snug">
                      {p.title}
                    </h3>
                    {p.tags && (
                      <div className="flex gap-1 flex-wrap shrink-0">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[0.66rem] tracking-wider text-mist bg-paper px-1.5 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-ink-light text-[0.85rem] leading-[1.75] flex-1">{p.caption}</p>
                  <div className="mt-3 pt-3 border-t border-line/60">
                    <ShareButton
                      title={`청라 SK V1 — ${p.title}`}
                      text={p.caption}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-mist">
              해당 카테고리의 사진이 없습니다.
            </div>
          )}

          <div className="mt-14 p-8 md:p-10 bg-brand text-cream-light text-center reveal">
            <h3 className="text-[1.4rem] md:text-[1.6rem] font-bold tracking-tight mb-2">
              사진은 어디까지나 참고용입니다
            </h3>
            <p className="text-cream-light/70 mb-7 leading-relaxed">
              촬영 각도와 마감 시기에 따라 인상이 다르게 남을 수 있어, 직접 보고 비교하시는 걸 추천드립니다.
              <br className="hidden md:block" />
              사전예약 시 빠르게 안내해드립니다.
            </p>
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackCall("photos-cta")}
              className="inline-flex items-center gap-2 bg-cream-light text-brand font-bold px-8 py-4 text-[1rem] hover:bg-mist transition"
            >
              <Icon name="phone" size={16} filled />
              {SITE.tel} 투어 예약하기
            </a>
          </div>
        </div>
      </section>

      <ConsultForm source="현장사진" />
    </>
  );
}
