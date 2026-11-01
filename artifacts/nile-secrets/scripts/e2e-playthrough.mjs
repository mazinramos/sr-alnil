#!/usr/bin/env node
/**
 * اختبار تشغيل كامل آلي: يمرّ على المستويات الـ35 بالترتيب عبر الواجهة (375px، لمس)،
 * ويحلّ كل مستوى بحلّه المشتقّ من config نفسه (حلّال لكل نوع من الأنواع الاثني عشر، بلا حلول يدوية).
 *
 * التشغيل:   npm run test:e2e
 * خيارات:    --only=c1-l1,c1-l2   (مستويات محددة فقط، تحتاج تقدّماً متاحاً: تُفتح تلقائياً)
 *            --no-scenarios       (بدون سيناريو «خطأ ثم صح»)
 *            --scenario=c1-l2:1:0,c2-l5:2:1   (سيناريوهات محددة: المستوى:أخطاء:تلميحات)
 *            E2E_SEED=7           (بذرة اختيار مستويات السيناريو)
 *            E2E_BASE_URL=http://127.0.0.1:5173   (خادم قائم بدل تشغيل vite)
 *            E2E_HEADED=1         (متصفح مرئي)
 *            --dist               (يبني dist ويشغّل vite preview ويلعب عليه؛ هذا ما يُنشر على Vercel. المحتوى يُقرأ من المصدر عبر esbuild لا من الصفحة)
 *            --mode=matrix        (مصفوفة المقاسات: مستوى من كل نوع على 5 مقاسات؛ تمرير أفقي/نص مقصوص/أهداف <44px)
 *            --mode=interrupt     (انقطاعات: إعادة تحميل، رجوع، ضغط مزدوج، تدوير الشاشة، تبديل التبويب)
 *            --mode=net           (زمن التحميل بمحاكاة 3G؛ الأدق مع E2E_BASE_URL على نسخة build عبر vite preview)
 *
 * المتطلبات: حزمة playwright (محلية أو عامة) مع Chromium. الاختبار يقرأ المحتوى من خادم التطوير (vite)
 * عبر استيراد src/engine/content.ts في الصفحة، فلا يعمل على نسخة dist الجاهزة.
 * أي فشل = خروج برمز 1.
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.E2E_PORT || 5198);
const EXTERNAL = process.env.E2E_BASE_URL;
const BASE = (EXTERNAL || `http://127.0.0.1:${PORT}`).replace(/\/$/, "") + "/";
const ARGS = process.argv.slice(2);
const ONLY = (ARGS.find((a) => a.startsWith("--only=")) || "").replace("--only=", "").split(",").filter(Boolean);
const SCENARIOS = !ARGS.includes("--no-scenarios") && (ONLY.length === 0 || !!ARGS.find((a) => a.startsWith("--scenario=")));
const SEED = Number(process.env.E2E_SEED || 7);
const SCEN = (ARGS.find((a) => a.startsWith("--scenario=")) || "").replace("--scenario=", ""); // id:أخطاء:تلميحات (يمكن فصل عدة سيناريوهات بفاصلة)
const DIST = ARGS.includes("--dist");
const MODE = (ARGS.find((a) => a.startsWith("--mode=")) || "").replace("--mode=", "");
const STORAGE_KEY = "nile-secrets-progress-v2";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const calcStars = (hints, wrong) => (hints === 0 && wrong < 2 ? 3 : hints <= 1 && wrong <= 3 ? 2 : 1); // CONTRACT §4

function loadPlaywright() {
  const here = createRequire(import.meta.url);
  try { return here("playwright"); } catch { /* جرّب العامة */ }
  const globalRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
  return createRequire(path.join(globalRoot, "x.js"))("playwright");
}

/** يقرأ الفصول من المصدر مباشرة (للوضع --dist حيث لا يتوفر src/ في الصفحة). */
async function loadChaptersNode() {
  const esbuild = await import(path.join(ROOT, "node_modules", "esbuild", "lib", "main.js")).then((m) => m.default || m);
  const fs = await import("node:fs");
  const os = await import("node:os");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "e2e-content-"));
  const entry = path.join(dir, "entry.ts");
  const files = fs.readdirSync(path.join(ROOT, "src", "content", "chapters")).filter((f) => /^ch\d+\.ts$/.test(f)).sort();
  fs.writeFileSync(entry, files.map((f, i) => `import c${i} from ${JSON.stringify(path.join(ROOT, "src", "content", "chapters", f))};`).join("\n") + `\nexport default [${files.map((_, i) => "c" + i).join(",")}];`);
  const out = path.join(dir, "out.mjs");
  await esbuild.build({ entryPoints: [entry], bundle: true, format: "esm", outfile: out, logLevel: "silent" });
  const mod = await import(out);
  return JSON.parse(JSON.stringify(mod.default)).sort((a, b) => a.id - b.id);
}

async function startServer() {
  if (EXTERNAL) return null;
  const vite = path.join(ROOT, "node_modules", "vite", "bin", "vite.js");
  if (DIST) execSync(`${JSON.stringify(process.execPath)} ${JSON.stringify(vite)} build`, { cwd: ROOT, stdio: "ignore" });
  const child = spawn(process.execPath, [vite, ...(DIST ? ["preview"] : []), "--port", String(PORT), "--host", "127.0.0.1", "--strictPort"], { cwd: ROOT, stdio: "ignore" });
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(BASE); if (r.ok) return child; } catch { /* لم يبدأ بعد */ }
    await sleep(500);
  }
  child.kill();
  throw new Error("تعذّر تشغيل خادم vite");
}

/* ---------------- حلّالات الأنواع ---------------- */
const host = (page) => page.locator(".puzzle-host");
const btn = (h, name, exact = true) => h.getByRole("button", { name, exact });
async function stableKeys(cards) {
  let keys = [];
  for (let t = 0; t < 30; t++) {
    keys = [];
    for (const k of cards) keys.push(await faceKey(k));
    const cnt = new Map();
    for (const x of keys) cnt.set(x, (cnt.get(x) || 0) + 1);
    if ([...cnt.values()].every((v) => v === 2)) return keys; // الصور المفقودة تتحوّل إلى نص بعد onError؛ ننتظر الاستقرار
    await sleep(200);
  }
  return keys;
}
async function faceKey(k) { const t = ((await k.textContent()) || "").replace("؟", "").trim(); return t || (await k.innerHTML()).trim(); }
const routeNode = (h, label) => h.getByLabel(new RegExp(`^${esc(label)}(?: — الاختيار \\d+)?$`)); // العقدة المختارة يتغيّر وصفها
const normLetter = (ch) => ({ "أ": "ا", "إ": "ا", "آ": "ا", "ٱ": "ا", "ى": "ي" }[ch] ?? ch);

function farPoints(targets, k) {
  const cand = [];
  for (let x = 5; x <= 95; x += 10) for (let y = 5; y <= 95; y += 10) {
    const d = Math.min(...targets.map((t) => Math.hypot(x - t.x, (y - t.y) * (2 / 3)) - t.r));
    cand.push({ x, y, d });
  }
  cand.sort((a, b) => b.d - a.d);
  return cand.slice(0, k);
}

async function tapFrame(page, pts) {
  const frame = host(page).locator('[role="group"][aria-label^="ابحثي"]');
  for (const p of pts) {
    await frame.scrollIntoViewIfNeeded();
    const b = await frame.boundingBox();
    await page.touchscreen.tap(b.x + (b.width * p.x) / 100, b.y + (b.height * p.y) / 100);
    await sleep(220);
  }
}

function subsetFor(weights, target, maxItems) {
  const n = weights.length;
  for (let mask = 1; mask < 1 << n; mask++) {
    const pick = weights.filter((_, i) => mask & (1 << i));
    if (maxItems && pick.length > maxItems) continue;
    if (pick.reduce((s, w) => s + w.value, 0) === target) return pick;
  }
  throw new Error("لا توجد مجموعة أوزان تطابق الهدف");
}

let LAST_JIGSAW = null; // حالة القطع بعد محاولة خاطئة، يستعملها حلّال jigsaw للإكمال

/** حلّال صحيح: state اختياري (jigsaw) يُمرَّر من محاولة خاطئة سابقة. */
const SOLVE = {
  async hotspot(page, c) {
    await tapFrame(page, c.targets.slice(0, c.needed));
  },
  async sequence(page, c) {
    const h = host(page);
    const label = (id) => c.items.find((i) => i.id === id).label;
    for (const id of c.solution) await btn(h, label(id)).tap();
    await btn(h, "تأكيد").tap();
  },
  async matching(page, c) {
    const h = host(page);
    const cols = h.locator("div.grid.grid-cols-2 > div");
    for (const l of c.left) {
      const r = c.right.find((x) => x.id === c.solution[l.id]);
      await cols.nth(0).locator("button", { has: page.getByText(l.label, { exact: true }) }).first().tap();
      await cols.nth(1).locator("button", { has: page.getByText(r.label, { exact: true }) }).first().tap();
    }
    await btn(h, "تأكيد").tap();
  },
  async codelock(page, c) {
    const h = host(page);
    for (const id of c.solution) await btn(h, c.symbols.find((s) => s.id === id).label).tap();
    await btn(h, "افتحي").tap();
  },
  async choice(page, c) {
    const h = host(page);
    for (const id of c.correct) {
      const o = c.options.find((x) => x.id === id);
      await h.locator("[role=checkbox],[role=radio]", { has: page.getByText(o.label, { exact: true }) }).first().tap();
    }
    await btn(h, "تأكيد").tap();
  },
  async route(page, c) {
    const h = host(page);
    for (const id of c.solution) await routeNode(h, c.nodes.find((n) => n.id === id).label).tap();
    await btn(h, "تأكيد").tap();
  },
  async balance(page, c) {
    const h = host(page);
    for (const w of subsetFor(c.weights, c.target, c.maxItems)) {
      await h.getByRole("button", { name: new RegExp(`^${esc(w.label)}\\s*${w.value}$`) }).tap();
    }
    await btn(h, "تأكيد").tap();
  },
  async tiles(page, c) {
    const h = host(page);
    const cells = c.tiles.map((t) => ({ id: t.id, rot: t.rot }));
    const cell = (i) => h.locator(`[aria-label="القطعة ${i + 1}"]`);
    if (c.tiles.some((t, i) => c.solution[i] && c.solution[i].id !== t.id)) {
      await btn(h, "تبديل").tap();
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].id === c.solution[i].id) continue;
        const j = cells.findIndex((x, k) => k > i && x.id === c.solution[i].id);
        await cell(i).tap(); await cell(j).tap();
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      await btn(h, "تدوير").tap();
    }
    for (let i = 0; i < cells.length; i++) {
      const taps = ((((c.solution[i].rot - cells[i].rot) % 360) + 360) % 360) / 90;
      for (let k = 0; k < taps; k++) { await cell(i).tap(); await sleep(40); }
    }
    await sleep(300);
    await btn(h, "تأكيد").tap();
  },
  async memory(page, c) {
    await host(page).locator('button[aria-label="بطاقة مقلوبة"]').first().waitFor({ timeout: 10000 }); // اللغز يُحمَّل كسولاً
    const cards = await host(page).locator('button[aria-label="بطاقة مقلوبة"]').elementHandles();
    const keys = await stableKeys(cards);
    const used = new Set();
    for (let i = 0; i < cards.length; i++) {
      if (used.has(i)) continue;
      const j = keys.findIndex((x, k) => k !== i && !used.has(k) && x === keys[i]);
      if (j < 0) throw new Error("بطاقة بلا قرين في memory");
      await cards[i].tap(); await sleep(220); await cards[j].tap(); await sleep(320);
      used.add(i); used.add(j);
    }
  },
  async cipher(page, c) {
    const h = host(page);
    const done = new Set();
    for (let i = 0; i < c.cipherText.length; i++) {
      const sid = c.cipherText[i];
      if (sid === "|" || done.has(sid)) continue;
      done.add(sid);
      const sym = c.key.find((k) => k.id === sid);
      await h.locator(`button[aria-label^="رمز ${sym.label}"]`).first().tap();
      await btn(h, normLetter(c.answer[i])).tap();
    }
    await btn(h, "تأكيد").tap();
  },
  async deduction(page, c) {
    const h = host(page);
    for (const r of c.rows) {
      const col = c.cols.find((x) => x.id === c.solution[r.id]);
      const cellBtn = h.locator(`[aria-label^="${r.label} و${col.label}:"]`);
      await cellBtn.tap(); await cellBtn.tap(); // فارغ ← ✗ ← ✓
    }
    await btn(h, "تأكيد").tap();
  },
  async jigsaw(page, c, state) {
    const h = host(page);
    const n = (c.pieces && Number(c.pieces)) || (await h.locator('[aria-label^="خانة"]').count());
    const slots = state?.slots ?? Array(n).fill(null);
    const slot = (i) => h.locator(`[aria-label="خانة ${i + 1}"]`);
    for (let k = 0; k < n; k++) {
      if (slots[k] === k) continue;
      const s = slots.indexOf(k);
      if (s >= 0) {
        await slot(s).tap(); await slot(k).tap();
        slots[s] = slots[k]; slots[k] = k;
      } else {
        await h.locator(`[aria-label="قطعة ${k + 1}"]`).tap(); await slot(k).tap();
        slots[k] = k;
      }
      await sleep(120);
    }
  },
};

/** حلّال خاطئ: يُحدث خطأً واحداً محسوباً ويعيد دالة تنظيف تردّ اللغز لحالة قابلة للحل. */
const WRONG = {
  async hotspot(page, c) {
    await tapFrame(page, farPoints(c.targets, 3));
    return async () => {};
  },
  async sequence(page, c) {
    const h = host(page);
    const label = (id) => c.items.find((i) => i.id === id).label;
    for (const id of [...c.solution].reverse()) await btn(h, label(id)).tap();
    await btn(h, "تأكيد").tap();
    return async () => { const s = h.locator('button[aria-label^="الخانة"]'); const n = await s.count(); for (let i = 0; i < n; i++) await s.nth(i).tap(); };
  },
  async matching(page, c) {
    const h = host(page);
    const cols = h.locator("div.grid.grid-cols-2 > div");
    for (let i = 0; i < c.left.length; i++) {
      const l = c.left[i];
      const r = c.right.find((x) => x.id === c.solution[c.left[(i + 1) % c.left.length].id]);
      await cols.nth(0).locator("button", { has: page.getByText(l.label, { exact: true }) }).first().tap();
      await cols.nth(1).locator("button", { has: page.getByText(r.label, { exact: true }) }).first().tap();
    }
    await btn(h, "تأكيد").tap();
    return async () => {};
  },
  async codelock(page, c) {
    const h = host(page);
    for (const id of c.solution) {
      const other = c.symbols.find((s) => s.id !== id);
      await btn(h, other.label).tap();
    }
    await btn(h, "افتحي").tap();
    return async () => { await btn(h, "مسح").tap(); };
  },
  async choice(page, c) {
    const h = host(page);
    const wrongOpt = c.options.find((o) => !c.correct.includes(o.id));
    await h.locator("[role=checkbox],[role=radio]", { has: page.getByText(wrongOpt.label, { exact: true }) }).first().tap();
    await btn(h, "تأكيد").tap();
    return async () => {
      const on = h.locator('[role=checkbox][aria-checked="true"]');
      for (let i = await on.count(); i > 0; i--) await on.first().tap();
    };
  },
  async route(page, c) {
    const h = host(page);
    const ids = c.nodes.map((n) => n.id);
    const bad = [...ids.filter((id) => !c.solution.includes(id)), ...ids.filter((id) => c.solution.includes(id))].slice(0, c.pick);
    const picks = bad.join() === c.solution.join() ? [...bad].reverse() : bad;
    for (const id of picks) await routeNode(h, c.nodes.find((n) => n.id === id).label).tap();
    await btn(h, "تأكيد").tap();
    await sleep(700);
    return async () => { await routeNode(h, c.nodes.find((n) => n.id === picks[0]).label).tap(); };
  },
  async balance(page, c) {
    const h = host(page);
    const w = c.weights.find((x) => x.value !== c.target);
    const b = h.getByRole("button", { name: new RegExp(`^${esc(w.label)}\\s*${w.value}$`) });
    await b.tap();
    await btn(h, "تأكيد").tap();
    return async () => { await b.tap(); };
  },
  async tiles(page) {
    await btn(host(page), "تأكيد").tap();
    return async () => {};
  },
  async memory(page) {
    await host(page).locator('button[aria-label="بطاقة مقلوبة"]').first().waitFor({ timeout: 10000 }); // اللغز يُحمَّل كسولاً
    const cards = await host(page).locator('button[aria-label="بطاقة مقلوبة"]').elementHandles();
    const keys = await stableKeys(cards);
    const j = keys.findIndex((x, k) => k > 0 && x !== keys[0]);
    for (let n = 0; n < 6; n++) { await cards[0].tap(); await sleep(220); await cards[j].tap(); await sleep(1500); }
    return async () => {};
  },
  async cipher(page, c) {
    const h = host(page);
    const done = new Set();
    for (let i = 0; i < c.cipherText.length; i++) {
      const sid = c.cipherText[i];
      if (sid === "|" || done.has(sid)) continue;
      done.add(sid);
      const sym = c.key.find((k) => k.id === sid);
      await h.locator(`button[aria-label^="رمز ${sym.label}"]`).first().tap();
      await btn(h, normLetter(c.answer[i]) === "ب" ? "ت" : "ب").tap();
    }
    await btn(h, "تأكيد").tap();
    return async () => {};
  },
  async deduction(page, c) {
    const h = host(page);
    for (let i = 0; i < c.rows.length; i++) {
      const r = c.rows[i];
      const col = c.cols.find((x) => x.id === c.solution[c.rows[(i + 1) % c.rows.length].id]);
      const cellBtn = h.locator(`[aria-label^="${r.label} و${col.label}:"]`);
      await cellBtn.tap(); await cellBtn.tap();
    }
    await btn(h, "تأكيد").tap();
    return async () => { await btn(h, "مسح الكل").tap(); };
  },
  async jigsaw(page, c) {
    const h = host(page);
    const n = Number(c.pieces);
    const slots = Array(n).fill(null);
    const alert = () => page.locator(".wrong-note").count();
    const slot = (i) => h.locator(`[aria-label="خانة ${i + 1}"]`);
    // إزاحة دائرية: كل القطع في غير مكانها
    for (let k = 0; k < n && !(await alert()); k++) {
      const to = (k + 1) % n;
      await h.locator(`[aria-label="قطعة ${k + 1}"]`).tap(); await slot(to).tap();
      slots[to] = k; await sleep(120);
    }
    // تبديلات خاطئة إضافية حتى يُحسب الخطأ (حدّ 10 وضعات)
    for (let guard = 0; guard < 40 && !(await alert()); guard++) {
      let done = false;
      for (let a = 0; a < n && !done; a++) for (let b = a + 1; b < n && !done; b++) {
        if (slots[a] === a || slots[b] === b) continue; // مثبّتة
        if (slots[a] === b || slots[b] === a) continue; // ستصير صحيحة
        await slot(a).tap(); await slot(b).tap();
        [slots[a], slots[b]] = [slots[b], slots[a]];
        done = true; await sleep(150);
      }
      if (!done) break;
    }
    LAST_JIGSAW = { slots };
    return async () => {};
  },
};


/* ---------------- مساعدات الواجهة ---------------- */
const NOISE = /Failed to load resource|ERR_TUNNEL|net::|fonts\.g/;

async function readProgress(page) {
  return page.evaluate((k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } }, STORAGE_KEY);
}

async function waitLevelReady(page, level) {
  try {
    await page.waitForFunction((t) => document.querySelector(".stage-narrative h1")?.textContent?.trim() === t, level.title, { timeout: 8000 });
  } catch {
    const got = await page.evaluate(() => document.querySelector(".stage-narrative h1")?.textContent?.trim() || document.body.innerText.slice(0, 60));
    throw new Error(`المستوى لم يُفتح (المعروض: «${got}»)`);
  }
  await host(page).waitFor({ timeout: 8000 });
}

async function solveAndWait(page, level) {
  const t0 = Date.now();
  await SOLVE[level.puzzle.type](page, level.puzzle);
  await page.locator(".result-card").waitFor({ timeout: 15000 }).catch(() => { throw new Error("لم تظهر بطاقة النتيجة بعد الحل"); });
  return Date.now() - t0;
}

async function starsShown(page) {
  const l = (await page.locator(".result-stars").getAttribute("aria-label")) || "";
  return Number((l.match(/\d/) || [0])[0]);
}

async function forceComplete(page, id) {
  await page.evaluate(([k, lid]) => {
    const p = JSON.parse(localStorage.getItem(k) || '{"version":2,"completed":{},"discoveredClues":[],"lastLevel":"","settings":{"sound":true,"textScale":1}}');
    p.completed[lid] = { stars: 1, hints: 0, attempts: 1 };
    localStorage.setItem(k, JSON.stringify(p));
  }, [STORAGE_KEY, id]);
}

async function reloadAt(page, hash) {
  await page.goto(BASE + "#" + hash);
  await page.reload();
  await sleep(500);
}


/* ---------------- أوضاع المتانة ---------------- */
const VIEWPORTS = [[360, 640], [390, 844], [412, 915], [768, 1024], [1280, 800]];

async function measureLayout(page) {
  return page.evaluate(() => {
    const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none"; };
    const d = (el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(/\s+/)[0] : ""}«${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 22)}»`;
    const doc = document.documentElement;
    const hscroll = doc.scrollWidth - doc.clientWidth;
    const clipped = [];
    for (const el of document.querySelectorAll(".stage-narrative *, .puzzle-host *, .stage-footnote, .result-card *")) {
      if (!vis(el) || !(el.textContent || "").trim()) continue;
      const cs = getComputedStyle(el);
      const hid = cs.overflowX !== "visible" || cs.overflowY !== "visible";
      if (hid && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) && el.children.length === 0) clipped.push(d(el));
      const r = el.getBoundingClientRect();
      if (el.children.length === 0 && (r.right > innerWidth + 1 || r.left < -1)) clipped.push("خارج الشاشة: " + d(el));
    }
    const small = [];
    for (const el of document.querySelectorAll("button, [role=button], [role=checkbox], [role=radio], a[href], input, select")) {
      if (!vis(el) || el.disabled) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 43.5 || r.height < 43.5) small.push(`${d(el)} ${Math.round(r.width)}×${Math.round(r.height)}${el.closest(".puzzle-host") ? " [لغز]" : " [واجهة]"}`);
    }
    const host = document.querySelector(".puzzle-host");
    const hostBox = host ? host.getBoundingClientRect() : null;
    return { hscroll, clipped: [...new Set(clipped)].slice(0, 6), small: [...new Set(small)], hostW: hostBox ? Math.round(hostBox.width) : 0, bodyH: doc.scrollHeight, vh: innerHeight };
  });
}

async function runMatrix(browser, levels, rows) {
  const byType = new Map();
  for (const l of levels) if (!byType.has(l.puzzle.type)) byType.set(l.puzzle.type, l);
  for (const [w, h] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 1000, isMobile: w < 1000 });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e).slice(0, 100)));
    await page.goto(BASE + "#/");
    for (const l of levels) await forceComplete(page, l.id);
    for (const [type, L] of byType) {
      const tag = `${w}×${h} ${L.id}`;
      try {
        for (const lv of levels) await forceComplete(page, lv.id);
        await reloadAt(page, `/level/${L.id}`);
        await waitLevelReady(page, L);
        await sleep(400);
        const m = await measureLayout(page);
        // أهداف hotspot: القطر بالبكسل (r نسبة من عرض الإطار)
        let hot = "";
        if (type === "hotspot") {
          const minD = Math.min(...L.puzzle.targets.map((t) => (2 * t.r / 100) * m.hostW));
          if (minD < 44) hot = `هدف hotspot ${Math.round(minD)}px`;
        }
        const problems = [];
        if (m.hscroll > 1) problems.push(`تمرير أفقي ${m.hscroll}px`);
        if (m.clipped.length) problems.push("نص مقصوص: " + m.clipped.slice(0, 3).join("، "));
        const smallPuzzle = m.small.filter((x) => x.includes("[لغز]"));
        if (smallPuzzle.length) problems.push("لمس<44 في اللغز: " + smallPuzzle.slice(0, 3).join("، "));
        if (hot) problems.push(hot);
        if (errs.length) problems.push("خطأ JS: " + errs[0]);
        const chrome = m.small.filter((x) => x.includes("[واجهة]"));
        rows.push({ id: tag, type, ok: problems.length === 0, note: (process.env.E2E_DEBUG ? JSON.stringify({ h: m.hscroll, hw: m.hostW, bh: m.bodyH, vh: m.vh, s: m.small.length }) + " " : "") + problems.join(" | ") + (chrome.length ? ` (واجهة<44: ${chrome.length})` : ""), stars: "-", ms: 0 });
        errs.length = 0;
      } catch (e) {
        rows.push({ id: tag, type, ok: false, note: String(e.message || e).split("\n")[0].slice(0, 200), stars: "-", ms: 0 });
      }
    }
    await ctx.close();
  }
}

async function runInterrupt(browser, levels, rows) {
  const get = (id) => levels.find((l) => l.id === id);
  const add = (id, ok, note = "") => rows.push({ id, type: "-", ok, note, stars: "-", ms: 0 });
  const newPage = async (except = null) => {
    const opts = {};
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, ...opts });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
    page.on("console", (m) => { if (m.type() === "error" && !NOISE.test(m.text())) errs.push("console: " + m.text().slice(0, 100)); });
    await page.goto(BASE + "#/");
    await page.locator(".title-screen").waitFor({ timeout: 15000 });
    if (except) for (const lv of levels) if (!except.includes(lv.id)) await forceComplete(page, lv.id);
    return { ctx, page, errs };
  };

  // (أ) إعادة تحميل وسط مستوى ثم المتابعة
  try {
    const { ctx, page, errs } = await newPage(["c1-l4", "c1-l5"]);
    const L4 = get("c1-l4"), L5 = get("c1-l5");
    await reloadAt(page, "/level/c1-l4");
    await waitLevelReady(page, L4);
    await solveAndWait(page, L4);
    const st4 = await starsShown(page);
    await page.getByRole("button", { name: "المستوى التالي" }).tap();
    await waitLevelReady(page, L5);
    await host(page).getByRole("button").filter({ hasText: /^٩$/ }).first().tap(); // إدخال رمز جزئي
    await page.reload(); await sleep(600);
    await waitLevelReady(page, L5);
    const before = await readProgress(page);
    await solveAndWait(page, L5);
    const st5 = await starsShown(page);
    const prog = await readProgress(page);
    const keys = Object.keys(prog?.completed || {});
    const okp = keys.includes("c1-l4") && keys.includes("c1-l5") && prog.completed["c1-l4"].stars === 3;
    add("أ) إعادة تحميل وسط مستوى", okp && st4 === 3 && st5 === 3 && !errs.length && !!before?.completed?.["c1-l4"], okp ? (errs[0] || "") : "التقدّم: " + JSON.stringify(keys));
    await ctx.close();
  } catch (e) { add("أ) إعادة تحميل وسط مستوى", false, String(e.message || e).split("\n")[0].slice(0, 200)); }

  // (ب) زر الرجوع/الأمام بين الشاشات
  try {
    const { ctx, page, errs } = await newPage();
    await page.getByRole("button", { name: "ابدئي الرحلة" }).tap();
    await page.locator(".stage-narrative h1").waitFor({ timeout: 8000 });
    const trail = [];
    const snap = async () => { await sleep(500); trail.push(await page.evaluate(() => location.hash)); return page.evaluate(() => ({ crash: !!document.body.innerText.match(/حدث خطأ|العودة للخريطة/) && !!document.querySelector(".error-boundary, [role=alert]"), empty: document.body.innerText.trim().length < 5 })); };
    const bad = [];
    await page.getByRole("button", { name: "العودة إلى خريطة الفصل" }).tap(); await sleep(700);
    const node = page.locator("button.lv-node").nth(1);
    if (await node.count() && !(await node.isDisabled())) { await node.tap(); await sleep(700); }
    for (let i = 0; i < 4; i++) { await page.goBack().catch(() => {}); if (page.url().startsWith("about:")) break; const r = await snap(); if (r.crash || r.empty) bad.push("رجوع " + (i + 1) + " " + (await page.evaluate(() => location.href.slice(-24) + " | " + document.body.innerText.trim().slice(0, 40).replace(/\n/g, " ")))); }
    for (let i = 0; i < 4; i++) { await page.goForward().catch(() => {}); await sleep(300); const r = await snap(); if (r.crash || r.empty) bad.push("أمام " + (i + 1)); }
    await page.goto(BASE + "#/level/c9-l9"); await sleep(500);
    const unk = await page.evaluate(() => document.body.innerText.trim().length);
    add("ب) الرجوع والأمام بين الشاشات", !bad.length && !errs.length && unk > 5, (bad.join("، ") || errs[0] || "") + ` [${trail.join(" ")}]`.slice(0, 120));
    await ctx.close();
  } catch (e) { add("ب) الرجوع والأمام بين الشاشات", false, String(e.message || e).split("\n")[0].slice(0, 200)); }

  // (ج) ضغط مزدوج سريع على «تأكيد» و«تلميح»
  for (const [id, kind] of [["c1-l3", "صحيح"], ["c1-l3", "خاطئ"], ["c1-l5", "قفل صحيح"], ["c1-l4", "ربط خاطئ"]]) {
    const name = `ج) ضغطتان سريعتان على التأكيد (${id} ${kind})`;
    try {
      const { ctx, page, errs } = await newPage([]);
      const L = get(id);
      await reloadAt(page, `/level/${id}`);
      await waitLevelReady(page, L);
      const confirmName = L.puzzle.type === "codelock" ? "افتحي" : "تأكيد";
      const h = host(page);
      const c = page.getByRole("button", { name: confirmName, exact: true }).first();
      if (id === "c1-l3") {
        const pick = kind === "صحيح" ? L.puzzle.correct : ["forget"];
        for (const oid of pick) await h.getByRole("checkbox", { name: L.puzzle.options.find((o) => o.id === oid).label }).tap();
      } else if (id === "c1-l5") {
        for (const sid of L.puzzle.solution) await btn(h, L.puzzle.symbols.find((x) => x.id === sid).label).tap();
      } else if (id === "c1-l4") {
        const cols = h.locator("div.grid.grid-cols-2 > div");
        L.puzzle.left.forEach(() => {});
        for (let i = 0; i < L.puzzle.left.length; i++) {
          const l = L.puzzle.left[i];
          const r = L.puzzle.right.find((x) => x.id === L.puzzle.solution[L.puzzle.left[(i + 1) % L.puzzle.left.length].id]); // إزاحة = ربط خاطئ
          await cols.nth(0).locator("button", { has: page.getByText(l.label, { exact: true }) }).first().tap();
          await cols.nth(1).locator("button", { has: page.getByText(r.label, { exact: true }) }).first().tap();
        }
      }
      await c.evaluate((el) => { el.click(); el.click(); });
      await sleep(1200);
      const foot = (await page.locator(".stage-footnote").textContent().catch(() => "")) || "";
      const att = Number((foot.match(/محاولات:\s*(\d+)/) || [])[1] || 0);
      const stars = await starsShown(page).catch(() => 0);
      const progC = await readProgress(page);
      const rec = progC?.completed?.[id];
      const wantRight = kind.includes("صحيح");
      const okc = wantRight ? stars === 3 && rec?.attempts === 1 : att <= 1;
      add(name, okc && !errs.length, wantRight ? `نجوم ${stars} محاولات ${rec?.attempts}` : `عدّاد المحاولات بعد ضغطتين خاطئتين: ${att}${errs[0] ? " | " + errs[0] : ""}`);
      await ctx.close();
    } catch (e) { add(name, false, String(e.message || e).split("\n")[0].slice(0, 200)); }
  }
  try {
    const { ctx, page, errs } = await newPage([]);
    const L = get("c1-l1");
    await reloadAt(page, "/level/c1-l1");
    await waitLevelReady(page, L);
    const hb = page.locator(".hint-button");
    await hb.evaluate((el) => { el.click(); el.click(); });
    await sleep(500);
    const shown = await page.locator(".hint-text, .hint-list li, .hint").count();
    await SOLVE.hotspot(page, L.puzzle);
    await page.locator(".result-card").waitFor({ timeout: 15000 });
    const stars = await starsShown(page);
    const rec = (await readProgress(page))?.completed?.["c1-l1"];
    add("ج) ضغطتان سريعتان على «تلميح» (c1-l1)", !errs.length && rec && rec.hints <= 2, `تلميحات محفوظة ${rec?.hints}، نجوم ${stars}${errs[0] ? " | " + errs[0] : ""}`);
    await ctx.close();
  } catch (e) { add("ج) ضغطتان سريعتان على «تلميح» (c1-l1)", false, String(e.message || e).split("\n")[0].slice(0, 200)); }

  // (د) تدوير الشاشة وسط لغز سحب (jigsaw) ولغز ترتيب
  for (const id of ["c1-l7", "c2-l4"]) {
    try {
      const { ctx, page, errs } = await newPage([]);
      const L = get(id);
      await reloadAt(page, `/level/${id}`);
      await waitLevelReady(page, L);
      const firstBtn = host(page).locator("button:not([disabled])").first();
      await firstBtn.tap().catch(() => {});
      await page.setViewportSize({ width: 812, height: 375 }); await sleep(600);
      await page.setViewportSize({ width: 375, height: 812 }); await sleep(600);
      const m = await measureLayout(page);
      await SOLVE[L.puzzle.type](page, L.puzzle).catch((e) => { throw new Error("الحل بعد التدوير: " + String(e.message).split("\n")[0].slice(0, 80)); });
      await page.locator(".result-card").waitFor({ timeout: 15000 }).catch(() => { throw new Error("لم تظهر النتيجة بعد التدوير"); });
      add(`د) تدوير الشاشة وسط ${L.puzzle.type} (${id})`, !errs.length && m.hscroll <= 1, errs[0] || (m.hscroll > 1 ? "تمرير أفقي بعد العودة" : ""));
      await ctx.close();
    } catch (e) { add(`د) تدوير الشاشة (${id})`, false, String(e.message || e).split("\n")[0].slice(0, 200)); }
  }

  // (هـ) تبديل التبويب ثم العودة
  try {
    const { ctx, page, errs } = await newPage([]);
    const L = get("c2-l1");
    await reloadAt(page, "/level/c2-l1");
    await waitLevelReady(page, L);
    await host(page).locator("button:not([disabled])").first().tap().catch(() => {});
    const other = await ctx.newPage(); await other.goto("about:blank"); await other.bringToFront();
    await page.evaluate(() => { Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true }); document.dispatchEvent(new Event("visibilitychange")); window.dispatchEvent(new Event("blur")); });
    await sleep(2500);
    await page.bringToFront();
    await page.evaluate(() => { Object.defineProperty(document, "visibilityState", { value: "visible", configurable: true }); document.dispatchEvent(new Event("visibilitychange")); window.dispatchEvent(new Event("focus")); });
    await sleep(500);
    await reloadAt(page, "/level/c2-l1");
    await waitLevelReady(page, L);
    await solveAndWait(page, L);
    const stars = await starsShown(page);
    const rec = (await readProgress(page))?.completed?.["c2-l1"];
    add("هـ) تبديل التبويب ثم العودة (c2-l1)", !errs.length && stars === 3 && rec?.attempts === 1, errs[0] || `نجوم ${stars}`);
    await ctx.close();
  } catch (e) { add("هـ) تبديل التبويب ثم العودة", false, String(e.message || e).split("\n")[0].slice(0, 200)); }
}

async function runNet(browser, rows) {
  const profiles = [
    { name: "3G سريع (1.6Mbps/150ms)", down: (1.6 * 1024 * 1024) / 8, up: (750 * 1024) / 8, lat: 150 },
    { name: "3G بطيء (400kbps/400ms)", down: (400 * 1024) / 8, up: (400 * 1024) / 8, lat: 400 },
  ];
  for (const pr of profiles) {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, serviceWorkers: "block" });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    await cdp.send("Network.emulateNetworkConditions", { offline: false, downloadThroughput: pr.down, uploadThroughput: pr.up, latency: pr.lat });
    let bytes = 0;
    cdp.on("Network.loadingFinished", (e) => { bytes += e.encodedDataLength || 0; });
    const t0 = Date.now();
    const sec = (t) => ((t - t0) / 1000).toFixed(1);
    try {
      await page.goto(BASE + "#/", { waitUntil: "commit", timeout: 120000 });
      await page.locator(".title-screen").waitFor({ timeout: 120000 });
      const tTitle = Date.now();
      const b1 = bytes;
      await page.evaluate(() => { location.hash = "#/map"; });
      await page.locator(".map-screen").waitFor({ timeout: 120000 });
      const tMap = Date.now();
      await page.evaluate(() => { location.hash = "#/level/c1-l1"; });
      await page.locator(".puzzle-host").waitFor({ timeout: 120000 });
      const tLevel = Date.now();
      await page.waitForFunction(() => { const im = [...document.images]; const bg = getComputedStyle(document.querySelector(".puzzle-host")?.parentElement || document.body).backgroundImage; return im.length === 0 || im.every((i) => i.complete); }, null, { timeout: 120000 }).catch(() => {});
      const tImg = Date.now();
      rows.push({ id: `شبكة ${pr.name}`, type: "-", ok: true, note: `#/ يظهر ${sec(tTitle)}ث | #/map ${((tMap - tTitle) / 1000).toFixed(1)}ث بعده | أول مستوى ${((tLevel - tMap) / 1000).toFixed(1)}ث (صوره ${sec(tImg)}ث إجمالاً) | منقول ${(bytes / 1024).toFixed(0)}KB (عند العنوان ${(b1 / 1024).toFixed(0)}KB)`, stars: "-", ms: tImg - t0 });
    } catch (e) {
      rows.push({ id: `شبكة ${pr.name}`, type: "-", ok: false, note: String(e.message || e).split("\n")[0].slice(0, 160), stars: "-", ms: 0 });
    }
    await ctx.close();
  }
}

/* ---------------- المسار الرئيسي ---------------- */
function mulberry(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

(async () => {
  const { chromium } = loadPlaywright();
  const server = await startServer();
  const browser = await chromium.launch({ headless: !process.env.E2E_HEADED });
  const rows = [];
  let jsErrors = [];
  const artBad = new Set(); // صور /art/ التي رجعت بحالة ≥400
  const fail = (id, type, msg, ms = 0) => rows.push({ id, type, ok: false, note: msg, stars: "-", ms });
  try {
    if (MODE === "net") { await runNet(browser, rows); throw Object.assign(new Error("__mode_done__"), { modeDone: true }); } // لا يحتاج محتوى الخادم
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    page.on("response", (r) => { if (r.status() >= 400 && r.url().includes("/art/")) artBad.add(`${r.status()} ${new URL(r.url()).pathname}`); });
    page.on("pageerror", (e) => jsErrors.push("pageerror: " + String(e).slice(0, 140)));
    page.on("console", (m) => { if (m.type() === "error" && !NOISE.test(m.text())) jsErrors.push("console: " + m.text().slice(0, 140)); });

    await page.goto(BASE + "#/");
    await page.locator(".title-screen").waitFor({ timeout: 15000 });
    const chapters = DIST ? await loadChaptersNode() : await page.evaluate(async () => (await import("/src/engine/content.ts")).getChapters().map((c) => JSON.parse(JSON.stringify(c))));
    const levels = chapters.flatMap((c) => [...c.levels].sort((a, b) => a.index - b.index));
    if (MODE) {
      if (MODE === "matrix") await runMatrix(browser, levels, rows);
      else if (MODE === "interrupt") await runInterrupt(browser, levels, rows);
      else if (MODE === "net") await runNet(browser, rows);
      else rows.push({ id: "(وضع)", type: "-", ok: false, note: "وضع غير معروف: " + MODE, stars: "-", ms: 0 });
      throw Object.assign(new Error("__mode_done__"), { modeDone: true });
    }
    const picked = SCEN ? [] : ONLY.length ? levels.filter((l) => ONLY.includes(l.id)) : levels;
    if (levels.length !== 35) rows.push({ id: "(محتوى)", type: "-", ok: false, note: `عدد المستويات ${levels.length} بدل 35`, stars: "-", ms: 0 });

    if (SCEN) {
      /* سيناريو منفرد: التقدّم يُفتح في بدايته */
    } else if (ONLY.length) {
      for (const l of levels) if (!ONLY.includes(l.id)) await forceComplete(page, l.id);
      await reloadAt(page, `/level/${picked[0].id}`);
    } else {
      await page.getByRole("button", { name: "ابدئي الرحلة" }).tap();
    }

    for (let i = 0; i < picked.length; i++) {
      const L = picked[i];
      const next = picked[i + 1];
      let ms = 0;
      try {
        await waitLevelReady(page, L);
        ms = await solveAndWait(page, L);
        const stars = await starsShown(page);
        if (stars !== 3) throw new Error(`نجوم ${stars} بدل 3 (حل أول مرة بلا تلميح)`);
        const prog = await readProgress(page);
        const rec = prog?.completed?.[L.id];
        if (!rec || rec.stars !== 3 || rec.attempts !== 1) throw new Error("التقدّم لم يُحفظ كما ينبغي: " + JSON.stringify(rec));
        if (jsErrors.length) throw new Error("أخطاء JS: " + jsErrors.slice(0, 2).join(" | "));

        // الانتقال بالواجهة + التحقق من أن التالي فُتح
        if (L.isBoss || L.index === 7) {
          await page.getByRole("button", { name: "قطعة الخريطة" }).tap();
          await page.locator(".rw-card").waitFor({ timeout: 8000 });
          await page.getByRole("button", { name: "التالي" }).tap();
          await page.locator(".rw-title").waitFor({ timeout: 8000 });
          if (L.chapter === 5) {
            await page.getByRole("button", { name: "الخاتمة" }).tap();
            await page.locator(".ending-screen").waitFor({ timeout: 8000 });
          } else {
            await page.getByRole("button", { name: "العودة إلى الخريطة" }).tap();
            await page.locator(".map-screen").waitFor({ timeout: 8000 });
            if (next) {
              const stop = page.locator("button.map-stop").nth(L.chapter);
              if (await stop.isDisabled()) throw new Error(`الفصل ${L.chapter + 1} لم يُفتح بعد إكمال البوس`);
              await stop.tap();
              const node = page.locator("button.lv-node").first();
              await node.waitFor({ timeout: 8000 });
              if (await node.isDisabled()) throw new Error("أول مستوى في الفصل التالي مقفل");
              await node.tap();
            }
          }
        } else if (next) {
          await page.getByRole("button", { name: "المستوى التالي" }).tap();
        }
        if (jsErrors.length) throw new Error("أخطاء JS أثناء الانتقال: " + jsErrors.slice(0, 2).join(" | "));
        rows.push({ id: L.id, type: L.puzzle.type, ok: true, note: "", stars: String(stars), ms });
        jsErrors = [];
      } catch (e) {
        jsErrors = [];
        fail(L.id, L.puzzle.type, String(e.message || e).split("\n")[0].slice(0, 150), ms);
        // تعافٍ: نعتبر المستوى مكتملاً ونتابع كي لا نخفي بقية الأعطال
        if (next) { await forceComplete(page, L.id); await reloadAt(page, `/level/${next.id}`); }
      }
    }

    if (!SCEN && !ONLY.length) {
      // خادم vite (dev وpreview) يردّ index.html بحالة 200 للملف المفقود، فنفحص وجود صور الخلفيات على القرص.
      const fs = await import("node:fs");
      const missing = levels.filter((l) => l.background && l.background.startsWith("/") && !fs.existsSync(path.join(ROOT, "public", l.background.split("#")[0]))).map((l) => l.id);
      rows.push({ id: "(خلفيات تسقط لبديل)", type: "-", ok: true, note: missing.length ? `${missing.length}: ${missing.join(" ")}` : "لا شيء", stars: "-", ms: 0 });
    }
    if (!SCEN && !ONLY.length) rows.push({ id: "(صور /art/)", type: "-", ok: artBad.size === 0, note: artBad.size ? "404: " + [...artBad].slice(0, 6).join(", ") : "", stars: "-", ms: 0 });

    // الخاتمة: لو مرّ المسار الكامل نكون قد وصلنا إليها
    if (!ONLY.length) {
      const last = rows.find((r) => r.id === "c5-l7");
      if (last?.ok) {
        const onEnding = await page.evaluate(() => location.hash === "#/ending" || !!document.querySelector(".ending-screen"));
        rows.push({ id: "#/ending", type: "-", ok: onEnding, note: onEnding ? "" : "لم يصل إلى الخاتمة", stars: "-", ms: 0 });
      }
    }

    // سيناريو «خطأ ثم صحيح»: خمسة مستويات عشوائية بتلميحات/أخطاء متنوّعة
    if (SCENARIOS) {
      const rnd = mulberry(SEED);
      const pool = [...levels];
      let plans = [{ hints: 0, wrong: 1 }, { hints: 1, wrong: 1 }, { hints: 2, wrong: 0 }, { hints: 0, wrong: 2 }, { hints: 2, wrong: 1 }];
      if (SCEN) plans = SCEN.split(",").map((x) => { const [sid, sw, sh] = x.split(":"); return { id: sid, wrong: Number(sw || 1), hints: Number(sh || 0) }; });
      for (const plan of plans) {
        const L = plan.id ? levels.find((x) => x.id === plan.id) : pool.splice(Math.floor(rnd() * pool.length), 1)[0];
        const tag = `${L.id} (خطأ×${plan.wrong}, تلميح×${plan.hints})`;
        jsErrors = [];
        let ms = 0;
        try {
          for (const lv of levels) await forceComplete(page, lv.id);
          await reloadAt(page, `/level/${L.id}`);
          await waitLevelReady(page, L);
          const t0 = Date.now();
          let cleanup = async () => {};
          LAST_JIGSAW = null;
          for (let w = 0; w < plan.wrong; w++) {
            cleanup = await WRONG[L.puzzle.type](page, L.puzzle);
            await page.locator(".wrong-note").waitFor({ timeout: 15000 }).catch(() => { throw new Error("الحل الخاطئ لم يُحسب خطأ"); });
            await cleanup();
            await sleep(200);
          }
          for (let h = 0; h < plan.hints; h++) await page.locator(".hint-button").tap();
          await SOLVE[L.puzzle.type](page, L.puzzle, LAST_JIGSAW);
          await page.locator(".result-card").waitFor({ timeout: 15000 }).catch(() => { throw new Error("لم تظهر بطاقة النتيجة بعد الخطأ ثم الحل"); });
          ms = Date.now() - t0;
          const stars = await starsShown(page);
          const want = calcStars(plan.hints, plan.wrong);
          const foot = (await page.locator(".stage-footnote").textContent()) || "";
          const att = Number((foot.match(/محاولات:\s*(\d+)/) || [])[1]);
          if (stars !== want) throw new Error(`نجوم ${stars} بدل ${want}`);
          if (att !== plan.wrong + 1) throw new Error(`عدّاد المحاولات ${att} بدل ${plan.wrong + 1}`);
          if (jsErrors.length) throw new Error("أخطاء JS: " + jsErrors.slice(0, 2).join(" | "));
          rows.push({ id: tag, type: L.puzzle.type, ok: true, note: "", stars: `${stars} (متوقّع ${want})`, ms });
        } catch (e) {
          fail(tag, L.puzzle.type, String(e.message || e).replace(/\s+/g, " ").slice(0, 260), ms);
        }
      }
    }

  } catch (e) {
    if (!e.modeDone) rows.push({ id: "(تشغيل)", type: "-", ok: false, note: String(e.message || e).split("\n")[0], stars: "-", ms: 0 });
  } finally {
    await browser.close().catch(() => {});
    server?.kill();
  }

  const pad = (s, n) => String(s).padEnd(n);
  console.log("\n" + pad("المستوى", 34) + pad("النوع", 11) + pad("النتيجة", 8) + pad("النجوم", 14) + pad("الزمن(ث)", 9) + "ملاحظة");
  for (const r of rows) console.log(pad(r.id, 34) + pad(r.type, 11) + pad(r.ok ? "نجح" : "فشل", 8) + pad(r.stars, 14) + pad((r.ms / 1000).toFixed(1), 9) + r.note);
  const bad = rows.filter((r) => !r.ok);
  console.log(`\n${rows.length - bad.length} نجحت، ${bad.length} فشلت`);
  process.exit(bad.length ? 1 : 0);
})();
