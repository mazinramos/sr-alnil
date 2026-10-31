import { useEffect, useState } from "react";
import type { PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "deduction" }>;
type Mark = 0 | 1 | 2; // فارغ ← ✗ ← ✓

const key = (r: string, c: string) => `${r}|${c}`;

export default function Deduction({ config, onResult }: PuzzleProps<Cfg>) {
  const { rows, cols, solution } = config;
  const [marks, setMarks] = useState<Record<string, Mark>>({});
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => { setMarks({}); setMsg(""); setDone(false); }, [config]);

  const cycle = (r: string, c: string) => {
    if (done) return;
    const k = key(r, c);
    setMarks((m) => ({ ...m, [k]: (((m[k] ?? 0) + 1) % 3) as Mark }));
    setMsg("");
  };

  const ticks = Object.entries(marks).filter(([, v]) => v === 2).map(([k]) => k.split("|") as [string, string]);
  const rowConflict = (id: string) => ticks.filter(([r]) => r === id).length > 1;
  const colConflict = (id: string) => ticks.filter(([, c]) => c === id).length > 1;

  const confirm = () => {
    if (done) return;
    if (rows.some((r) => rowConflict(r.id)) || cols.some((c) => colConflict(c.id))) {
      setMsg("في كل صف وكل عمود علامة صح واحدة فقط. راجعي العلامات المكرّرة.");
      return;
    }
    if (ticks.length < rows.length) {
      setMsg("ما زال هناك صفوف بلا علامة صح. استعيني بالأدلة أعلاه.");
      return;
    }
    const ok = rows.every((r) => marks[key(r.id, solution[r.id])] === 2);
    if (ok) { setDone(true); setMsg(""); onResult(true); }
    else { setMsg("في الجدول علامة لا تتفق مع الأدلة. اقرئي الأدلة مرة أخرى."); onResult(false); }
  };

  const glyph = (v: Mark) =>
    v === 2 ? (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ) : v === 1 ? (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
    ) : null;

  return (
    <div dir="rtl" className="mx-auto w-full max-w-xl">
      <p className="mb-2 text-center text-sm opacity-80">
        اضغطي الخانة: مرة لعلامة الخطأ (غير ممكن)، مرتين لعلامة الصح (مؤكّد)، ثلاثاً للمسح.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto border-separate" style={{ borderSpacing: 4 }}>
          <thead>
            <tr>
              <th />
              {cols.map((c) => (
                <th key={c.id} className="px-1 pb-1 text-center text-sm font-bold" style={{ minWidth: 48, color: colConflict(c.id) ? "var(--ember)" : undefined }}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <th scope="row" className="pe-2 text-start text-sm font-bold" style={{ color: rowConflict(r.id) ? "var(--ember)" : undefined }}>
                  {r.label}
                </th>
                {cols.map((c) => {
                  const v = marks[key(r.id, c.id)] ?? 0;
                  return (
                    <td key={c.id} className="p-0">
                      <button
                        type="button"
                        onClick={() => cycle(r.id, c.id)}
                        disabled={done}
                        aria-label={`${r.label} و${c.label}: ${v === 2 ? "مؤكّد" : v === 1 ? "غير ممكن" : "فارغ"}`}
                        className="grid h-12 w-full min-w-[48px] place-items-center rounded-lg text-xl font-bold"
                        style={{
                          background: v === 2 ? "rgba(216,146,58,.35)" : "rgba(239,227,200,.12)",
                          border: v === 2 ? "2px solid var(--ember)" : "1px solid rgba(239,227,200,.35)",
                          color: v === 1 ? "rgba(239,227,200,.55)" : "var(--papyrus)",
                          boxShadow: done && v === 2 ? "0 0 10px var(--ember)" : undefined,
                        }}
                      >
                        {glyph(v)}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 min-h-6 text-center text-sm" role="status" aria-live="polite" style={{ color: "var(--ember)" }}>
        {done ? "اتّسق الجدول مع الأدلة." : msg}
      </p>

      <div className="mt-2 flex justify-center gap-2">
        <button type="button" onClick={() => { setMarks({}); setMsg(""); }} disabled={done} className="rounded-lg border border-[var(--papyrus)]/40 px-4">مسح الكل</button>
        <button type="button" onClick={confirm} disabled={done} className="rounded-lg px-6 font-bold" style={{ background: "var(--ember)", color: "var(--ink)" }}>تأكيد</button>
      </div>
    </div>
  );
}
