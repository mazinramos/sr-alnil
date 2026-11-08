import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, SkipForward } from "lucide-react";
import { getProgress } from "./store";
import Logo from "./Logo";
import "../styles/intro.css";

const SEEN_KEY = "nile-intro-seen-v2";

export function introSeen(): boolean {
  try { return localStorage.getItem(SEEN_KEY) === "1"; } catch { return false; }
}
function markSeen() {
  try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* التخزين غير متاح: ما مشكلة */ }
}

/**
 * مقدّمة الحكاية. المتصفحات ما بتسمح بصوت تلقائي قبل لمسة من اللاعب،
 * فبنبدأ بشاشة بوّابة بشكل اللعبة، ولمسة زرّها هي اللي بتفتح الصوت وتشغّل الفيديو.
 */
export default function IntroVideo({ onDone }: { onDone: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    markSeen();
    setClosing(true);
    window.setTimeout(onDone, 450);
  }, [onDone]);

  const start = () => {
    setPlaying(true);
    const v = ref.current;
    if (!v) return;
    v.muted = !getProgress().settings.sound;
    v.currentTime = 0;
    v.play().catch(() => finish());
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") finish(); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [finish]);

  return (
    <div className={`intro-layer${closing ? " is-closing" : ""}`} dir="rtl" role="dialog" aria-label="مقدّمة الحكاية">
      <video
        ref={ref}
        className={`intro-video${playing ? " is-on" : ""}`}
        playsInline
        preload="auto"
        onEnded={finish}
      >
        <source media="(orientation: portrait)" src="/intro/intro_tall.mp4" />
        <source src="/intro/intro_wide.mp4" />
      </video>

      {!playing && (
        <>
        <div className="intro-dust" aria-hidden>{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ left: `${(i * 37 + 8) % 100}%`, animationDelay: `${(i * 0.9) % 8}s`, animationDuration: `${7 + (i % 5)}s` }} />)}</div>
          <svg className="intro-river" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden>{[14, 30, 46].map((y, i) => <path key={y} d={`M-100 ${y}q25-10 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0`} opacity={1 - i * 0.25} />)}</svg>
        <div className="intro-gate">
          <Logo size={150} animated />
          <h1>سرّ <em>النيل</em></h1>
          <p>حكاية بتبدأ من دفتر قديم.</p>
          <button className="button button-light intro-btn" onClick={start} autoFocus>
            <span>ادخلي إلى الحكاية</span><ChevronLeft size={18} />
          </button>
          <button className="text-button intro-skip-link" onClick={finish}>تخطّي المقدّمة</button>
        </div>
        </>
      )}

      {playing && (
        <button className="intro-skip" onClick={finish} aria-label="تخطّي الفيديو">
          <span>تخطّي</span><SkipForward size={16} />
        </button>
      )}
    </div>
  );
}
