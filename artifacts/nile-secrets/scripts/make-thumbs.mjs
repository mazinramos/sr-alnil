#!/usr/bin/env node
// تشغيل: npm run thumbs   → يولّد public/art/thumbs/cN-lM.webp و legacy-<اسم>.webp (360×240) من خلفيات المستويات وصور المحطات.
// المصغّرات تُستعمل في شاشة عقد الفصل بدل تحميل خلفية 1536×1024 لكل عقدة (شبكات بطيئة). الأصل لا يُلمَس.
// المحرك يجرّب: المصغّرة ← الخلفية الأصلية ← البديل القديم. فغياب مصغّرة لا يكسر شيئاً.
// يعيد توليد المصغّرة فقط لو الأصل أحدث منها. خيار --force يعيد الكل.
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ART = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/art");
const OUT = path.join(ART, "thumbs");
const FORCE = process.argv.includes("--force");
await mkdir(OUT, { recursive: true });

let made = 0, skipped = 0, total = 0;
for (const dir of (await readdir(ART)).filter((d) => /^c\d$/.test(d) || d === "legacy").sort()) {
  const pattern = dir === "legacy" ? /^[a-z0-9-]+\.webp$/ : /^l\d\.webp$/;
  for (const f of (await readdir(path.join(ART, dir))).filter((x) => pattern.test(x)).sort()) {
    const src = path.join(ART, dir, f);
    const dst = path.join(OUT, `${dir}-${f}`);
    const s = await stat(src);
    const d = await stat(dst).catch(() => null);
    if (!FORCE && d && d.mtimeMs >= s.mtimeMs) { skipped++; total += d.size; continue; }
    await sharp(src).resize(360, 240, { fit: "cover", position: "centre" }).webp({ quality: 68, effort: 5 }).toFile(dst);
    const size = (await stat(dst)).size;
    total += size; made++;
    console.log(`✓ thumbs/${dir}-${f}  ${(s.size / 1024).toFixed(0)}KB → ${(size / 1024).toFixed(0)}KB`);
  }
}
console.log(`${made} جديدة، ${skipped} محدّثة سابقاً، مجموع المصغّرات ${(total / 1024).toFixed(0)}KB`);
