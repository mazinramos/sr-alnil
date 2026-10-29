import { useEffect } from "react";
import { useRoute } from "./engine/router";
import { getLevel, getChapters } from "./engine/content";
import { isLevelUnlocked, isStorageOk, useProgress } from "./engine/store";
import { navigate } from "./engine/router";
import LevelRunner from "./engine/LevelRunner";

export default function App() {
  const route = useRoute();
  const progress = useProgress();

  useEffect(() => {
    document.documentElement.style.setProperty("--text-scale", String(progress.settings.textScale));
  }, [progress.settings.textScale]);

  const [section, arg] = route.path;

  if (section === "level" && arg) {
    const level = getLevel(arg);
    if (!level) return <Notice text="هذا المستوى قريباً." />;
    if (!isLevelUnlocked(progress, arg)) return <Notice text="أكملي المستوى السابق أولاً." />;
    return <LevelRunner level={level} />;
  }

  // شاشة مؤقتة (اليوم 2: شاشة الفصول والعقد الحقيقية)
  const chapters = getChapters();
  return (
    <main className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-extrabold">سرّ النيل</h1>
      {!isStorageOk() && <p className="mb-3 rounded bg-black/40 p-2 text-sm">تعذّر حفظ التقدّم على هذا المتصفح، وقد يضيع عند الإغلاق.</p>}
      {chapters.length === 0 && <p>الفصول قريباً.</p>}
      {chapters.map((c) => (
        <section key={c.id} className="mb-4">
          <h2 className="font-bold">{c.title}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {c.levels.map((l) => (
              <button
                key={l.id}
                disabled={!isLevelUnlocked(progress, l.id)}
                className="rounded-lg bg-[var(--nile-water)] px-4 disabled:opacity-40"
                onClick={() => navigate(`/level/${l.id}`)}
              >
                {l.index}{progress.completed[l.id] ? " ✓" : ""}
              </button>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

function Notice({ text }: { text: string }) {
  return (
    <main className="mx-auto max-w-xl p-6 text-center">
      <p className="mb-4">{text}</p>
      <button className="rounded-lg bg-[var(--ember)] px-4 font-bold text-[var(--ink)]" onClick={() => navigate("/")}>الرجوع</button>
    </main>
  );
}
