"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/data";
import { trackCall } from "@/components/Analytics";
import { Icon, type IconName } from "@/components/Icons";

const ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "홈", icon: "home" },
  { href: "/special", label: "특화설계", icon: "building" },
  { href: "/floor", label: "층별계획", icon: "layers" },
  { href: "/photos", label: "현장사진", icon: "image" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-cream-light/95 backdrop-blur border-t border-line no-print"
      aria-label="모바일 하단 네비"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5">
        {ITEMS.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] transition relative ${active ? "text-brand font-semibold" : "text-mist hover:text-ink"}`}
              aria-current={active ? "page" : undefined}
            >
              {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-champagne rounded-b-full" />}
              <Icon name={it.icon} size={20} />
              <span>{it.label}</span>
            </Link>
          );
        })}
        <a
          href={`tel:${SITE.tel}`}
          onClick={() => trackCall("bottom-nav")}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] text-brand font-semibold"
        >
          <Icon name="phone" size={20} />
          <span>전화상담</span>
        </a>
      </div>
    </nav>
  );
}
