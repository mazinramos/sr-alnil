import { getProgress } from "./store";

/** أصوات بسيطة بـ WebAudio (نغمات بالكود، بدون ملفات). تحترم settings.sound وتفشل بصمت. */
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, vol: number) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + start;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

const on = () => getProgress().settings.sound;

export const playClick = () => { if (on()) tone(660, 0, 0.05, "sine", 0.06); };
export const playSuccess = () => {
  if (!on()) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.09, 0.22, "triangle", 0.09));
};
export const playError = () => {
  if (!on()) return;
  tone(220, 0, 0.16, "sawtooth", 0.05);
  tone(165, 0.12, 0.22, "sawtooth", 0.05);
};

/** نقرة صوتية لأي زر في التطبيق (يُركَّب مرة واحدة في App). */
export function installClickSound(): () => void {
  const h = (e: PointerEvent) => {
    const t = e.target as Element | null;
    if (t?.closest("button:not(:disabled)")) playClick();
  };
  document.addEventListener("pointerdown", h, true);
  return () => document.removeEventListener("pointerdown", h, true);
}
