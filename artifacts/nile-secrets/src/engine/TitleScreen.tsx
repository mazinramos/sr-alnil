import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { navigate } from "./router";
import { resetProgress, useProgress } from "./store";
import { ConfirmDialog } from "./Drawers";
import { STOP_ART, useArt } from "./legacyArt";
import IntroVideo from "./IntroVideo";
import Logo from "./Logo";

export default function TitleScreen() {
  const p = useProgress();
  const [confirm, setConfirm] = useState(false);
  const [intro, setIntro] = useState(false);
  const started = Object.keys(p.completed).length > 0;
  const titleArt = useArt("/art/ui/title.webp", STOP_ART[0]);
  return (
    <main className="game-shell" dir="rtl">
      <section className="title-screen">
        <div className="title-art" style={{ backgroundImage: titleArt }} />
        <div className="title-shade" />
        <div className="title-content">
          <Logo size={72} />
          <h1>سرّ <em>النيل</em></h1>
          <p className="title-subtitle">الحاجة البتتحفظ في الذاكرة ما بتضيع مع الموية.</p>
          <div className="title-actions">
            <button className="button button-light" onClick={() => navigate(started ? "/map" : "/level/c1-l1")}>
              <span>{started ? "كمّلي الرحلة" : "ابدئي الرحلة"}</span><ChevronLeft size={18} />
            </button>
            {started && <button className="text-button" onClick={() => setConfirm(true)}>ابدئي حكاية جديدة</button>}
            <button className="text-button" onClick={() => setIntro(true)}>شاهدي المقدّمة</button>
          </div>
        </div>
        {intro && <IntroVideo onDone={() => setIntro(false)} />}
        {confirm && <ConfirmDialog onCancel={() => setConfirm(false)} onConfirm={() => { resetProgress(); setConfirm(false); }} />}
      </section>
    </main>
  );
}
