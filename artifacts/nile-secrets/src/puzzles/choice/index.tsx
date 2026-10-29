import { useEffect, useState } from "react";
import type { PuzzleConfig, PuzzleProps } from "../../content/types";
import ItemIcon, { iconSrc } from "../../engine/ItemIcon";

type Cfg = Extract<PuzzleConfig, { type: "choice" }>;

export default function ChoicePuzzle({ config, onResult }: PuzzleProps<Cfg>) {
  const { question, options, correct, multi } = config;
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");

  useEffect(() => {
    setPicked([]);
    setStatus("idle");
  }, [config]);

  const locked = status === "right";

  function toggle(id: string) {
    if (locked) return;
    if (status === "wrong") setStatus("idle");
    setPicked((prev) => {
      if (!multi) return [id];
      return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }

  function confirm() {
    if (!picked.length || locked) return;
    const ok = picked.length === correct.length && correct.every((c) => picked.includes(c));
    setStatus(ok ? "right" : "wrong");
    onResult(ok);
  }

  return (
    <div className="w-full" dir="rtl">
      <style>{`
        @keyframes ch-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 50%{transform:translateX(5px)} 75%{transform:translateX(-3px)} }
      `}</style>

      <p className="mb-1 text-base font-bold leading-relaxed">{question}</p>
      {multi && <p className="mb-3 text-sm opacity-75">يمكنك اختيار أكثر من إجابة.</p>}
      {!multi && <div className="mb-3" />}

      <div
        className="mb-4 flex flex-col gap-2"
        role={multi ? "group" : "radiogroup"}
        aria-label={question}
        style={status === "wrong" ? { animation: "ch-shake .3s ease-in-out" } : undefined}
      >
        {options.map((o) => {
          const on = picked.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              role={multi ? "checkbox" : "radio"}
              aria-checked={on}
              disabled={locked}
              onClick={() => toggle(o.id)}
              className="flex min-h-[56px] w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-right transition-colors"
              style={{
                borderColor: on ? "var(--ember)" : "rgba(239,227,200,.3)",
                background: on ? "rgba(216,146,58,.25)" : "rgba(0,0,0,.35)",
                boxShadow: locked && on ? "0 0 12px 3px rgba(216,146,58,.6)" : undefined,
              }}
            >
              <span
                aria-hidden
                className="flex h-6 w-6 shrink-0 items-center justify-center border-2 text-xs font-bold"
                style={{
                  borderRadius: multi ? 6 : 999,
                  borderColor: on ? "var(--ember)" : "rgba(239,227,200,.5)",
                  background: on ? "var(--ember)" : "transparent",
                  color: "var(--ink)",
                }}
              >
                {on ? "✓" : ""}
              </span>
              {iconSrc(o.icon) && <ItemIcon item={o} size={36} />}
              <span className="flex flex-col leading-snug">
                <span className="text-base">{o.label}</span>
                {o.detail && <span className="text-xs opacity-75">{o.detail}</span>}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={confirm}
          disabled={!picked.length || locked}
          className="min-h-[48px] rounded-xl px-6 font-bold text-[var(--ink)] disabled:opacity-40"
          style={{ background: "var(--ember)" }}
        >
          تأكيد
        </button>
        <p className="min-h-[1.5rem] text-sm" aria-live="polite">
          {status === "right" && "إجابة صحيحة!"}
          {status === "wrong" && (multi ? "اختيارك ليس مطابقاً تماماً لما يقوله الدليل. أعيدي القراءة." : "ليست هذه الإجابة، أعيدي قراءة الدلائل.")}
        </p>
      </div>
    </div>
  );
}
