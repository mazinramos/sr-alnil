/** معرّفات الشخصيات من CONTRACT §10. صورة التعبير: /art/chars/{id}-{mood}.webp (الافتراضي neutral). */
export type CharacterId =
  | "nour" | "safiya" | "bashir" | "adam" | "saif"
  | "yunus" | "halima" | "hala" | "othman" | "rihab";

export interface Character { id: CharacterId; name: string; role: string }

export const CHARACTERS: Record<CharacterId, Character> = {
  nour:   { id: "nour",   name: "نور",         role: "حفيدة صفية" },
  safiya: { id: "safiya", name: "صفية",        role: "الجدة" },
  bashir: { id: "bashir", name: "بشير",        role: "جار الجدة، حافظ الحكايات" },
  adam:   { id: "adam",   name: "آدم",         role: "الملاّح" },
  saif:   { id: "saif",   name: "سيف",         role: "ابن آدم الصغير" },
  yunus:  { id: "yunus",  name: "يونس",        role: "التاجر" },
  halima: { id: "halima", name: "حليمة",       role: "ست الشاي" },
  hala:   { id: "hala",   name: "هالة",        role: "الحارسة" },
  othman: { id: "othman", name: "الحاج عثمان", role: "راوي المكان" },
  rihab:  { id: "rihab",  name: "رحاب",        role: "أمينة الأرشيف" },
};

export const getCharacter = (id: string): Character | undefined => CHARACTERS[id as CharacterId];
export const portraitSrc = (id: string, mood = "neutral") => `/art/chars/${id}-${mood}.webp`;
/** الحرف الأول للاسم (للـ fallback). */
export const initialOf = (id: string) => (getCharacter(id)?.name ?? id).trim().charAt(0);
