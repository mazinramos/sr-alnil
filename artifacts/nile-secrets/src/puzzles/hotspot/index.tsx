import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import type { PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "hotspot" }>;

const ASPECT = 2 / 3; // ارتفاع / عرض (إطار 3:2)
const MISS_LIMIT = 3;

// إزاحة ثابتة (حتمية) من المعرّف كي لا تكون دائرة التلميح 1 مركّزة تماماً على الهدف.
function seededOffset(id: string): { dx: number; dy: number } {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const a = (h % 360) * (Math.PI / 180);
  return { dx: Math.cos(a), dy: Math.sin(a) };
}

export default function HotspotPuzzle({ config, background, hintLevel, onResult }: PuzzleProps<Cfg>) {
  const { targets, needed } = config;
  const frameRef = useRef<HTMLDivElement>(null);
  const [found, setFound] = useState<string[]>([]);
  const [misses, setMisses] = useState(0);
  const [shake, setShake] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const done = found.length >= needed;

  // إعادة ضبط كاملة لو تغيّر الإعداد (مستوى جديد).
  useEffect(() => {
    setFound([]);
    setMisses(0);
    setShake(false);
    setImgOk(true);
  }, [config]);

  const nextTarget = useMemo(() => targets.find((t) => !found.includes(t.id)), [targets, found]);

  function onTap(e: MouseEvent<HTMLDivElement>) {
    if (done || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;

    // r نسبة من العرض؛ نحوّل فرق Y لنفس الوحدة ليبقى الاكتشاف دائرياً.
    const hit = targets.find((t) => {
      const dx = px - t.x;
      const dy = (py - t.y) * ASPECT;
      return Math.hypot(dx, dy) <= t.r;
    });

    if (hit) {
      if (found.includes(hit.id)) return; // لمس عنصر مكتشف سابقاً: لا شيء
      const nextFound = [...found, hit.id];
      setFound(nextFound);
      setMisses(0);
      if (nextFound.length >= needed) onResult(true);
      return;
    }

    const m = misses + 1;
    setShake(true);
    if (m >= MISS_LIMIT) {
      setMisses(0);
      onResult(false);
    } else {
      setMisses(m);
    }
  }

  // تلميح بصري (لا يعرض مواقع النقاط إلا عبر hintLevel)
  const hintTarget = hintLevel > 0 ? nextTarget : undefined;
  let hintCircle: { x: number; y: number; r: number; strong: boolean } | null = null;
  if (hintTarget && !done) {
    if (hintLevel === 3) {
      hintCircle = { x: hintTarget.x, y: hintTarget.y, r: hintTarget.r * 1.4, strong: true };
    } else {
      const R = hintLevel === 1 ? Math.max(hintTarget.r * 4, 16) : Math.max(hintTarget.r * 2.2, 9);
      const o = seededOffset(hintTarget.id);
      const shift = R * 0.4; // الهدف يبقى داخل الدائرة دائماً
      hintCircle = {
        x: clamp(hintTarget.x + o.dx * shift, 0, 100),
        y: clamp(hintTarget.y + (o.dy * shift) / ASPECT, 0, 100),
        r: R,
        strong: false,
      };
    }
  }

  return (
    <div className="w-full" dir="rtl">
      <style>{`
        @keyframes hs-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
        @keyframes hs-pop { 0%{transform:translate(-50%,-50%) scale(.6);opacity:0} 100%{transform:translate(-50%,-50%) scale(1);opacity:1} }
        @keyframes hs-pulse { 0%,100%{opacity:.55} 50%{opacity:1} }
      `}</style>

      <div className="mb-2 flex min-h-[44px] flex-wrap items-center gap-2">
        <span
          className="rounded-full bg-black/45 px-3 py-1 text-sm font-bold text-[var(--ember)]"
          aria-live="polite"
        >
          {found.length}/{needed}
        </span>
        {found.map((id) => {
          const t = targets.find((x) => x.id === id);
          return (
            <span key={id} className="rounded-full bg-[var(--nile-water)] px-3 py-1 text-sm text-[var(--papyrus)]">
              {t?.label} ✓
            </span>
          );
        })}
      </div>

      <div
        ref={frameRef}
        onClick={onTap}
        onAnimationEnd={(e) => { if (e.target === e.currentTarget) setShake(false); }}
        className="relative w-full select-none overflow-hidden rounded-xl border border-white/15"
        style={{
          aspectRatio: "3 / 2",
          touchAction: "manipulation",
          cursor: done ? "default" : "pointer",
          background: "linear-gradient(160deg, var(--nile-water) 0%, var(--nile-deep) 70%)",
          animation: shake ? "hs-shake .28s ease-in-out" : undefined,
        }}
        role="group"
        aria-label="ابحثي في الصورة عن العناصر المطلوبة"
      >
        {imgOk && (
          <img
            src={background}
            alt=""
            draggable={false}
            onError={() => setImgOk(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {hintCircle && (
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${hintCircle.x}%`,
              top: `${hintCircle.y}%`,
              width: `${hintCircle.r * 2}%`,
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
              background: hintCircle.strong
                ? "radial-gradient(circle, rgba(216,146,58,.55) 0%, rgba(216,146,58,.15) 60%, transparent 72%)"
                : "radial-gradient(circle, rgba(239,227,200,.22) 0%, rgba(239,227,200,.10) 65%, transparent 72%)",
              border: hintCircle.strong ? "2px solid rgba(216,146,58,.8)" : "2px dashed rgba(239,227,200,.4)",
              animation: "hs-pulse 1.6s ease-in-out infinite",
            }}
          />
        )}

        {found.map((id) => {
          const t = targets.find((x) => x.id === id);
          if (!t) return null;
          return (
            <div
              key={id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.r * 2}%`,
                aspectRatio: "1 / 1",
                transform: "translate(-50%, -50%)",
                border: "3px solid var(--ember)",
                boxShadow: "0 0 14px 4px rgba(216,146,58,.75), inset 0 0 12px rgba(216,146,58,.5)",
                animation: "hs-pop .35s ease-out",
              }}
            />
          );
        })}
      </div>

      <p className="mt-2 min-h-[1.5rem] text-sm opacity-80" aria-live="polite">
        {done
          ? "أحسنتِ! وجدتِ كل ما هو مطلوب."
          : misses > 0
            ? "ليس هنا… تمعّني في الصورة جيداً."
            : "المسي الأماكن التي تظنين أن شيئاً مخبّأً فيها."}
      </p>
    </div>
  );
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
