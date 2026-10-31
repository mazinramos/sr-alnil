// تشغيل: npm run test:migrate
import assert from "node:assert/strict";
import { v1CompletedFromRaw } from "../src/engine/migrate.ts";

const ids = (raw) => Object.keys(v1CompletedFromRaw(raw)).sort();
assert.deepEqual(ids(null), []);
assert.deepEqual(ids("not json"), []);
assert.deepEqual(ids("{}"), []);
assert.deepEqual(ids(JSON.stringify({ completedStages: ["village", "island"] })), ["c1-l2", "c2-l1"]);
assert.deepEqual(
  ids(JSON.stringify({ completedStages: ["village", "island", "market", "ruins", "cove", "x", 7] })),
  ["c1-l2", "c2-l1", "c3-l1", "c4-l1", "c5-l7"],
);
assert.equal(v1CompletedFromRaw(JSON.stringify({ completedStages: ["cove"] }))["c5-l7"].stars, 1);
console.log("migrate checks: OK");

// ---------- سلامة التخزين (NEXT5): غير متاح، ممتلئ، JSON تالف ----------
import { loadProgress, saveProgress, markV1Done, STORAGE_KEY_V2, defaultProgress } from "../src/engine/storage.ts";
import { STORAGE_KEY_V1, V1_DONE_KEY } from "../src/engine/migrate.ts";

/** تخزين مزيَّف: initial = مفاتيح، failGet/failSet = الدوال ترمي استثناء. */
function fake(initial = {}, { failGet = false, failSet = false } = {}) {
  const data = { ...initial };
  return {
    data,
    getItem(k) { if (failGet) throw new Error("SecurityError"); return k in data ? data[k] : null; },
    setItem(k, v) { if (failSet) throw new Error("QuotaExceededError"); data[k] = String(v); },
  };
}
const emptyProgress = (p) => Object.keys(p.completed).length === 0;
const V1 = JSON.stringify({ completedStages: ["village", "island"] });

// 1) غير متاح تماماً (null) → تقدّم فارغ بدون انهيار، ok=false
{
  const r = loadProgress(null);
  assert.equal(r.ok, false);
  assert.ok(emptyProgress(r.progress));
  assert.equal(saveProgress(null, defaultProgress()), false);
  assert.equal(markV1Done(null), false);
}
// 2) القراءة نفسها ترمي (وضع خاص صارم) → فارغ، ok=false
{
  const r = loadProgress(fake({}, { failGet: true }));
  assert.equal(r.ok, false);
  assert.ok(emptyProgress(r.progress));
}
// 3) ممتلئ: الكتابة ترمي. الحفظ يرجع false، وأول فتح مع V1 يرحّل في الذاكرة ويبلّغ ok=false بلا انهيار
{
  const st = fake({ [STORAGE_KEY_V1]: V1 }, { failSet: true });
  const r = loadProgress(st);
  assert.equal(r.ok, false, "فشل كتابة الترحيل يجب أن يُبلَّغ");
  assert.deepEqual(Object.keys(r.progress.completed).sort(), ["c1-l2", "c2-l1"], "التقدّم المُرحَّل يبقى في الذاكرة");
  assert.equal(saveProgress(st, r.progress), false);
  assert.equal(markV1Done(st), false);
}
// 4) JSON تالف → تقدّم فارغ والتخزين نفسه سليم (ok=true) كي لا يظهر تنبيه «لن يُحفظ» خطأً
{
  const r = loadProgress(fake({ [STORAGE_KEY_V2]: "{not json" }));
  assert.equal(r.ok, true);
  assert.ok(emptyProgress(r.progress));
}
// 5) JSON صالح لكن شكل غير صالح (نسخة أخرى، حقول ناقصة) → فارغ
for (const bad of ['{"version":1}', "null", "[]", '{"version":2}', '{"version":2,"completed":null,"discoveredClues":[],"settings":{}}', '"str"']) {
  const r = loadProgress(fake({ [STORAGE_KEY_V2]: bad }));
  assert.ok(emptyProgress(r.progress), `شكل غير صالح: ${bad}`);
  assert.equal(r.ok, true);
}
// 6) V2 سليم يُقرأ كما هو، وإعدادات ناقصة تُكمَّل بالافتراضي
{
  const saved = { ...defaultProgress(), completed: { "c1-l1": { stars: 3, hints: 0, attempts: 1 } }, settings: { textScale: 1.3 } };
  const r = loadProgress(fake({ [STORAGE_KEY_V2]: JSON.stringify(saved) }));
  assert.equal(r.ok, true);
  assert.equal(r.progress.completed["c1-l1"].stars, 3);
  assert.equal(r.progress.settings.textScale, 1.3);
  assert.equal(r.progress.settings.sound, true, "إعداد ناقص يأخذ الافتراضي");
}
// 7) الحفظ العادي ينجح ويُقرأ
{
  const st = fake();
  const p = { ...defaultProgress(), lastLevel: "c2-l4" };
  assert.equal(saveProgress(st, p), true);
  assert.equal(loadProgress(st).progress.lastLevel, "c2-l4");
}
// 8) «بدء من جديد»: بعد markV1Done لا يُعاد ترحيل V1 حتى لو V2 غير موجود
{
  const st = fake({ [STORAGE_KEY_V1]: V1 });
  assert.equal(markV1Done(st), true);
  assert.ok(st.data[V1_DONE_KEY]);
  assert.ok(emptyProgress(loadProgress(st).progress));
}
// 9) أول فتح بتخزين سليم وV1 موجود: يُرحَّل ويُكتب V2 وعلامة الانتهاء
{
  const st = fake({ [STORAGE_KEY_V1]: V1 });
  const r = loadProgress(st);
  assert.equal(r.ok, true);
  assert.deepEqual(Object.keys(r.progress.completed).sort(), ["c1-l2", "c2-l1"]);
  assert.ok(st.data[STORAGE_KEY_V2] && st.data[V1_DONE_KEY]);
}
console.log("storage safety checks: OK");
