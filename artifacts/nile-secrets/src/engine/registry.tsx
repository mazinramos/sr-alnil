import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { PuzzleConfig, PuzzleProps } from "../content/types";

export type PuzzleType = PuzzleConfig["type"];
export const PUZZLE_TYPES: PuzzleType[] = [
  "sequence", "hotspot", "matching", "codelock", "choice", "route",
  "balance", "tiles", "memory", "cipher", "deduction", "jigsaw",
];

// أي نوع لسه ما وصل ملفو ما يكسر البناء: glob بيلقط الموجود بس.
const found = import.meta.glob<{ default: ComponentType<PuzzleProps<any>> }>("../puzzles/*/index.tsx");
const demos = import.meta.glob<{ demo: PuzzleConfig }>("../puzzles/*/demo.ts");

const typeOf = (path: string) => path.split("/")[2];

function Missing({ onResult, config }: PuzzleProps<PuzzleConfig>) {
  // لا يظهر إلا لنوع غير موجود ملفه فعلاً. في الإنتاج رسالة هادئة بدون كلمات تطوير.
  if (!import.meta.env.DEV) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--ember)] p-5 text-center">
        <p className="font-bold">هذا اللغز غير متاح حالياً.</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-dashed border-[var(--ember)] p-5 text-center">
      <p className="mb-1 font-bold">هذا اللغز قيد التطوير</p>
      <p className="mb-3 text-sm opacity-80">النوع: {config.type}</p>
      <button className="rounded-lg bg-[var(--ember)] px-4 font-bold text-[var(--ink)]" onClick={() => onResult(true)}>
        تخطّي (للتطوير فقط)
      </button>
    </div>
  );
}

const cache = new Map<string, LazyExoticComponent<ComponentType<PuzzleProps<any>>>>();

export function getPuzzleComponent(type: PuzzleType): ComponentType<PuzzleProps<any>> {
  const key = Object.keys(found).find((p) => typeOf(p) === type);
  if (!key) return Missing as ComponentType<PuzzleProps<any>>;
  let c = cache.get(type);
  if (!c) {
    c = lazy(found[key]);
    cache.set(type, c);
  }
  return c;
}

export const hasPuzzle = (type: PuzzleType) => Object.keys(found).some((p) => typeOf(p) === type);

export async function loadDemo(type: PuzzleType): Promise<PuzzleConfig | null> {
  const key = Object.keys(demos).find((p) => typeOf(p) === type);
  return key ? (await demos[key]()).demo : null;
}
