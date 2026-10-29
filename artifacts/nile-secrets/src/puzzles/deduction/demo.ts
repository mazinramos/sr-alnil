import type { PuzzleConfig } from "../../content/types";

// الحل الوحيد (تحقق منه بالحصر الكامل لـ 6 احتمالات):
//   عمر ← الفخار ، سلمى ← العطور ، خالد ← الأقمشة
// الأدلة المقابلة (يعرضها المحرّك من Level.clues، ليست هنا):
//   1) صاحب الأقمشة ليس عمر ولا سلمى.
//   2) سلمى لا تبيع الفخار.
export const demo: PuzzleConfig = {
  type: "deduction",
  rows: [
    { id: "omar", label: "عمر" },
    { id: "salma", label: "سلمى" },
    { id: "khalid", label: "خالد" },
  ],
  cols: [
    { id: "pottery", label: "الفخار" },
    { id: "perfume", label: "العطور" },
    { id: "cloth", label: "الأقمشة" },
  ],
  solution: { omar: "pottery", salma: "perfume", khalid: "cloth" },
};
