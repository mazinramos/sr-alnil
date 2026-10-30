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
console.log("content selftest: OK");
