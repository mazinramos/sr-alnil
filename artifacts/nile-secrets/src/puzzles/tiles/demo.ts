import type { PuzzleConfig } from "../../content/types";

// قنوات الماء 3×3 (c2-l5): المصدر يسار أول قطعة، والحقل يمين آخر قطعة.
// معرّف القطعة = نوعها-رقم: i مستقيمة، l زاوية، t ثلاثية، e نهاية.
// الحل: i-1 → i-2 → l-3 (غرب/جنوب) → i-6 (رأسية) → l-9 (شمال/شرق) → الحقل. الباقي تمويه.
// 4^9 = 262144 وضعية؛ ويُقبل أي مسار يوصل الماء فعلياً.
export const demo: Extract<PuzzleConfig, { type: "tiles" }> = {
  type: "tiles",
  size: [3, 3],
  tiles: [
    { id: "i-1", rot: 90 }, { id: "i-2", rot: 90 }, { id: "l-3", rot: 0 },
    { id: "l-4", rot: 270 }, { id: "t-5", rot: 180 }, { id: "i-6", rot: 0 },
    { id: "e-7", rot: 90 }, { id: "l-8", rot: 180 }, { id: "l-9", rot: 90 },
  ],
  solution: [
    { id: "i-1", rot: 0 }, { id: "i-2", rot: 0 }, { id: "l-3", rot: 180 },
    { id: "l-4", rot: 90 }, { id: "t-5", rot: 0 }, { id: "i-6", rot: 90 },
    { id: "e-7", rot: 0 }, { id: "l-8", rot: 0 }, { id: "l-9", rot: 0 },
  ],
};
