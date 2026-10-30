import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { navigate } from "./router";
import { resetProgress, useProgress } from "./store";
import { ConfirmDialog } from "./Drawers";
import { layered, STOP_ART } from "./legacyArt";

export default function TitleScreen() {
  const p = useProgress();
  const [confirm, setConfirm] = useState(false);
  const started = Object.keys(p.completed).length > 0;
  return (
    <main className="game-shell" dir="rtl">
      <section className="title-screen">
        <div className="title-art" style={{ backgroundImage: layered("/art/ui/title.webp", STOP_ART[0]) }} />
        <div className="title-shade" />
        <header className="top-mark"><span className="mark-glyph">ن</span><span>حكايات على النهر</span><span className="mark-line" /></header>
        <div className="title-content">
          <div className="eyebrow"><span /> مغامرة ألغاز سردية <span /></div>
          <h1>سرّ <em>النيل</em></h1>
          <p className="title-subtitle">ما يُحفظ في الذاكرة لا يضيع مع الماء.</p>
          <p className="title-description">تتبّعي أثر دفترٍ قديم من بيت صفية إلى ضفاف النهر. كل علامة تقود إلى حكاية، وكل حكاية تنتمي إلى أحد.</p>
          <div className="title-actions">
            <button className="button button-light" onClick={() => navigate(started ? "/map" : "/level/c1-l1")}>
              <span>{started ? "مواصلة الرحلة" : "ابدئي الرحلة"}</span><ChevronLeft size={18} />
            </button>
            {started && <button className="text-button" onClick={() => setConfirm(true)}>بدء حكاية جديدة</button>}
          </div>
          <div className="title-meta"><span>٣٥ مستوى</span><i /> <span>ألغاز بلا مؤقّت</span><i /> <span>حفظ تلقائي</span></div>
        </div>
        <div className="title-side-note"><span>ضفاف متخيّلة</span><span>حكاية عن الذاكرة والمكان</span></div>
        <div className="title-index">01 <span>/</span> 05</div>
        {confirm && <ConfirmDialog onCancel={() => setConfirm(false)} onConfirm={() => { resetProgress(); setConfirm(false); }} />}
      </section>
    </main>
  );
}
