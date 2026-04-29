"use client";

import Link from "next/link";
import { SITE, NAV } from "@/lib/data";
import Logo from "@/components/Logo";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { trackCall } from "@/components/Analytics";
import BusinessHours from "@/components/BusinessHours";

export default function Footer() {
  return (
    <footer className="bg-brand text-cream-light/80 mt-0 no-print relative overflow-hidden">
      <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-transparent via-champagne to-transparent opacity-50" />

      <div className="wrap py-14 sm:py-18 grid md:grid-cols-12 gap-10 relative">
        <div className="md:col-span-5">
          <Logo variant="light" layout="stack" />
          <p className="mt-7 text-[0.92rem] leading-[1.95] max-w-md text-cream-light/75">
            {SITE.tagline}
          </p>
          <div className="mt-5 grid gap-2 text-[0.84rem] text-cream-light/65 leading-relaxed">
            <div className="flex gap-3">
              <span className="text-champagne-light shrink-0 font-semibold tracking-[0.18em] text-[0.72rem] mt-0.5 w-12">ADDR</span>
              <span>{SITE.address}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-champagne-light shrink-0 font-semibold tracking-[0.18em] text-[0.72rem] mt-0.5 w-12">HALL</span>
              <span>{SITE.hallAddress}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-champagne-light shrink-0 font-semibold tracking-[0.18em] text-[0.72rem] mt-0.5 w-12">HRS</span>
              <span>{SITE.hours}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-[0.72rem] uppercase tracking-[0.26em] text-champagne-light mb-5 font-bold">
            Sitemap
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[0.9rem] content-start">
            {NAV.flatMap((g) => g.items).map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="ulink py-1 hover:text-cream-light transition w-fit"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="text-[0.72rem] uppercase tracking-[0.26em] text-champagne-light mb-3 font-bold">
            분양 상담
          </div>
          <a
            href={`tel:${SITE.tel}`}
            onClick={() => trackCall("footer")}
            className="text-cream-light text-[2.4rem] sm:text-[2.8rem] font-bold tracking-tight hover:text-champagne-light transition block fx-num leading-none"
          >
            {SITE.tel}
          </a>
          <div className="mt-4">
            <BusinessHours variant="dark" />
          </div>
          <p className="text-[0.85rem] leading-relaxed mt-3 text-cream-light/70">
            {SITE.consultNote}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-champagne/60" />
            <span className="text-[0.72rem] tracking-[0.22em] uppercase text-cream-light/55">
              사전예약 우선 안내
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-light/10">
        <div className="wrap py-5 flex flex-wrap items-center justify-between gap-3 text-[0.74rem] text-cream-light/45">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>{SITE.copyright}</span>
            <PrivacyPolicy />
          </div>
          <span className="leading-relaxed max-w-2xl text-right">
            본 사이트의 이미지·수치는 소비자 이해를 돕기 위한 것으로 시공·계약 과정에서 일부 변경될 수 있으며, 최종 사양은 분양계약서를 따릅니다.
          </span>
        </div>
      </div>
    </footer>
  );
}
