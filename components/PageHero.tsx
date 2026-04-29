import Link from "next/link";

type Props = {
  crumbs: { label: string; href?: string }[];
  title: string;
  emphasis: string;
  intro?: string;
  bgImage?: string;
};

export default function PageHero({ crumbs, title, emphasis, intro, bgImage }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand text-cream-light">
      {/* 배경 이미지 (옵션) */}
      {bgImage && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center fx-kb"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand/[0.95] via-brand/75 to-brand/40" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-transparent" />
        </>
      )}
      {!bgImage && (
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand to-brand-700" />
      )}

      {/* 그레인 텍스처 */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />

      {/* 좌상단 코너 마크 */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-3 text-cream-light/55 text-[0.68rem] tracking-[0.28em] uppercase font-medium">
        <span className="w-6 h-[1px] bg-cream-light/40" />
        <span>SK V1 — Cheongna</span>
      </div>

      <div className="wrap relative py-16 sm:py-20 md:py-28">
        <nav
          className="text-[0.78rem] sm:text-[0.8rem] text-cream-light/65 mb-6 sm:mb-7 flex items-center gap-2 flex-wrap"
          aria-label="breadcrumb"
        >
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="ulink hover:text-cream-light transition">
                  {c.label}
                </Link>
              ) : (
                <span className="text-cream-light/85">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-cream-light/30">/</span>}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-4 mb-6">
          <span className="w-10 h-[1px] bg-champagne" />
          <span className="text-champagne text-[0.74rem] tracking-[0.32em] uppercase font-bold">
            {crumbs[crumbs.length - 1]?.label}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-[3.4rem] font-bold tracking-tighter leading-[1.05]">
          {title}
          <br />
          <em className="not-italic font-serif italic font-normal text-champagne-light">
            — {emphasis}
          </em>
        </h1>
        {intro && (
          <p className="text-cream-light/75 mt-6 max-w-2xl text-[0.95rem] sm:text-[1.02rem] leading-[1.85]">
            {intro}
          </p>
        )}
      </div>

      {/* 하단 얇은 골드 라인 — 디테일 */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent opacity-40" />
    </section>
  );
}
