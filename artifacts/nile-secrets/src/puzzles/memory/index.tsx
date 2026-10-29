import { useEffect, useMemo, useRef, useState } from "react";
import ItemIcon, { iconSrc } from "../../engine/ItemIcon";
import type { Item, PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "memory" }>;
const MAX_FAILS = 6; // كل 6 تقليبات فاشلة = خطأ واحد

// خلط ثابت (بذرة من المعرّفات) كي لا يتغيّر الترتيب مع كل رسم للمكوّن
function seeded(seedStr: string) {
  let h = 1779033703;
  for (let i = 0; i < seedStr.length; i++) { h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

/** وجه البطاقة: ItemIcon من المحرّك (يعرض label نصاً إن غابت الصورة). بدون أيقونة نعرض label مباشرة. */
function IconFace({ item }: { item: Item }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-1 text-center text-[12px] font-bold leading-tight">
      {iconSrc(item.icon) ? <ItemIcon item={item} size={48} /> : item.label}
    </div>
  );
}

export default function MemoryPuzzle({ config, onResult }: PuzzleProps<Cfg>) {
  const { pairs } = config;
  const deck = useMemo(() => {
    const cards = pairs.flatMap((p) => [{ key: `${p.id}-a`, item: p }, { key: `${p.id}-b`, item: p }]);
    const rnd = seeded(pairs.map((p) => p.id).join("|"));
    for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]]; }
    return cards;
  }, [pairs]);

  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [fails, setFails] = useState(0);
  const busy = useRef(false);
  const failRef = useRef(0);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  function tap(i: number) {
    if (busy.current || open.includes(i) || matched.has(deck[i].item.id)) return;
    if (open.length === 0) return setOpen([i]);
    const first = open[0];
    setOpen([first, i]);
    if (deck[first].item.id === deck[i].item.id) {
      const next = new Set(matched).add(deck[i].item.id);
      setMatched(next);
      setOpen([]);
      if (next.size === pairs.length) timers.current.push(window.setTimeout(() => onResult(true), 700));
      return;
    }
    busy.current = true;
    timers.current.push(window.setTimeout(() => {
      setOpen([]);
      busy.current = false;
      failRef.current += 1;
      if (failRef.current >= MAX_FAILS) {
        failRef.current = 0;
        setFails(0);
        onResult(false); // تنقلب البطاقات غير المطابقة (كلها مقلوبة أصلاً)
      } else setFails(failRef.current);
    }, 900));
  }

  const n = deck.length;
  const cols = n % 5 === 0 && n > 8 ? 5 : n <= 12 ? 4 : 5;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-sm" aria-live="polite">
        الأزواج: <b>{matched.size}</b> / {pairs.length} — محاولات غير موفقة: <b>{fails}</b> / {MAX_FAILS}
      </p>
      <div dir="ltr" className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {deck.map((c, i) => {
          const up = open.includes(i) || matched.has(c.item.id);
          const done = matched.has(c.item.id);
          return (
            <button
              key={c.key}
              type="button"
              aria-label={up ? c.item.label : "بطاقة مقلوبة"}
              aria-pressed={up}
              onClick={() => tap(i)}
              className="relative p-0"
              style={{ aspectRatio: "3 / 4", perspective: 600, touchAction: "manipulation", background: "transparent", border: 0 }}
            >
              <div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d", transform: up ? "rotateY(180deg)" : "none", transition: "transform .3s ease" }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-lg border-2 text-2xl font-extrabold"
                  style={{ backfaceVisibility: "hidden", background: "var(--nile-water)", borderColor: "rgba(239,227,200,.5)", color: "var(--papyrus)" }}
                >
                  ؟
                </div>
                <div
                  className="absolute inset-0 overflow-hidden rounded-lg border-2"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "var(--papyrus)",
                    color: "var(--ink)",
                    borderColor: done ? "var(--ember)" : "rgba(42,33,24,.4)",
                    boxShadow: done ? "0 0 10px rgba(216,146,58,.8)" : undefined,
                  }}
                >
                  <IconFace item={c.item} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
