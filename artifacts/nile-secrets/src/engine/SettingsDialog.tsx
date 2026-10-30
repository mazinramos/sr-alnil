import { Settings, Volume2, VolumeX } from "lucide-react";
import { updateSettings, useProgress } from "./store";

const SCALES = [
  { v: 1 as const, label: "عادي" },
  { v: 1.15 as const, label: "كبير" },
  { v: 1.3 as const, label: "أكبر" },
];

/** زر الإعدادات (يوضع في هيدر الخريطة وعقد الفصل). */
export function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="icon-button" onClick={onClick} aria-label="فتح الإعدادات"><Settings size={19} /><span>الإعدادات</span></button>
  );
}

/** الصوت وحجم النص. الحالة في store.settings وتُحفظ تلقائياً. */
export function SettingsDialog({ close }: { close: () => void }) {
  const { settings } = useProgress();
  return (
    <div className="overlay-backdrop confirm-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div className="confirm-mark"><Settings size={20} /></div>
        <h2 id="settings-title">الإعدادات</h2>

        <p style={{ marginBottom: 6 }}>الصوت</p>
        <button className="button button-quiet" style={{ width: "100%" }} aria-pressed={settings.sound} onClick={() => updateSettings({ sound: !settings.sound })}>
          {settings.sound ? <Volume2 size={17} /> : <VolumeX size={17} />}
          {settings.sound ? "الصوت مفعّل" : "الصوت مكتوم"}
        </button>

        <p style={{ margin: "16px 0 6px" }}>حجم النص (في الحوار والدلائل والدفتر)</p>
        <div className="confirm-actions" style={{ marginTop: 0 }} role="group" aria-label="حجم النص">
          {SCALES.map((s) => (
            <button
              key={s.v}
              className={`button ${settings.textScale === s.v ? "button-light" : "button-quiet"}`}
              aria-pressed={settings.textScale === s.v}
              onClick={() => updateSettings({ textScale: s.v })}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="confirm-actions">
          <button className="button button-light" style={{ width: "100%" }} onClick={close}>تم</button>
        </div>
      </section>
    </div>
  );
}
