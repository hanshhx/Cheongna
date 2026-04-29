"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { NAV, SITE } from "@/lib/data";
import Logo from "@/components/Logo";
import { trackCall } from "@/components/Analytics";
import { Icon } from "@/components/Icons";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topbarOpen, setTopbarOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const open = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const close = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  useEffect(() => {
    if (sessionStorage.getItem("topbar-closed") === "1") setTopbarOpen(false);
  }, []);
  const closeTopbar = () => {
    setTopbarOpen(false);
    sessionStorage.setItem("topbar-closed", "1");
  };

  return (
    <>
      {topbarOpen && (
        <div className="relative bg-brand text-cream-light text-[0.78rem] sm:text-[0.84rem] py-2.5 px-10 sm:px-12 text-center no-print overflow-hidden">
          <div className="hidden sm:flex items-center justify-center gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-champagne" />
            완공된 실물 공간 — 사전예약 후 직접 확인하실 수 있습니다.
            <a href={`tel:${SITE.tel}`} onClick={() => trackCall("topbar")} className="font-semibold underline-offset-2 hover:underline text-champagne-light">
              ☎ {SITE.tel}
            </a>
          </div>
          <div className="sm:hidden">
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackCall("topbar-mobile")}
              className="font-semibold text-champagne-light"
            >
              ☎ {SITE.tel} 사전예약 가능
            </a>
          </div>
          <button
            onClick={closeTopbar}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-cream-light/60 hover:text-cream-light p-2"
            aria-label="안내 닫기"
          >
            <Icon name="x" size={14} />
          </button>
        </div>
      )}

      <header
        className={`sticky top-0 z-50 bg-cream-light border-b transition-all duration-300 no-print ${scrolled ? "shadow-[0_4px_28px_rgba(20,39,85,0.08)] border-line" : "border-line/50"}`}
      >
        <div
          className={`wrap flex items-center justify-between transition-all duration-300 ${scrolled ? "h-[72px] md:h-[80px]" : "h-[88px] md:h-[96px]"}`}
        >
          <Link
            href="/"
            className="flex items-center group flex-shrink-0"
            aria-label="청라 SK V1 홈"
          >
            <Logo variant="dark" layout="stack" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => open(group.label)}
                onMouseLeave={close}
              >
                <button
                  className={`flex items-center gap-1.5 px-5 text-[0.94rem] font-semibold text-ink hover:text-brand transition relative ${scrolled ? "h-[80px]" : "h-[96px]"}`}
                  onClick={() => setOpenMenu(openMenu === group.label ? null : group.label)}
                  aria-expanded={openMenu === group.label}
                >
                  {group.label}
                  <svg
                    width="10" height="10" viewBox="0 0 10 10"
                    className={`transition-transform ${openMenu === group.label ? "rotate-180" : ""}`}
                  >
                    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                  {group.items.some((it) => it.href === pathname) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-champagne" aria-hidden />
                  )}
                </button>

                {openMenu === group.label && (
                  <div className="absolute top-full left-0 min-w-[220px] bg-cream-light border border-line shadow-[0_18px_36px_-14px_rgba(20,39,85,0.22)] py-2 fx-slidedown">
                    {group.items.map((it) => {
                      const active = pathname === it.href;
                      return (
                        <Link
                          key={it.href}
                          href={it.href}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 px-5 py-2.5 text-[0.92rem] transition ${active ? "text-brand font-semibold bg-brand/[0.04]" : "text-ink hover:text-brand hover:bg-paper"}`}
                        >
                          <span className={`w-3 h-[1px] ${active ? "bg-champagne" : "bg-mist"}`} />
                          {it.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackCall("header-desktop")}
              className="inline-flex items-center gap-3 group border-l border-line pl-5"
            >
              <span className="flex flex-col">
                <span className="text-[0.64rem] tracking-[0.26em] text-mist uppercase font-semibold">
                  분양 문의
                </span>
                <span className="text-brand font-bold text-[1.08rem] fx-num group-hover:text-champagne-deep transition tracking-tight">
                  {SITE.tel}
                </span>
              </span>
              <span className="w-9 h-9 bg-brand text-cream-light flex items-center justify-center transition group-hover:bg-champagne group-hover:text-brand">
                <Icon name="phone" size={16} filled />
              </span>
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-brand"
            onClick={() => setMobileOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-drawer"
          >
            <Icon name="menu" size={26} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden no-print ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-brand/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <aside
          id="mobile-menu-drawer"
          className={`absolute right-0 top-0 h-full w-[88%] max-w-[400px] bg-cream-light shadow-2xl transition-transform duration-300 flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          aria-label="모바일 메뉴"
        >
          <div className="flex items-center justify-between px-5 h-[80px] border-b border-line">
            <Logo variant="dark" layout="stack" />
            <button onClick={() => setMobileOpen(false)} className="p-2 text-ink" aria-label="메뉴 닫기">
              <Icon name="x" size={22} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-3">
            {NAV.map((group) => (
              <div key={group.label} className="border-b border-line/60">
                <div className="px-5 py-3 text-[0.7rem] tracking-[0.26em] uppercase text-champagne-deep font-bold">
                  {group.label}
                </div>
                {group.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="flex items-center gap-3 px-5 py-3.5 text-ink hover:bg-brand/[0.04] hover:text-brand text-[0.96rem]"
                  >
                    <span className="w-3 h-[1px] bg-mist" />
                    {it.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <a
            href={`tel:${SITE.tel}`}
            onClick={() => trackCall("mobile-menu")}
            className="m-5 btn-primary justify-center"
          >
            <Icon name="phone" size={16} filled />
            {SITE.tel} 상담전화
          </a>
        </aside>
      </div>
    </>
  );
}
