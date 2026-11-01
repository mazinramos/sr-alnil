#!/usr/bin/env node
// تشغيل: npm run thumbs   → يولّد public/art/thumbs/cN-lM.webp و legacy-<اسم>.webp (360×240).
// المصغّرات تُستعمل في شاشة عقد الفصل بدل تحميل خلفية 1536×1024 لكل عقدة (شبكات بطيئة). الأصل لا يُلمَس.
// المحرك يجرّب: المصغّرة ← الخلفية الأصلية ← البديل القديم، فغياب مصغّرة لا يكسر شيئاً.
// - الصور الناقصة (مجلد غائب أو فارغ) تُتجاهل بهدوء ولا يفشل الأمر.
// - تُعاد المصغّرة فقط لو تغيّر محتوى الأصل (بصمة في thumbs/manifest.json)، فلا تبقى مصغّرة قديمة بعد وصول صورة جديدة.
// - مصغّرة لأصل محذوف تُحذف. صورة تالفة تُحذَّر وتُتجاوز بدون إيقاف الباقي.
// خيارات: --force يعيد الكل.   متغيّر ART_DIR لتجربة مجلد آخر.
import { mkdir, readFile, writeFile, stat, unlink, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { artDir, listSources, MANIFEST, readManifest, sha } from "./thumbs-lib.mjs";

const ART = artDir();
const OUT = path.join(ART, "thumbs");
const FORCE = process.argv.includes("--force");

const sources = await listSources(ART);
if (!sources.length) {
  console.log("لا توجد صور مصدر بعد في public/art — لا شيء يُولَّد.");
  process.exit(0);
}
await mkdir(OUT, { recursive: true });
const manifest = await readManifest(ART);
const next = {};
let made = 0, kept = 0, bad = 0, total = 0;

for (const { src, thumb } of sources) {
  const dst = path.join(OUT, thumb);
  try {
    const buf = await readFile(src);
    const hash = sha(buf);
    const have = await stat(dst).catch(() => null);
    if (!FORCE && have && manifest[thumb] === hash) {
      next[thumb] = hash; kept++; total += have.size;
      continue;
    }
    await sharp(buf).resize(360, 240, { fit: "cover", position: "centre" }).webp({ quality: 68, effort: 5 }).toFile(dst);
    const size = (await stat(dst)).size;
    next[thumb] = hash; made++; total += size;
    console.log(`✓ thumbs/${thumb}  ${(buf.length / 1024).toFixed(0)}KB → ${(size / 1024).toFixed(0)}KB`);
  } catch (e) {
    bad++;
    console.log(`! تعذّر تحويل ${path.relative(ART, src)} (${String(e.message).slice(0, 60)}) — تُرك بدون مصغّرة`);
    await unlink(dst).catch(() => {});
  }
}

// حذف مصغّرات أصلُها لم يعد موجوداً
let pruned = 0;
for (const f of await readdir(OUT).catch(() => [])) {
  if (f === MANIFEST || !/^(c\d-l\d|legacy-[a-z0-9-]+)\.webp$/.test(f)) continue;
  if (!(f in next) && !sources.some((s) => s.thumb === f)) { await unlink(path.join(OUT, f)); pruned++; }
}

const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(path.join(OUT, MANIFEST), JSON.stringify(sorted, null, 2) + "\n");
console.log(`${made} جديدة/محدَّثة، ${kept} سليمة، ${bad} تالفة، ${pruned} محذوفة؛ مجموع المصغّرات ${(total / 1024).toFixed(0)}KB`);
