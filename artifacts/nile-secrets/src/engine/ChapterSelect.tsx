import { useState } from "react";
import { Lock, Star } from "lucide-react";
import { getChapter, getOrderedLevelIds } from "./content";
import { navigate } from "./router";
import { chapterStars, isChapterUnlocked, isStorageOk, useProgress } from "./store";
import { chapterLevelIds } from "./unlock";

/** عناوين احتياطية (LEVELS.md) للفصول اللي ملفها ما وصل بعد. */
const FALLBACK = ["القرية القديمة", "جزيرة الأسرار", "سوق الحكايات", "أطلال النهر", "الضفة الهادئة"];
// مواضع مؤقتة على خريطة النيل (٪). تُراجَع بأداة الإحداثيات بعد وصول ui/nile-map.webp.
const SPOTS = [{ x: 78, y: 78 }, { x: 62, y: 58 }, { x: 46, y: 62 }, { x: 30, y: 38 }, { x: 16, y: 20 }];

export default function ChapterSelect() {
  const p = useProgress();
  const [mapOk, setMapOk] = useState(true);
  const order = getOrderedLevelIds();

  const info = [1, 2, 3, 4, 5].map((n) => {
    const ids = chapterLevelIds(n, order);
    const done = ids.filter((id) => p.completed[id]).length;
    return {
      n,
      title: getChapter(n)?.title ?? FALLBACK[n - 1],
      soon: ids.length === 0,
      unlocked: isChapterUnlocked(p, n, order),
      total: ids.length,
      done,
      stars: chapterStars(p, n, order),
    };
  });

  const resume = order.includes(p.lastLevel) && !p.completed[p.lastLevel] ? p.lastLevel : order.find((id) => !p.completed[id]);

  return (
    <main className="mx-auto max-w-xl p-4 pb-8">
      <h1 className="mb-1 text-center text-3xl font-extrabold text-[var(--ember)]">سرّ النيل</h1>
      <p className="mb-3 text-center text-sm opacity-80">اتبعي النهر، واجمعي قطع الخريطة.</p>
      {!isStorageOk() && <p role="alert" className="mb-3 rounded bg-black/40 p-2 text-sm">تعذّر حفظ التقدّم على هذا المتصفح، وقد يضيع عند الإغلاق.</p>}

      <div
        className="relative mb-4 aspect-[3/2] overflow-hidden rounded-2xl border border-white/15"
        style={mapOk ? { backgroundImage: "url(/art/ui/nile-map.webp)", backgroundSize: "cover", backgroundPosition: "center" } : { backgroundImage: "linear-gradient(160deg, #2f6b73 0%, #1b2a2f 80%)" }}
      >
        <img src="/art/ui/nile-map.webp" alt="" className="hidden" onError={() => setMapOk(false)} />
        {info.map((c) => (
          <button
            key={c.n}
            aria-label={`${c.title}${c.soon ? " — قريباً" : !c.unlocked ? " — مقفل" : ""}`}
            disabled={!c.unlocked}
            onClick={() => navigate(`/chapter/${c.n}`)}
            className={`absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 font-extrabold shadow-lg ${
              c.unlocked ? "border-[var(--ember)] bg-[var(--papyrus)] text-[var(--ink)]" : "border-white/30 bg-black/60 text-white/70"
            }`}
            style={{ left: `${SPOTS[c.n - 1].x}%`, top: `${SPOTS[c.n - 1].y}%` }}
          >
            {c.unlocked ? c.n : <Lock size={18} aria-hidden />}
          </button>
        ))}
      </div>

      {resume && (
        <button className="mb-4 w-full rounded-xl bg-[var(--ember)] py-3 text-lg font-extrabold text-[var(--ink)]" onClick={() => navigate(`/level/${resume}`)}>
          {Object.keys(p.completed).length ? "تابعي الرحلة" : "ابدئي الرحلة"}
        </button>
      )}

      <ul className="grid gap-2">
        {info.map((c) => (
          <li key={c.n}>
            <button
              disabled={!c.unlocked}
              onClick={() => navigate(`/chapter/${c.n}`)}
              className={`flex w-full items-center gap-3 rounded-xl p-3 text-start ${c.unlocked ? "bg-[var(--papyrus)] text-[var(--ink)]" : "bg-black/35"}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--nile-water)] font-extrabold text-white">
                {c.unlocked ? c.n : <Lock size={16} aria-hidden />}
              </span>
              <span className="flex-1">
                <b className="block">{c.title}</b>
                <small className="opacity-75">
                  {c.soon ? "قريباً" : !c.unlocked ? "أكملي الفصل السابق" : `${c.done} من ${c.total} مكتمل`}
                </small>
              </span>
              {c.unlocked && c.stars > 0 && (
                <span className="flex items-center gap-1 text-sm font-bold"><Star size={16} fill="currentColor" aria-hidden />{c.stars}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
