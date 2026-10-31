import { useState } from "react";
import { BookOpen, Compass, Flag, LockKeyhole, Star } from "lucide-react";
import { getChapter, getOrderedLevelIds } from "./content";
import { navigate } from "./router";
import { isChapterUnlocked, isLevelUnlocked, useProgress } from "./store";
import { chapterLevelIds } from "./unlock";
import { SettingsButton, SettingsDialog } from "./SettingsDialog";
import { Drawer } from "./Drawers";
import { pad2, STOP_ART, thumbOf, useLazyArt } from "./legacyArt";

/** مستويات الفصل على مسار النهر بنفس لغة تصميم ريبلت. المستوى 7 (boss) أكبر وبعلم. */
export default function LevelMap({ chapter }: { chapter: number }) {
  const p = useProgress();
  const [overlay, setOverlay] = useState<"notebook" | "inventory" | null>(null);
  const [settings, setSettings] = useState(false);
  const order = getOrderedLevelIds();
  const ch = getChapter(chapter);
  const ids = chapterLevelIds(chapter, order);

  if (!ch || ids.length === 0 || !isChapterUnlocked(p, chapter, order)) {
    return (
      <main className="game-shell" dir="rtl">
        <section className="map-screen" style={{ placeItems: "center", display: "grid", textAlign: "center", padding: 24 }}>
          <div>
            <p>{!ch || ids.length === 0 ? "هذا الفصل قريباً." : "أكملي الفصل السابق أولاً."}</p>
            <button className="button button-light" style={{ marginTop: 14 }} onClick={() => navigate("/map")}>العودة إلى الخريطة</button>
          </div>
        </section>
      </main>
    );
  }

  const levels = ids.map((id) => ch.levels.find((l) => l.id === id)!);
  const n = levels.length;
  const pts = levels.map((_, i) => ({ x: 50 + (i % 2 ? 24 : -24) + 6 * Math.sin(i * 1.7), y: n === 1 ? 50 : 8 + (i * 84) / (n - 1) }));
  const d = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const q = pts[i - 1];
    const my = (q.y + pt.y) / 2;
    return `${acc} C ${q.x} ${my}, ${pt.x} ${my}, ${pt.x} ${pt.y}`;
  }, "");
  const doneCount = ids.filter((id) => p.completed[id]).length;
  const art = STOP_ART[chapter - 1];

  return (
    <main className="game-shell" dir="rtl">
      <section className="map-screen">
        <header className="app-header">
          <button className="brand-button" onClick={() => navigate("/map")} aria-label="العودة إلى خريطة الرحلة">
            <span className="brand-mark">ن</span><span className="brand-copy"><b>خريطة الرحلة</b><small>الفصل {pad2(chapter)}</small></span>
          </button>
          <div className="header-progress"><span>{ch.title}</span><div className="progress-track"><i style={{ width: `${(doneCount / n) * 100}%` }} /></div><b>{pad2(doneCount)} / {pad2(n)}</b></div>
          <div className="header-tools">
            <SettingsButton onClick={() => setSettings(true)} />
            <button className="icon-button" onClick={() => setOverlay("notebook")} aria-label="فتح دفتر الملاحظات"><BookOpen size={19} /><span>الدفتر</span></button>
            <button className="icon-button" onClick={() => setOverlay("inventory")} aria-label="فتح الحقيبة"><Compass size={19} /><span>الحقيبة</span></button>
          </div>
        </header>

        <div className="map-layout">
          <div className="map-intro">
            <div className="eyebrow dark-eyebrow"><span /> الفصل {pad2(chapter)} · {ch.location} <span /></div>
            <h1>{ch.title}</h1>
            {ch.summary && <p>{ch.summary}</p>}
            <div className="map-stat-row">
              <div><b>{pad2(doneCount)}</b><span>مستويات مكتملة</span></div>
              <div><b>{pad2(n - doneCount)}</b><span>متبقية</span></div>
            </div>
            <div className="route-key"><span className="key-dot complete" /> أُنجز <span className="key-dot current" /> متاح <span className="key-dot locked" /> لاحقاً</div>
          </div>

          <div className="route-board lv-board" style={{ minHeight: Math.max(440, n * 96) }} aria-label="مستويات الفصل">
            <div className="route-water" />
            <svg className="route-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d={d} vectorEffect="non-scaling-stroke" />
            </svg>
            {levels.map((l, i) => {
              const done = p.completed[l.id];
              const open = isLevelUnlocked(p, l.id, order);
              return (
                <button
                  key={l.id}
                  className={`lv-node ${l.isBoss ? "boss" : ""} ${done ? "is-done" : ""} ${open ? "" : "is-locked"}`}
                  style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
                  disabled={!open}
                  aria-label={`${l.title}${done ? ` — ${done.stars} من 3 نجوم` : open ? "" : " — مقفل"}`}
                  onClick={() => navigate(`/level/${l.id}`)}
                >
                  <Thumb src={l.background} fallback={art}>
                    {!open ? <LockKeyhole size={18} /> : l.isBoss ? <Flag size={24} /> : i + 1}
                  </Thumb>
                  <span className="lv-label">{l.title}</span>
                  {done && (
                    <span className="lv-stars" aria-hidden>
                      {[1, 2, 3].map((s) => <Star key={s} size={12} fill={s <= done.stars ? "currentColor" : "none"} />)}
                    </span>
                  )}
                </button>
              );
            })}
            <span className="river-label">النيل</span>
            <span className="map-caption">{ch.location}</span>
          </div>
        </div>
        <footer className="map-footer"><span>سرّ النيل <i>—</i> {ch.title}</span><button className="subtle-button" onClick={() => navigate("/map")}>خريطة الرحلة</button></footer>
        {overlay && <Drawer mode={overlay} close={() => setOverlay(null)} />}
        {settings && <SettingsDialog close={() => setSettings(false)} />}
      </section>
    </main>
  );
}

/** صورة مصغّرة للمستوى: تُحمَّل خلفية المستوى، والبديل القديم لو غابت. */
function Thumb({ src, fallback, children }: { src: string; fallback: string; children: React.ReactNode }) {
  const [ref, bg] = useLazyArt<HTMLSpanElement>(thumbOf(src), src, fallback);
  return <span ref={ref} className="lv-thumb" style={{ backgroundImage: bg }}>{children}</span>;
}
