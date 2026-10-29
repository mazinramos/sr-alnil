import type { PuzzleConfig } from "../../content/types";

export const demo: Extract<PuzzleConfig, { type: "sequence" }> = {
  type: "sequence",
  items: [
    { id: "sun", label: "قرص الشمس" },
    { id: "bird", label: "الطائر" },
    { id: "boat", label: "المركب" },
    { id: "river", label: "النهر" },
  ],
  solution: ["sun", "bird", "boat", "river"],
};
