import type { PuzzleConfig } from "../../content/types";

// نسخة تجريبية بمعرّفات أيقونات من docs/SYMBOLS.md (تظهر label حتى يصل ItemIcon).
export const demo: Extract<PuzzleConfig, { type: "codelock" }> = {
  type: "codelock",
  length: 4,
  symbols: [
    { id: "sun", label: "الشمس", icon: "symbol-c1" },
    { id: "wave", label: "الموجة", icon: "symbol-c2" },
    { id: "scale", label: "الميزان", icon: "symbol-c3" },
    { id: "eye", label: "العين", icon: "symbol-c4" },
    { id: "bird", label: "الطائر", icon: "bird-carving" },
    { id: "boat", label: "المركب", icon: "boat-piece" },
  ],
  solution: ["sun", "wave", "scale", "eye"],
};
