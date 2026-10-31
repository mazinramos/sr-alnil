import { Suspense, useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronRight, Compass, Eye, HelpCircle, Sparkles, Star } from "lucide-react";
import type { Level } from "../content/types";
import { getPuzzleComponent } from "./registry";
import { completeLevel, discoverClues, setLastLevel } from "./store";
import { navigate } from "./router";
import { getChapter, nextLevelId } from "./content";
import Portrait from "./Portrait";
import { CHARACTERS, getCharacter } from "./characters";
import { Drawer } from "./Drawers";
import { playError, playSuccess } from "./audio";
import ErrorBoundary from "./ErrorBoundary";
import { PUZZLE_NAMES, pad2, STOP_ART, useArtUrl } from "./legacyArt";

type Phase = "play" | "done";

/** شاشة المستوى بتصميم ريبلت: سرد جانبي (حوار + هدف + دلائل) ولوحة اللغز. المنطق (نجوم/تلميحات) من store. */
export default function LevelRunner({ level }: { level: Level }) {
  const [hints, setHints] = useState<0 | 1 | 2 | 3>(0);
  const [attempts, setAttempts] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [phase, setPhase] = useState<Phase>("play");
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const [overlay, setOverlay] = useState<"notebook" | "inventory" | null>(null);

  useEffect(() => {
    setHints(0); setAttempts(0); setWrong(false); setPhase("play"); setOverlay(null);
    setLastLevel(level.id);
    discoverClues(level.clues.map((c) => c.id));
    window.scrollTo(0, 0);
  }, [level.id]);

  const Puzzle = useMemo(() => getPuzzleComponent(level.puzzle.type), [level.puzzle.type]);
  const ch = getChapter(level.chapter);
  const f = level.focal;
  // لو صورة المستوى لم تصل بعد: البديل القديم، فلا يظهر <img> مكسور داخل الألغاز التي تعرض الخلفية (route وhotspot وjigsaw).
  const artUrl = useArtUrl(level.background, STOP_ART[level.chapter - 1]);
  const levelArt = `url(${artUrl})`;
  const imgStyle: React.CSSProperties = {
    backgroundImage: levelArt,
    backgroundSize: f?.zoom ? `${f.zoom * 100}%, cover` : "cover",
    backgroundPosition: f ? `${f.x}% ${f.y}%, center` : "center",
  };

  function onResult(correct: boolean) {
    const n = attempts + 1;
    setAttempts(n);
    if (correct) {
      setWrong(false);
      setStars(completeLevel(level.id, hints, n));
      setPhase("done");
      playSuccess();
    } else {
      setWrong(true);
      playError();
    }
  }

  const next = nextLevelId(level.id);
  const lines = level.dialogue.map((d) => ({ ...d, who: Object.values(CHARACTERS).find((c) => c.name === d.speaker)?.id ?? level.character }));
  const isBoss = !!level.isBoss || level.index === 7;
  const isFinal = !next;

  return (
    <main className="game-shell" dir="rtl">
      <section className="stage-screen">
        <div className="stage-image" style={imgStyle} />
        <div className="stage-vignette" />
        <header className="stage-topbar">
          <button className="glass-button" onClick={() => navigate(`/chapter/${level.chapter}`)}><ChevronRight size={17} /> <span>خريطة الفصل</span></button>
          <div className="chapter-indicator"><span>الفصل {pad2(level.chapter)}</span><i />المستوى {level.index} من 7</div>
          <div className="stage-tools">
            <button className="glass-button" onClick={() => setOverlay("notebook")}><BookOpen size={17} /><span>الدفتر</span></button>
            <button className="glass-button" onClick={() => setOverlay("inventory")}><Compass size={17} /><span>الحقيبة</span></button>
          </div>
        </header>

        <div className="stage-body">
          <aside className="stage-narrative">
            <div className="stage-kicker"><span>المستوى {pad2(level.index)}</span><i />{ch?.location ?? ""}</div>
            <h1>{level.title}</h1>
            {lines.map((d, i) => (
              <div className="character-quote dialogue-line" key={i}>
                <div className="portrait-wrap"><Portrait id={d.who} size={56} /></div>
                <div className="quote-text"><b>{d.speaker}<small>{getCharacter(d.who)?.role}</small></b><p>«{d.text}»</p></div>
              </div>
            ))}
            <div className="objective"><span className="objective-icon"><Eye size={17} /></span><div><small>ما ينبغي فعله</small><p>{level.objective}</p></div></div>
            <div className="clue-area">
              <div className="clue-heading"><span>ما تلاحظينه</span><small>{level.clues.length} / {level.clues.length}</small></div>
              <div className="clue-list">
                {level.clues.map((c, idx) => (
                  <div key={c.id} className="clue-card found static">
                    <span className="clue-index">{idx + 1}</span>
                    <span><b>{c.title}</b><small>{c.text}</small><small className="clue-src">{c.source}</small></span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="puzzle-panel is-engine" aria-label={level.title}>
            <div className="puzzle-top">
              <div><span className="puzzle-label">ملفّ الاستدلال</span><h2>{PUZZLE_NAMES[level.puzzle.type] ?? "لغز"}</h2></div>
              <span className="puzzle-number">{pad2(level.index)}<i>/07</i></span>
            </div>

            {phase === "play" ? (
              <>
                <div className="puzzle-host">
                  <ErrorBoundary resetKey={level.id}>
                    <Suspense fallback={<p style={{ textAlign: "center", padding: 16 }}>…</p>}>
                      <Puzzle config={level.puzzle} background={artUrl} hintLevel={hints} onResult={onResult} />
                    </Suspense>
                  </ErrorBoundary>
                </div>
                {wrong && <p role="alert" className="wrong-note">ليست الإجابة الصحيحة بعد. راجعي الدلائل وجرّبي مرة أخرى.</p>}
                {hints > 0 && <div className="hint-note" role="status"><Sparkles size={16} /><span>{level.hints[hints - 1]}</span></div>}
                <div className="puzzle-bottom">
                  <button
                    className="hint-button"
                    disabled={hints >= 3}
                    onClick={() => { setWrong(false); setHints((h) => (h < 3 ? ((h + 1) as 1 | 2 | 3) : h)); }}
                  >
                    <HelpCircle size={16} /> {hints >= 3 ? "لا مزيد من التلميحات" : `تلميح اختياري (${hints}/3)`}
                  </button>
                  <span>لا يوجد مؤقّت</span>
                </div>
              </>
            ) : (
              <div className="result-card">
                <p className="result-stars" aria-label={`${stars} من 3 نجوم`}>{[1, 2, 3].map((n) => <Star key={n} size={30} fill={n <= stars ? "currentColor" : "none"} strokeWidth={1.6} style={{ margin: "0 2px", opacity: n <= stars ? 1 : 0.35 }} aria-hidden />)}</p>
                <p>{level.successText}</p>
                <div className="result-actions">
                  <button className="button button-quiet" onClick={() => navigate(`/chapter/${level.chapter}`)}>خريطة الفصل</button>
                  {isBoss
                    ? <button className="button button-light" onClick={() => navigate(`/reward/${level.chapter}`)}>قطعة الخريطة</button>
                    : isFinal
                      ? <button className="button button-light" onClick={() => navigate("/ending")}>الخاتمة</button>
                      : <button className="button button-light" onClick={() => navigate(`/level/${next}`)}>المستوى التالي</button>}
                  </div>
              </div>
            )}
          </section>
        </div>
        <div className="stage-footnote"><span>محاولات: {attempts}</span><span><i /> تقدمك محفوظ تلقائياً</span></div>
        {overlay && <Drawer mode={overlay} close={() => setOverlay(null)} />}
      </section>
    </main>
  );
}
