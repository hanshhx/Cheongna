"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 전역 인터랙션 이펙트 매니저 — pathname 변경 시 재초기화
 * 적용 방법: 해당 클래스 부여
 *   .fx-magnetic   — 마우스 따라 살짝 이동
 *   .fx-tilt       — 마우스 위치에 따라 3D 기울이기
 *   .fx-ripple     — 클릭 위치에 잔물결
 *   .fx-halo       — 마우스 따라 라이트 헤일로
 *   .fx-count[data-to="123"] — 진입 시 0→123 카운트업
 */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // ─── [a] magnetic ───
    document.querySelectorAll<HTMLElement>(".fx-magnetic").forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        // 자기력 — 거리의 0.18배 비율로 따라감
        el.style.transform = `translate3d(${dx * 0.18}px, ${dy * 0.18}px, 0)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    // ─── [b] 3D tilt ───
    document.querySelectorAll<HTMLElement>(".fx-tilt").forEach((el) => {
      el.style.perspective = "800px";
      const inner = el.firstElementChild as HTMLElement | null;
      const target = inner ?? el;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        // 최대 회전 6도 — 과하지 않게
        target.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
      };
      const onLeave = () => {
        target.style.transform = "";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    // ─── [c] ripple — 클릭 위치 가져와 CSS var 로 ───
    document.querySelectorAll<HTMLElement>(".fx-ripple").forEach((el) => {
      const onClick = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--rx", `${e.clientX - r.left}px`);
        el.style.setProperty("--ry", `${e.clientY - r.top}px`);
      };
      el.addEventListener("click", onClick);
      cleanups.push(() => el.removeEventListener("click", onClick));
    });

    // ─── [d] halo — 마우스 따라 빛 ───
    document.querySelectorAll<HTMLElement>(".fx-halo").forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      el.addEventListener("mousemove", onMove);
      cleanups.push(() => el.removeEventListener("mousemove", onMove));
    });

    // ─── [e] count-up — IntersectionObserver 진입 시 0→target 보간 ───
    const counters = document.querySelectorAll<HTMLElement>(".fx-count");
    if (counters.length) {
      const animate = (el: HTMLElement) => {
        const to = parseFloat(el.dataset.to ?? "0");
        const dur = parseInt(el.dataset.dur ?? "1400", 10);
        const suffix = el.dataset.suffix ?? "";
        const decimals = parseInt(el.dataset.decimals ?? "0", 10);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          const v = (to * eased).toFixed(decimals);
          // 천단위 콤마
          el.textContent =
            decimals > 0
              ? `${parseFloat(v).toLocaleString("en-US", { minimumFractionDigits: decimals })}${suffix}`
              : `${parseInt(v, 10).toLocaleString()}${suffix}`;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target as HTMLElement);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
