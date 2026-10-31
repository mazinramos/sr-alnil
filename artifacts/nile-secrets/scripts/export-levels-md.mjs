// تشغيل: node --experimental-strip-types scripts/export-levels-md.mjs [مجلد_الفصول] [ملف_الخرج]
// يقرأ src/content/chapters/ch*.ts (مثل فاحص المحتوى) ويولّد docs/report/appendix_levels.md.
// الناتج حتمي (بلا تواريخ) كي لا يظهر فرق في git إلا عند تغيّر المحتوى.
import { readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const DIR = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(here, "../src/content/chapters");
const OUT = process.argv[3] ? path.resolve(process.argv[3]) : path.resolve(here, "../../../docs/report/appendix_levels.md");

const TYPE_AR = {
  hotspot: "بحث بصري", sequence: "ترتيب", matching: "ربط", choice: "اختيار", deduction: "استنتاج",
  route: "مسار", balance: "ميزان", tiles: "قطع وقنوات", memory: "ذاكرة", cipher: "تشفير",
  codelock: "قفل رموز", jigsaw: "تركيب",
};
const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();

const files = (await readdir(DIR)).filter((f) => /^ch\d+\.ts$/.test(f)).sort();
const chapters = [];
for (const f of files) {
  const mod = await import(pathToFileURL(path.join(DIR, f)).href);
  if (mod.default) chapters.push(mod.default);
}
chapters.sort((a, b) => a.id - b.id);

const counts = {};
let total = 0;
const lines = [];
lines.push("# ملحق: جدول المستويات", "");
lines.push("مولَّد آلياً من `src/content/chapters/*.ts` بالأمر `node --experimental-strip-types scripts/export-levels-md.mjs`. لا تعدّلوه يدوياً.", "");

for (const ch of chapters) {
  lines.push(`## الفصل ${ch.id} — ${esc(ch.title)}`, "");
  lines.push(`المكان: ${esc(ch.location)}. المكافأة: ${esc(ch.mapPiece?.label)}.`, "");
  lines.push("| المستوى | العنوان | النوع | الصعوبة | الهدف |", "|---|---|---|---|---|");
  const levels = [...ch.levels].sort((a, b) => a.index - b.index);
  for (const l of levels) {
    const t = l.puzzle?.type;
    counts[t] = (counts[t] ?? 0) + 1;
    total++;
    const title = esc(l.title) + (l.isBoss ? " (زعيم)" : "");
    lines.push(`| ${l.id} | ${title} | ${t} (${TYPE_AR[t] ?? "؟"}) | ${l.difficulty} | ${esc(l.objective)} |`);
  }
  const avg = levels.reduce((s, l) => s + l.difficulty, 0) / (levels.length || 1);
  lines.push("", `متوسط الصعوبة: ${avg.toFixed(2)}`, "");
}

lines.push("## ملخص الأنواع", "", "| النوع | العدد |", "|---|---|");
for (const [t, n] of Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
  lines.push(`| ${t} (${TYPE_AR[t] ?? "؟"}) | ${n} |`);
}
lines.push(`| **المجموع** | **${total}** |`, "");

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, lines.join("\n"), "utf8");
console.log(`appendix_levels.md: ${chapters.length} فصول، ${total} مستوى، ${Object.keys(counts).length} نوعاً → ${path.relative(process.cwd(), OUT)}`);
