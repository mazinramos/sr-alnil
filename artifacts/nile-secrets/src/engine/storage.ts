import type { ProgressV2 } from "./store";
import { STORAGE_KEY_V1, V1_DONE_KEY, v1CompletedFromRaw } from "./migrate.ts";

/** طبقة التخزين الصافية (بدون React ولا window) كي نختبرها بتخزين مزيَّف: غير متاح، ممتلئ، JSON تالف. */
export const STORAGE_KEY_V2 = "nile-secrets-progress-v2";
export type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function defaultProgress(): ProgressV2 {
  return {
    version: 2,
    completed: {},
    discoveredClues: [],
    lastLevel: "c1-l1",
    settings: { sound: true, textScale: 1 },
  };
}

/** وصول `window.localStorage` نفسه قد يرمي استثناء في بعض الأوضاع الخاصة؛ نرجع null بدل الانهيار. */
export function getBrowserStorage(): StorageLike | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

function isValid(x: unknown): x is ProgressV2 {
  const p = x as ProgressV2;
  return !!p && p.version === 2 && typeof p.completed === "object" && p.completed !== null
    && Array.isArray(p.discoveredClues) && !!p.settings && typeof p.settings === "object";
}

/**
 * يقرأ التقدّم. لا يرمي أبداً:
 *  - تخزين غير متاح أو رمى عند القراءة  → تقدّم فارغ، ok=false (تعمل اللعبة في الذاكرة)
 *  - JSON تالف أو شكل غير صالح           → تقدّم فارغ، ok=true (التخزين سليم، سيُستبدل التالف عند أول حفظ)
 *  - فشل الكتابة أثناء ترحيل V1 (ممتلئ)  → التقدّم المُرحَّل يبقى في الذاكرة، ok=false
 */
export function loadProgress(storage: StorageLike | null): { progress: ProgressV2; ok: boolean } {
  if (!storage) return { progress: defaultProgress(), ok: false };
  let ok = true;
  let raw: string | null;
  try {
    raw = storage.getItem(STORAGE_KEY_V2);
  } catch {
    return { progress: defaultProgress(), ok: false };
  }

  if (!raw) {
    // ترحيل V1 مرة واحدة: بعد الترحيل أو «بدء من جديد» تُوضع V1_DONE_KEY فلا يُعاد.
    try {
      if (storage.getItem(V1_DONE_KEY)) return { progress: defaultProgress(), ok };
      const completed = v1CompletedFromRaw(storage.getItem(STORAGE_KEY_V1));
      const progress: ProgressV2 = { ...defaultProgress(), completed };
      try { storage.setItem(V1_DONE_KEY, "1"); } catch { ok = false; }
      if (Object.keys(completed).length) {
        progress.lastLevel = Object.keys(completed)[0];
        try { storage.setItem(STORAGE_KEY_V2, JSON.stringify(progress)); } catch { ok = false; }
      }
      return { progress, ok };
    } catch {
      return { progress: defaultProgress(), ok: false };
    }
  }

  try {
    const parsed = JSON.parse(raw);
    if (isValid(parsed)) {
      const d = defaultProgress();
      return { progress: { ...d, ...parsed, settings: { ...d.settings, ...parsed.settings } }, ok };
    }
  } catch {
    /* JSON تالف */
  }
  return { progress: defaultProgress(), ok };
}

/** يحفظ التقدّم؛ يرجع false لو فشل (ممتلئ أو غير متاح). */
export function saveProgress(storage: StorageLike | null, p: ProgressV2): boolean {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY_V2, JSON.stringify(p));
    return true;
  } catch {
    return false;
  }
}

/** يضع علامة «انتهى النظر في V1» (عند «بدء من جديد»). */
export function markV1Done(storage: StorageLike | null): boolean {
  if (!storage) return false;
  try {
    storage.setItem(V1_DONE_KEY, "1");
    return true;
  } catch {
    return false;
  }
}
