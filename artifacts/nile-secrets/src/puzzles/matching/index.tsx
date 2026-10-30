import { useEffect, useMemo, useState } from "react";
import type { Item, PuzzleConfig, PuzzleProps } from "../../content/types";
import ItemIcon, { iconSrc } from "../../engine/ItemIcon";

type Cfg = Extract<PuzzleConfig, { type: "matching" }>;

// خلط حتمي للعمود الأيمن بحيث لا يتطابق مع ترتيب اليسار (فيُكشف الحل بالترتيب).
function shuffleRight(left: Item[], right: Item[], solution: Record<string, string>): Item[] {
  const arr = [...right];
  let seed = 11;
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const aligned = () => left.every((l, i) => arr[i] && solution[l.id] === arr[i].id);
  if (arr.length > 1 && aligned()) arr.push(arr.shift()!);
  return arr;
}

export default function MatchingPuzzle({ config, onResult }: PuzzleProps<Cfg>) {
  const { left, right, solution } = config;
  const rightOrder = useMemo(() => shuffleRight(left, right, solution), [left, right, solution]);

  // links: leftId -> rightId
  const [links, setLinks] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null); // leftId محدد
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");

  useEffect(() => {
    setLinks({});
    setSelected(null);
    setStatus("idle");
  }, [config]);

  const locked = status === "right";
  const allLinked = left.every((l) => links[l.id]);
  // رقم الزوج = ترتيب الجهة اليمنى في قائمة left
  const pairNo = (leftId: string) => left.findIndex((l) => l.id === leftId) + 1;
  const leftOfRight = (rightId: string) => Object.keys(links).find((k) => links[k] === rightId);

  function touched() {
    if (status === "wrong") setStatus("idle");
  }

  function tapLeft(id: string) {
    if (locked) return;
    touched();
    if (links[id] && selected !== id) {
      // ضغط على مربوط: فكّ الربط ثم تحديده لإعادة الربط
      setLinks((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setSelected(id);
      return;
    }
    setSelected(selected === id ? null : id);
  }

  function tapRight(id: string) {
    if (locked) return;
    touched();
    const owner = leftOfRight(id);
    if (!selected) {
      // لا عنصر محدد: ضغط على مربوط يفكّ الربط ويحدد صاحبه
      if (owner) {
        setLinks((prev) => {
          const next = { ...prev };
          delete next[owner];
          return next;
        });
        setSelected(owner);
      }
      return;
    }
    setLinks((prev) => {
      const next = { ...prev };
      if (owner) delete next[owner]; // واحد لواحد
      next[selected] = id;
      return next;
    });
    setSelected(null);
  }

  function confirm() {
    if (!allLinked || locked) return;
    const ok = left.every((l) => links[l.id] === solution[l.id]);
    setStatus(ok ? "right" : "wrong");
    onResult(ok);
  }

  function itemClass(active: boolean, linked: boolean) {
    return [
      "relative flex min-h-[56px] w-full items-center gap-2 rounded-xl border-2 px-3 py-2 text-right transition-colors",
      active ? "border-[var(--ember)] bg-[var(--ember)]/25" : linked ? "border-[var(--nile-water)] bg-[var(--papyrus)] text-[var(--ink)]" : "border-white/25 bg-black/35",
    ].join(" ");
  }

  return (
    <div className="w-full" dir="rtl">
      <style>{`
        @keyframes mt-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 50%{transform:translateX(5px)} 75%{transform:translateX(-3px)} }
      `}</style>

      <div
        className="mb-4 grid grid-cols-2 gap-3"
        style={status === "wrong" ? { animation: "mt-shake .3s ease-in-out" } : undefined}
      >
        <div className="flex flex-col gap-2">
          {left.map((it) => {
            const linked = !!links[it.id];
            return (
              <button
                key={it.id}
                type="button"
                disabled={locked}
                onClick={() => tapLeft(it.id)}
                aria-pressed={selected === it.id}
                className={itemClass(selected === it.id, linked)}
                style={status === "right" ? { boxShadow: "0 0 10px 2px rgba(216,146,58,.6)" } : undefined}
              >
                {linked && <Badge n={pairNo(it.id)} />}
                <span className="flex flex-col leading-tight">
                  {iconSrc(it.icon) ? (
                    <ItemIcon item={it} size={36} showLabel className="text-sm font-bold" />
                  ) : (
                    <span className="text-sm font-bold">{it.label}</span>
                  )}
                  {it.detail && <span className="text-xs opacity-75">{it.detail}</span>}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          {rightOrder.map((it) => {
            const owner = leftOfRight(it.id);
            return (
              <button
                key={it.id}
                type="button"
                disabled={locked}
                onClick={() => tapRight(it.id)}
                className={itemClass(false, !!owner)}
                style={status === "right" ? { boxShadow: "0 0 10px 2px rgba(216,146,58,.6)" } : undefined}
              >
                {owner && <Badge n={pairNo(owner)} />}
                <span className="flex flex-col leading-tight">
                  {iconSrc(it.icon) ? (
                    <ItemIcon item={it} size={36} showLabel className="text-sm font-bold" />
                  ) : (
                    <span className="text-sm font-bold">{it.label}</span>
                  )}
                  {it.detail && <span className="text-xs opacity-75">{it.detail}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={confirm}
          disabled={!allLinked || locked}
          className="min-h-[48px] rounded-xl px-6 font-bold text-[var(--ink)] disabled:opacity-40"
          style={{ background: "var(--ember)" }}
        >
          تأكيد
        </button>
        <p className="min-h-[1.5rem] text-sm" aria-live="polite">
          {status === "right" && "الروابط كلها صحيحة!"}
          {status === "wrong" && "بعض الروابط ليست صحيحة، أعيدي النظر في الدلائل وغيّري ما تشكين فيه."}
          {status === "idle" && (selected ? "الآن اختاري ما يقابله من العمود الآخر." : "اختاري عنصراً من اليمين ثم ما يقابله من اليسار.")}
        </p>
      </div>
    </div>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--nile-water)] text-sm font-bold text-[var(--papyrus)]">
      {n}
    </span>
  );
}
