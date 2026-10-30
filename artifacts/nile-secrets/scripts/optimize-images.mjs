#!/usr/bin/env node
// تحويل PNG/JPG داخل public/art إلى WebP بالمقاسات والحدود في CONTRACT §5.
// تشغيل:  npm run optimize-images            (يحوّل PNG/JPG ويترك الأصل)
//         npm run optimize-images -- --rm     (يحذف الأصل بعد نجاح التحويل)
//         npm run optimize-images -- --webp   (يعيد ضغط ملفات WebP الموجودة لو تجاوزت الحد أو غلط مقاسها)
//         npm run optimize-images -- --dry    (يعرض ما سيحدث بدون كتابة)
import { readdir, stat, unlink, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/art");
const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry");
const RM = args.has("--rm");
const REWEBP = args.has("--webp");
const KB = 1024;

/** القاعدة حسب المسار النسبي داخل public/art */
function ruleFor(rel) {
  const p = rel.split(path.sep).join("/");
  if (/^c\d\/l\d-puzzle\./.test(p)) return { kind: "puzzle", w: 1024, h: 1024, fit: "cover", max: 250 * KB };
  if (p.startsWith("chars/")) return { kind: "char", w: 768, h: 768, fit: "contain", alpha: true, max: 200 * KB };
  if (p.startsWith("items/")) return { kind: "item", w: 256, h: 256, fit: "contain", alpha: true, max: 40 * KB };
  if (p.startsWith("ui/")) return { kind: "ui", w: 1536, h: 1024, fit: "cover", max: 300 * KB };
  if (/^c\d\//.test(p)) return { kind: "bg", w: 1536, h: 1024, fit: "cover", max: 250 * KB };
  return null; // legacy/ وغيره: لا نلمسه
}

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(f);
    else yield f;
  }
}

async function encode(buf, r) {
  const base = sharp(buf).rotate().resize(r.w, r.h, {
    fit: r.fit,
    position: "centre",
    ...(r.alpha ? { background: { r: 0, g: 0, b: 0, alpha: 0 } } : {}),
  });
  let out;
  for (let q = 88; q >= 40; q -= 6) {
    out = await base.clone().webp({ quality: q, alphaQuality: r.alpha ? Math.min(q + 8, 100) : 100, effort: 5 }).toBuffer();
    if (out.length <= r.max) return { out, q, ok: true };
  }
  return { out, q: 40, ok: false };
}

const report = [];
for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  const isSrc = [".png", ".jpg", ".jpeg"].includes(ext);
  if (!isSrc && !(REWEBP && ext === ".webp")) continue;
  const rel = path.relative(ROOT, file);
  const rule = ruleFor(rel);
  if (!rule) continue;

  const dest = isSrc ? file.slice(0, -ext.length) + ".webp" : file;
  const buf = await readFile(file);
  if (!isSrc) {
    // WebP موجود: نعيد الترميز فقط لو تجاوز الحد أو مقاسه غلط
    const m = await sharp(buf).metadata();
    if (buf.length <= rule.max && m.width === rule.w && m.height === rule.h) continue;
  }
  const { out, q, ok } = await encode(buf, rule);
  report.push({ file: rel, kind: rule.kind, before: buf.length, after: out.length, q, ok });
  if (DRY) continue;
  await writeFile(dest, out);
  if (RM && isSrc && dest !== file) await unlink(file);
}

const f = (n) => `${(n / KB).toFixed(0)}KB`;
for (const r of report) {
  console.log(`${r.ok ? "✓" : "✗ فوق الحد"} ${r.file} [${r.kind}] ${f(r.before)} → ${f(r.after)} (q${r.q})`);
}
console.log(report.length ? `${DRY ? "(تجربة) " : ""}${report.length} ملف` : "لا شيء يحتاج تحويل.");
if (report.some((r) => !r.ok)) process.exitCode = 1;
