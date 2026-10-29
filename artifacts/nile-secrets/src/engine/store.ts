import { useSyncExternalStore } from "react";
import { getOrderedLevelIds } from "./content";
import { chapterLevelIds, isLevelUnlockedIn, unlockedIn } from "./unlock";

/** CONTRACT §4 */
export type LevelResult = { stars: 1 | 2 | 3; hints: number; attempts: number };
export type ProgressV2 = {
  version: 2;
  completed: Record<string /* levelId */, LevelResult>;
  discoveredClues: string[];
  lastLevel: string;
  settings: { sound: boolean; textScale: 1 | 1.15 | 1.3 };
};

export const STORAGE_KEY_V2 = "nile-secrets-progress-v2";
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

export function defaultProgress(): ProgressV2 {
  return {
    version: 2,
    completed: {},
    discoveredClues: [],
    lastLevel: "c1-l1",
    settings: { sound: true, textScale: 1 },
  };
}

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

export function isChapterUnlocked(p: ProgressV2, chapter: number, order: readonly string[] = getOrderedLevelIds()) {
  const first = chapterLevelIds(chapter, order)[0];
  return first ? isLevelUnlockedIn(p.completed, first, order) : false;
}

export const unlockedLevels = (p: ProgressV2, order: readonly string[] = getOrderedLevelIds()): string[] =>
  unlockedIn(p.completed, order);

export const chapterStars = (p: ProgressV2, chapter: number, order: readonly string[] = getOrderedLevelIds()) =>
  chapterLevelIds(chapter, order).reduce((sum, id) => sum + (p.completed[id]?.stars ?? 0), 0);

/* ---------- ترحيل V1 → V2 ---------- */
/** المراحل الخمس القديمة (الفهرس 0..4) تتحوّل إلى هذه المستويات. */
export const V1_STAGE_TO_LEVEL = ["c1-l2", "c2-l1", "c3-l1", "c4-l1", "c5-l7"] as const;

/** دالة صافية: تاخد فهارس المراحل المكتملة في V1 وترجع تقدّم V2. قراءة مفتاح V1 من localStorage تنتظر شكله الفعلي. */
export function migrateV1(completedStageIndexes: number[]): ProgressV2 {
  const p = defaultProgress();
  for (const i of completedStageIndexes) {
    const id = V1_STAGE_TO_LEVEL[i];
    if (id) p.completed[id] = { stars: 1, hints: 0, attempts: 1 };
  }
  return p;
}

/* ---------- تخزين محلي بحذر ---------- */
let storageOk = true;
export const isStorageOk = () => storageOk;

function isValid(x: unknown): x is ProgressV2 {
  const p = x as ProgressV2;
  return !!p && p.version === 2 && typeof p.completed === "object" && Array.isArray(p.discoveredClues) && !!p.settings;
}

function read(): ProgressV2 {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_V2);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    return isValid(parsed) ? { ...defaultProgress(), ...parsed } : defaultProgress();
  } catch {
    storageOk = false; // وضع خاص أو تخزين معطّل
    return defaultProgress();
  }
}

function write(p: ProgressV2) {
  try {
    localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(p));
  } catch {
    storageOk = false;
  }
}

/* ---------- المخزن ---------- */
let state: ProgressV2 = read();
const listeners = new Set<() => void>();

function set(next: ProgressV2) {
  state = next;
  write(next);
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

export function resetProgress() {
  set(defaultProgress());
}
