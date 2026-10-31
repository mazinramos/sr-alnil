// اختبار فحص الاحتمالات: a (3 عناصر، بلا استثناء) يُحذَّر، b بتعليق الاستثناء لا يُحذَّر، c (6 عناصر، 4 خانات = 360) لا يُحذَّر.
const base = {
  chapter: 3, difficulty: 1, background: "/art/c3/l1.webp", character: "yunus",
  dialogue: [{ speaker: "أ", text: "x" }, { speaker: "ب", text: "y" }], objective: "o", successText: "ok", hints: ["1", "2", "3"],
};
const clues = (p: string) => [{ id: p + "a", title: "t", text: "x", source: "s" }, { id: p + "b", title: "t", text: "x", source: "s" }];
const it = (...ids: string[]) => ids.map((id) => ({ id, label: id }));
const ch3 = {
  id: 3, title: "x", location: "x", summary: "x", mapPiece: { id: "m", label: "m" },
  levels: [
    { ...base, id: "c3-l1", index: 1, title: "t", clues: clues("a"), puzzle: { type: "sequence", items: it("a", "b", "c"), solution: ["a", "b", "c"] } },
    // allow-low-permutations
    { ...base, id: "c3-l2", index: 2, title: "t", clues: clues("b"), puzzle: { type: "sequence", items: it("a", "b", "c"), solution: ["a", "b", "c"] } },
    { ...base, id: "c3-l3", index: 3, title: "t", clues: clues("c"), puzzle: { type: "sequence", items: it("a", "b", "c", "d", "e", "f"), solution: ["a", "b", "c", "d"] } },
  ],
};
export default ch3;
