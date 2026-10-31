# إعادة توليد (المحاولة الثانية، بدون مرجع) — old-photo (الخلفية كانت مشهد القرية)

> **الخطوة 1 (مهم):** افتح محادثة **جديدة** في جيمناي و**لا ترفق أي صورة مرجع**. ارفق فقط هذا الملف (القواعد غير لازمة هنا). سبب الفشل السابق أن المرجع كان يجلب مشهد القرية.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`old-photo.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/old-photo.webp`.

- الملف: `public/art/items/old-photo.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: أيقونة قطعة الصورة القديمة في c1-l6 (memory).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, soft shading, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A torn fragment of an old sepia photograph with irregular deckled torn edges, slightly curled, showing a faint blurred landscape of a palm and a river line, no faces, no people, yellowed paper tone, soft crease marks.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Redo note: previous attempts wrongly included a village scene. The background must be a plain flat light-gray only, with nothing else behind the object. Do NOT include any scene, room, wall, floor, mat or sky at all. The object must float alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجوه أو أشخاص، إطار صورة حديث، كتابة بخط اليد
- فحص القبول:
  1. قصاصة صورة سيبيا ممزقة الحواف بلا وجوه
  2. منظر ضبابي لنخلة ونهر فقط
  3. خلفية رمادية فاتحة وحواف نظيفة
