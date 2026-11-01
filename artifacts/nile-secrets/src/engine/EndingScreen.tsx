import { useState } from "react";
import { ArrowLeft, ScrollText } from "lucide-react";
import { navigate } from "./router";
import { resetProgress, useProgress } from "./store";
import { ConfirmDialog, Drawer } from "./Drawers";
import Portrait from "./Portrait";
import { STOP_ART } from "./legacyArt";

/** الخاتمة بتصميم ريبلت. تظهر بعد آخر مستوى في اللعبة. */
export default function EndingScreen() {
  const p = useProgress();
  const [overlay, setOverlay] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <main className="game-shell" dir="rtl">
      <section className="ending-screen">
        <div className="ending-art" style={{ backgroundImage: `url(${STOP_ART[4]})` }} />
        <div className="ending-shade" />
        <header className="ending-top">
          <span className="brand-mark">ن</span><span>سرّ النيل <i>—</i> الخاتمة</span>
          <button className="glass-button" onClick={() => navigate("/map")}><ArrowLeft size={16} /> ارجعي للمحطات</button>
        </header>
        <div className="ending-copy">
          <div className="eyebrow"><span /> الضفة الهادئة <span /></div>
          <h1>الباقي<br /><em>للكل</em></h1>
          <p>الحافظة ما كانت مخبّية دهب. جواها سجل حبوبة صفية: أسماء عيلات، رسايل قصيرة، وحكايات عن البيوت الكانت واقفة هنا قبل ما مجرى الموية يتغيّر.</p>
          <blockquote>«الذاكرة ما بتخص الكتبها براهو. احفظوها لبعض.»<cite>— من دفتر حبوبة صفية</cite></blockquote>
          <div className="ending-actions">
            <button className="button button-light" onClick={() => setOverlay(true)}><ScrollText size={17} /> اقري الدلائل الجمعتيها</button>
            <button className="text-button" onClick={() => setConfirm(true)}>ارجعي للبداية</button>
          </div>
          <div className="ending-credit">خمس محطات <i /> {p.discoveredClues.length} دلائل <i /> سجل محفوظ</div>
        </div>
        <div className="ending-portrait"><Portrait id="nour" size={320} /></div>
        {overlay && <Drawer mode="notebook" close={() => setOverlay(false)} />}
        {confirm && <ConfirmDialog onCancel={() => setConfirm(false)} onConfirm={() => { resetProgress(); setConfirm(false); navigate("/"); }} />}
      </section>
    </main>
  );
}
