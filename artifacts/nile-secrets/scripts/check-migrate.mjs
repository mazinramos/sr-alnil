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
