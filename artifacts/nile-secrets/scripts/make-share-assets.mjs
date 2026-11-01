#!/usr/bin/env node
// تشغيل: npm run share-assets → يولّد أصول المشاركة من الصور الموجودة (لا يلمس الأصول):
//   public/favicon-32.png        من items/symbol-c1.webp (الشمس)
//   public/apple-touch-icon.png  180×180 على خلفية الليل
//   public/og-image.jpg          1200×630 من ui/title.webp (JPEG لأن واتساب/فيسبوك لا يعتمدان WebP دائماً)، ≤200KB
import { writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const PUB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
const ART = path.join(PUB, "art");
const NIGHT = { r: 27, g: 42, b: 47, alpha: 1 };
const kb = async (f) => ((await stat(f)).size / 1024).toFixed(0) + "KB";

const symbol = path.join(ART, "items/symbol-c1.webp");
await sharp(symbol).resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile(path.join(PUB, "favicon-32.png"));
const inner = await sharp(symbol).resize(130, 130, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: NIGHT } })
  .composite([{ input: inner, gravity: "centre" }]).png({ compressionLevel: 9 }).toFile(path.join(PUB, "apple-touch-icon.png"));

const title = path.join(ART, "ui/title.webp");
let out, q = 84;
for (; q >= 50; q -= 6) {
  out = await sharp(title).resize(1200, 630, { fit: "cover", position: "centre" }).jpeg({ quality: q, mozjpeg: true }).toBuffer();
  if (out.length <= 200 * 1024) break;
}
await writeFile(path.join(PUB, "og-image.jpg"), out);
console.log(`favicon-32.png ${await kb(path.join(PUB, "favicon-32.png"))} · apple-touch-icon.png ${await kb(path.join(PUB, "apple-touch-icon.png"))} · og-image.jpg ${(out.length / 1024).toFixed(0)}KB (q${q})`);
if (out.length > 200 * 1024) { console.error("✗ og-image أكبر من 200KB"); process.exit(1); }
