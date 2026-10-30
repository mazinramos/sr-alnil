/** صور الواجهة الأصلية (ريبلت): تُستعمل كبديل لحد ما تصل الخلفيات الجديدة. مرتبة حسب الفصل 1..5. */
export const STOP_ART = ["village", "island", "market", "archive", "cove"].map((n) => `/art/legacy/${n}.webp`);
/** خلفية CSS متعددة الطبقات: لو الصورة الأولى ما اتحمّلت تظهر الثانية بدون JS. */
export const layered = (...urls: (string | undefined)[]) => urls.filter(Boolean).map((u) => `url(${u})`).join(", ");

export const PUZZLE_NAMES: Record<string, string> = {
  sequence: "ترتيب الرموز", hotspot: "بحث في المشهد", matching: "ربط ومطابقة", codelock: "قفل الرموز",
  choice: "اختيار", route: "رسم المسار", balance: "الميزان", tiles: "تدوير القطع", memory: "ذاكرة الأزواج",
  cipher: "فكّ الشفرة", deduction: "جدول الاستنتاج", jigsaw: "تركيب القطعة",
};
export const CHAPTER_FALLBACK = ["القرية القديمة", "جزيرة الأسرار", "سوق الحكايات", "أطلال النهر", "الضفة الهادئة"];
export const pad2 = (n: number) => String(n).padStart(2, "0");
