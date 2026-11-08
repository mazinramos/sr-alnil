import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { navigate } from "./router";
import { resetProgress, useProgress } from "./store";
import { ConfirmDialog } from "./Drawers";
import { STOP_ART, useArt } from "./legacyArt";
import IntroVideo from "./IntroVideo";

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
        <header className="top-mark"><span className="mark-glyph">ن</span><span>حكايات على النهر</span><span className="mark-line" /></header>
        <div className="title-content">
          <div className="eyebrow"><span /> مغامرة ألغاز وحكاية <span /></div>
          <h1>سرّ <em>النيل</em></h1>
          <p className="title-subtitle">الحاجة البتتحفظ في الذاكرة ما بتضيع مع الموية.</p>
          <p className="title-description">اتبعي أثر دفتر قديم من بيت حبوبة صفية لضفاف النهر. كل علامة بتودّي لحكاية، وكل حكاية بتخص زول.</p>
          <div className="title-actions">
            <button className="button button-light" onClick={() => navigate(started ? "/map" : "/level/c1-l1")}>
              <span>{started ? "كمّلي الرحلة" : "ابدئي الرحلة"}</span><ChevronLeft size={18} />
            </button>
            {started && <button className="text-button" onClick={() => setConfirm(true)}>ابدئي حكاية جديدة</button>}
            <button className="text-button" onClick={() => setIntro(true)}>شاهدي المقدّمة</button>
          </div>
          <div className="title-meta"><span>٣٥ مستوى</span><i /> <span>ألغاز من غير مؤقّت</span><i /> <span>بيتحفظ براهو</span></div>
        </div>
        <div className="title-side-note"><span>ضفاف من الخيال</span><span>حكاية عن الذاكرة والمكان</span></div>
        <div className="title-index">01 <span>/</span> 05</div>
        {intro && <IntroVideo onDone={() => setIntro(false)} />}
        {confirm && <ConfirmDialog onCancel={() => setConfirm(false)} onConfirm={() => { resetProgress(); setConfirm(false); }} />}
      </section>
    </main>
  );
}
