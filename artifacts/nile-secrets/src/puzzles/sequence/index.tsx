import { useEffect, useMemo, useState, type DragEvent } from "react";
import type { Item, PuzzleConfig, PuzzleProps } from "../../content/types";
import ItemIcon, { iconSrc } from "../../engine/ItemIcon";

type Cfg = Extract<PuzzleConfig, { type: "sequence" }>;

// خلط حتمي (نفس الترتيب في كل عرض) بحيث لا يطابق الحل أبداً.
function shuffled(items: Item[], solution: string[]): Item[] {
  const arr = [...items];
  let seed = 7;
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.length > 1 && arr.every((it, i) => it.id === solution[i])) arr.push(arr.shift()!);
  return arr;
}

function Card({ item, small }: { item: Item; small?: boolean }) {
  // ItemIcon يعرض label بنفسه عند غياب الصورة، فنمرّر showLabel حتى لا يتكرر النص.
  if (iconSrc(item.icon)) {
    return (
      <ItemIcon item={item} size={small ? 32 : 48} showLabel className="flex-col gap-1 text-center text-sm font-bold leading-tight" />
    );
  }
  return <span className="text-center text-sm font-bold leading-tight">{item.label}</span>;
}

export default function SequencePuzzle({ config, onResult }: PuzzleProps<Cfg>) {
  const { items, solution } = config;
  const n = solution.length;
  const order = useMemo(() => shuffled(items, solution), [items, solution]);
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);

  const [slots, setSlots] = useState<(string | null)[]>(() => Array(n).fill(null));
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");
  const [dragId, setDragId] = useState<string | null>(null);

  useEffect(() => {
    setSlots(Array(n).fill(null));
    setStatus("idle");
  }, [config, n]);

  const locked = status === "right";
  const placed = new Set(slots.filter(Boolean) as string[]);
  const tray = order.filter((i) => !placed.has(i.id));
  const full = slots.every(Boolean);

  function touched() {
    if (status === "wrong") setStatus("idle");
  }

  function placeFirstEmpty(id: string) {
    if (locked) return;
    const idx = slots.findIndex((s) => s === null);
    if (idx < 0) return;
    const next = [...slots];
    next[idx] = id;
    setSlots(next);
    touched();
  }

  function clearSlot(idx: number) {
    if (locked || !slots[idx]) return;
    const next = [...slots];
    next[idx] = null;
    setSlots(next);
    touched();
  }

  function dropOn(idx: number, e: DragEvent) {
    e.preventDefault();
    const id = dragId ?? e.dataTransfer.getData("text/plain");
    setDragId(null);
    if (locked || !id || !byId.has(id)) return;
    const next = [...slots];
    const from = next.indexOf(id);
    if (from >= 0) next[from] = null; // نقل من خانة أخرى
    next[idx] = id; // لو الخانة مشغولة تعود بطاقتها للصينية تلقائياً
    setSlots(next);
    touched();
  }

  function confirm() {
    if (!full || locked) return;
    const ok = slots.every((s, i) => s === solution[i]);
    setStatus(ok ? "right" : "wrong");
    onResult(ok);
  }

  return (
    <div className="w-full" dir="rtl">
      <style>{`
        @keyframes sq-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 50%{transform:translateX(5px)} 75%{transform:translateX(-3px)} }
      `}</style>

      {/* الخانات */}
      <div
        className="mb-4 flex flex-wrap justify-center gap-2"
        style={status === "wrong" ? { animation: "sq-shake .3s ease-in-out" } : undefined}
      >
        {slots.map((id, idx) => {
          const item = id ? byId.get(id) : null;
          return (
            <button
              key={idx}
              type="button"
              disabled={locked}
              onClick={() => clearSlot(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => dropOn(idx, e)}
              draggable={!!item && !locked}
              onDragStart={(e) => {
                if (!id) return;
                setDragId(id);
                e.dataTransfer.setData("text/plain", id);
              }}
              aria-label={item ? `الخانة ${idx + 1}: ${item.label}، اضغطي للإعادة` : `الخانة ${idx + 1} فارغة`}
              className="relative flex min-h-[72px] min-w-[72px] flex-1 basis-[72px] items-center justify-center rounded-xl border-2 px-2 py-2 transition-colors"
              style={{
                maxWidth: 140,
                borderStyle: item ? "solid" : "dashed",
                borderColor: status === "right" ? "var(--ember)" : item ? "var(--nile-water)" : "rgba(239,227,200,.35)",
                background: item ? "var(--papyrus)" : "rgba(0,0,0,.3)",
                color: item ? "var(--ink)" : "var(--papyrus)",
                boxShadow: status === "right" ? "0 0 14px 3px rgba(216,146,58,.65)" : undefined,
              }}
            >
              <span className="absolute right-1.5 top-0.5 text-xs font-bold opacity-60">{idx + 1}</span>
              {item ? <Card item={item} small /> : <span className="text-2xl opacity-40">＋</span>}
            </button>
          );
        })}
      </div>

      {/* الصينية */}
      <div className="mb-4 flex min-h-[72px] flex-wrap justify-center gap-2 rounded-xl bg-black/30 p-3">
        {tray.length === 0 && (
          <span className="self-center text-sm opacity-60">كل البطاقات في أماكنها</span>
        )}
        {tray.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={locked}
            draggable={!locked}
            onDragStart={(e) => {
              setDragId(item.id);
              e.dataTransfer.setData("text/plain", item.id);
            }}
            onDragEnd={() => setDragId(null)}
            onClick={() => placeFirstEmpty(item.id)}
            className="min-h-[64px] min-w-[72px] rounded-xl bg-[var(--papyrus)] px-3 py-2 text-[var(--ink)] shadow active:scale-95"
          >
            <Card item={item} />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={confirm}
          disabled={!full || locked}
          className="min-h-[48px] rounded-xl px-6 font-bold text-[var(--ink)] disabled:opacity-40"
          style={{ background: "var(--ember)" }}
        >
          تأكيد
        </button>
        <p className="min-h-[1.5rem] text-sm" aria-live="polite">
          {status === "right" && "الترتيب صحيح!"}
          {status === "wrong" && "الترتيب ليس صحيحاً بعد، راجعي الدلائل وجرّبي ترتيباً آخر."}
          {status === "idle" && !full && "اضغطي على بطاقة لتوضع في أول خانة فارغة، وعلى خانة لإعادتها."}
          {status === "idle" && full && "اضغطي «تأكيد» حين تطمئنين إلى ترتيبك."}
        </p>
      </div>
    </div>
  );
}
