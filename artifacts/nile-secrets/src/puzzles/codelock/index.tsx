import { useEffect, useMemo, useState } from "react";
import type { Item, PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "codelock" }>;

// خلط حتمي لترتيب الرموز كي لا يكشف ترتيبُ العرض الحلَّ.
function shuffled(symbols: Item[], solution: string[]): Item[] {
  const arr = [...symbols];
  let seed = 5;
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const prefix = arr.slice(0, solution.length).map((s) => s.id);
  if (arr.length > 1 && prefix.every((id, i) => id === solution[i])) arr.push(arr.shift()!);
  return arr;
}

// Item.icon معرّف أيقونة؛ سنستعمل engine/ItemIcon حين يصل. لحينها نعرض label.
function Face({ item }: { item: Item }) {
  return <span className="text-center text-sm font-bold leading-tight">{item.label}</span>;
}

export default function CodelockPuzzle({ config, onResult }: PuzzleProps<Cfg>) {
  const { symbols, length, solution } = config;
  const order = useMemo(() => shuffled(symbols, solution), [symbols, solution]);
  const byId = useMemo(() => new Map(symbols.map((s) => [s.id, s])), [symbols]);

  const [code, setCode] = useState<(string | null)[]>(() => Array(length).fill(null));
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");

  useEffect(() => {
    setCode(Array(length).fill(null));
    setStatus("idle");
  }, [config, length]);

  const locked = status === "right";
  const full = code.every(Boolean);

  function touched() {
    if (status === "wrong") setStatus("idle");
  }

  function pick(id: string) {
    if (locked) return;
    const idx = code.findIndex((c) => c === null);
    if (idx < 0) return;
    const next = [...code];
    next[idx] = id;
    setCode(next);
    touched();
  }

  function clearSlot(idx: number) {
    if (locked || !code[idx]) return;
    const next = [...code];
    next[idx] = null;
    setCode(next);
    touched();
  }

  function clearAll() {
    if (locked) return;
    setCode(Array(length).fill(null));
    touched();
  }

  function open() {
    if (!full || locked) return;
    const ok = code.every((c, i) => c === solution[i]);
    setStatus(ok ? "right" : "wrong");
    onResult(ok);
  }

  const glow = status === "right";

  return (
    <div className="w-full" dir="rtl">
      <style>{`
        @keyframes cl-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes cl-glow { 0%,100%{box-shadow:0 0 10px 2px rgba(216,146,58,.5)} 50%{box-shadow:0 0 22px 6px rgba(216,146,58,.9)} }
      `}</style>

      {/* خانات الرمز */}
      <div
        className="mb-4 flex justify-center gap-2 rounded-2xl bg-black/40 p-3"
        style={{
          animation: status === "wrong" ? "cl-shake .35s ease-in-out" : glow ? "cl-glow 1.4s ease-in-out infinite" : undefined,
        }}
      >
        {code.map((id, idx) => {
          const item = id ? byId.get(id) : null;
          return (
            <button
              key={idx}
              type="button"
              disabled={locked}
              onClick={() => clearSlot(idx)}
              aria-label={item ? `الخانة ${idx + 1}: ${item.label}، اضغطي للمسح` : `الخانة ${idx + 1} فارغة`}
              className="flex min-h-[64px] min-w-[56px] flex-1 items-center justify-center rounded-xl border-2 px-1"
              style={{
                maxWidth: 96,
                borderStyle: item ? "solid" : "dashed",
                borderColor: glow ? "var(--ember)" : item ? "var(--nile-water)" : "rgba(239,227,200,.35)",
                background: item ? "var(--papyrus)" : "rgba(0,0,0,.25)",
                color: item ? "var(--ink)" : "var(--papyrus)",
              }}
            >
              {item ? <Face item={item} /> : <span className="text-xl opacity-40">{idx + 1}</span>}
            </button>
          );
        })}
      </div>

      {/* الرموز المتاحة */}
      <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {order.map((s) => (
          <button
            key={s.id}
            type="button"
            disabled={locked || full}
            onClick={() => pick(s.id)}
            className="flex min-h-[64px] items-center justify-center rounded-xl bg-[var(--papyrus)] px-2 py-2 text-[var(--ink)] shadow active:scale-95 disabled:opacity-50"
          >
            <Face item={s} />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={open}
          disabled={!full || locked}
          className="min-h-[48px] rounded-xl px-6 font-bold text-[var(--ink)] disabled:opacity-40"
          style={{ background: "var(--ember)" }}
        >
          افتحي
        </button>
        <button
          type="button"
          onClick={clearAll}
          disabled={locked || code.every((c) => !c)}
          className="min-h-[48px] rounded-xl border border-white/30 px-5 font-bold disabled:opacity-40"
        >
          مسح
        </button>
        <p className="min-h-[1.5rem] text-sm" aria-live="polite">
          {status === "right" && "انفتح القفل!"}
          {status === "wrong" && "القفل لم ينفتح، الرموز أو ترتيبها غير صحيح. راجعي الدلائل."}
          {status === "idle" && !full && `اختاري ${length} رموز بالترتيب. اضغطي خانة لمسح رمزها.`}
          {status === "idle" && full && "اضغطي «افتحي» حين تطمئنين."}
        </p>
      </div>
    </div>
  );
}
