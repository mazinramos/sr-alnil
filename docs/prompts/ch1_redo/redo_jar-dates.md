# إعادة توليد — jar-dates (الخلفية كانت مشهد القرية)

> **الخطوة 1:** ارفق مع هذا الملف في جيمناي: `00_RULES_FOR_GEMINI.md` (إن لم تكن مرفوعة في نفس المحادثة) + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`jar-dates.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/jar-dates.webp`.

- الملف: `public/art/items/jar-dates.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جواب «تمر» في c1-l4 (matching، الجهة اليمنى). يُظهر المحتوى فقط (بلا غطاء ملوّن) حتى لا يكشف الحل.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A wide shallow woven palm-leaf basket heaped with glossy brown dates, a few dates fallen beside it. Do NOT show any red, blue, green or brown cloth cover: the icon shows only the contents, so it does not reveal the puzzle answer.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Redo note: the previous attempt wrongly included the village scene from the reference image. The background must be a plain flat light-gray only, with nothing else behind the object. Do NOT include any scene, room, wall, floor, mat or sky from the reference image; use the reference for painting style only. The object must float alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: غطاء قماش أحمر أو أزرق أو أخضر أو بنّي (يكشف الحل)، ملصق أو كتابة، أكثر من عنصر واحد
- فحص القبول:
  1. سلّة سعف مليئة بالتمر البنّي اللامع
  2. لا يظهر أي غطاء ملوّن
  3. خلفية رمادية فاتحة وحواف نظيفة
