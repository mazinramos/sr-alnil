import { BookOpen, Compass, RotateCcw, X, ChevronLeft } from "lucide-react";
import { getChapters } from "./content";
import { useProgress } from "./store";
import { pad2 } from "./legacyArt";

/** الدفتر والحقيبة بنفس تصميم ريبلت. الدلائل من المحتوى، والقطع = قطع الخريطة لفصول أنهت لاعبتها البوس. */
export function useNotebookData() {
  const p = useProgress();
  const chapters = getChapters();
  const clues = chapters.flatMap((c) =>
    c.levels.flatMap((l) => l.clues.filter((k) => p.discoveredClues.includes(k.id)).map((k) => ({ ...k, stageTitle: l.title }))),
  );
  const rewards = chapters
    .filter((c) => c.levels.some((l) => (l.isBoss || l.index === 7) && p.completed[l.id]))
    .map((c) => ({ label: c.mapPiece?.label ?? c.title, n: c.id }));
  return { clues, rewards };
}

export function Drawer({ mode, close }: { mode: "notebook" | "inventory"; close: () => void }) {
  const { clues, rewards } = useNotebookData();
  const notebook = mode === "notebook";
  return (
    <div className="overlay-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <section className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <header className="drawer-header">
          <div className="drawer-icon">{notebook ? <BookOpen size={20} /> : <Compass size={20} />}</div>
          <div><span>{notebook ? "الملاحظات" : "المقتنيات"}</span><h2 id="drawer-title">{notebook ? "دفتر نور" : "حقيبة الرحلة"}</h2></div>
          <button className="icon-button drawer-close" onClick={close} aria-label="إغلاق"><X size={20} /></button>
        </header>
        <div className="drawer-scroll">
          {notebook ? (
            <>
              <p className="drawer-lede">ما التقطته نور على الطريق. بعض العلامات لا تظهر إلا حين تقتربين منها.</p>
              {clues.length ? clues.map((c) => (
                <article className="note-entry" key={c.id}><span>{c.stageTitle} <i>·</i> {c.source}</span><h3>{c.title}</h3><p>{c.text}</p></article>
              )) : <div className="empty-notebook"><BookOpen size={25} /><b>الصفحات الأولى فارغة</b><span>ابدئي أول مستوى لتُسجَّل الدلائل هنا.</span></div>}
            </>
          ) : (
            <>
              <p className="drawer-lede">قطع صغيرة من حكاية أكبر، تجمعها نور في حقيبتها.</p>
              <div className="inventory-grid">
                {rewards.length ? rewards.map((r) => (
                  <div className="inventory-item" key={r.n}><span className="relic-shape">{["◒", "⌁", "▤", "▱", "◇"][r.n - 1] ?? "◇"}</span><b>{r.label}</b><small>الفصل {pad2(r.n)}</small></div>
                )) : <div className="empty-notebook"><Compass size={25} /><b>الحقيبة خفيفة</b><span>تُضاف قطعة الخريطة عند إنهاء آخر مستوى في كل فصل.</span></div>}
              </div>
              <div className="inventory-count"><span>ما جُمع</span><b>{pad2(rewards.length)} / 05</b></div>
            </>
          )}
        </div>
        <footer className="drawer-footer"><span>سرّ النيل</span><button className="subtle-button" onClick={close}>متابعة الرحلة <ChevronLeft size={14} /></button></footer>
      </section>
    </div>
  );
}

export function ConfirmDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="overlay-backdrop confirm-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <div className="confirm-mark"><RotateCcw size={20} /></div>
        <h2 id="confirm-title">بدء حكاية جديدة؟</h2>
        <p>سيُمحى التقدّم المحفوظ لهذه الرحلة من هذا المتصفح. هل تريدين المتابعة؟</p>
        <div className="confirm-actions">
          <button className="button button-light" onClick={onConfirm}>بدء من جديد</button>
          <button className="button button-quiet" onClick={onCancel}>إلغاء</button>
        </div>
      </section>
    </div>
  );
}
