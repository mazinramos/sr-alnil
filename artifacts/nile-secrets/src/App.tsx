import { useEffect } from "react";
import { navigate, useRoute } from "./engine/router";
import { getLevel } from "./engine/content";
import { isLevelUnlocked, useProgress } from "./engine/store";
import LevelRunner from "./engine/LevelRunner";
import ChapterSelect from "./engine/ChapterSelect";
import LevelMap from "./engine/LevelMap";
import PreviewPage from "./engine/PreviewPage";
import CoordsPage from "./engine/CoordsPage";

export default function App() {
  const route = useRoute();
  const progress = useProgress();

  useEffect(() => {
    document.documentElement.style.setProperty("--text-scale", String(progress.settings.textScale));
  }, [progress.settings.textScale]);

  const [section, arg] = route.path;

  if (section === "preview") return arg === "coords" ? <CoordsPage /> : <PreviewPage type={arg} />;
  if (section === "chapter" && arg) return <LevelMap chapter={Number(arg)} />;
  if (section === "level" && arg) {
    const level = getLevel(arg);
    if (!level) return <Notice text="هذا المستوى قريباً." />;
    if (!isLevelUnlocked(progress, arg)) return <Notice text="أكملي المستوى السابق أولاً." />;
    return <LevelRunner level={level} />;
  }
  return <ChapterSelect />;
}

function Notice({ text }: { text: string }) {
  return (
    <main className="mx-auto max-w-xl p-6 text-center">
      <p className="mb-4">{text}</p>
      <button className="rounded-lg bg-[var(--ember)] px-4 font-bold text-[var(--ink)]" onClick={() => navigate("/")}>الرجوع</button>
    </main>
  );
}
