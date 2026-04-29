"use client";
import { useState, FormEvent } from "react";
import { SITE } from "@/lib/data";
import { trackCall, trackFormSubmit } from "@/components/Analytics";
import { Icon } from "@/components/Icons";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/site";

const TYPES = ["A TYPE", "B TYPE", "C TYPE", "D TYPE", "전체 문의"];
const WEB3FORMS_KEY = WEB3FORMS_ACCESS_KEY;

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

type Props = {
  source?: string;
  variant?: "dark" | "light";
};

export default function ConsultForm({ source = "홈", variant = "dark" }: Props) {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [type, setType] = useState("");
  const [memo, setMemo] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; tel?: string; agree?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "성함을 입력해 주세요.";
    if (tel.replace(/\D/g, "").length < 10) e.tel = "연락처를 정확히 입력해 주세요.";
    if (!agree) e.agree = "개인정보 수집 및 이용에 동의해 주세요.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_KEY);
      fd.append("subject", `[청라 SK V1] ${source} 페이지 상담 신청 — ${name}`);
      fd.append("from_name", "청라 SK V1 웹사이트");
      fd.append("성함", name);
      fd.append("연락처", tel);
      fd.append("관심타입", type || "(미선택)");
      fd.append("문의메모", memo || "(없음)");
      fd.append("유입경로", source);
      fd.append("접수시각", new Date().toLocaleString("ko-KR"));
      try {
        const utm = sessionStorage.getItem("utm");
        if (utm) fd.append("UTM", utm);
      } catch {}
      fd.append("botcheck", "");
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        trackFormSubmit(source, "full");
        setName(""); setTel(""); setType(""); setMemo(""); setAgree(false);
      } else {
        setSubmitError(data.message || "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setSubmitError("네트워크 오류로 전송에 실패했습니다. 전화로 연락 주시면 빠르게 도와드리겠습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "dark") {
    return (
      <section className="bg-brand text-cream-light relative overflow-hidden no-print">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div aria-hidden className="hidden md:block absolute top-8 left-8 text-cream-light/35 text-[0.68rem] tracking-[0.32em] uppercase font-medium">
          ◢ Consultation
        </div>
        <div aria-hidden className="hidden md:block absolute bottom-8 right-8 text-cream-light/35 text-[0.68rem] tracking-[0.32em] uppercase font-medium">
          청라 SK V1 ◤
        </div>

        <div className="wrap py-16 md:py-20 relative">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="text-[0.72rem] tracking-[0.2em] text-champagne-light uppercase font-semibold mb-3">
              CONSULTATION
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold tracking-tighter mb-3 text-cream-light">
              먼저 직접 보시고 결정하세요
            </h2>
            <p className="text-cream-light/70 text-[0.94rem] sm:text-base">
              현장 전문 상담사가 빠르게 연락드립니다. 전화가 더 편하시면 아래 번호로도 가능합니다.
            </p>
          </div>

          <div className="text-center mb-8">
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackCall(`${source}-form-dark`)}
              className="inline-block text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] font-bold tracking-tight text-cream-light hover:text-champagne-light transition fx-num"
            >
              {SITE.tel}
            </a>
            <div className="text-[0.84rem] text-cream-light/60 mt-1">{SITE.hours}</div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="text-center text-[0.84rem] text-cream-light/55 mb-4 tracking-wider">
              ─ 또는 양식으로 신청 ─
            </div>

            <FormBody
              dark
              {...{ name, setName, tel, setTel, type, setType, memo, setMemo, agree, setAgree, errors, setErrors, loading, submitError, submit, source }}
            />
          </div>
        </div>

        <SuccessModal done={done} setDone={setDone} />
      </section>
    );
  }

  return (
    <section className="bg-paper-warm no-print">
      <div className="wrap py-12 md:py-16">
        <div className="max-w-3xl mx-auto bg-cream-light p-6 sm:p-8 md:p-10 shadow-[0_18px_40px_-14px_rgba(20,39,85,0.18)] border border-line">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <div className="eyebrow mb-2">QUICK CONSULT</div>
              <h2 className="h-display text-[1.4rem] md:text-[1.65rem]">상담 신청</h2>
              <p className="text-ink-light text-[0.88rem] mt-1.5">
                바쁘신 분도 30초면 됩니다.
              </p>
            </div>
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackCall("consult-light")}
              className="text-brand font-bold text-[1.4rem] md:text-[1.7rem] tracking-tight fx-num hover:opacity-80 transition inline-flex items-center gap-2"
            >
              <Icon name="phone" size={18} filled />
              {SITE.tel}
            </a>
          </div>

          <FormBody
            dark={false}
            {...{ name, setName, tel, setTel, type, setType, memo, setMemo, agree, setAgree, errors, setErrors, loading, submitError, submit, source }}
          />
        </div>
      </div>
      <SuccessModal done={done} setDone={setDone} />
    </section>
  );
}

function FormBody(props: any) {
  const {
    name, setName, tel, setTel, type, setType, memo, setMemo, agree, setAgree,
    errors, setErrors, loading, submitError, submit, dark, source,
  } = props;

  const labelCls = dark ? "text-cream-light/65" : "text-ink-light";
  const errCls = dark ? "text-champagne-light" : "text-red-600";
  const labelTextCls = dark ? "text-cream-light/70" : "text-ink-light";
  const idSrc = String(source || "form");

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`cf-name-${idSrc}`} className={`block text-[0.74rem] tracking-[0.18em] uppercase font-semibold ${labelTextCls} mb-1.5`}>
            성함 <span className="text-champagne">*</span>
          </label>
          <input
            id={`cf-name-${idSrc}`}
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => name && setErrors((p: any) => ({ ...p, name: undefined }))}
            placeholder="홍길동"
            className={`field ${errors.name ? "is-error" : ""}`}
            required
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `cf-name-err-${idSrc}` : undefined}
          />
          {errors.name && <p id={`cf-name-err-${idSrc}`} className={`${errCls} text-[0.75rem] mt-1.5 px-1`}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`cf-tel-${idSrc}`} className={`block text-[0.74rem] tracking-[0.18em] uppercase font-semibold ${labelTextCls} mb-1.5`}>
            연락처 <span className="text-champagne">*</span>
          </label>
          <input
            id={`cf-tel-${idSrc}`}
            name="tel"
            type="tel"
            inputMode="numeric"
            value={tel}
            onChange={(e) => setTel(formatPhone(e.target.value))}
            placeholder="010-0000-0000"
            className={`field ${errors.tel ? "is-error" : ""}`}
            required
            autoComplete="tel"
            aria-invalid={!!errors.tel}
            aria-describedby={errors.tel ? `cf-tel-err-${idSrc}` : undefined}
          />
          {errors.tel && <p id={`cf-tel-err-${idSrc}`} className={`${errCls} text-[0.75rem] mt-1.5 px-1`}>{errors.tel}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`cf-type-${idSrc}`} className={`block text-[0.74rem] tracking-[0.18em] uppercase font-semibold ${labelTextCls} mb-1.5`}>
          관심 타입 (선택)
        </label>
        <select
          id={`cf-type-${idSrc}`}
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="field"
        >
          <option value="">선택 안 함</option>
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`cf-memo-${idSrc}`} className={`block text-[0.74rem] tracking-[0.18em] uppercase font-semibold ${labelTextCls} mb-1.5`}>
          문의 메모 (선택)
        </label>
        <textarea
          id={`cf-memo-${idSrc}`}
          name="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="문의 내용을 간단히 적어주세요."
          rows={3}
          className="field resize-y"
        />
      </div>

      <label className={`flex items-start gap-2 text-[0.82rem] ${labelCls} cursor-pointer pt-1`}>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 accent-champagne w-4 h-4 flex-shrink-0"
        />
        <span className="leading-relaxed">
          개인정보 수집·이용에 동의합니다. (수집 항목: 성함·연락처·메모. 이용 목적: 분양 상담. 보관: 6개월.)
        </span>
      </label>
      {errors.agree && <p className={`${errCls} text-[0.75rem] ml-6`}>{errors.agree}</p>}

      {submitError && (
        <div className={`text-[0.85rem] p-3 ${dark ? "bg-champagne/10 border border-champagne/30 text-champagne-light" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full font-bold tracking-tight rounded-sm px-5 py-4 transition flex items-center justify-center gap-2 disabled:opacity-70 fx-ripple ${dark ? "bg-champagne text-brand hover:bg-champagne-light" : "bg-brand text-cream-light hover:bg-brand-600"}`}
      >
        {loading ? (
          <>
            <span className={`inline-block w-3.5 h-3.5 border-2 ${dark ? "border-brand/30 border-t-brand" : "border-cream-light/30 border-t-cream-light"} rounded-full animate-spin360`} />
            접수 중…
          </>
        ) : (
          "상담 신청하기"
        )}
      </button>
    </form>
  );
}

function SuccessModal({ done, setDone }: { done: boolean; setDone: (b: boolean) => void }) {
  if (!done) return null;
  return (
    <div
      className="fixed inset-0 z-[210] lb-back flex items-center justify-center px-5 animate-fadeIn"
      onClick={() => setDone(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-cream-light text-ink rounded-sm p-8 md:p-10 text-center max-w-md fx-modalin border-t-4 border-champagne"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-champagne/15 flex items-center justify-center text-champagne-deep">
          <Icon name="check" size={28} strokeWidth={2.4} />
        </div>
        <h3 className="text-xl font-bold text-brand mb-2">상담 신청 완료</h3>
        <p className="text-ink-light text-[0.92rem] leading-relaxed mb-6">
          빠른 시간 안에 연락드리겠습니다.
          <br />
          급하시면 아래 번호로 바로 전화 주세요.
        </p>
        <a
          href={`tel:${SITE.tel}`}
          onClick={() => trackCall("consult-success")}
          className="text-brand font-bold text-2xl mb-5 hover:opacity-80 fx-num inline-flex items-center gap-2 justify-center"
        >
          <Icon name="phone" size={20} filled />
          {SITE.tel}
        </a>
        <button
          onClick={() => setDone(false)}
          className="w-full bg-brand text-cream-light py-3 rounded-sm font-semibold hover:bg-brand-600 transition"
        >
          확인
        </button>
      </div>
    </div>
  );
}
