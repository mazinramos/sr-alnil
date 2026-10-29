/** منطق الفتح الصافي (بدون React ولا import.meta) عشان نقدر نختبرو بـ node. */

export const levelPos = (id: string) => {
  const m = /^c(\d+)-l(\d+)$/.exec(id);
  return m ? { chapter: Number(m[1]), index: Number(m[2]) } : null;
};

/** معرّفات مستويات فصل واحد بحسب ترتيب المحتوى. */
export const chapterLevelIds = (chapter: number, order: readonly string[]) =>
  order.filter((id) => levelPos(id)?.chapter === chapter);

/** مفتوح لو هو الأول في الترتيب، أو السابق الموجود مكتمل. المعرّف غير الموجود في المحتوى مقفول. */
export function isLevelUnlockedIn(completed: Record<string, unknown>, id: string, order: readonly string[]) {
  const i = order.indexOf(id);
  if (i < 0) return false;
  return i === 0 || !!completed[order[i - 1]];
}

export const unlockedIn = (completed: Record<string, unknown>, order: readonly string[]) =>
  order.filter((id) => isLevelUnlockedIn(completed, id, order));
