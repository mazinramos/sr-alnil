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
export default function IntroVideo({ onDone, direct = false }: { onDone: () => void; direct?: boolean }) {
  const [playing, setPlaying] = useState(direct);
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

  // «شاهدي المقدّمة» من داخل اللعبة: اللمسة حصلت خلاص، فنشغّل طوالي (وإن رفض المتصفح بنرجع للبوّابة).
  useEffect(() => {
    if (!direct) return;
    const v = ref.current;
    if (!v) return;
    v.muted = !getProgress().settings.sound;
    v.play().catch(() => setPlaying(false));
  }, [direct]);

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
                <div className="intro-gate">
          <Logo size={110} animated />
          <h1>سرّ <em>النيل</em></h1>
          <p>حكاية بتبدأ من دفتر قديم.</p>
          <button className="button button-light intro-btn" onClick={start} autoFocus>
            <span>ادخلي إلى الحكاية</span><ChevronLeft size={18} />
          </button>
          <button className="text-button intro-skip-link" onClick={finish}>تخطّي المقدّمة</button>
        </div>
      )}

      {playing && (
        <button className="intro-skip" onClick={finish} aria-label="تخطّي الفيديو">
          <span>تخطّي</span><SkipForward size={16} />
        </button>
      )}
    </div>
  );
}
