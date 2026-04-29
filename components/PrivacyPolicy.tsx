"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icons";

/**
 * 개인정보 처리방침 — 푸터 버튼 클릭 시 모달.
 * 별도 페이지 추가 없이 인-사이트 모달로 처리.
 */
export default function PrivacyPolicy({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ulink hover:text-cream-light transition text-left"
      >
        {trigger || "개인정보 처리방침"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[210] lb-back flex items-center justify-center px-4 animate-fadeIn"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-title"
        >
          <div
            className="bg-cream-light text-ink max-w-2xl w-full max-h-[82vh] overflow-y-auto fx-modalin border-t-4 border-champagne"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-cream-light border-b border-line px-6 py-4 flex items-center justify-between">
              <h2 id="privacy-title" className="text-brand font-bold text-[1.1rem] tracking-tight">
                개인정보 수집·이용 동의 (분양 상담)
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className="w-9 h-9 flex items-center justify-center text-ink-light hover:text-brand"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-5 text-[0.92rem] leading-[1.8] text-ink-light">
              <section>
                <div className="text-brand font-bold mb-1.5">1. 수집 항목</div>
                <p>성함, 연락처(휴대전화), 관심 타입(선택), 문의 메모(선택)</p>
              </section>
              <section>
                <div className="text-brand font-bold mb-1.5">2. 수집·이용 목적</div>
                <p>청라 SK V1 분양 상담 응대 및 사전예약 관리.</p>
              </section>
              <section>
                <div className="text-brand font-bold mb-1.5">3. 보유·이용 기간</div>
                <p>접수일로부터 6개월 보관 후 지체 없이 파기합니다. 단, 관련 법령에 따른 보존이 필요한 경우 그 기간을 따릅니다.</p>
              </section>
              <section>
                <div className="text-brand font-bold mb-1.5">4. 동의 거부 권리</div>
                <p>이용자는 동의를 거부할 권리가 있으며, 거부 시 분양 상담 응대가 어려울 수 있습니다.</p>
              </section>
              <section>
                <div className="text-brand font-bold mb-1.5">5. 제3자 제공</div>
                <p>법령에 따른 요청을 제외하고 외부에 제공하지 않습니다.</p>
              </section>
              <section>
                <div className="text-brand font-bold mb-1.5">6. 문의</div>
                <p>본 사이트의 개인정보 처리에 대한 문의는 사이트 푸터에 표기된 분양 상담 연락처로 주세요.</p>
              </section>
              <p className="text-mist text-[0.78rem] mt-6">
                ※ 본 처리방침은 사이트 운영 정책에 따라 변경될 수 있으며, 변경 시 본 페이지에 즉시 반영합니다.
              </p>
            </div>

            <div className="sticky bottom-0 bg-cream-light border-t border-line px-6 py-4">
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-brand text-cream-light py-3 font-semibold hover:bg-brand-600 transition"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
