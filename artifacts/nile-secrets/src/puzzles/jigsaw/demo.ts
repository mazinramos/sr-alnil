import type { PuzzleConfig } from "../../content/types";

// الصورة الفعلية لم تصل بعد: المكوّن يعرض تدرّجاً بديلاً بأرقام خافتة.
// صيغة القصاصة: "#strip=n" بعد المسار (n=1..5 من اليمين). بدونها تُستعمل الصورة كاملة.
export const demo: PuzzleConfig = {
  type: "jigsaw",
  image: "/art/ui/map-full.webp#strip=1",
  pieces: 6,
};
