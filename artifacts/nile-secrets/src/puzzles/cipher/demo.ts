import type { PuzzleConfig } from "../../content/types";

// key: id = معرّف الرمز كما يظهر في cipherText، label = شكل الرمز، detail = الحرف المقابل (اختياري).
// الفاصل بين الكلمات: العنصر "|" في cipherText (والقيمة نفسها في answer).
export const demo: PuzzleConfig = {
  type: "cipher",
  key: [
    { id: "s1", label: "✺", detail: "س" },
    { id: "s2", label: "☾", detail: "ر" },
    { id: "s3", label: "✦", detail: "ا" },
    { id: "s4", label: "◆", detail: "ل" },
    { id: "s5", label: "▲", detail: "ن" },
    { id: "s6", label: "●", detail: "ي" },
    { id: "s7", label: "■", detail: "م" },
  ],
  cipherText: ["s1", "s2", "|", "s3", "s4", "s5", "s6", "s4"],
  answer: ["س", "ر", "|", "ا", "ل", "ن", "ي", "ل"],
};
