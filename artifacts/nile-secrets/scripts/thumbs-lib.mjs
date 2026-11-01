// منطق مشترك بين make-thumbs وverify: أي صور مصدر لها مصغّرة، وبصمة كل مصدر.
import { readdir, readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_ART = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/art");
export const artDir = () => (process.env.ART_DIR ? path.resolve(process.env.ART_DIR) : DEFAULT_ART);
export const MANIFEST = "manifest.json";

export const sha = (buf) => createHash("sha1").update(buf).digest("hex").slice(0, 16);

/** الصور المصدر الموجودة فعلاً: خلفيات cN/lM.webp وصور legacy. الناقص يُتجاهل بهدوء (مجلد غائب أو فارغ). */
export async function listSources(art = artDir()) {
  const out = [];
  let dirs = [];
  try { dirs = await readdir(art); } catch { return out; }
  for (const dir of dirs.filter((d) => /^c\d$/.test(d) || d === "legacy").sort()) {
    const pattern = dir === "legacy" ? /^[a-z0-9-]+\.webp$/ : /^l\d\.webp$/;
    let files = [];
    try { files = await readdir(path.join(art, dir)); } catch { continue; }
    for (const f of files.filter((x) => pattern.test(x)).sort()) {
      const src = path.join(art, dir, f);
      const st = await stat(src).catch(() => null);
      if (!st || !st.isFile()) continue;
      out.push({ src, thumb: `${dir}-${f}`, size: st.size });
    }
  }
  return out;
}

export async function readManifest(art = artDir()) {
  try { return JSON.parse(await readFile(path.join(art, "thumbs", MANIFEST), "utf8")); } catch { return {}; }
}
