import type { PuzzleConfig } from "../../content/types";

// تحقق التفرّد (شغّلته): مجموعات جزئية بحد أقصى 3 قطع تساوي 28 → {11,17} فقط.
// زر التأكيد دائماً ظاهر؛ مجموع غير مطابق = onResult(false).
export const demo: Extract<PuzzleConfig, { type: "balance" }> = {
  type: "balance",
  target: 28,
  maxItems: 3,
  weights: [
    { id: "w3", label: "كيس صغير", value: 3 },
    { id: "w5", label: "جرّة", value: 5 },
    { id: "w7", label: "سلّة", value: 7 },
    { id: "w11", label: "كيس قمح", value: 11 },
    { id: "w13", label: "صندوق", value: 13 },
    { id: "w17", label: "حزمة", value: 17 },
  ],
};
