import { useEffect, useState } from "react";
import { initialOf, portraitSrc } from "./characters";

/** بورتريه: تعبير مطلوب ← neutral ← حرف أول داخل دائرة. */
export default function Portrait({ id, mood = "neutral", size = 72 }: { id: string; mood?: string; size?: number }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  useEffect(() => setStage(0), [id, mood]);

  if (stage === 2) {
    return (
      <span
        aria-hidden
        className="grid shrink-0 place-items-center rounded-full bg-[var(--nile-water)] font-extrabold text-[var(--papyrus)]"
        style={{ width: size, height: size, fontSize: size * 0.45 }}
      >
        {initialOf(id)}
      </span>
    );
  }
  const src = stage === 0 ? portraitSrc(id, mood) : portraitSrc(id, "neutral");
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      draggable={false}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
      onError={() => setStage((s) => (s === 0 && mood !== "neutral" ? 1 : 2))}
    />
  );
}
