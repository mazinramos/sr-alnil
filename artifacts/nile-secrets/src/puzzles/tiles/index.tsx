import { useEffect, useMemo, useRef, useState } from "react";
import type { PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "tiles" }>;
type Cell = { id: string; rot: number }; // rot تراكمي (يزيد 90 عند كل ضغطة) كي لا يلفّ التحريك للخلف

/**
 * أنماط العرض (تُحدَّد تلقائياً):
 *  1) قنوات ماء (SVG): معرّف القطعة يبدأ بنوعها: i مستقيمة، l زاوية، t ثلاثية، e نهاية، x رباعية. مثل "l-3".
 *     المصدر على يسار القطعة الأولى (أعلى اليسار)، والحقل على يمين القطعة الأخيرة (أسفل اليمين).
 *     الحل يُقبل إن طابق `solution` أو إن وصل الماء فعلياً من المصدر إلى الحقل.
 *  2) صورة مقصوصة: لو وُجد `config.image` (اختياري، خارج النوع الرسمي). موضع القصّ = ترتيب القطعة في `solution`.
 *  3) بدون صورة ولا نوع قناة: سهم برقم القطعة (يكفي لتجربة الدوران).
 * size = [أعمدة, صفوف]. الترتيب صف بصف من اليسار.
 */
const OPEN: Record<string, number[]> = { i: [1, 3], l: [0, 1], t: [1, 2, 3], e: [1], x: [0, 1, 2, 3] }; // 0 شمال،1 شرق،2 جنوب،3 غرب (عند rot=0)
const PERIOD: Record<string, number> = { i: 180, x: 90 };
const EDGE: [number, number][] = [[50, 0], [100, 50], [50, 100], [0, 50]];

const kindOf = (id: string) => id.split("-")[0].toLowerCase();
const norm = (r: number) => ((r % 360) + 360) % 360;
const sameRot = (a: number, b: number, period: number) => norm(a - b) % period === 0;
const openings = (c: Cell) => (OPEN[kindOf(c.id)] ?? []).map((d) => (d + norm(c.rot) / 90) % 4);

export default function TilesPuzzle({ config, onResult }: PuzzleProps<Cfg>) {
  const { tiles, solution } = config;
  const image = (config as unknown as { image?: string }).image;
  const [cols, rowsRaw] = config.size;
  const rows = cols * rowsRaw === tiles.length ? rowsRaw : Math.ceil(tiles.length / cols);

  const pipes = !image && tiles.every((t) => kindOf(t.id) in OPEN);
  const mode: "pipes" | "image" | "arrow" = pipes ? "pipes" : image ? "image" : "arrow";

  const [cells, setCells] = useState<Cell[]>(() => tiles.map((t) => ({ id: t.id, rot: t.rot })));
  const [tool, setTool] = useState<"rotate" | "swap">("rotate");
  const [sel, setSel] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "right" | "wrong">("idle");
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const needsSwap = useMemo(() => tiles.some((t, i) => solution[i] && solution[i].id !== t.id), [tiles, solution]);
  const locked = status === "right";

  // الماء: من يسار القطعة الأولى
  const wet = useMemo(() => {
    const set = new Set<number>();
    if (mode !== "pipes") return set;
    const q: number[] = [];
    if (openings(cells[0]).includes(3)) { set.add(0); q.push(0); }
    const dv: [number, number][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    while (q.length) {
      const i = q.shift()!;
      const r = Math.floor(i / cols), c = i % cols;
      for (const d of openings(cells[i])) {
        const nr = r + dv[d][0], nc = c + dv[d][1];
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        const j = nr * cols + nc;
        if (set.has(j) || j >= cells.length) continue;
        if (openings(cells[j]).includes((d + 2) % 4)) { set.add(j); q.push(j); }
      }
    }
    return set;
  }, [cells, cols, rows, mode]);

  function isSolved() {
    const exact = cells.every((c, i) => {
      const s = solution[i];
      return s && s.id === c.id && sameRot(c.rot, s.rot, mode === "pipes" ? PERIOD[kindOf(c.id)] ?? 360 : 360);
    });
    if (exact) return true;
    const last = cells.length - 1;
    return mode === "pipes" && wet.has(last) && openings(cells[last]).includes(1);
  }

  function tap(i: number) {
    if (locked) return;
    setStatus("idle");
    if (tool === "swap") {
      if (sel === null) return setSel(i);
      if (sel !== i) setCells((cs) => { const n = [...cs]; [n[sel], n[i]] = [n[i], n[sel]]; return n; });
      return setSel(null);
    }
    setCells((cs) => cs.map((c, k) => (k === i ? { ...c, rot: c.rot + 90 } : c)));
  }

  function confirm() {
    if (locked) return;
    if (isSolved()) {
      setStatus("right");
      timers.current.push(window.setTimeout(() => onResult(true), 900));
    } else {
      setStatus("wrong");
      onResult(false);
      timers.current.push(window.setTimeout(() => setStatus("idle"), 500));
    }
  }

  function face(c: Cell, i: number) {
    const sol = solution.find((s) => s.id === c.id);
    if (mode === "pipes") {
      const k = kindOf(c.id);
      const color = wet.has(i) || status === "right" ? "#5cc3cf" : "#a88b5a";
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" style={{ transform: `rotate(${c.rot}deg)`, transition: "transform .25s ease" }} aria-hidden>
          {OPEN[k].map((d) => (
            <line key={d} x1={50} y1={50} x2={EDGE[d][0]} y2={EDGE[d][1]} stroke={color} strokeWidth={18} strokeLinecap="butt" />
          ))}
          <circle cx={50} cy={50} r={k === "e" ? 15 : 9} fill={color} />
        </svg>
      );
    }
    const rel = c.rot - (sol?.rot ?? 0);
    const base: React.CSSProperties = { transform: `rotate(${rel}deg)`, transition: "transform .25s ease" };
    if (mode === "image") {
      const idx = Math.max(0, solution.findIndex((s) => s.id === c.id));
      const col = idx % cols, row = Math.floor(idx / cols);
      return (
        <div
          className="h-full w-full"
          style={{
            ...base,
            backgroundImage: `url(${image})`,
            backgroundSize: `${cols * 100}% ${rows * 100}%`,
            backgroundPosition: `${cols > 1 ? (col / (cols - 1)) * 100 : 0}% ${rows > 1 ? (row / (rows - 1)) * 100 : 0}%`,
            backgroundColor: "#4a3b28",
          }}
        />
      );
    }
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-2xl font-extrabold" style={base}>
        <span aria-hidden>▲</span>
        <span className="text-sm opacity-80">{c.id.replace(/\D/g, "") || c.id}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes tiles-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}
        @keyframes tiles-glow{0%,100%{box-shadow:0 0 0 0 rgba(92,195,207,0)}50%{box-shadow:0 0 18px 6px rgba(92,195,207,.8)}}
      `}</style>

      {needsSwap && (
        <div className="flex gap-2" role="group" aria-label="أداة اللمس">
          {(["rotate", "swap"] as const).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tool === t}
              onClick={() => { setTool(t); setSel(null); }}
              className="rounded-lg px-4 font-bold"
              style={{ background: tool === t ? "var(--ember)" : "rgba(27,42,47,.75)", color: tool === t ? "var(--ink)" : "var(--papyrus)" }}
            >
              {t === "rotate" ? "تدوير" : "تبديل"}
            </button>
          ))}
        </div>
      )}

      <div className="relative w-full max-w-sm px-10">
        {mode === "pipes" && (
          <>
            <span className="absolute left-0 w-10 text-center text-xs font-bold text-[#5cc3cf]" style={{ top: `${(0.5 / rows) * 100}%`, transform: "translateY(-50%)" }}>
              المصدر ◂
            </span>
            <span className="absolute right-0 w-10 text-center text-xs font-bold text-[var(--ember)]" style={{ top: `${((rows - 0.5) / rows) * 100}%`, transform: "translateY(-50%)" }}>
              ◂ الحقل
            </span>
          </>
        )}
        <div
          dir="ltr"
          className="grid gap-1 rounded-xl bg-black/40 p-1"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, animation: status === "wrong" ? "tiles-shake .45s" : undefined }}
        >
          {cells.map((c, i) => (
            <button
              key={c.id}
              type="button"
              disabled={locked}
              onClick={() => tap(i)}
              aria-label={`القطعة ${i + 1}`}
              className="aspect-square overflow-hidden rounded-md border-2 p-0 text-[var(--papyrus)]"
              style={{
                touchAction: "manipulation",
                background: "rgba(27,42,47,.8)",
                borderColor: sel === i ? "var(--ember)" : "rgba(239,227,200,.35)",
                animation: status === "right" ? "tiles-glow 1s ease-in-out infinite" : undefined,
              }}
            >
              {face(c, i)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs opacity-70">
        {tool === "swap" ? "اضغطي قطعة ثم قطعة أخرى لتبديل مكانيهما." : "اضغطي على القطعة لتدويرها ٩٠°."}
      </p>

      <button
        type="button"
        onClick={confirm}
        disabled={locked}
        className="w-full max-w-sm rounded-lg bg-[var(--ember)] font-bold text-[var(--ink)] disabled:opacity-40"
      >
        تأكيد
      </button>
    </div>
  );
}
