import { useState } from "react";
import { BookOpen, Check, ChevronLeft, Compass, LockKeyhole, RotateCcw, Star } from "lucide-react";
import { getChapter, getOrderedLevelIds } from "./content";
import { navigate } from "./router";
import { ALL_LEVEL_IDS, chapterStars, isChapterUnlocked, resetProgress, useProgress } from "./store";
import { chapterLevelIds } from "./unlock";
import { ConfirmDialog, Drawer } from "./Drawers";
import { SettingsButton, SettingsDialog } from "./SettingsDialog";
import { CHAPTER_FALLBACK, pad2, STOP_ART, thumbOf, useLazyArt } from "./legacyArt";

/** مواضع المحطات الخمس كما في خريطة ريبلت الأصلية. */
const SPOTS = [
  { top: "6%", r: "15%" }, { top: "27%", r: "61%" }, { top: "46%", r: "25%" },
  { top: "67%", r: "62%" }, { top: "85%", r: "20%" },
];

/** خريطة الرحلة: 5 محطات = 5 فصول، على مسار ريبلت المتعرّج. */
export default function ChapterSelect() {
  const p = useProgress();
  const order = getOrderedLevelIds();
  const [overlay, setOverlay] = useState<"notebook" | "inventory" | null>(null);
  const [settings, setSettings] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const doneLevels = Object.keys(p.completed).length;

  const stops = [1, 2, 3, 4, 5].map((n) => {
    const ids = chapterLevelIds(n, order);
    const ch = getChapter(n);
    const done = ids.filter((id) => p.completed[id]).length;
    return {
      n, ch, ids, done,
      title: ch?.title ?? CHAPTER_FALLBACK[n - 1],
      location: ch?.location ?? "قريباً",
      soon: ids.length === 0,
      unlocked: isChapterUnlocked(p, n, order),
      complete: ids.length > 0 && done === ids.length,
      stars: chapterStars(p, n, order),
    };
  });
  const chaptersDone = stops.filter((s) => s.complete).length;
  const resume = order.includes(p.lastLevel) && !p.completed[p.lastLevel] ? p.lastLevel : order.find((id) => !p.completed[id]);

  return (
    <main className="game-shell" dir="rtl">
      <section className="map-screen">
        <header className="app-header">
          <button className="brand-button" onClick={() => navigate("/")} aria-label="العودة إلى البداية">
            <span className="brand-mark">ن</span><span className="brand-copy"><b>سرّ النيل</b><small>حكاية من الضفاف</small></span>
          </button>
          <div className="header-progress"><span>مسار الرحلة</span><div className="progress-track"><i style={{ width: `${(doneLevels / ALL_LEVEL_IDS.length) * 100}%` }} /></div><b>{pad2(doneLevels)} / {ALL_LEVEL_IDS.length}</b></div>
          <div className="header-tools">
            <SettingsButton onClick={() => setSettings(true)} />
            <button className="icon-button" onClick={() => setOverlay("notebook")} aria-label="فتح دفتر الملاحظات"><BookOpen size={19} /><span>الدفتر</span>{p.discoveredClues.length > 0 && <i className="tool-count">{p.discoveredClues.length}</i>}</button>
            <button className="icon-button" onClick={() => setOverlay("inventory")} aria-label="فتح الحقيبة"><Compass size={19} /><span>الحقيبة</span></button>
          </div>
        </header>

        <div className="map-layout">
          <div className="map-intro">
            <div className="eyebrow dark-eyebrow"><span /> سجل الرحلة <span /></div>
            <h1>على أثر <em>الماء</em></h1>
            <p>من غرفة صفية إلى الضفة التي هدأ عندها النهر. اختاري محطتك التالية، أو عودي إلى الأماكن التي تركتِ فيها علامة.</p>
            <div className="map-stat-row">
              <div><b>{pad2(chaptersDone)}</b><span>محطات مكتملة</span></div>
              <div><b>{pad2(p.discoveredClues.length)}</b><span>دلائل مكتشفة</span></div>
            </div>
            <div className="route-key"><span className="key-dot complete" /> أُنجزت <span className="key-dot current" /> متاحة <span className="key-dot locked" /> لاحقاً</div>
            {resume && (
              <button className="button button-light" style={{ marginTop: 22 }} onClick={() => navigate(`/level/${resume}`)}>
                <span>{doneLevels ? "تابعي الرحلة" : "ابدئي الرحلة"}</span><ChevronLeft size={18} />
              </button>
            )}
          </div>

          <div className="route-board" aria-label="خريطة المحطات">
            <div className="route-water" />
            <svg className="route-line" viewBox="0 0 640 580" preserveAspectRatio="none" aria-hidden="true">
              <path d="M520 70 C465 115 220 98 160 184 C120 240 370 240 440 326 C515 417 250 405 190 500" />
            </svg>
            {stops.map((s, i) => (
              <button
                key={s.n}
                className={`map-stop ${s.unlocked ? "is-open" : "is-locked"} ${s.complete ? "is-done" : ""}`}
                style={{ top: SPOTS[i].top, ['--r' as string]: SPOTS[i].r } as React.CSSProperties}
                disabled={!s.unlocked}
                onClick={() => navigate(`/chapter/${s.n}`)}
                aria-label={`${s.title}${s.complete ? "، مكتملة" : s.soon ? "، قريباً" : s.unlocked ? "، متاحة" : "، مقفلة"}`}
              >
                <StopThumb art={STOP_ART[i]}>
                  {!s.unlocked && <LockKeyhole size={16} />}
                  {s.complete && <span className="stop-check"><Check size={13} /></span>}
                </StopThumb>
                <span className="stop-copy">
                  <small>الفصل {pad2(s.n)}{s.ids.length > 0 && ` · ${s.done}/${s.ids.length}`}{s.stars > 0 && <> · <Star size={11} fill="currentColor" aria-hidden style={{ verticalAlign: "-1px" }} />{s.stars}</>}</small>
                  <b>{s.title}</b>
                  <em>{s.soon ? "قريباً" : s.location}</em>
                </span>
                <span className="stop-arrow">{s.unlocked ? <ChevronLeft size={15} /> : <LockKeyhole size={14} />}</span>
              </button>
            ))}
            <span className="river-label">النيل</span>
            <span className="map-caption">خطّ الرحلة — خمس محطات</span>
          </div>
        </div>
        <footer className="map-footer">
          <span>سرّ النيل <i>—</i> حكاية عن الذاكرة المشتركة</span>
          <button className="subtle-button" onClick={() => setConfirm(true)}><RotateCcw size={14} /> إعادة الحكاية</button>
        </footer>
        {overlay && <Drawer mode={overlay} close={() => setOverlay(null)} />}
        {settings && <SettingsDialog close={() => setSettings(false)} />}
        {confirm && <ConfirmDialog onCancel={() => setConfirm(false)} onConfirm={() => { resetProgress(); setConfirm(false); navigate("/"); }} />}
      </section>
    </main>
  );
}

/** صورة المحطة المصغّرة: لا تُحمَّل حتى تقترب من الشاشة. */
function StopThumb({ art, children }: { art: string; children: React.ReactNode }) {
  const [ref, bg] = useLazyArt<HTMLSpanElement>(thumbOf(art), art);
  return <span ref={ref} className="stop-thumb" style={{ backgroundImage: bg }}>{children}</span>;
}
