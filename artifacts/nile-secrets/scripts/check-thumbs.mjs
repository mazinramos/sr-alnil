// تشغيل: npm run test:thumbs — يجرّب make-thumbs على مجلد مؤقت: صور ناقصة، تالفة، متغيّرة، محذوفة.
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SCRIPT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "make-thumbs.mjs");
const art = await mkdtemp(path.join(tmpdir(), "art-"));
const run = () => spawnSync(process.execPath, [SCRIPT], { env: { ...process.env, ART_DIR: art }, encoding: "utf8" });
const exists = (p) => access(path.join(art, p)).then(() => true, () => false);
const img = (color) => sharp({ create: { width: 600, height: 400, channels: 3, background: color } }).webp().toBuffer();

try {
  // 1) مجلد فاضي تماماً: لا فشل
  let r = run();
  assert.equal(r.status, 0, "مجلد فاضي يجب ألا يفشل");

  // 2) فصل بلا ملفات (c2 فاضي) + صورة تالفة (c3/l1) + بلا legacy: لا فشل، وc1 يُولَّد
  await mkdir(path.join(art, "c1")); await mkdir(path.join(art, "c2")); await mkdir(path.join(art, "c3"));
  await writeFile(path.join(art, "c1/l1.webp"), await img({ r: 200, g: 50, b: 50 }));
  await writeFile(path.join(art, "c3/l1.webp"), "ليست صورة");
  r = run();
  assert.equal(r.status, 0, "صور ناقصة/تالفة لا تُفشل الأمر: " + r.stdout + r.stderr);
  assert.ok(await exists("thumbs/c1-l1.webp"), "مصغّرة c1-l1 تُولَّد");
  assert.ok(!(await exists("thumbs/c3-l1.webp")), "التالفة بلا مصغّرة");
  assert.ok(/تعذّر تحويل c3\/l1\.webp/.test(r.stdout), "تحذير واضح للتالفة");
  const m1 = JSON.parse(await readFile(path.join(art, "thumbs/manifest.json"), "utf8"));
  assert.deepEqual(Object.keys(m1), ["c1-l1.webp"]);

  // 3) تشغيل ثانٍ بلا تغيير: لا إعادة توليد
  r = run();
  assert.ok(/0 جديدة\/محدَّثة، 1 سليمة/.test(r.stdout), "لا يعيد توليد السليم: " + r.stdout);

  // 4) وصلت الصورة الحقيقية (محتوى تغيّر): تُحدَّث المصغّرة فلا تبقى قديمة
  await writeFile(path.join(art, "c1/l1.webp"), await img({ r: 10, g: 120, b: 200 }));
  r = run();
  assert.ok(/1 جديدة\/محدَّثة/.test(r.stdout), "تتحدّث المصغّرة بعد تغيّر الأصل: " + r.stdout);
  const m2 = JSON.parse(await readFile(path.join(art, "thumbs/manifest.json"), "utf8"));
  assert.notEqual(m2["c1-l1.webp"], m1["c1-l1.webp"], "البصمة تتغيّر");
  const px = await sharp(path.join(art, "thumbs/c1-l1.webp")).raw().toBuffer({ resolveWithObject: true });
  assert.ok(px.data[2] > px.data[0], "لون المصغّرة الجديدة أزرق وليس القديم الأحمر");

  // 5) أصل محذوف: تُحذف مصغّرته
  await rm(path.join(art, "c1/l1.webp"));
  r = run();
  assert.equal(r.status, 0);
  assert.ok(!(await exists("thumbs/c1-l1.webp")), "مصغّرة بلا أصل تُحذف");
  console.log("thumbs checks: OK");
} finally {
  await rm(art, { recursive: true, force: true });
}
