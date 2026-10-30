import type { ProgressV2 } from "./store";

/** رموز الفصول الخمسة (docs/SYMBOLS.md). تُمنح تلقائياً عند إكمال البوس (c{n}-l7) وليس عبر reward. */
export interface Symbol { chapter: number; id: string; name: string; meaning: string }

export const SYMBOLS: Symbol[] = [
  { chapter: 1, id: "symbol-c1", name: "الشمس",  meaning: "البداية: الضوء الذي يكشف الطريق." },
  { chapter: 2, id: "symbol-c2", name: "الموجة", meaning: "العبور: قراءة حركة الماء." },
  { chapter: 3, id: "symbol-c3", name: "الميزان", meaning: "العدل والحساب: ما يحفظه دفتر التاجر." },
  { chapter: 4, id: "symbol-c4", name: "العين",  meaning: "الحراسة والمراقبة: حافظة السجلات." },
  { chapter: 5, id: "symbol-c5", name: "الخيط",  meaning: "الرابط بين الحكايات والناس." },
];

export const symbolOf = (chapter: number) => SYMBOLS.find((s) => s.chapter === chapter);
export const bossIdOf = (chapter: number) => `c${chapter}-l7`;
export const ownsSymbol = (p: ProgressV2, chapter: number) => !!p.completed[bossIdOf(chapter)];
export const ownedSymbols = (p: ProgressV2) => SYMBOLS.filter((s) => ownsSymbol(p, s.chapter));
