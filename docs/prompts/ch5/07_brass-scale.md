# صورة 07 — brass-scale

> **الخطوة 1:** افتح محادثة جديدة في جيمناي وارفق: `00_RULES_FOR_GEMINI.md` + لا شيء آخر (أيقونة: بلا صورة مرجع، حتى لا يرجع مشهد القرية).
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط، واكتب تحتها اسم الملف: brass-scale.png».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`brass-scale.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/brass-scale.webp`.

- الملف: `public/art/items/brass-scale.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 5 — الطبقة A
- الغرض: الميزان النحاسي في c5-l1 (memory). مقترح: A يضيف `icon:` لأزواج الذاكرة في `ch5.ts`.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A single small hand-sized brass balance scale with a central post, a level beam and two small hanging pans, aged warm brass with soft green patina, no markings.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: كفتان غير متوازنتين، أرقام أو حروف، ميزان حديث
- فحص القبول:
  1. ميزان نحاسي صغير بكفتين متوازنتين
  2. مميّز عن symbol-c3 (هذا جسم ثلاثي الأبعاد لا نقش)
  3. خلفية رمادية فاتحة وحواف نظيفة
