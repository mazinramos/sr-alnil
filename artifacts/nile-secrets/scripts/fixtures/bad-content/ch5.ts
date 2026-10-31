// يختبر: فجوة في تتابع الفصول (لا يوجد ch4)، mapPiece مكرر، شخصية/متحدث غير معرّفين، إيموجي، والأشكال الهندسية المسموحة.
const ch5 = {
  id: 5, title: "x", location: "x", summary: "x", mapPiece: { id: "m", label: "m" },
  levels: [
    {
      id: "c5-l1", chapter: 5, index: 1, title: "t", difficulty: 1, background: "/art/c5/l1.webp", character: "ghost",
      dialogue: [{ speaker: "مجهول", text: "x" }, { speaker: "نور", text: "y" }],
      objective: "o", successText: "ok", hints: ["1", "2", "3"],
      clues: [{ id: "g1", title: "t", text: "x", source: "s" }, { id: "g2", title: "t", text: "x", source: "s" }],
      puzzle: {
        type: "memory",
        pairs: [
          { id: "p1", label: "☀ شمس" },            // إيموجي: يجب أن يُرفض
          { id: "p2", label: "قلب ❤️" },            // إيموجي مع FE0F
          { id: "p4", label: "نجمة ★" },          // ★ ممنوعة بقرار A
          { id: "p3", label: "▲ ◆ ■ ● ◐" },        // أشكال هندسية: مسموحة
        ],
      },
    },
  ],
};
export default ch5;
