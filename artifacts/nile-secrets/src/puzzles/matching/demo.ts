import type { PuzzleConfig } from "../../content/types";

export const demo: Extract<PuzzleConfig, { type: "matching" }> = {
  type: "matching",
  left: [
    { id: "jar-a", label: "الجرة الأولى", detail: "ملصق: «للخبز»" },
    { id: "jar-b", label: "الجرة الثانية", detail: "ملصق: «للزينة»" },
    { id: "jar-c", label: "الجرة الثالثة", detail: "ملصق: «للبيت»" },
  ],
  right: [
    { id: "wheat", label: "قمح" },
    { id: "henna", label: "حنّاء" },
    { id: "incense", label: "بخور" },
  ],
  solution: { "jar-a": "wheat", "jar-b": "henna", "jar-c": "incense" },
};
