// تشغيل: npm run dialect            (يعرض كل كلمة فصحى/مصرية متبقية لكل مستوى)
//        npm run dialect -- --strict (يفشل إن بقي شيء)
// يفحص حقول النص فقط (title, dialogue, objective, clues, hints, successText) ولا يلمس الألغاز.
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/content/chapters");
const strict = process.argv.includes("--strict");

// فصحى يجب أن تتحوّل (جذر الكلمة بحدود كلمات)
const STANDARD = ["أين","لماذا","ماذا","هذا","هذه","هذان","هؤلاء","ذلك","تلك","الآن","أريد","تريدين","ليس","ليست","سوف","لقد","حيث","إنّ","سأ","ستجد","تجدين","وجدتُ","أشعر","أعرف","أظن","أظنّ","يجب","ينبغي","بدلاً","أيضاً","جداً","كثيراً","قليلاً","فقط","عندما","حينما","لأن","لأنّ","إذا","إلى","نحو","غداً","الذي","التي","الذين","اللذان","اقرئي","انظري","اعثري","ابحثي","تذكّري","تأمّلي","اربطي","رتّبي","اختاري","أدخلي","اكتشفي"];
// عامية مصرية/خليجية/شامية يجب تجنّبها
const OTHER = ["إزاي","ازاي","ده","كده","دلوقتي","دلوقت","أوي","مش","فين","إيه","ايه","بقى","هلأ","هلق","شلون","وايد","منيح","ليش","شو","هيك"];
const words = (s) => s.split(/[\s،؟!.«»…:\-—()"'؛]+/).filter(Boolean);
const strip = (w) => w.replace(/[ً-ْـ]/g, "");

const STD = new Set(STANDARD.map(strip)); const OTH = new Set(OTHER.map(strip));
function texts(L) {
  const out = [["title", L.title], ["objective", L.objective], ["successText", L.successText]];
  (L.dialogue ?? []).forEach((d, i) => out.push([`dialogue[${i}]`, d.text]));
  (L.clues ?? []).forEach((c, i) => { out.push([`clue[${i}].text`, c.text]); out.push([`clue[${i}].title`, c.title]); if (c.source) out.push([`clue[${i}].source`, c.source]); });
  (L.hints ?? []).forEach((h, i) => out.push([`hint[${i}]`, h]));
  return out.filter(([, t]) => t);
}
let total = 0, levels = 0, clean = 0;
const files = (await readdir(DIR)).filter((f) => /^ch\d+\.ts$/.test(f)).sort();
for (const f of files) {
  const ch = (await import(pathToFileURL(path.join(DIR, f)).href)).default;
  for (const L of ch.levels) {
    levels++;
    const hits = [];
    for (const [field, t] of texts(L)) {
      for (const raw of words(t)) {
        const w = strip(raw);
        const base = w.replace(/^(و|ف|ب|ل)(?=.{3,})/, "");
        if (STD.has(w) || STD.has(base)) hits.push(`${field}: «${raw}» (فصحى)`);
        else if (OTH.has(w) || OTH.has(base)) hits.push(`${field}: «${raw}» (غير سوداني)`);
      }
    }
    if (hits.length) { total += hits.length; console.log(`\n${L.id} — ${hits.length}`); hits.slice(0, 40).forEach((h) => console.log("  " + h)); }
    else clean++;
  }
}
console.log(`\nالمستويات: ${levels} | نظيفة: ${clean} | ملاحظات: ${total}`);
if (strict && total) process.exit(1);
