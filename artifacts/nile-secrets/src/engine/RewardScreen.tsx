import { useState } from "react";
import { navigate } from "./router";
import { getChapter } from "./content";
import { ownsSymbol, symbolOf } from "./symbols";
import { useProgress } from "./store";
import ItemIcon from "./ItemIcon";
import MapPiece from "./MapPiece";
import { playSuccess } from "./audio";
import { pad2 } from "./legacyArt";

/** بعد إكمال البوس (l7): 1) قطعة الخريطة 2) رمز الفصل. الفصل 5: الخريطة الكاملة ثم الرمز ثم الخاتمة. */
export default function RewardScreen({ chapter }: { chapter: number }) {
  const p = useProgress();
  const [step, setStep] = useState<0 | 1>(0);
  const sym = symbolOf(chapter);
  const ch = getChapter(chapter);
  const final = chapter === 5;

  if (!sym || !ownsSymbol(p, chapter)) {
    return (
      <main className="game-shell" dir="rtl">
        <section className="rw-screen">
          <div className="rw-card">
            <p>أكملي مستوى الفصل الأخير أولاً لتنالي القطعة.</p>
            <button className="button button-light" onClick={() => navigate("/map")}>العودة إلى الخريطة</button>
          </div>
        </section>
      </main>
    );
  }

  const pieceLabel = final ? "الخريطة كاملة" : ch?.mapPiece?.label ?? `قطعة الخريطة ${chapter}`;
  const leave = () => navigate(final ? "/ending" : "/map");

  return (
    <main className="game-shell" dir="rtl">
      <section className="rw-screen">
        <div className="rw-card" key={step}>
          <div className="rw-kicker">الفصل {pad2(chapter)} <i /> {step === 0 ? "قطعة الخريطة" : "رمز الفصل"}</div>
          {step === 0 ? (
            <>
              <MapPiece cell={chapter} full={final} label={pieceLabel} />
              <p className="rw-text">{final ? "اجتمعت القطع الخمس، وظهر الطريق إلى الضفة الهادئة." : "قطعة جديدة من الخريطة الممزقة صارت معك."}</p>
              <button className="button button-light" onClick={() => { playSuccess(); setStep(1); }}>التالي</button>
            </>
          ) : (
            <>
              <div className="rw-symbol"><ItemIcon item={{ label: sym.name, icon: sym.id }} size={132} /></div>
              <h2 className="rw-title">{sym.name}</h2>
              <p className="rw-text">{sym.meaning}<br />أُضيف الرمز إلى حقيبتك.</p>
              <button className="button button-light" onClick={leave}>{final ? "الخاتمة" : "العودة إلى الخريطة"}</button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
