import { Suspense, useEffect, useMemo, useState } from "react";
import type { Level } from "../content/types";
import { getPuzzleComponent } from "./registry";
import { completeLevel, discoverClues, setLastLevel } from "./store";
import { navigate } from "./router";
import { nextLevelId } from "./content";

type Phase = "play" | "done";

/** هيكل أولي (اليوم 1): خلفية + fallback، حوار، دلائل، لغز، تلميحات، محاولات، نتيجة بنجوم. */
export default function LevelRunner({ level }: { level: Level }) {
  const [hints, setHints] = useState<0 | 1 | 2 | 3>(0);
  const [attempts, setAttempts] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [phase, setPhase] = useState<Phase>("play");
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    setHints(0); setAttempts(0); setWrong(false); setPhase("play"); setImgOk(true);
    setLastLevel(level.id);
    discoverClues(level.clues.map((c) => c.id));
  }, [level.id]);

  const Puzzle = useMemo(() => getPuzzleComponent(level.puzzle.type), [level.puzzle.type]);
  const f = level.focal;
  const bgStyle: React.CSSProperties = imgOk
    ? {
        backgroundImage: `url(${level.background})`,
        backgroundSize: f?.zoom ? `${f.zoom * 100}%` : "cover",
        backgroundPosition: f ? `${f.x}% ${f.y}%` : "center",
      }
    : { backgroundImage: "linear-gradient(160deg, #2f6b73 0%, #1b2a2f 70%)" };

  function onResult(correct: boolean) {
    const n = attempts + 1;
    setAttempts(n);
    if (correct) {
      setWrong(false);
      setStars(completeLevel(level.id, hints, n));
      setPhase("done");
    } else setWrong(true);
  }

  const next = nextLevelId(level.id);
  return (
    <div className="relative mx-auto flex min-h-full max-w-xl flex-col" style={bgStyle}>
      {/* يتحقق من وجود الصورة بدون تخريب الواجهة */}
      <img src={level.background} alt="" className="hidden" onError={() => setImgOk(false)} />
      <div className="flex-1 bg-black/45 p-4 pb-0 backdrop-blur-[1px]">
        <header className="mb-3 flex items-center justify-between">
          <button className="rounded-lg bg-black/40 px-3" onClick={() => navigate("/")}>الخريطة</button>
          <h1 className="text-lg font-extrabold">{level.title}</h1>
          <span className="text-sm opacity-80">محاولات: {attempts}</span>
        </header>

        <section className="mb-3 rounded-xl bg-[var(--papyrus)] p-3 text-[var(--ink)]">
          {level.dialogue.map((d, i) => (
            <p key={i} className="mb-1 text-sm"><b>{d.speaker}: </b>{d.text}</p>
          ))}
          <p className="mt-2 border-t border-black/20 pt-2 font-bold">{level.objective}</p>
        </section>

        <section className="mb-3 grid gap-2">
          {level.clues.map((c) => (
            <article key={c.id} className="rounded-lg bg-black/45 p-3 text-sm">
              <b>{c.title}</b>
              <p>{c.text}</p>
              <small className="opacity-70">{c.source}</small>
            </article>
          ))}
        </section>

        {phase === "play" && (
          <section className="mb-3 rounded-xl bg-black/50 p-3">
            <Suspense fallback={<p className="p-4 text-center">…</p>}>
              <Puzzle config={level.puzzle} background={level.background} hintLevel={hints} onResult={onResult} />
            </Suspense>
            {wrong && <p role="alert" className="mt-2 text-center text-sm text-[var(--ember)]">ليست الإجابة الصحيحة بعد. راجعي الدلائل وجرّبي مرة أخرى.</p>}
          </section>
        )}

        {phase === "play" && (
          <footer className="sticky bottom-0 -mx-4 flex flex-col gap-2 bg-[var(--nile-deep)]/95 p-3">
            {hints > 0 && <p className="text-sm">تلميح {hints}: {level.hints[hints - 1]}</p>}
            <button
              className="rounded-lg bg-[var(--ember)] font-bold text-[var(--ink)] disabled:opacity-40"
              disabled={hints >= 3}
              onClick={() => { setWrong(false); setHints((h) => (h < 3 ? ((h + 1) as 1 | 2 | 3) : h)); }}
            >
              {hints >= 3 ? "لا مزيد من التلميحات" : `تلميح (${hints}/3)`}
            </button>
          </footer>
        )}

        {phase === "done" && (
          <section className="mb-4 rounded-xl bg-[var(--papyrus)] p-4 text-center text-[var(--ink)]">
            <p aria-label={`${stars} من 3 نجوم`} className="text-3xl tracking-widest">
              {"★".repeat(stars)}{"☆".repeat(3 - stars)}
            </p>
            <p className="my-2">{level.successText}</p>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-black/10 font-bold" onClick={() => navigate("/")}>الخريطة</button>
              {next && (
                <button className="flex-1 rounded-lg bg-[var(--nile-water)] font-bold text-white" onClick={() => navigate(`/level/${next}`)}>
                  المستوى التالي
                </button>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
