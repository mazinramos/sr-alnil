import { useEffect, useRef, useState } from "react";
import type { PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "balance" }>;

export default function BalancePuzzle({ config, onResult }: PuzzleProps<Cfg>) {
  const { weights, target, maxItems } = config;
  const [placed, setPlaced] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const sum = placed.reduce((s, id) => s + (weights.find((w) => w.id === id)?.value ?? 0), 0);
  const match = sum === target;
  const over = sum > target;

  function tap(id: string) {
    if (done) return;
    setMsg("");
    if (placed.includes(id)) return setPlaced((p) => p.filter((x) => x !== id));
    if (maxItems && placed.length >= maxItems) return setMsg(`الحد الأقصى ${maxItems} قطع. أزيلي قطعة أولاً.`);
    setPlaced((p) => [...p, id]);
  }

  function confirm() {
    if (done || placed.length === 0) return;
    if (match) {
      setDone(true);
      timer.current = window.setTimeout(() => onResult(true), 700);
    } else {
      setShake(true);
      onResult(false);
      timer.current = window.setTimeout(() => setShake(false), 500);
    }
  }

  // موجب: الكفة اليمنى (الهدف) أثقل → تميل لأسفل
  const angle = Math.max(-18, Math.min(18, ((target - sum) / target) * 24));
  const rad = (angle * Math.PI) / 180;
  const half = 100;
  const dy = Math.sin(rad) * half;
  const dx = Math.cos(rad) * half;
  const ease = "transform .6s cubic-bezier(.3,1.4,.5,1)";

  const pan = (cx: number, label: string, value: number, ok: boolean) => (
    <g style={{ transform: `translate(0px, ${cx < 150 ? -dy : dy}px)`, transition: ease }}>
      <line x1={cx} y1={60} x2={cx - 34} y2={112} stroke="#efe3c8" strokeWidth={1.5} />
      <line x1={cx} y1={60} x2={cx + 34} y2={112} stroke="#efe3c8" strokeWidth={1.5} />
      <path d={`M${cx - 44} 112 H${cx + 44} Q${cx + 40} 134 ${cx} 134 Q${cx - 40} 134 ${cx - 44} 112 Z`} fill={ok ? "#d8923a" : "#2f6b73"} stroke="#efe3c8" strokeWidth={1.5} />
      <text x={cx} y={126} textAnchor="middle" fontSize={16} fontWeight={800} fill={ok ? "#2a2118" : "#efe3c8"}>{value}</text>
      <text x={cx} y={152} textAnchor="middle" fontSize={12} fill="#efe3c8">{label}</text>
    </g>
  );

  return (
    <div className="flex flex-col gap-3">
      <style>{`@keyframes bal-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}`}</style>
      <svg style={{ animation: shake ? "bal-shake .45s" : undefined }} viewBox="0 0 300 165" className="w-full" role="img" aria-label={`الكفة ${sum} والهدف ${target}`}>
        <rect x={146} y={60} width={8} height={90} rx={3} fill="#8a6a3d" />
        <rect x={110} y={148} width={80} height={8} rx={4} fill="#8a6a3d" />
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "150px 60px", transition: ease }}>
          <rect x={50} y={57} width={200} height={6} rx={3} fill="#d8923a" />
        </g>
        <circle cx={150} cy={60} r={7} fill="#efe3c8" />
        {pan(150 - dx + 0, "قطعك", sum, match)}
        {pan(150 + dx, "الهدف", target, match)}
      </svg>

      <p className="text-center text-sm" aria-live="polite">
        {match ? "الكفتان متطابقتان." : over ? `تجاوزتِ الهدف بمقدار ${sum - target}.` : sum === 0 ? "اضغطي على القطع لوضعها على الكفة." : `ينقص ${target - sum}.`}
        {maxItems ? ` (القطع: ${placed.length} / ${maxItems})` : ""}
      </p>
      {msg && <p role="alert" className="text-center text-sm text-[var(--ember)]">{msg}</p>}

      <div className="grid grid-cols-3 gap-2">
        {weights.map((w) => {
          const on = placed.includes(w.id);
          return (
            <button
              key={w.id}
              type="button"
              aria-pressed={on}
              disabled={done}
              onClick={() => tap(w.id)}
              className="flex flex-col items-center justify-center rounded-lg border-2 py-2 font-bold"
              style={{
                touchAction: "manipulation",
                background: on ? "var(--ember)" : "rgba(27,42,47,.75)",
                color: on ? "var(--ink)" : "var(--papyrus)",
                borderColor: on ? "var(--papyrus)" : "rgba(239,227,200,.5)",
              }}
            >
              <span className="text-xs opacity-80">{w.label}</span>
              <span className="text-lg">{w.value}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={confirm}
        disabled={done || placed.length === 0}
        className="rounded-lg bg-[var(--ember)] font-bold text-[var(--ink)] disabled:opacity-40"
      >
        تأكيد
      </button>
    </div>
  );
}
