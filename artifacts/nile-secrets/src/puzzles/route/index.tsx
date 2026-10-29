import { useEffect, useRef, useState } from "react";
import type { PuzzleConfig, PuzzleProps } from "../../content/types";

type Cfg = Extract<PuzzleConfig, { type: "route" }>;
type Status = "idle" | "right" | "wrong";

export default function RoutePuzzle({ config, background, onResult }: PuzzleProps<Cfg>) {
  const { nodes, pick, solution } = config;
  const [picks, setPicks] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [focus, setFocus] = useState<string | null>(null);
  const [imgOk, setImgOk] = useState(true);
  const timers = useRef<number[]>([]);
  const pressTimer = useRef<number | undefined>(undefined);
  const longFired = useRef(false);

  useEffect(() => () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    window.clearTimeout(pressTimer.current);
  }, []);

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const locked = status === "right";

  function toggle(id: string) {
    if (locked) return;
    setStatus("idle");
    setFocus(id);
    setPicks((p) => {
      const i = p.indexOf(id);
      if (i >= 0) return p.slice(0, i); // إلغاء العقدة وما بعدها
      return p.length < pick ? [...p, id] : p;
    });
  }

  function startPress(id: string) {
    longFired.current = false;
    window.clearTimeout(pressTimer.current);
    pressTimer.current = window.setTimeout(() => {
      longFired.current = true;
      setFocus(id);
    }, 450);
  }
  const endPress = () => window.clearTimeout(pressTimer.current);

  function confirm() {
    if (locked || picks.length !== pick) return;
    const ok = picks.length === solution.length && picks.every((id, i) => id === solution[i]);
    if (ok) {
      setStatus("right");
      timers.current.push(window.setTimeout(() => onResult(true), 900));
    } else {
      setStatus("wrong");
      onResult(false);
      timers.current.push(window.setTimeout(() => setStatus("idle"), 600));
    }
  }

  const points = picks
    .map((id) => byId.get(id))
    .filter((n): n is NonNullable<typeof n> => !!n)
    .map((n) => `${n.x},${n.y}`)
    .join(" ");

  const focusNode = focus ? byId.get(focus) : undefined;

  return (
    <div className="flex flex-col gap-3">
      <style>{`
        @keyframes route-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
        @keyframes route-glow { 0%,100%{box-shadow:0 0 0 0 rgba(216,146,58,.0)} 50%{box-shadow:0 0 18px 8px rgba(216,146,58,.85)} }
      `}</style>

      <div
        dir="ltr"
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "3 / 2",
          backgroundImage: imgOk
            ? `url(${background})`
            : "linear-gradient(160deg, #2f6b73 0%, #1b2a2f 70%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: status === "wrong" ? "route-shake .5s" : undefined,
        }}
      >
        <img src={background} alt="" className="hidden" onError={() => setImgOk(false)} />
        <div className="absolute inset-0 bg-black/20" />

        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {picks.length > 1 && (
            <polyline
              points={points}
              fill="none"
              stroke={status === "right" ? "#d8923a" : "#efe3c8"}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={status === "right" ? undefined : "2 3"}
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        {nodes.map((n) => {
          const order = picks.indexOf(n.id);
          const chosen = order >= 0;
          return (
            <button
              key={n.id}
              type="button"
              aria-label={`${n.label}${chosen ? ` — الاختيار ${order + 1}` : ""}`}
              aria-pressed={chosen}
              disabled={locked}
              onClick={() => { if (longFired.current) { longFired.current = false; return; } toggle(n.id); }}
              onPointerDown={() => startPress(n.id)}
              onPointerUp={endPress}
              onPointerLeave={endPress}
              onPointerCancel={endPress}
              onContextMenu={(e) => e.preventDefault()}
              onFocus={() => setFocus(n.id)}
              className="absolute flex items-center justify-center rounded-full border-2 text-base font-extrabold select-none"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                width: 46,
                height: 46,
                transform: "translate(-50%, -50%)",
                touchAction: "manipulation",
                background: chosen ? "var(--ember)" : "rgba(27,42,47,.75)",
                color: chosen ? "var(--ink)" : "var(--papyrus)",
                borderColor: chosen ? "var(--papyrus)" : "rgba(239,227,200,.7)",
                animation: status === "right" && chosen ? "route-glow 1s ease-in-out infinite" : undefined,
              }}
            >
              {chosen ? order + 1 : ""}
            </button>
          );
        })}

        {nodes.map((n) => (
          <span
            key={`l-${n.id}`}
            className="pointer-events-none absolute -translate-x-1/2 rounded bg-black/60 px-1.5 text-[11px] leading-5 text-[var(--papyrus)]"
            style={{ left: `${n.x}%`, top: `calc(${n.y}% + 26px)` }}
          >
            {n.label}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm">
          المختار: <b>{picks.length}</b> / {pick}
        </p>
        <button
          type="button"
          onClick={confirm}
          disabled={picks.length !== pick || locked}
          className="rounded-lg bg-[var(--ember)] px-5 font-bold text-[var(--ink)] disabled:opacity-40"
        >
          تأكيد
        </button>
      </div>

      <section className="rounded-lg bg-black/40 p-3 text-sm" aria-live="polite">
        <p className="mb-2 text-xs opacity-70">
          اضغطي على نقطة لاختيارها بالترتيب، واضغطي مرة ثانية لإلغائها (ومعها ما بعدها). اضغطي مطوّلاً لقراءة الملاحظة.
        </p>
        {focusNode?.detail && (
          <p className="mb-2 rounded bg-[var(--papyrus)] p-2 font-bold text-[var(--ink)]">
            {focusNode.label}: {focusNode.detail}
          </p>
        )}
        <ul className="grid gap-1">
          {nodes.filter((n) => n.detail).map((n) => (
            <li key={n.id} className={n.id === focus ? "font-bold text-[var(--ember)]" : "opacity-90"}>
              <b>{n.label}:</b> {n.detail}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
