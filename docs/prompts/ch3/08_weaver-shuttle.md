# صورة 08 — weaver-shuttle

> **الخطوة 1:** افتح محادثة جديدة في جيمناي وارفق: `00_RULES_FOR_GEMINI.md` + لا شيء آخر (أيقونة: بلا صورة مرجع، حتى لا يرجع مشهد القرية).
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط، واكتب تحتها اسم الملف: weaver-shuttle.png».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`weaver-shuttle.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/weaver-shuttle.webp`.

- الملف: `public/art/items/weaver-shuttle.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: مكوك النسّاج في c3-l1 (matching): الغرض الذي مصدره النسّاجون.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A single weaver's wooden shuttle, a slender boat-shaped piece of polished aged wood with pointed ends, a spool of cream-colored thread visible in its middle slot with a loose thread end.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أكثر من مكوك، خيوط ملوّنة ساطعة، شكل يشبه قارباً كاملاً
- فحص القبول:
  1. مكوك خشبي نحيل مدبّب الطرفين مع بكرة خيط كريمية
  2. مميّز عن قطعة المركب boat-piece (أنحف، وفيه خيط)
  3. خلفية رمادية فاتحة وحواف نظيفة
