// تشغيل: npm run test:unlock
import assert from "node:assert/strict";
import { isLevelUnlockedIn, unlockedIn, chapterLevelIds } from "../src/engine/unlock.ts";

// طبقة A فقط: l1 وl4 وl7 من الفصلين 1 و2
const order = ["c1-l1", "c1-l4", "c1-l7", "c2-l1", "c2-l4", "c2-l7"];
const done = (...ids) => Object.fromEntries(ids.map((i) => [i, { stars: 3 }]));

assert.deepEqual(unlockedIn({}, order), ["c1-l1"], "البداية: l1 فقط");
assert.equal(isLevelUnlockedIn(done("c1-l1"), "c1-l4", order), true, "l4 يُفتح بعد l1 رغم غياب l2 وl3");
assert.equal(isLevelUnlockedIn(done("c1-l1"), "c1-l7", order), false, "l7 مقفول قبل l4");
assert.equal(isLevelUnlockedIn(done("c1-l1", "c1-l4", "c1-l7"), "c2-l1", order), true, "الفصل 2 يُفتح بعد آخر مستوى موجود في الفصل 1");
assert.equal(isLevelUnlockedIn(done("c1-l1", "c1-l4"), "c2-l1", order), false, "الفصل 2 مقفول قبل l7");
assert.equal(isLevelUnlockedIn(done("c1-l1"), "c1-l2", order), false, "مستوى غير موجود = مقفول");
assert.deepEqual(chapterLevelIds(2, order), ["c2-l1", "c2-l4", "c2-l7"]);
assert.deepEqual(unlockedIn({}, []), [], "محتوى فاضي لا ينهار");
console.log("unlock checks: OK");
