import type { PuzzleConfig } from "../../content/types";

// إحداثيات مؤقتة (نسبة مئوية) — تُعدَّل بعد استعمال /preview/coords على الصورة الفعلية.
export const demo: Extract<PuzzleConfig, { type: "hotspot" }> = {
  type: "hotspot",
  needed: 3,
  targets: [
    { id: "sun", label: "قرص الشمس", x: 22, y: 30, r: 6 },
    { id: "bird", label: "الطائر", x: 68, y: 22, r: 5.5 },
    { id: "boat", label: "قطعة المركب", x: 48, y: 72, r: 6 },
  ],
};
