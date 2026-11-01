import { lazy, Suspense, useEffect } from "react";
import { navigate, useRoute } from "./engine/router";
import { getLevel } from "./engine/content";
import { isLevelUnlocked, useProgress } from "./engine/store";
import LevelRunner from "./engine/LevelRunner";
import ChapterSelect from "./engine/ChapterSelect";
import LevelMap from "./engine/LevelMap";

// أدوات المطوّر (معاينة الألغاز وأداة الإحداثيات) لا تدخل النسخة المنشورة أبداً: الفرع الميت يُحذف عند البناء فلا يُنتَج لها ملف.
const PreviewPage = import.meta.env.DEV ? lazy(() => import("./engine/PreviewPage")) : null;
const CoordsPage = import.meta.env.DEV ? lazy(() => import("./engine/CoordsPage")) : null;
import TitleScreen from "./engine/TitleScreen";
import EndingScreen from "./engine/EndingScreen";
import RewardScreen from "./engine/RewardScreen";
import ErrorBoundary from "./engine/ErrorBoundary";
import StorageNotice from "./engine/StorageNotice";
import { installClickSound } from "./engine/audio";

export default function App() {
  const route = useRoute();
  return (
    <ErrorBoundary variant="full" resetKey={route.path.join("/")}>
      <Routes />
      <StorageNotice />
    </ErrorBoundary>
  );
}

function Routes() {
  const route = useRoute();
  const progress = useProgress();

  useEffect(() => {
    document.documentElement.dataset.textScale = String(progress.settings.textScale);
  }, [progress.settings.textScale]);

  useEffect(() => installClickSound(), []);

  const [section, arg] = route.path;
  const depth = route.path.length;
  const chapterNo = /^[1-5]$/.test(arg ?? "") ? Number(arg) : null;

  // مسارات اللعبة المعروفة وأقصى عدد مقاطع لكل منها؛ أي شيء آخر يعيد شاشة هادئة بدل صفحة فارغة.
  if (section === "preview") {
    if (!import.meta.env.DEV || !PreviewPage || !CoordsPage) return <RedirectHome />;
    return (
      <Suspense fallback={null}>
        {arg === "coords" ? <CoordsPage /> : <PreviewPage type={arg} />}
      </Suspense>
    );
  }
  if (section === "chapter" && depth === 2 && chapterNo) return <LevelMap chapter={chapterNo} />;
  if (section === "level" && depth === 2 && /^c\d+-l\d+$/.test(arg)) {
    const level = getLevel(arg);
    if (!level) return <Quiet text="المستوى دا حيجي قريب." />;
    if (!isLevelUnlocked(progress, arg)) return <Quiet text="خلّصي المستوى القبلو الأول." />;
    return <LevelRunner level={level} />;
  }
  if (section === "reward" && depth === 2 && chapterNo) return <RewardScreen chapter={chapterNo} />;
  if (section === "map" && depth === 1) return <ChapterSelect />;
  if (section === "ending" && depth === 1) return <EndingScreen />;
  if (depth === 0) return <TitleScreen />;
  return <Quiet title="الصفحة دي ما لقيناها" text="ممكن الرابط قديم أو ناقص." />;
}

/** النسخة المنشورة لا تحوي أدوات المطوّر: نعود إلى البداية. */
function RedirectHome() {
  useEffect(() => { window.location.replace("#/"); }, []);
  return null;
}

/** شاشة هادئة (رابط غير موجود، مستوى غير متاح بعد) مع زر العودة للخريطة. */
function Quiet({ title, text }: { title?: string; text: string }) {
  return (
    <main className="game-shell" dir="rtl">
      <section className="rw-screen">
        <div className="rw-card" role="status">
          {title && <h1 className="rw-title">{title}</h1>}
          <p className="rw-text">{text}</p>
          <button className="button button-light" onClick={() => navigate("/map")}>ارجعي للخريطة</button>
        </div>
      </section>
    </main>
  );
}
