import { useEffect, useMemo, useRef, useState } from "react";
import type { PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "cipher" }>;

const SEP = "|";
const LETTERS = [
  "ا","ب","ت","ث","ج","ح","خ",
  "د","ذ","ر","ز","س","ش","ص",
  "ض","ط","ظ","ع","غ","ف","ق",
  "ك","ل","م","ن","ه","و","ي",
  "ة","ء",
];

/** توحيد الأشكال المتقاربة حتى لا تُحسب الهمزة خطأً. */
const norm = (c: string) =>
  c.replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي");

export default function Cipher({ config, hintLevel, onResult }: PuzzleProps<Cfg>) {
  const { key, cipherText, answer } = config;
  const isSep = (t: string) => t === SEP || t === " ";

  const glyph = useMemo(() => {
    const m = new Map<string, string>();
    key.forEach((k) => m.set(k.id, k.icon ?? k.label));
    return m;
  }, [key]);

  // رموز فريدة بترتيب ظهورها؛ الرمز المكرر يشارك الخانة نفسها.
  const symbols = useMemo(() => {
    const seen: string[] = [];
    cipherText.forEach((t) => { if (!isSep(t) && !seen.includes(t)) seen.push(t); });
    return seen;
  }, [cipherText]);

  const [vals, setVals] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string | null>(symbols[0] ?? null);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const hinted = useRef(false);

  useEffect(() => { setVals({}); setActive(symbols[0] ?? null); setRevealed(null); setMsg(""); setDone(false); hinted.current = false; }, [config, symbols]);

  // التلميح 2: يكشف حرفاً واحداً فقط.
  useEffect(() => {
    if (hintLevel < 2 || hinted.current || done) return;
    hinted.current = true;
    const pick = symbols.find((s) => {
      const i = cipherText.indexOf(s);
      return norm(vals[s] ?? "") !== norm(answer[i]);
    });
    if (!pick) return;
    const i = cipherText.indexOf(pick);
    setVals((v) => ({ ...v, [pick]: answer[i] }));
    setRevealed(pick);
    setTimeout(() => setRevealed((r) => (r === pick ? null : r)), 2500);
  }, [hintLevel]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextAfter = (s: string, v: Record<string, string>) => {
    const from = symbols.indexOf(s);
    for (let k = 1; k <= symbols.length; k++) {
      const c = symbols[(from + k) % symbols.length];
      if (!v[c]) return c;
    }
    return s;
  };

  const type = (ch: string) => {
    if (done || !active || active === revealed) return;
    const v = { ...vals, [active]: ch };
    setVals(v); setMsg("");
    setActive(nextAfter(active, v));
  };
  const erase = () => {
    if (done || !active) return;
    const v = { ...vals }; delete v[active];
    setVals(v); setMsg("");
  };
  const clearAll = () => { if (done) return; setVals({}); setActive(symbols[0] ?? null); setMsg(""); };

  const confirm = () => {
    if (done) return;
    if (symbols.some((s) => !vals[s])) { setMsg("أكملي كل الخانات قبل التأكيد."); return; }
    const ok = cipherText.every((t, i) => isSep(t) || norm(vals[t]) === norm(answer[i]));
    if (ok) { setDone(true); setMsg(""); onResult(true); }
    else { setMsg("ليست هذه الكلمة بعد. راجعي المفتاح ورمزاً رمزاً."); onResult(false); }
  };

  return (
    <div dir="rtl" className="mx-auto w-full max-w-xl">
      {/* المفتاح */}
      <div className="mb-3 rounded-xl border border-[var(--papyrus)]/30 p-2">
        <p className="mb-1 text-center text-sm opacity-80">المفتاح</p>
        <div className="flex flex-wrap justify-center gap-2">
          {key.map((k) => (
            <div key={k.id} className="flex min-w-[44px] flex-col items-center rounded-lg bg-black/20 px-2 py-1">
              <span className="text-xl leading-none">{k.icon ?? k.label}</span>
              {k.detail && <span className="mt-1 text-base font-bold" style={{ color: "var(--ember)" }}>{k.detail}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* النص المشفّر */}
      <div className="mb-3 flex flex-wrap justify-center gap-x-2 gap-y-3" aria-label="النص المشفّر">
        {cipherText.map((t, i) =>
          isSep(t) ? (
            <span key={i} className="w-4" aria-hidden />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => !done && setActive(t)}
              aria-label={`رمز ${glyph.get(t) ?? t}${vals[t] ? ` حرفه ${vals[t]}` : ""}`}
              className="flex w-[44px] flex-col items-center gap-1 rounded-lg p-0"
              style={{ minHeight: 72 }}
            >
              <span className="text-2xl leading-none">{glyph.get(t) ?? t}</span>
              <span
                className="grid h-11 w-11 place-items-center rounded-lg text-xl font-bold"
                style={{
                  background: "rgba(239,227,200,.12)",
                  border: active === t ? "2px solid var(--ember)" : "1px solid rgba(239,227,200,.35)",
                  boxShadow: revealed === t || done ? "0 0 12px var(--ember)" : undefined,
                  transition: "box-shadow .4s",
                }}
              >
                {vals[t] ?? ""}
              </span>
            </button>
          ),
        )}
      </div>

      <p className="min-h-6 text-center text-sm" role="status" aria-live="polite" style={{ color: "var(--ember)" }}>
        {done ? "فُكّت الشفرة." : msg}
      </p>

      {/* لوحة الحروف */}
      <div className="mx-auto mt-2 grid max-w-sm grid-cols-7 gap-1.5">
        {LETTERS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => type(l)}
            disabled={done}
            className="rounded-lg bg-[var(--papyrus)]/15 text-lg font-bold active:bg-[var(--ember)]/40"
          >
            {l}
          </button>
        ))}
        <button type="button" onClick={erase} disabled={done} aria-label="مسح الخانة" className="col-span-2 rounded-lg bg-[var(--papyrus)]/15 text-sm">
          حذف
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        <button type="button" onClick={clearAll} disabled={done} className="rounded-lg border border-[var(--papyrus)]/40 px-4">مسح الكل</button>
        <button type="button" onClick={confirm} disabled={done} className="rounded-lg px-6 font-bold" style={{ background: "var(--ember)", color: "var(--ink)" }}>
          تأكيد
        </button>
      </div>
    </div>
  );
}
