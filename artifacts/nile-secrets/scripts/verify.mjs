#!/usr/bin/env node
// npm run verify — فحص شامل بأمر واحد (بلا e2e لأنه يحتاج متصفحاً). يقف عند أول فشل بسطر واضح.
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listSources, readManifest, sha } from "./thumbs-lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NPM = process.platform === "win32" ? "npm.cmd" : "npm";
const t0 = Date.now();

function npmStep(script, extra = []) {
  const r = spawnSync(NPM, ["run", script, ...extra], { cwd: ROOT, encoding: "utf8", shell: process.platform === "win32", maxBuffer: 64 * 1024 * 1024 });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  return { ok: r.status === 0, out };
}

/** لكل خلفية/صورة مصدر مصغّرة موجودة وبصمتها تطابق الأصل الحالي (أي: لا مصغّرة ناقصة ولا قديمة). */
async function thumbsPresent() {
  const sources = await listSources();
  const manifest = await readManifest();
  const missing = [], stale = [];
  const { access } = await import("node:fs/promises");
  for (const { src, thumb } of sources) {
    const file = path.join(path.dirname(path.dirname(src)), "thumbs", thumb);
    const exists = await access(file).then(() => true, () => false);
    if (!exists) { missing.push(thumb); continue; }
    if (manifest[thumb] !== sha(await readFile(src))) stale.push(thumb);
  }
  const ok = !missing.length && !stale.length;
  const out = ok ? `${sources.length} مصدراً، كلها لها مصغّرة حديثة`
    : `${missing.length ? `ناقصة: ${missing.join(", ")}\n` : ""}${stale.length ? `قديمة (الأصل تغيّر): ${stale.join(", ")}\n` : ""}شغّلي: npm run thumbs`;
  return { ok, out };
}

const steps = [
  ["typecheck", () => npmStep("typecheck")],
  ["check (TypeScript + بناء)", () => npmStep("check")],
  ["test:content", () => npmStep("test:content")],
  ["test:unlock", () => npmStep("test:unlock")],
  ["test:migrate", () => npmStep("test:migrate")],
  ["test:thumbs", () => npmStep("test:thumbs")],
  ["المصغّرات لكل خلفية", thumbsPresent],
  ["ملخص الصور", () => npmStep("report:assets", ["--", "--summary"])],
];

let summaryLine = "";
for (let i = 0; i < steps.length; i++) {
  const [name, fn] = steps[i];
  const s = Date.now();
  process.stdout.write(`▶ [${i + 1}/${steps.length}] ${name} … `);
  const r = await fn();
  if (!r.ok) {
    console.log("✗");
    const tail = r.out.trim().split("\n").slice(-25).join("\n");
    console.log(`\n${tail}\n`);
    console.log(`✗ توقّف عند: ${name}`);
    process.exit(1);
  }
  console.log(`✓ (${((Date.now() - s) / 1000).toFixed(1)}ث)`);
  if (name === "ملخص الصور") summaryLine = r.out.trim().split("\n").pop();
  if (name === "المصغّرات لكل خلفية") console.log(`   ${r.out}`);
}
if (summaryLine) console.log(`   ${summaryLine}`);
console.log(`\n✓ كل شيء سليم (${((Date.now() - t0) / 1000).toFixed(0)}ث). ملاحظة: test:e2e لا يدخل هنا لأنه يحتاج متصفحاً.`);
