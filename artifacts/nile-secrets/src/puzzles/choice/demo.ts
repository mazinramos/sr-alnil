import type { PuzzleConfig } from "../../content/types";

export const demo: Extract<PuzzleConfig, { type: "choice" }> = {
  type: "choice",
  multi: true,
  question: "اختاري العبارتين اللتين كتبتهما الجدة في هامش الدفتر.",
  options: [
    { id: "a", label: "الماء يعرف طريقه." },
    { id: "b", label: "من أخفى شيئاً فقد نسيه." },
    { id: "c", label: "ما يُخبَّأ ليُفهَم لا ليُنسى." },
    { id: "d", label: "الغروب موعد الرحيل." },
    { id: "e", label: "الضوء يكشف النقش." },
  ],
  correct: ["c", "e"],
};
