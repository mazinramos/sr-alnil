// تشغيل: node scripts/new-chapter.mjs <رقم الفصل> [--out <مجلد>]
// يولّد src/content/chapters/ch<N>.ts من _template.ts.txt. لا يكتب فوق ملف موجود.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHAPTERS = path.resolve(HERE, "../src/content/chapters");
const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outDir = outIdx >= 0 ? path.resolve(args[outIdx + 1] ?? "") : CHAPTERS;
if (outIdx >= 0) args.splice(outIdx, 2);

const raw = args[0];
const n = Number(raw);
if (!raw || !/^\d+$/.test(raw) || n < 1) {
  console.error("الاستعمال: node scripts/new-chapter.mjs <رقم الفصل (عدد صحيح ≥ 1)> [--out <مجلد>]");
  process.exit(1);
}

const target = path.join(outDir, `ch${n}.ts`);
const tpl = await readFile(path.join(CHAPTERS, "_template.ts.txt"), "utf8");
const body = tpl.replaceAll("{{N}}", String(n));
if (body.includes("{{")) {
  console.error("بقي في القالب متغيّر غير مستبدل: " + body.match(/\{\{[^}]*\}\}/)?.[0]);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
try {
  await writeFile(target, body, { flag: "wx" }); // wx: يفشل لو الملف موجود
} catch (e) {
  if (e.code === "EEXIST") {
    console.error(`✗ الملف موجود: ${target}\n  لن أكتب فوقه. احذفيه يدوياً إن كنتِ تقصدين البدء من جديد.`);
    process.exit(1);
  }
  throw e;
}

console.log(`✓ كُتب ${target}`);
if (n > 5) {
  console.log(`\nتنبيه: الفصل ${n} لن يظهر على خريطة الرحلة قبل تنفيذ بنود docs/EXPANSION_GAPS.md (المحطات الخمس ثابتة في ChapterSelect).`);
}
console.log(`
الخطوات التالية (التفاصيل في docs/ADD_CHAPTER.md):
  1) اكتبي النصوص مكان كل «غيّري» وبدّلي الألغاز بما يناسب فصلك.
  2) npm run test:content   ← يجب أن يمرّ بلا أخطاء.
  3) أضيفي شخصياتك الجديدة (engine/characters.ts) ورمز الفصل (engine/symbols.ts).
  4) npm run report:assets  ← قائمة الصور المطلوبة (docs/MISSING_ASSETS.md).
  5) npm run typecheck && npm run check`);
