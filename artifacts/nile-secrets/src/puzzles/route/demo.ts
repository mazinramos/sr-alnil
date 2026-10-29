import type { PuzzleConfig } from "../../content/types";

// ممر ضحل: 3 أحجار آمنة من 6 (ماء هادئ خلف الحجر). الترتيب من القريب للبعيد.
// إحداثيات مؤقتة (تُعدَّل بعد /preview/coords على الصورة الفعلية).
export const demo: Extract<PuzzleConfig, { type: "route" }> = {
  type: "route",
  pick: 3,
  nodes: [
    { id: "s1", x: 18, y: 78, label: "حجر ١", detail: "الماء خلفه يدور ويصدر رغوة." },
    { id: "s2", x: 34, y: 66, label: "حجر ٢", detail: "الماء خلفه هادئ وصافٍ." },
    { id: "s3", x: 48, y: 74, label: "حجر ٣", detail: "الماء خلفه متكسّر ومضطرب." },
    { id: "s4", x: 60, y: 54, label: "حجر ٤", detail: "الماء خلفه هادئ وصافٍ." },
    { id: "s5", x: 74, y: 62, label: "حجر ٥", detail: "تتجمّع خلفه أوراق قصب تدور." },
    { id: "s6", x: 84, y: 38, label: "حجر ٦", detail: "الماء خلفه هادئ وصافٍ." },
  ],
  solution: ["s2", "s4", "s6"],
};
