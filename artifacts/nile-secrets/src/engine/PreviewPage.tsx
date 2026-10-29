import { Suspense, useEffect, useState } from "react";
import type { PuzzleConfig } from "../content/types";
import { PUZZLE_TYPES, getPuzzleComponent, hasPuzzle, loadDemo, type PuzzleType } from "./registry";
import { navigate, useRoute } from "./router";

const DEFAULT_BG = "/art/c1/l1.webp";

/** #/preview — فهرس الأنواع، #/preview/:type — يعرض demo.ts لنوع لغز مع نتيجة صح/خطأ. */
export default function PreviewPage({ type }: { type?: string }) {
  if (!type) return <PreviewIndex />;
  if (!PUZZLE_TYPES.includes(type as PuzzleType)) {
    return <Shell title="نوع غير معروف"><p>«{type}» ليس من أنواع الألغاز الاثني عشر.</p></Shell>;
  }
  return <PreviewType type={type as PuzzleType} />;
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl p-4">
      <header className="mb-4 flex items-center justify-between gap-2">
        <button className="rounded-lg bg-black/40 px-3" onClick={() => navigate("/preview")}>كل الأنواع</button>
        <h1 className="text-lg font-extrabold">{title}</h1>
        <button className="rounded-lg bg-black/40 px-3" onClick={() => navigate("/")}>اللعبة</button>
      </header>
      {children}
    </main>
  );
}

function PreviewIndex() {
  const [demoOk, setDemoOk] = useState<Record<string, boolean>>({});
  useEffect(() => {
    let off = false;
    Promise.all(PUZZLE_TYPES.map(async (t) => [t, !!(await loadDemo(t))] as const)).then((r) => {
      if (!off) setDemoOk(Object.fromEntries(r));
    });
    return () => { off = true; };
  }, []);
  const ready = PUZZLE_TYPES.filter((t) => hasPuzzle(t)).length;
  return (
    <Shell title="معاينة الألغاز">
      <p className="mb-3 text-sm opacity-80">الجاهز: {ready} من {PUZZLE_TYPES.length}</p>
      <ul className="grid grid-cols-2 gap-2">
        {PUZZLE_TYPES.map((t) => {
          const ok = hasPuzzle(t);
          return (
            <li key={t}>
              <button
                className={`w-full rounded-lg px-3 py-2 text-start ${ok ? "bg-[var(--nile-water)]" : "bg-black/30 opacity-70"}`}
                onClick={() => navigate(`/preview/${t}`)}
              >
                <b>{t}</b>
                <span className="block text-xs opacity-80">
                  {ok ? "المكوّن موجود" : "لم يصل"}{ok && !demoOk[t] ? " · بدون demo" : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <button className="mt-4 w-full rounded-lg bg-[var(--ember)] font-bold text-[var(--ink)]" onClick={() => navigate(`/preview/coords?img=${DEFAULT_BG}`)}>
        أداة الإحداثيات
      </button>
    </Shell>
  );
}

function PreviewType({ type }: { type: PuzzleType }) {
  const route = useRoute();
  const bg = route.query.get("bg") || DEFAULT_BG;
  const [config, setConfig] = useState<PuzzleConfig | null | undefined>(undefined);
  const [hint, setHint] = useState<0 | 1 | 2 | 3>(0);
  const [runKey, setRunKey] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [log, setLog] = useState<boolean[]>([]);

  useEffect(() => {
    let off = false;
    setConfig(undefined);
    setLog([]);
    loadDemo(type).then((c) => { if (!off) setConfig(c); });
    return () => { off = true; };
  }, [type]);

  const Puzzle = getPuzzleComponent(type);
  const last = log.length ? log[log.length - 1] : null;

  return (
    <Shell title={`معاينة: ${type}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <span>التلميح:</span>
        {([0, 1, 2, 3] as const).map((h) => (
          <button key={h} className={`rounded-lg px-3 ${hint === h ? "bg-[var(--ember)] font-bold text-[var(--ink)]" : "bg-black/40"}`} onClick={() => setHint(h)}>{h}</button>
        ))}
        <button className="rounded-lg bg-black/40 px-3" onClick={() => { setRunKey((k) => k + 1); setLog([]); }}>إعادة</button>
        <label className="flex min-h-[44px] items-center gap-1">
          <input type="checkbox" checked={mobile} onChange={(e) => setMobile(e.target.checked)} /> عرض 375
        </label>
      </div>

      <div
        role="status"
        className={`mb-3 rounded-lg p-2 text-center text-sm font-bold ${last === null ? "bg-black/30" : last ? "bg-emerald-700" : "bg-red-800"}`}
      >
        {last === null ? "لم تؤكّد بعد" : last ? "النتيجة: صحيحة ✓" : "النتيجة: خاطئة ✗"}
        {log.length > 0 && ` — محاولات: ${log.length} (خاطئة: ${log.filter((x) => !x).length})`}
      </div>

      <div className={`mx-auto rounded-xl bg-black/50 p-3 ${mobile ? "w-[375px] max-w-full border border-dashed border-white/30" : ""}`}>
        {config === undefined && <p className="p-4 text-center">…</p>}
        {config === null && <p className="p-4 text-center">لا يوجد demo.ts لهذا النوع بعد.</p>}
        {config && (
          <Suspense fallback={<p className="p-4 text-center">…</p>}>
            <Puzzle key={runKey} config={config} background={bg} hintLevel={hint} onResult={(c: boolean) => setLog((l) => [...l, c])} />
          </Suspense>
        )}
      </div>

      {config && (
        <details className="mt-3 text-xs">
          <summary className="min-h-[44px] cursor-pointer leading-[44px]">الإعداد (demo)</summary>
          <pre dir="ltr" className="overflow-x-auto rounded bg-black/40 p-2">{JSON.stringify(config, null, 2)}</pre>
        </details>
      )}
      <p className="mt-2 text-xs opacity-70" dir="ltr">bg = {bg} (غيّريه بـ ?bg=/art/c2/l1.webp)</p>
    </Shell>
  );
}
