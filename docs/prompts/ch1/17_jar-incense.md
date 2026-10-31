# صورة 17 — jar-incense

> **الخطوة 1:** ارفق مع هذا الملف في جيمناي: `00_RULES_FOR_GEMINI.md` (إن لم تكن مرفوعة في نفس المحادثة) + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`jar-incense.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/jar-incense.webp`.

- الملف: `public/art/items/jar-incense.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جواب «بخور» في c1-l4 (matching، الجهة اليمنى). يُظهر المحتوى فقط (بلا غطاء ملوّن) حتى لا يكشف الحل.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small terracotta incense burner with a few glowing embers and pale resin grains on top, a thin delicate wisp of pale smoke curling up. Do NOT show any red, blue, green or brown cloth cover: the icon shows only the contents, so it does not reveal the puzzle answer.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: غطاء قماش أحمر أو أزرق أو أخضر أو بنّي (يكشف الحل)، ملصق أو كتابة، أكثر من عنصر واحد
- فحص القبول:
  1. مبخرة صغيرة بجمر وخيط دخان رقيق
  2. لا يظهر أي غطاء ملوّن
  3. خلفية رمادية فاتحة وحواف نظيفة
