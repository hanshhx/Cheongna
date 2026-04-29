"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 진입 애니메이션 옵저버 — 페이지 들어가자마자 빈 화면 보이는 문제 fix:
 *  1. pathname 변경마다 옵저버 재초기화
 *  2. 새로 마운트되는 노드도 MutationObserver 로 감시
 *  3. 안전망 — 마지막에 setTimeout 으로 강제 표시 (옵저버가 어떤 이유로 실패해도)
 */
export default function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SELECTOR = ".reveal, .fx-reveal, .fx-reveal-left, .fx-reveal-right, .fx-reveal-scale, .fx-reveal-clip, .fx-reveal-blur";

    // reduced-motion 사용자에게는 즉시 표시
    if (reduce) {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => el.classList.add("is-in"));
      return;
    }

    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let safetyTimer: number | null = null;

    const setup = () => {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
      );

      const observe = (el: Element) => {
        const rect = el.getBoundingClientRect();
        // 이미 뷰포트 안 / 위에 있으면 즉시 표시
        if (rect.top < window.innerHeight * 0.95) {
          el.classList.add("is-in");
        } else {
          io?.observe(el);
        }
      };

      // 초기 스캔
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach(observe);

      // 새로 추가되는 노드도 감시 (route 전환 / 클라이언트 렌더 대응)
      mo = new MutationObserver((muts) => {
        muts.forEach((m) => {
          m.addedNodes.forEach((n) => {
            if (!(n instanceof Element)) return;
            if (n.matches?.(SELECTOR)) observe(n);
            n.querySelectorAll?.(SELECTOR).forEach(observe);
          });
        });
      });
      mo.observe(document.body, { childList: true, subtree: true });

      // 🛟 안전망: 1.6초 뒤에도 숨겨진 reveal 노드가 있다면 강제 표시
      // (페이지 진입 시 옵저버가 어떤 이유로든 실패해도 빈 페이지가 보이는 일은 절대 없게)
      safetyTimer = window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
          if (!el.classList.contains("is-in")) el.classList.add("is-in");
        });
      }, 1600);
    };

    // 다음 페인트 사이클까지 살짝 미루어서 새 페이지의 DOM 이 완전히 그려진 뒤 시작
    const raf = window.requestAnimationFrame(setup);

    return () => {
      window.cancelAnimationFrame(raf);
      if (safetyTimer) window.clearTimeout(safetyTimer);
      io?.disconnect();
      mo?.disconnect();
    };
  }, [pathname]);

  return null;
}
