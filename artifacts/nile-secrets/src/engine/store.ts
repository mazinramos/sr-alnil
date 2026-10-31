import { useSyncExternalStore } from "react";
import { getOrderedLevelIds } from "./content";
import { chapterLevelIds, isChapterUnlockedIn, isLevelUnlockedIn, unlockedIn } from "./unlock";
import { v1CompletedFromRaw } from "./migrate";
import { STORAGE_KEY_V2, defaultProgress, getBrowserStorage, loadProgress, markV1Done, saveProgress } from "./storage";

export { STORAGE_KEY_V2, defaultProgress };

/** CONTRACT §4 */
export type LevelResult = { stars: 1 | 2 | 3; hints: number; attempts: number };
export type ProgressV2 = {
  version: 2;
  completed: Record<string /* levelId */, LevelResult>;
  discoveredClues: string[];
  lastLevel: string;
  settings: { sound: boolean; textScale: 1 | 1.15 | 1.3 };
};

export const CHAPTERS = 5;
export const LEVELS_PER_CHAPTER = 7;

/** كل معرّفات المستويات بالترتيب: c1-l1 … c5-l7 */
export const ALL_LEVEL_IDS: string[] = Array.from({ length: CHAPTERS }, (_, c) =>
  Array.from({ length: LEVELS_PER_CHAPTER }, (_, l) => `c${c + 1}-l${l + 1}`),
).flat();

export const levelId = (chapter: number, index: number) => `c${chapter}-l${index}`;
export const parseLevelId = (id: string) => {
  const m = /^c(\d+)-l(\d+)$/.exec(id);
  return m ? { chapter: Number(m[1]), index: Number(m[2]) } : null;
};

/* ---------- نجوم (CONTRACT §4) ---------- */
/** 3 = بدون تلميح وأقل من محاولتين خاطئتين. 2 = تلميح واحد على الأكثر وحتى 3 أخطاء. 1 = غير ذلك. */
export function calcStars(hints: number, wrongAttempts: number): 1 | 2 | 3 {
  if (hints === 0 && wrongAttempts < 2) return 3;
  if (hints <= 1 && wrongAttempts <= 3) return 2;
  return 1;
}

/* ---------- فتح المستويات والفصول (CONTRACT §4 المحدّث) ----------
 * المستوى يُفتح لو المستوى *الموجود* السابق في ترتيب المحتوى مكتمل.
 * الفصل يُفتح لو آخر مستوى موجود في الفصل السابق مكتمل (= أول مستوى فيه يُفتح). */
export const isLevelUnlocked = (p: ProgressV2, id: string, order: readonly string[] = getOrderedLevelIds()) =>
  isLevelUnlockedIn(p.completed, id, order);

export const isChapterUnlocked = (p: ProgressV2, chapter: number, order: readonly string[] = getOrderedLevelIds()) =>
  isChapterUnlockedIn(p.completed, chapter, order);

export const unlockedLevels = (p: ProgressV2, order: readonly string[] = getOrderedLevelIds()): string[] =>
  unlockedIn(p.completed, order);

export const chapterStars = (p: ProgressV2, chapter: number, order: readonly string[] = getOrderedLevelIds()) =>
  chapterLevelIds(chapter, order).reduce((sum, id) => sum + (p.completed[id]?.stars ?? 0), 0);

/* ---------- ترحيل V1 → V2 ----------
 * عند أول فتح بدون مفتاح V2: نقرأ مفتاح V1 (ريبلت) ونحوّل المراحل المكتملة. مفتاح V1 لا يُمسح. */
export function migrateV1(raw: string | null): ProgressV2 {
  return { ...defaultProgress(), completed: v1CompletedFromRaw(raw) };
}

/* ---------- تخزين محلي بحذر (المنطق في storage.ts ومُختبَر) ---------- */
let storageOk = true;
const okListeners = new Set<() => void>();
function setStorageOk(v: boolean) {
  if (storageOk === v) return;
  storageOk = v;
  okListeners.forEach((l) => l());
}
export const isStorageOk = () => storageOk;
export const useStorageOk = () =>
  useSyncExternalStore((l) => (okListeners.add(l), () => okListeners.delete(l)), isStorageOk);

const storage = getBrowserStorage();
const loaded = loadProgress(storage);
storageOk = loaded.ok;

/* ---------- المخزن ---------- */
let state: ProgressV2 = loaded.progress;
const listeners = new Set<() => void>();

function set(next: ProgressV2) {
  state = next;
  setStorageOk(saveProgress(storage, next)); // فشل الحفظ (ممتلئ/غير متاح): نكمل في الذاكرة ونُظهر التنبيه
  listeners.forEach((l) => l());
}

export const getProgress = () => state;
export const subscribe = (l: () => void) => (listeners.add(l), () => listeners.delete(l));
export const useProgress = () => useSyncExternalStore(subscribe, getProgress);

export function completeLevel(id: string, hints: number, attempts: number) {
  const stars = calcStars(hints, Math.max(0, attempts - 1));
  const prev = state.completed[id];
  const best = prev && prev.stars > stars ? prev.stars : stars;
  set({
    ...state,
    completed: { ...state.completed, [id]: { stars: best, hints, attempts } },
    lastLevel: id,
  });
  return stars;
}

export function discoverClues(ids: string[]) {
  const merged = Array.from(new Set([...state.discoveredClues, ...ids]));
  if (merged.length !== state.discoveredClues.length) set({ ...state, discoveredClues: merged });
}

export function setLastLevel(id: string) {
  if (state.lastLevel !== id) set({ ...state, lastLevel: id });
}

export function updateSettings(patch: Partial<ProgressV2["settings"]>) {
  set({ ...state, settings: { ...state.settings, ...patch } });
}

/** «بدء من جديد»: يمسح V2 ويمنع إعادة ترحيل V1 تلقائياً (مفتاح V1 نفسه لا يُمسح). */
export function resetProgress() {
  markV1Done(storage);
  set(defaultProgress());
}
