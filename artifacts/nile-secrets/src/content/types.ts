export type Item = { id: string; label: string; detail?: string; icon?: string };

export type PuzzleConfig =
  | { type: "sequence";  items: Item[]; solution: string[] }
  | { type: "hotspot";   targets: { id: string; label: string; x: number; y: number; r: number }[]; needed: number } // x,y,r بالنسبة المئوية من الصورة
  | { type: "matching";  left: Item[]; right: Item[]; solution: Record<string, string> }
  | { type: "codelock";  symbols: Item[]; length: number; solution: string[] }
  | { type: "choice";    question: string; options: Item[]; correct: string[]; multi?: boolean }
  | { type: "route";     nodes: { id: string; x: number; y: number; label: string; detail?: string }[]; pick: number; solution: string[] }
  | { type: "balance";   weights: { id: string; label: string; value: number }[]; target: number; maxItems?: number }
  | { type: "tiles";     size: [number, number]; tiles: { id: string; rot: number }[]; solution: { id: string; rot: number }[] }
  | { type: "memory";    pairs: Item[] }
  | { type: "cipher";    key: Item[]; cipherText: string[]; answer: string[] }
  | { type: "deduction"; rows: Item[]; cols: Item[]; solution: Record<string, string> }
  | { type: "jigsaw";    image: string; pieces: number };

export interface Clue { id: string; title: string; text: string; source: string }

export interface Level {
  id: `c${number}-l${number}`;       // مثال: c3-l4
  chapter: number;                   // 1..5
  index: number;                     // 1..7
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  background: string;                // "/art/c3/l4.webp"
  focal?: { x: number; y: number; zoom?: number }; // لو استخدمنا خلفية الفصل مشتركة (القسم 5)
  character: string;                 // id في CHARACTERS
  dialogue: { speaker: string; text: string }[];   // 2-4 أسطر
  objective: string;                 // جملة "ما ينبغي فعله"
  clues: Clue[];                     // 2-3 دلائل، الحل ممكن يُستنتج منها فقط
  puzzle: PuzzleConfig;
  hints: [string, string, string];   // الثالث بس يقدر يكشف الحل
  successText: string;
  isBoss?: boolean;                  // المستوى 7 في كل فصل
  reward?: { id: string; label: string };  // قطعة الخريطة في المستوى 7
}

export interface Chapter {
  id: number; title: string; location: string; summary: string;
  mapPiece: { id: string; label: string };
  levels: Level[];                   // 7 بالضبط
}

export interface PuzzleProps<C extends PuzzleConfig> {
  config: C;
  hintLevel: 0 | 1 | 2 | 3;          // المحرّك يمرّرو؛ النوع يقدر يبرز تلميح بصري (اختياري)
  onResult: (correct: boolean) => void;  // يُنادى عند كل "تأكيد"، النوع ما بيقرر النجوم
}
