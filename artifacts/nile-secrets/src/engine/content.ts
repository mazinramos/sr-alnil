import type { Chapter, Level } from "../content/types";

/** يجمع كل content/chapters/ch*.ts الموجودة. الفصل الناقص يُتجاهل بدون انهيار. */
const modules = import.meta.glob<Record<string, unknown>>("../content/chapters/ch*.ts", { eager: true });

function pickChapter(mod: Record<string, unknown>): Chapter | null {
  const c = (mod.default ?? Object.values(mod).find((v) => v && typeof v === "object" && "levels" in (v as object))) as Chapter | undefined;
  return c && Array.isArray(c.levels) ? c : null;
}

const chapters: Chapter[] = Object.values(modules)
  .map(pickChapter)
  .filter((c): c is Chapter => !!c)
  .sort((a, b) => a.id - b.id);

export const getChapters = () => chapters;
export const getChapter = (id: number) => chapters.find((c) => c.id === id);
export const getLevel = (id: string): Level | undefined =>
  chapters.flatMap((c) => c.levels).find((l) => l.id === id);
export const nextLevelId = (id: string): string | null => {
  const all = chapters.flatMap((c) => c.levels.map((l) => l.id as string));
  const i = all.indexOf(id);
  return i >= 0 && i < all.length - 1 ? all[i + 1] : null;
};
