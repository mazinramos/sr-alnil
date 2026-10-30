const base = {
  chapter: 2, difficulty: 1, background: "/art/c2/l1.webp", character: "adam",
  dialogue: [{ speaker: "أ", text: "x" }, { speaker: "ب", text: "y" }], objective: "o", successText: "ok", hints: ["1", "2", "3"],
};
const clues = (p: string) => [{ id: p + "a", title: "t", text: "x", source: "s" }, { id: p + "b", title: "t", text: "x", source: "s" }];
const ch2 = {
  id: 2, title: "x", location: "x", summary: "x", mapPiece: { id: "m", label: "m" },
  levels: [
    { ...base, id: "c2-l1", index: 1, title: "t", clues: clues("p"), puzzle: { type: "balance", weights: [{ id: "w1", label: "a", value: 5 }, { id: "w2", label: "b", value: 7 }], target: 9 } },          // لا مجموع ممكن
    { ...base, id: "c2-l7", index: 7, title: "t", clues: clues("q"), puzzle: { type: "memory", pairs: [{ id: "a", label: "a" }, { id: "b", label: "b" }] } },                                     // 7 بدون isBoss
  ],
};
export default ch2;
