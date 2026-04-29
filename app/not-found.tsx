import Link from "next/link";
import { SITE, NAV } from "@/lib/data";
import { Icon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center bg-paper-warm">
      <div className="wrap py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4 text-champagne-deep">
            <span className="w-10 h-[1px] bg-champagne" />
            <span className="text-[0.74rem] tracking-[0.28em] uppercase font-bold">
              Page Not Found
            </span>
          </div>
          <div className="text-[5rem] md:text-[7rem] font-bold tracking-tightest text-brand leading-none fx-num">
            404
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mt-6 mb-3">
            요청하신 페이지를 찾지 못했습니다
          </h1>
          <p className="text-ink-light leading-relaxed max-w-md mb-9">
            주소를 잘못 입력하셨거나 페이지가 이동·삭제되었을 수 있습니다. 자주 찾는 메뉴 또는 전화로 바로 안내드릴 수 있습니다.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/" className="btn-primary">
              <Icon name="home" size={16} /> 홈으로 돌아가기
            </Link>
            <a href={`tel:${SITE.tel}`} className="btn-ghost">
              <Icon name="phone" size={16} filled /> {SITE.tel}
            </a>
          </div>

          <div className="border-t border-line pt-8">
            <div className="text-[0.72rem] tracking-[0.26em] uppercase font-bold text-mist mb-5">
              자주 찾는 메뉴
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {NAV.flatMap((g) => g.items).map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="flex items-center gap-3 py-2 text-ink hover:text-brand group transition"
                >
                  <span className="w-4 h-[1px] bg-champagne/60 group-hover:w-7 transition-all" />
                  <span className="font-semibold">{it.label}</span>
                  <Icon name="arrow-right" size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
