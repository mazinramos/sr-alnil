// محتوى مكسور عمداً لاختبار check-content. لا يُستعمل في اللعبة.
const lvl = (index: number, over: Record<string, unknown> = {}, puzzle: Record<string, unknown> = {}) => ({
  id: `c1-l${index}`, chapter: 1, index, title: "t", difficulty: 1, background: "/art/c1/l1.webp", character: "nour",
  dialogue: [{ speaker: "أ", text: "x" }, { speaker: "ب", text: "y" }],
  objective: "o",
  clues: [{ id: `k${index}a`, title: "t", text: "x", source: "s" }, { id: `k${index}b`, title: "t", text: "x", source: "s" }],
  puzzle: { type: "choice", question: "q", options: [{ id: "a", label: "a" }, { id: "b", label: "b" }], correct: ["a"], ...puzzle },
  hints: ["1", "2", "3"], successText: "ok", ...over,
});
const ch1 = {
  id: 1, title: "x", location: "x", summary: "x", mapPiece: { id: "m", label: "m" },
  levels: [
    lvl(1),                                                              // سليم
    lvl(2, { id: "c1-l1" }),                                             // id مكرر + لا يطابق index
    lvl(3, { hints: ["1", "2"] }),                                       // hints = 2
    lvl(4, { dialogue: [{ speaker: "أ", text: "x" }] }),                 // dialogue = 1
    lvl(5, { clues: [{ id: "only", title: "t", text: "x", source: "s" }] }), // clues = 1
    lvl(6, {}, { correct: ["zzz"] }),                                    // معرّف غير موجود
    lvl(7, {}, { type: "codelock", symbols: [{ id: "s1", label: "1" }, { id: "s2", label: "2" }], length: 4, solution: ["s1", "s2"] }), // طول الحل
  ],
};
export default ch1;
