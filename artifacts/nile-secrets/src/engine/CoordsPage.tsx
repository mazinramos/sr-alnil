import { useState, type MouseEvent } from "react";
import { navigate, useRoute } from "./router";

type Pt = { x: number; y: number };
const fmt = (p: Pt, r: number) => `x: ${p.x}, y: ${p.y}, r: ${r}`;

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/** #/preview/coords?img=/art/c1/l1.webp — ضغطة على الصورة تطبع x,y بالمئة (r اختياري لـ hotspot). */
export default function CoordsPage() {
  const route = useRoute();
  const img = route.query.get("img") || "/art/c1/l1.webp";
  const [draft, setDraft] = useState(img);
  const [pts, setPts] = useState<Pt[]>([]);
  const [r, setR] = useState(6);
  const [ok, setOk] = useState(true);
  const [msg, setMsg] = useState("");

  const last = pts[pts.length - 1];

  function onClick(e: MouseEvent<HTMLImageElement>) {
    const b = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - b.left) / b.width) * 1000) / 10;
    const y = Math.round(((e.clientY - b.top) / b.height) * 1000) / 10;
    if (x < 0 || x > 100 || y < 0 || y > 100) return;
    setPts((p) => [...p, { x, y }]);
    setMsg("");
  }
  async function doCopy(text: string) {
    setMsg((await copy(text)) ? "تم النسخ ✓" : "تعذّر النسخ، انسخي النص يدوياً");
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      <header className="mb-3 flex items-center justify-between gap-2">
        <button className="rounded-lg bg-black/40 px-3" onClick={() => navigate("/preview")}>المعاينة</button>
        <h1 className="text-lg font-extrabold">أداة الإحداثيات</h1>
        <span />
      </header>

      <form className="mb-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); setPts([]); setOk(true); navigate(`/preview/coords?img=${draft}`); }}>
        <input dir="ltr" className="min-h-[44px] flex-1 rounded-lg bg-black/40 px-3" value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="مسار الصورة" />
        <button className="rounded-lg bg-[var(--nile-water)] px-4 font-bold" type="submit">تحميل</button>
      </form>

      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black/40">
        {ok ? (
          <img src={img} alt="" className="block w-full cursor-crosshair select-none" draggable={false} onClick={onClick} onError={() => setOk(false)} />
        ) : (
          <p className="p-8 text-center">الصورة غير موجودة: <span dir="ltr">{img}</span></p>
        )}
        {ok && pts.map((p, i) => (
          <span key={i} className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--ember)] text-xs font-extrabold text-[var(--ink)]">{i + 1}</span>
          </span>
        ))}
        {ok && last && (
          <span
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white/80"
            style={{ left: `${last.x}%`, top: `${last.y}%`, width: `${r * 2}%`, aspectRatio: "1 / 1" }}
          />
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <label htmlFor="r">نصف القطر r: {r}</label>
        <input id="r" type="range" min={2} max={14} step={0.5} value={r} onChange={(e) => setR(Number(e.target.value))} className="min-h-[44px] flex-1" />
      </div>

      <section className="mt-3 rounded-xl bg-black/40 p-3" dir="ltr">
        {pts.length === 0 && <p className="text-sm opacity-80">اضغطي على الصورة لتسجيل نقطة.</p>}
        <ol className="space-y-1 font-mono text-sm">
          {pts.map((p, i) => (
            <li key={i} className="flex items-center justify-between gap-2">
              <span>{i + 1}: {fmt(p, r)}</span>
              <button className="rounded bg-black/50 px-3" onClick={() => doCopy(fmt(p, r))}>نسخ</button>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-3 flex gap-2">
        <button className="flex-1 rounded-lg bg-[var(--ember)] font-bold text-[var(--ink)] disabled:opacity-40" disabled={!pts.length} onClick={() => doCopy(pts.map((p, i) => `${i + 1}: ${fmt(p, r)}`).join("\n"))}>نسخ الكل</button>
        <button className="rounded-lg bg-black/40 px-4 disabled:opacity-40" disabled={!pts.length} onClick={() => setPts((p) => p.slice(0, -1))}>تراجع</button>
        <button className="rounded-lg bg-black/40 px-4 disabled:opacity-40" disabled={!pts.length} onClick={() => setPts([])}>مسح</button>
      </div>
      {msg && <p role="status" className="mt-2 text-center text-sm">{msg}</p>}
      <p className="mt-3 text-xs opacity-70">x وy وr بالنسبة المئوية من عرض الصورة وارتفاعها. الدائرة المنقّطة تقريبية لحجم r.</p>
    </main>
  );
}
