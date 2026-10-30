import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "jigsaw" }>;

const STRIPS = 5;
const WRONG_LIMIT = 10;
const FALLBACK_ASPECT = 3 / 2;

/** خلايا الخريطة: شبكة 3×2 مربعة، الترقيم من أعلى اليمين (RTL): 1 2 3 فوق ثم 4 5 6 تحت من اليسار لليمين. [عمود، صف] */
const CELLS: [number, number][] = [[2, 0], [1, 0], [0, 0], [0, 1], [1, 1], [2, 1]];

/** "/art/ui/map-full.webp#cell=2" → المسار + منطقة الصورة (rx, ry, rw, rh بالنسب). "#strip=n" قديم (5 شرائح) ما زال مدعوماً. */
function parseImage(raw: string) {
  const [src, frag = ""] = raw.split("#");
  const c = /cell=(\d+)/.exec(frag);
  if (c) {
    const [col, row] = CELLS[Math.min(CELLS.length, Math.max(1, Number(c[1]))) - 1];
    return { src, rx: col / 3, ry: row / 2, rw: 1 / 3, rh: 1 / 2 };
  }
  const m = /strip=(\d+)/.exec(frag);
  const n = m ? Math.min(STRIPS, Math.max(1, Number(m[1]))) : 0;
  return n ? { src, rx: (STRIPS - n) / STRIPS, ry: 0, rw: 1 / STRIPS, rh: 1 } : { src, rx: 0, ry: 0, rw: 1, rh: 1 };
}

/** أقرب شبكة cols×rows لعدد الأجزاء بحيث تقترب القطعة من المربع. */
function gridFor(pieces: number, aspect: number) {
  let best: [number, number] = [pieces, 1];
  let bestScore = Infinity;
  for (let c = 1; c <= pieces; c++) {
    if (pieces % c) continue;
    const r = pieces / c;
    if (pieces >= 4 && (c < 2 || r < 2)) continue;
    const score = Math.abs(Math.log(c / r / aspect));
    if (score < bestScore) { bestScore = score; best = [c, r]; }
  }
  return best;
}

function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
}

function shuffled(n: number, seed: string) {
  const rnd = seeded(seed);
  const a = Array.from({ length: n }, (_, i) => i);
  for (let k = 0; k < 8; k++) {
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (n < 2 || a.some((v, i) => v !== i)) break;
  }
  return a;
}

/** حافة ممزقة ثابتة (لا عشوائية بين الرسمات) للشكل النهائي. */
function tornClip(seed: string) {
  const rnd = seeded(seed + "torn");
  const amp = 1.3;
  const pts: string[] = [];
  const steps = 14;
  for (let i = 0; i <= steps; i++) pts.push(`${((i / steps) * 100).toFixed(1)}% ${(rnd() * amp).toFixed(2)}%`);
  for (let i = 1; i < steps; i++) pts.push(`${(100 - rnd() * amp).toFixed(2)}% ${((i / steps) * 100).toFixed(1)}%`);
  for (let i = steps; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(1)}% ${(100 - rnd() * amp).toFixed(2)}%`);
  for (let i = steps - 1; i > 0; i--) pts.push(`${(rnd() * amp).toFixed(2)}% ${((i / steps) * 100).toFixed(1)}%`);
  return `polygon(${pts.join(",")})`;
}

export default function Jigsaw({ config, onResult }: PuzzleProps<Cfg>) {
  const N = Math.max(2, Math.min(15, config.pieces));
  const { src, rx, ry, rw, rh } = useMemo(() => parseImage(config.image), [config.image]);

  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setNat(null); setFailed(false);
    const im = new Image();
    im.onload = () => setNat({ w: im.naturalWidth, h: im.naturalHeight });
    im.onerror = () => setFailed(true);
    im.src = src;
    return () => { im.onload = null; im.onerror = null; };
  }, [src]);

  const aspect = nat ? (nat.w * rw) / (nat.h * rh) : (FALLBACK_ASPECT * rw) / rh;
  const [cols, rows] = useMemo(() => gridFor(N, aspect), [N, aspect]);
  const order = useMemo(() => shuffled(N, config.image + N), [N, config.image]);
  const clip = useMemo(() => tornClip(config.image), [config.image]);

  const [slots, setSlots] = useState<(number | null)[]>(() => Array(N).fill(null));
  const [selected, setSelected] = useState<number | null>(null);
  const [wrong, setWrong] = useState(0);
  const [msg, setMsg] = useState("");
  const [peek, setPeek] = useState(false);
  const [done, setDone] = useState(false);
  const [drag, setDrag] = useState<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => { setSlots(Array(N).fill(null)); setSelected(null); setWrong(0); setMsg(""); setDone(false); }, [N, config.image]);

  const boardRef = useRef<HTMLDivElement>(null);
  const [bw, setBw] = useState(300);
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBw(el.clientWidth));
    ro.observe(el); setBw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const tray = order.filter((id) => !slots.includes(id));
  const pw = bw / cols;
  const ph = bw / aspect / rows;

  const bgStyle = (id: number): React.CSSProperties => {
    const col = id % cols, row = Math.floor(id / cols);
    const cw = cols / rw, chh = rows / rh;
    const px = cw > 1 ? ((rx * cols) / rw + col) / (cw - 1) * 100 : 0;
    const py = chh > 1 ? ((ry * rows) / rh + row) / (chh - 1) * 100 : 0;
    if (failed) {
      return { background: `linear-gradient(${135 + id * 17}deg, var(--nile-water), var(--ember))` };
    }
    return {
      backgroundImage: `url("${src}")`,
      backgroundSize: `${cw * 100}% ${chh * 100}%`,
      backgroundPosition: `${px}% ${py}%`,
      backgroundRepeat: "no-repeat",
    };
  };

  const place = useCallback((id: number, slot: number) => {
    if (done || slots[slot] === slot) return;
    const next = [...slots];
    const origin = next.indexOf(id);
    if (origin === slot) return;
    if (origin !== -1 && next[origin] === origin) return; // قطعة مثبّتة
    const occupant = next[slot];
    if (origin !== -1) next[origin] = null;
    next[slot] = id;
    if (origin !== -1 && occupant !== null) next[origin] = occupant;
    setSlots(next);
    setSelected(null);

    if (next.every((v, i) => v === i)) {
      setDone(true); setMsg("");
      onResult(true);
      return;
    }
    if (id === slot) { setMsg(""); return; }
    const w = wrong + 1;
    if (w >= WRONG_LIMIT) {
      setWrong(0);
      setMsg("بعض القطع ما زالت في غير مكانها. تأمّلي حواف الصورة وألوانها.");
      onResult(false);
    } else {
      setWrong(w);
      setMsg("هذه القطعة لا تلتقي مع جاراتها هنا.");
    }
  }, [done, slots, wrong, onResult]);

  const toTray = useCallback((id: number) => {
    const origin = slots.indexOf(id);
    if (origin === -1 || slots[origin] === origin || done) return;
    const next = [...slots]; next[origin] = null;
    setSlots(next); setSelected(null);
  }, [slots, done]);

  /* ---- سحب وإفلات بالمؤشر (يعمل باللمس والماوس) ---- */
  const dragInfo = useRef<{ id: number; sx: number; sy: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const onPointerDown = (e: React.PointerEvent, id: number) => {
    if (done) return;
    dragInfo.current = { id, sx: e.clientX, sy: e.clientY, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragInfo.current;
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 8) d.moved = true;
    if (d.moved) setDrag({ id: d.id, x: e.clientX, y: e.clientY });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragInfo.current;
    dragInfo.current = null;
    if (!d) return;
    if (!d.moved) return; // نقرة: يعالجها onClick
    suppressClick.current = true;
    setTimeout(() => { suppressClick.current = false; }, 0);
    setDrag(null);
    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-slot],[data-tray]") as HTMLElement | null;
    if (!el) return;
    if (el.dataset.slot !== undefined) place(d.id, Number(el.dataset.slot));
    else toTray(d.id);
  };

  const tapPiece = (id: number) => {
    if (suppressClick.current || done) return;
    setSelected((s) => (s === id ? null : id));
  };
  const tapSlot = (slot: number) => {
    if (suppressClick.current || done) return;
    const occ = slots[slot];
    if (selected !== null) { place(selected, slot); return; }
    if (occ !== null && occ !== slot) setSelected(occ);
  };

  const pieceFace = (id: number) => (
    <span className="relative block h-full w-full" style={bgStyle(id)}>
      {failed && <span className="absolute inset-0 grid place-items-center text-lg font-bold opacity-40">{id + 1}</span>}
    </span>
  );

  return (
    <div dir="rtl" className="mx-auto w-full max-w-xl select-none" style={{ touchAction: "pan-y" }}>
      <p className="mb-2 text-center text-sm opacity-80">
        اسحبي كل قطعة إلى مكانها، أو اضغطي قطعة ثم اضغطي الخانة.
      </p>

      <div className="mb-2 flex items-center justify-center gap-2">
        <button
          type="button"
          className="rounded-lg border border-[var(--papyrus)]/40 px-3 text-sm"
          onClick={() => setPeek((p) => !p)}
          aria-pressed={peek}
        >
          {peek ? "إخفاء الصورة" : "أرِني الصورة"}
        </button>
      </div>

      {peek && !failed && (
        <div className="mx-auto mb-3 overflow-hidden rounded-lg opacity-90" style={{ width: "40%", aspectRatio: String(aspect) }}>
          <div className="h-full w-full" style={{ ...bgStyle(0), backgroundImage: `url("${src}")`, backgroundSize: `${100 / rw}% ${100 / rh}%`, backgroundPosition: `${rw < 1 ? (rx / (1 - rw)) * 100 : 0}% ${rh < 1 ? (ry / (1 - rh)) * 100 : 0}%` }} />
        </div>
      )}

      {/* اللوحة */}
      <div
        className="mx-auto"
        style={{
          width: `min(100%, calc(55vh * ${aspect}))`,
          filter: done ? "drop-shadow(0 0 14px var(--ember))" : undefined,
          transition: "filter .5s",
        }}
      >
        <div ref={boardRef} style={{ clipPath: clip, aspectRatio: String(aspect), background: "rgba(0,0,0,.25)" }}>
          <div className="grid h-full w-full" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, direction: "ltr" }}>
            {Array.from({ length: N }, (_, slot) => {
              const occ = slots[slot];
              const locked = occ === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  data-slot={slot}
                  aria-label={`خانة ${slot + 1}`}
                  onClick={() => tapSlot(slot)}
                  onPointerDown={occ !== null && !locked ? (e) => onPointerDown(e, occ) : undefined}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  className="relative min-h-0 min-w-0 p-0"
                  style={{
                    minHeight: 0, minWidth: 0,
                    border: locked ? "2px solid var(--ember)" : "1px dashed rgba(239,227,200,.35)",
                    boxShadow: locked ? "inset 0 0 6px rgba(216,146,58,.55)" : undefined,
                    outline: occ !== null && selected === occ ? "3px solid var(--ember)" : undefined,
                    outlineOffset: -3,
                    touchAction: occ !== null && !locked ? "none" : "pan-y",
                    opacity: drag && drag.id === occ ? 0.35 : 1,
                  }}
                >
                  {occ !== null ? pieceFace(occ) : <span className="text-xs opacity-30">{slot + 1}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-2 min-h-6 text-center text-sm" role="status" aria-live="polite" style={{ color: "var(--ember)" }}>
        {done ? "اكتملت القطعة." : msg}
      </p>

      {/* الصينية */}
      {!done && (
        <div
          data-tray
          className="mx-auto mt-2 flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--papyrus)]/30 p-2"
        >
          {tray.length === 0 && <span className="text-sm opacity-60">الصينية فارغة</span>}
          {tray.map((id) => {
            const w = Math.max(44, Math.min(pw, 96));
            const h = Math.max(44, w * (ph / pw));
            return (
              <button
                key={id}
                type="button"
                aria-label={`قطعة ${id + 1}`}
                onClick={() => tapPiece(id)}
                onPointerDown={(e) => onPointerDown(e, id)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                className="overflow-hidden rounded p-0"
                style={{
                  width: w, height: h, touchAction: "none",
                  outline: selected === id ? "3px solid var(--ember)" : undefined,
                  outlineOffset: 1,
                  opacity: drag && drag.id === id ? 0.35 : 1,
                  boxShadow: "0 2px 6px rgba(0,0,0,.4)",
                }}
              >
                {pieceFace(id)}
              </button>
            );
          })}
        </div>
      )}

      {drag && (
        <div
          className="pointer-events-none fixed z-50 overflow-hidden rounded shadow-xl"
          style={{ left: drag.x - pw / 2, top: drag.y - ph / 2, width: pw, height: ph, opacity: 0.9 }}
        >
          {pieceFace(drag.id)}
        </div>
      )}
    </div>
  );
}
