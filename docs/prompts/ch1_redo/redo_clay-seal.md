# إعادة توليد — clay-seal (الخلفية كانت مشهد القرية)

> **الخطوة 1:** ارفق مع هذا الملف في جيمناي: `00_RULES_FOR_GEMINI.md` (إن لم تكن مرفوعة في نفس المحادثة) + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`clay-seal.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/clay-seal.webp`.

- الملف: `public/art/items/clay-seal.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: أيقونة ختم الطين، دليل إضافي في الفصل 1.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small round clay seal, terracotta with a pressed abstract pattern of a short sun-like cross of lines inside a circle, a tiny hole at the top with a short loop of natural cord, slightly chipped and aged.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Redo note: the previous attempt wrongly included the village scene from the reference image. The background must be a plain flat light-gray only, with nothing else behind the object. Do NOT include any scene, room, wall, floor, mat or sky from the reference image; use the reference for painting style only. The object must float alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: حروف أو كتابة على الختم، ختم معدني لامع، تفاصيل كثيرة
- فحص القبول:
  1. ختم طيني دائري بنقش بسيط وثقب وحبل صغير
  2. مقروء بالحجم الصغير
  3. خلفية رمادية فاتحة وحواف نظيفة
