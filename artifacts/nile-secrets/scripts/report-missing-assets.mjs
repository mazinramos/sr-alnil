// تشغيل: npm run report:assets  → يكتب docs/MISSING_ASSETS.md
// يجمع كل خلفية وأيقونة وبورتريه وصورة واجهة مستعملة في المحتوى والكود، ويسرد ما ليس له ملف في public/art.
import { readdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const ART = path.join(ROOT, "public/art");
const OUT = path.resolve(ROOT, "../../docs/MISSING_ASSETS.md");
const CHAPTERS = path.join(ROOT, "src/content/chapters");

const exists = (p) => access(p).then(() => true, () => false);
const LAYER_A = new Set([1, 4, 7]);

/** مدخلات: Map<path, {chapter, levels:Set, prio:'A'|'B'}> */
const need = { bg: new Map(), icon: new Map(), char: new Map(), ui: new Map(), puzzle: new Map() };
function add(kind, file, level) {
  const m = need[kind];
  const prev = m.get(file) ?? { chapter: level?.chapter ?? 0, levels: new Set(), prio: "B" };
  if (level) {
    prev.levels.add(level.id);
    prev.chapter = prev.chapter ? Math.min(prev.chapter, level.chapter) : level.chapter;
    if (LAYER_A.has(level.index)) prev.prio = "A";
  }
  m.set(file, prev);
}

const walkIcons = (node, level) => {
  if (Array.isArray(node)) return node.forEach((n) => walkIcons(n, level));
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "icon" && typeof v === "string") {
        add("icon", v.startsWith("/") ? v.replace(/^\/art\//, "") : `items/${v}.webp`, level);
      } else if ((k === "image") && typeof v === "string" && v.startsWith("/art/")) {
        const f = v.replace(/^\/art\//, "").split("#")[0];
        add(f.startsWith("ui/") ? "ui" : "puzzle", f, level);
      } else walkIcons(v, level);
    }
  }
};

const { CHARACTERS } = await import(pathToFileURL(path.join(ROOT, "src/engine/characters.ts")).href);
const nameToId = new Map(Object.values(CHARACTERS).map((c) => [c.name, c.id]));

const files = (await readdir(CHAPTERS)).filter((f) => /^ch\d+\.ts$/.test(f)).sort();
let levelCount = 0;
for (const f of files) {
  const ch = (await import(pathToFileURL(path.join(CHAPTERS, f)).href)).default;
  for (const L of ch.levels) {
    levelCount++;
    add("bg", String(L.background).replace(/^\/art\//, ""), L);
    add("char", `chars/${L.character}-neutral.webp`, L);
    for (const d of L.dialogue ?? []) {
      const id = nameToId.get(d.speaker);
      if (id) add("char", `chars/${id}-neutral.webp`, L);
    }
    walkIcons(L.puzzle, L);
    // رمز الفصل يُمنح عند البوس
    if (L.index === 7) add("icon", `items/symbol-c${L.chapter}.webp`, L);
  }
}
// صور الواجهة المذكورة في الكود
for (const f of await walkSrc(path.join(ROOT, "src"))) {
  const txt = await readFile(f, "utf8");
  for (const m of txt.matchAll(/\/art\/ui\/[a-z0-9-]+\.webp/g)) add("ui", m[0].replace(/^\/art\//, ""));
}
async function walkSrc(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkSrc(p)));
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

const sections = [
  ["ui", "شاشات الواجهة (1536×1024)"],
  ["bg", "خلفيات المستويات (1536×1024، ≤250KB)"],
  ["char", "بورتريهات الشخصيات (768×768 شفاف، ≤200KB)"],
  ["icon", "أيقونات الألغاز والرموز (256×256 شفاف، ≤40KB)"],
  ["puzzle", "صور داخل الألغاز (1024×1024)"],
];

let md = "# MISSING_ASSETS.md — الصور المطلوبة وغير الموجودة\n\n";
md += "> مولَّد آلياً بـ `npm run report:assets` — لا تعدّلي يدوياً. الأولوية **A** = مستعمل في l1 أو l4 أو l7 (طبقة التسليم الأدنى).\n\n";
let totalMissing = 0, totalNeeded = 0, missingA = 0;
const body = [];
for (const [kind, title] of sections) {
  const rows = [];
  for (const [file, info] of need[kind]) {
    totalNeeded++;
    if (await exists(path.join(ART, file))) continue;
    totalMissing++;
    if (info.prio === "A" || kind === "ui") missingA++;
    rows.push({ file, ...info, prio: kind === "ui" ? "A" : info.prio });
  }
  rows.sort((a, b) => (a.chapter - b.chapter) || a.prio.localeCompare(b.prio) || a.file.localeCompare(b.file));
  body.push(`## ${title}\n`);
  if (!rows.length) { body.push("لا شيء ناقص ✓\n"); continue; }
  body.push("| الفصل | أولوية | الملف | مستعمل في |", "|---|---|---|---|");
  for (const r of rows) body.push(`| ${r.chapter || "—"} | ${r.prio} | \`public/art/${r.file}\` | ${[...r.levels].join("، ") || "الواجهة"} |`);
  body.push("");
}
md += `**المطلوب ${totalNeeded} ملفاً، الناقص ${totalMissing}** (منها أولوية A: ${missingA}) — مستويات في المحتوى: ${levelCount}.\n\n` + body.join("\n") + "\n";
await writeFile(OUT, md, "utf8");
console.log(`المطلوب ${totalNeeded}، الناقص ${totalMissing} (A: ${missingA}) → docs/MISSING_ASSETS.md`);
