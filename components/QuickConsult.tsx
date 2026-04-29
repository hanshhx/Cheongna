"use client";
import { useState, FormEvent } from "react";
import { SITE } from "@/lib/data";
import { trackCall, trackFormSubmit } from "@/components/Analytics";
import { Icon } from "@/components/Icons";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/site";

const WEB3FORMS_KEY = WEB3FORMS_ACCESS_KEY;

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

export default function QuickConsult({ source = "페이지" }: { source?: string }) {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setErr(null);
    if (!name.trim()) { setErr("성함을 입력해 주세요."); return; }
    if (tel.replace(/\D/g, "").length < 10) { setErr("연락처를 정확히 입력해 주세요."); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_KEY);
      fd.append("subject", `[청라 SK V1] ${source} 빠른상담 — ${name}`);
      fd.append("from_name", "청라 SK V1 웹사이트 (Quick)");
      fd.append("성함", name);
      fd.append("연락처", tel);
      fd.append("유입경로", `${source} (Quick)`);
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
        trackFormSubmit(source, "quick");
        setName(""); setTel("");
      } else {
        setErr(data.message || "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setErr("네트워크 오류로 전송에 실패했습니다. 전화로 연락 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-light border border-line p-5 sm:p-6 reveal fx-edge group relative">
      <div aria-hidden className="absolute left-0 top-6 bottom-6 w-1 bg-champagne" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pl-3">
        <div>
          <div className="eyebrow mb-1">QUICK CONSULT</div>
          <h3 className="font-bold text-brand text-[1.05rem] tracking-tight">
            연락처만 남겨주시면 빠르게 회신드립니다
          </h3>
        </div>
        <a
          href={`tel:${SITE.tel}`}
          onClick={() => trackCall(`${source}-quick`)}
          className="text-brand font-bold text-[1.1rem] sm:text-[1.3rem] tabular-nums hover:opacity-80 transition fx-num inline-flex items-center gap-1.5"
        >
          <Icon name="phone" size={16} filled />
          {SITE.tel}
        </a>
      </div>

      {done ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 text-[0.9rem] flex items-center gap-2 ml-3">
          <Icon name="check" size={18} strokeWidth={2.4} />
          <span>접수 완료 — 빠른 시간 안에 연락드리겠습니다.</span>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="grid sm:grid-cols-[1fr_1fr_auto] gap-2.5 ml-3">
          <div>
            <label htmlFor={`qc-name-${source}`} className="sr-only">성함</label>
            <input
              id={`qc-name-${source}`}
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="성함"
              className="field"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor={`qc-tel-${source}`} className="sr-only">연락처</label>
            <input
              id={`qc-tel-${source}`}
              name="tel"
              type="tel"
              inputMode="numeric"
              value={tel}
              onChange={(e) => setTel(formatPhone(e.target.value))}
              placeholder="010-0000-0000"
              className="field"
              required
              autoComplete="tel"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-brand text-cream-light font-bold px-6 py-3.5 rounded-sm transition hover:bg-brand-600 disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap fx-ripple"
          >
            {loading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-cream-light/30 border-t-cream-light rounded-full animate-spin360" />
                전송 중
              </>
            ) : (
              "상담 신청"
            )}
          </button>
        </form>
      )}
      {err && <p className="text-red-600 text-[0.8rem] mt-2 ml-3">{err}</p>}
      {!done && (
        <p className="text-mist text-[0.74rem] mt-3 ml-3 leading-relaxed">
          개인정보는 분양 상담 목적으로만 이용되며 6개월 후 폐기합니다.
        </p>
      )}
    </div>
  );
}
