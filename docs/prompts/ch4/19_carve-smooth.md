# صورة 19 — carve-smooth

> **الخطوة 1:** افتح محادثة جديدة في جيمناي وارفق: `00_RULES_FOR_GEMINI.md` + لا شيء آخر (أيقونة: بلا صورة مرجع، حتى لا يرجع مشهد القرية).
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط، واكتب تحتها اسم الملف: carve-smooth.png».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`carve-smooth.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/carve-smooth.webp`.

- الملف: `public/art/items/carve-smooth.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: الحجر الأملس في c4-l1 بعد المرسى (اختياري). A: «carve-smooth (اختياري)».
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel of completely smooth, uncarved stone with only gentle weathering, a few hairline cracks and a soft warm patina, no carving or sign of any kind. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; this one has no carving at all.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أي نقش أو علامة على اللوح، حروف أو أرقام، لوح دائري
- فحص القبول:
  1. لوح مربع أملس بلا أي نقش
  2. نفس الحجر واللون والحواف في علامات c4-l1
  3. خلفية رمادية فاتحة بلا أي مشهد وحواف نظيفة
