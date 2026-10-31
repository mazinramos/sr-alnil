// يتأكد أن check-content يفشل فعلاً على محتوى مكسور (حتى لا يمرّ بصمت لو انكسر الفاحص نفسه).
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";

const r = spawnSync(process.execPath, ["--experimental-strip-types", "scripts/check-content.mjs", "scripts/fixtures/bad-content"], { encoding: "utf8" });
assert.equal(r.status, 1, "يجب أن يخرج بـ 1 على المحتوى المكسور");
const out = r.stdout;
for (const needle of [
  "id مكرر",
  "لا يطابق chapter/index",
  "hints يجب أن تكون 3",
  "dialogue 1 أسطر",
  "clues 1 (الأدنى 2)",
  "المعرّف «zzz» غير موجود",
  "codelock: طول الحل 2 ≠ length 4",
  "balance: لا يوجد مجموع ممكن = 9",
  "مستوى 7 بدون isBoss",
]) {
  assert.ok(out.includes(needle), `لم يُكتشف: ${needle}`);
}
// فحوص NEXT4
for (const needle of [
  "تتابع الفصول غير متصل",         // لا ch4
  "mapPiece.id «m» مكرر",
  "character «ghost» غير موجود في CHARACTERS",
  "speaker «مجهول» غير موجود في CHARACTERS",
  "✗ c5-l1 — إيموجي «☀»",
  "✗ c5-l1 — إيموجي «❤»",
  "✗ c5-l1 — إيموجي «★»",
]) assert.ok(out.includes(needle), `لم يُكتشف: ${needle}`);
assert.ok(!/إيموجي «[▲◆■●◐]/.test(out), "الأشكال الهندسية يجب ألا تُرفض");
assert.ok(!out.includes("speaker «نور»"), "نور شخصية معرّفة");

// فحص الاحتمالات: c3-l1 يُحذَّر، c3-l2 (بتعليق الاستثناء) وc3-l3 (360 احتمالاً) لا
assert.ok(/! c3-l1 — sequence: 6 احتمالاً/.test(out), "c3-l1 يجب أن يُحذَّر");
assert.ok(!/! c3-l2 /.test(out), "c3-l2 معلَّم بالاستثناء فلا يُحذَّر");
assert.ok(!/! c3-l3 /.test(out), "c3-l3 فيه 360 احتمالاً فلا يُحذَّر");
console.log("content selftest: OK");
