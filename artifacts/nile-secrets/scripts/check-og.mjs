#!/usr/bin/env node
// تشغيل بعد النشر:  npm run check:og -- https://رابط-الموقع.vercel.app
// يتحقق من وسوم المشاركة على الرابط الحي: og:image مطلق (https) ويفتح فعلاً (صورة، ≤200KB)، وtwitter:image، والعنوان والوصف،
// و theme-color، والأيقونات. للتجربة المحلية مع http://localhost مسموح.
const arg = process.argv[2];
if (!arg) { console.error("الاستعمال: npm run check:og -- https://your-site.vercel.app"); process.exit(2); }
const page = new URL(arg.startsWith("http") ? arg : `https://${arg}`);
const isLocal = ["localhost", "127.0.0.1"].includes(page.hostname);

let failed = 0;
const ok = (c, m) => { console.log(`${c ? "✓" : "✗"} ${m}`); if (!c) failed++; };

const res = await fetch(page).catch((e) => { console.error(`✗ تعذّر فتح ${page}: ${e.message}`); process.exit(1); });
ok(res.ok, `الصفحة تفتح (${res.status})`);
const html = await res.text();

const tag = (re) => { const m = html.match(re); return m ? m[1] : null; };
const meta = (attr, name) => tag(new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`, "i")) ?? tag(new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${name}"`, "i"));
const absolute = (u) => { try { const x = new URL(u); return x.protocol === "https:" || (isLocal && x.protocol === "http:"); } catch { return false; } };

const ogImage = meta("property", "og:image");
console.log(`  og:image = ${ogImage}`);
ok(!!ogImage, "og:image موجود");
ok(!!ogImage && absolute(ogImage), "og:image عنوان مطلق يبدأ بـ https" + (isLocal ? " (أو http محلياً)" : ""));
const twImage = meta("name", "twitter:image");
ok(!!twImage && absolute(twImage), "twitter:image عنوان مطلق");
ok(!!meta("property", "og:title"), "og:title موجود");
ok(!!meta("property", "og:description"), "og:description موجود");
ok(!!meta("name", "theme-color"), "theme-color موجود");

async function probe(u, label, { image = false, maxKB } = {}) {
  try {
    const r = await fetch(new URL(u, page));
    const buf = Buffer.from(await r.arrayBuffer());
    const type = r.headers.get("content-type") ?? "";
    const good = r.ok && (!image || type.startsWith("image/")) && (!maxKB || buf.length <= maxKB * 1024);
    ok(good, `${label} يفتح (${r.status}، ${type || "?"}، ${(buf.length / 1024).toFixed(0)}KB)`);
  } catch (e) { ok(false, `${label} تعذّر: ${e.message}`); }
}
if (ogImage) await probe(ogImage, "og:image", { image: true, maxKB: 200 });
const icon = tag(/<link[^>]*rel="icon"[^>]*href="([^"]*)"/i);
const touch = tag(/<link[^>]*rel="apple-touch-icon"[^>]*href="([^"]*)"/i);
if (icon) await probe(icon, "favicon", { image: true }); else ok(false, "favicon غير معرّف");
if (touch) await probe(touch, "apple-touch-icon", { image: true }); else ok(false, "apple-touch-icon غير معرّف");

console.log(failed ? `\n✗ ${failed} فحص فاشل` : "\n✓ وسوم المشاركة سليمة");
process.exit(failed ? 1 : 0);
