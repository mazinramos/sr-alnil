// تشغيل: npm run test:content
// يفحص كل مستويات src/content/chapters/*.ts ويفشل (exit 1) عند أي خطأ. التحذيرات لا تُفشل.
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/content/chapters");
const errors = [];
const warns = [];
const err = (id, msg) => errors.push(`✗ ${id} — ${msg}`);
const warn = (id, msg) => warns.push(`! ${id} — ${msg}`);

const norm = (s) => String(s ?? "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").trim();
const ids = (arr) => (Array.isArray(arr) ? arr.map((x) => x?.id) : []);
const dupes = (arr) => arr.filter((x, i) => arr.indexOf(x) !== i);
const isArr = Array.isArray;

function subsetSumPossible(values, target, maxItems) {
  // أي مجموعة جزئية (كل قطعة مرة) غير فارغة مجموعها = target وعددها ≤ maxItems (إن وُجد)
  const limit = maxItems && maxItems > 0 ? maxItems : values.length;
  const reach = Array.from({ length: limit + 1 }, () => new Set());
  reach[0].add(0);
  for (const v of values) {
    for (let k = limit - 1; k >= 0; k--) for (const s of reach[k]) reach[k + 1].add(s + v);
  }
  for (let k = 1; k <= limit; k++) if (reach[k].has(target)) return true;
  return false;
}

function checkPuzzle(L, p) {
  const id = L.id;
  const needSubset = (name, picked, pool) => {
    const set = new Set(pool);
    for (const x of picked) if (!set.has(x)) err(id, `${name}: المعرّف «${x}» غير موجود ضمن العناصر`);
  };
  const uniqueIds = (name, arr) => {
    const d = dupes(ids(arr));
    if (d.length) err(id, `${name}: معرّفات مكررة (${[...new Set(d)].join(", ")})`);
  };

  switch (p.type) {
    case "sequence": {
      uniqueIds("items", p.items);
      needSubset("solution", p.solution ?? [], ids(p.items));
      if (dupes(p.solution ?? []).length) err(id, "sequence: solution فيه عنصر مكرر");
      if ((p.solution ?? []).length < 2) err(id, "sequence: الحل أقصر من عنصرين");
      const n = (p.solution ?? []).length;
      let f = 1; for (let i = 2; i <= n; i++) f *= i;
      if (f < 100) warn(id, `sequence: ${n} عناصر = ${f} ترتيباً فقط (<100) — تأكدي أن الحل يحتاج دليلاً مكتوباً`);
      break;
    }
    case "codelock": {
      uniqueIds("symbols", p.symbols);
      needSubset("solution", p.solution ?? [], ids(p.symbols));
      if ((p.solution ?? []).length !== p.length) err(id, `codelock: طول الحل ${(p.solution ?? []).length} ≠ length ${p.length}`);
      const combos = Math.pow((p.symbols ?? []).length, p.length ?? 0);
      if (combos < 100) warn(id, `codelock: ${combos} احتمالاً فقط (<100)`);
      break;
    }
    case "cipher": {
      uniqueIds("key", p.key);
      const keyIds = new Set(ids(p.key));
      const ct = p.cipherText ?? [];
      const an = p.answer ?? [];
      if (ct.length !== an.length) err(id, `cipher: طول cipherText ${ct.length} ≠ طول answer ${an.length}`);
      const bySymbol = new Map();
      ct.forEach((t, i) => {
        if (t === "|") {
          if (an[i] !== "|") err(id, `cipher: الموضع ${i} فاصل في cipherText لكن answer فيه «${an[i]}»`);
          return;
        }
        if (!keyIds.has(t)) return err(id, `cipher: الرمز «${t}» في cipherText غير موجود في key`);
        const letter = norm(an[i]);
        if (bySymbol.has(t) && bySymbol.get(t) !== letter) err(id, `cipher: الرمز «${t}» يقابل حرفين مختلفين في answer`);
        bySymbol.set(t, letter);
        const detail = p.key.find((k) => k.id === t)?.detail;
        if (detail && norm(detail) !== letter) err(id, `cipher: key[${t}].detail «${detail}» ≠ حرف answer «${an[i]}»`);
      });
      break;
    }
    case "matching": {
      uniqueIds("left", p.left);
      uniqueIds("right", p.right);
      const sol = p.solution ?? {};
      needSubset("solution (مفاتيح)", Object.keys(sol), ids(p.left));
      needSubset("solution (قيم)", Object.values(sol), ids(p.right));
      for (const l of ids(p.left)) if (!(l in sol)) err(id, `matching: العنصر «${l}» بلا حل`);
      if (dupes(Object.values(sol)).length) warn(id, "matching: أكثر من عنصر يقابل نفس الطرف الأيمن");
      break;
    }
    case "route": {
      uniqueIds("nodes", p.nodes);
      needSubset("solution", p.solution ?? [], ids(p.nodes));
      if ((p.solution ?? []).length !== p.pick) err(id, `route: طول الحل ${(p.solution ?? []).length} ≠ pick ${p.pick}`);
      if (dupes(p.solution ?? []).length) warn(id, "route: solution فيه محطة مكررة");
      if (p.pick > (p.nodes ?? []).length) err(id, "route: pick أكبر من عدد المحطات");
      break;
    }
    case "deduction": {
      uniqueIds("rows", p.rows);
      uniqueIds("cols", p.cols);
      const sol = p.solution ?? {};
      needSubset("solution (مفاتيح)", Object.keys(sol), ids(p.rows));
      needSubset("solution (قيم)", Object.values(sol), ids(p.cols));
      for (const r of ids(p.rows)) if (!(r in sol)) err(id, `deduction: الصف «${r}» بلا حل`);
      if (dupes(Object.values(sol)).length) warn(id, "deduction: عمود مكرر في الحل (الجدول ليس تقابلاً)");
      break;
    }
    case "choice": {
      uniqueIds("options", p.options);
      needSubset("correct", p.correct ?? [], ids(p.options));
      if (!(p.correct ?? []).length) err(id, "choice: لا إجابة صحيحة");
      if (!p.multi && (p.correct ?? []).length > 1) err(id, "choice: عدة إجابات صحيحة لكن multi ليس true");
      break;
    }
    case "balance": {
      uniqueIds("weights", p.weights);
      const values = (p.weights ?? []).map((w) => w.value);
      if (!subsetSumPossible(values, p.target, p.maxItems)) err(id, `balance: لا يوجد مجموع ممكن = ${p.target}${p.maxItems ? ` ضمن ${p.maxItems} قطع` : ""}`);
      break;
    }
    case "hotspot": {
      uniqueIds("targets", p.targets);
      if (p.needed > (p.targets ?? []).length) err(id, `hotspot: needed ${p.needed} أكبر من عدد الأهداف ${(p.targets ?? []).length}`);
      for (const t of p.targets ?? []) {
        if (![t.x, t.y, t.r].every((n) => typeof n === "number" && n >= 0 && n <= 100)) err(id, `hotspot: إحداثيات الهدف «${t.id}» خارج 0–100`);
      }
      break;
    }
    case "tiles": {
      const tid = ids(p.tiles);
      const d = dupes(tid);
      if (d.length) err(id, "tiles: معرّفات مكررة");
      needSubset("solution", ids(p.solution), tid);
      if ((p.solution ?? []).length !== (p.tiles ?? []).length) err(id, "tiles: عدد قطع الحل ≠ عدد القطع");
      if (p.size && p.size[0] * p.size[1] !== (p.tiles ?? []).length) err(id, `tiles: size ${p.size.join("×")} ≠ عدد القطع ${(p.tiles ?? []).length}`);
      break;
    }
    case "memory": {
      uniqueIds("pairs", p.pairs);
      if ((p.pairs ?? []).length < 2) err(id, "memory: أقل من زوجين");
      break;
    }
    case "jigsaw": {
      if (!p.image || typeof p.image !== "string") err(id, "jigsaw: image مفقودة");
      if (!(p.pieces >= 2 && p.pieces <= 15)) err(id, `jigsaw: pieces ${p.pieces} خارج 2–15`);
      break;
    }
    default:
      err(id, `نوع لغز غير معروف «${p?.type}»`);
  }
}

const files = (await readdir(DIR)).filter((f) => /^ch\d+\.ts$/.test(f)).sort();
const seenLevels = new Set();
const seenClues = new Map();
const summary = [];

for (const f of files) {
  const mod = await import(pathToFileURL(path.join(DIR, f)).href);
  const ch = mod.default;
  const fileNo = Number(f.match(/\d+/)[0]);
  if (!ch || !isArr(ch.levels)) { err(f, "لا يوجد export default بفصل صالح"); continue; }
  if (ch.id !== fileNo) err(f, `id الفصل ${ch.id} لا يطابق اسم الملف`);
  if (!ch.mapPiece?.id || !ch.mapPiece?.label) err(f, "mapPiece ناقصة");
  if (ch.levels.length > 7) err(f, `أكثر من 7 مستويات (${ch.levels.length})`);
  summary.push(`${f}: ${ch.levels.length} مستوى (${ch.levels.map((l) => l.index).join(",")})`);

  for (const L of ch.levels) {
    const id = L.id ?? `${f}:?`;
    if (seenLevels.has(L.id)) err(id, "id مكرر");
    seenLevels.add(L.id);
    if (L.id !== `c${L.chapter}-l${L.index}`) err(id, `id لا يطابق chapter/index (c${L.chapter}-l${L.index})`);
    if (L.chapter !== ch.id) err(id, `chapter ${L.chapter} ≠ id الفصل ${ch.id}`);
    if (!(L.index >= 1 && L.index <= 7)) err(id, `index ${L.index} خارج 1–7`);
    if (!L.title) err(id, "title فارغ");
    if (!(L.difficulty >= 1 && L.difficulty <= 5)) err(id, "difficulty خارج 1–5");
    if (!L.background?.startsWith("/art/")) err(id, `background غير صالح «${L.background}»`);
    if (!L.character) err(id, "character فارغ");
    if (!L.objective) err(id, "objective فارغ");
    if (!L.successText) err(id, "successText فارغ");

    if (!isArr(L.hints) || L.hints.length !== 3 || L.hints.some((h) => !String(h ?? "").trim())) err(id, "hints يجب أن تكون 3 نصوص غير فارغة");
    const dl = L.dialogue?.length ?? 0;
    if (dl < 2 || dl > 4) err(id, `dialogue ${dl} أسطر (المسموح 2–4)`);
    for (const d of L.dialogue ?? []) if (!d.speaker || !d.text) err(id, "سطر حوار ناقص speaker أو text");
    const cl = L.clues?.length ?? 0;
    if (cl < 2) err(id, `clues ${cl} (الأدنى 2)`);
    if (cl > 3) warn(id, `clues ${cl} (الأفضل 2–3)`);
    for (const c of L.clues ?? []) {
      if (!c.id || !c.title || !c.text) err(id, `دليل ناقص (${c.id ?? "?"})`);
      if (seenClues.has(c.id)) err(id, `معرّف الدليل «${c.id}» مكرر مع ${seenClues.get(c.id)}`);
      seenClues.set(c.id, id);
    }

    if (L.index === 7 && !L.isBoss) err(id, "مستوى 7 بدون isBoss");
    if (L.isBoss && L.index !== 7) err(id, "isBoss على مستوى ليس 7");
    if (L.isBoss && !L.reward?.id) err(id, "مستوى boss بدون reward");

    if (!L.puzzle) err(id, "puzzle مفقود");
    else checkPuzzle(L, L.puzzle);
  }
}

if (!files.length) err("chapters", "لا توجد ملفات ch*.ts");
console.log(summary.join("\n"));
console.log(`مستويات: ${seenLevels.size} | أدلة: ${seenClues.size}`);
if (warns.length) console.log("\nتحذيرات:\n" + warns.join("\n"));
if (errors.length) {
  console.log("\nأخطاء:\n" + errors.join("\n"));
  console.log(`\n✗ ${errors.length} خطأ، ${warns.length} تحذير`);
  process.exit(1);
}
console.log(`\ncontent checks: OK (${warns.length} تحذير)`);
