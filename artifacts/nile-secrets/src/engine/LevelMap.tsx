import { Flag, Lock, Star } from "lucide-react";
import { getChapter, getOrderedLevelIds } from "./content";
import { navigate } from "./router";
import { isChapterUnlocked, isLevelUnlocked, useProgress } from "./store";
import { chapterLevelIds } from "./unlock";

const STEP = 104; // ارتفاع كل عقدة بالبكسل

/** عقد المستويات الموجودة فعلياً على خط النهر. المستوى 7 (boss) أكبر وبعلم. */
export default function LevelMap({ chapter }: { chapter: number }) {
  const p = useProgress();
  const order = getOrderedLevelIds();
  const ch = getChapter(chapter);
  const ids = chapterLevelIds(chapter, order);

  if (!ch || ids.length === 0 || !isChapterUnlocked(p, chapter, order)) {
    return (
      <main className="mx-auto max-w-xl p-6 text-center">
        <p className="mb-4">{!ch || ids.length === 0 ? "هذا الفصل قريباً." : "أكملي الفصل السابق أولاً."}</p>
        <button className="rounded-lg bg-[var(--ember)] px-4 font-bold text-[var(--ink)]" onClick={() => navigate("/")}>الرجوع</button>
      </main>
    );
  }

  const levels = ids.map((id) => ch.levels.find((l) => l.id === id)!);
  const H = levels.length * STEP;
  // موضع كل عقدة: تموّج على خط النهر (x بالمئة، y بالبكسل)
  const pos = levels.map((_, i) => ({ x: 50 + 24 * Math.sin(i * 1.15 + 0.4), y: i * STEP + STEP / 2 }));
  const riverD = pos.reduce((d, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = pos[i - 1];
    return `${d} C ${prev.x} ${prev.y + STEP * 0.55}, ${pt.x} ${pt.y - STEP * 0.55}, ${pt.x} ${pt.y}`;
  }, "");

  return (
    <main className="mx-auto max-w-xl p-4 pb-8">
      <header className="mb-3 flex items-center justify-between">
        <button className="rounded-lg bg-black/40 px-3" onClick={() => navigate("/")}>الخريطة</button>
        <div className="text-center">
          <h1 className="text-xl font-extrabold">{ch.title}</h1>
          <p className="text-xs opacity-75">{ch.location}</p>
        </div>
        <span className="w-[60px]" />
      </header>
      {ch.summary && <p className="mb-4 rounded-lg bg-black/30 p-3 text-sm">{ch.summary}</p>}

      <div className="relative" style={{ height: H }}>
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden>
          <path d={riverD} fill="none" stroke="var(--nile-water)" strokeWidth={14} strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity={0.55} />
          <path d={riverD} fill="none" stroke="var(--papyrus)" strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity={0.45} />
        </svg>
        {levels.map((l, i) => {
          const done = p.completed[l.id];
          const open = isLevelUnlocked(p, l.id, order);
          const size = l.isBoss ? 64 : 52;
          return (
            <button
              key={l.id}
              disabled={!open}
              aria-label={`${l.title}${done ? ` — ${done.stars} من 3 نجوم` : open ? "" : " — مقفل"}`}
              onClick={() => navigate(`/level/${l.id}`)}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${open ? "" : "opacity-60"}`}
              style={{ left: `${pos[i].x}%`, top: pos[i].y }}
            >
              <span
                className={`grid place-items-center rounded-full border-[3px] font-extrabold shadow-lg ${
                  done ? "border-[var(--ember)] bg-[var(--papyrus)] text-[var(--ink)]" : open ? "border-white bg-[var(--nile-water)] text-white" : "border-white/30 bg-black/60 text-white/70"
                }`}
                style={{ width: size, height: size }}
              >
                {!open ? <Lock size={20} aria-hidden /> : l.isBoss ? <Flag size={26} aria-hidden /> : i + 1}
              </span>
              <span className="mt-1 max-w-[9rem] rounded bg-black/55 px-2 py-0.5 text-center text-xs leading-tight">{l.title}</span>
              {done && (
                <span className="mt-0.5 flex" aria-hidden>
                  {[1, 2, 3].map((s) => (
                    <Star key={s} size={14} className="text-[var(--ember)]" fill={s <= done.stars ? "currentColor" : "none"} />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </main>
  );
}
