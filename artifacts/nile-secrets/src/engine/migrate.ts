import type { LevelResult } from "./store";

/** مفتاح تخزين النسخة الأولى (ريبلت) وشكلها: { completedStages: ("village"|"island"|"market"|"ruins"|"cove")[] } */
export const STORAGE_KEY_V1 = "nile-secrets-progress-v1";

/** المراحل الخمس القديمة ← المستويات الجديدة (CONTRACT §4). */
export const V1_STAGE_TO_LEVEL: Record<string, string> = {
  village: "c1-l2",
  island: "c2-l1",
  market: "c3-l1",
  ruins: "c4-l1",
  cove: "c5-l7",
};

/** دالة صافية: تاخد النص الخام المخزّن في V1 وترجع المستويات المكتملة في V2 (نجمة واحدة لكل مرحلة). تتسامح مع أي شكل غير متوقع. */
export function v1CompletedFromRaw(raw: string | null): Record<string, LevelResult> {
  const out: Record<string, LevelResult> = {};
  if (!raw) return out;
  try {
    const stages = (JSON.parse(raw) as { completedStages?: unknown })?.completedStages;
    if (!Array.isArray(stages)) return out;
    for (const s of stages) {
      const id = typeof s === "string" ? V1_STAGE_TO_LEVEL[s] : undefined;
      if (id) out[id] = { stars: 1, hints: 0, attempts: 1 };
    }
  } catch {
    /* نص تالف: نتجاهله */
  }
  return out;
}
