import type { PuzzleConfig } from "../../content/types";

// 6 أزواج (12 بطاقة). كل 6 تقليبات فاشلة = onResult(false). الأيقونات من أسماء PROMPTS_00_INVENTORY §3.4.
export const demo: Extract<PuzzleConfig, { type: "memory" }> = {
  type: "memory",
  pairs: [
    { id: "cumin", label: "كمّون", icon: "spice-cumin" },
    { id: "cinnamon", label: "قرفة", icon: "spice-cinnamon" },
    { id: "clove", label: "قرنفل", icon: "spice-clove" },
    { id: "pepper", label: "فلفل", icon: "spice-pepper" },
    { id: "cardamom", label: "هيل" },
    { id: "ginger", label: "زنجبيل" },
  ],
};
