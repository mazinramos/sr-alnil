# صورة 16 — torch

> **الخطوة 1:** افتح محادثة جديدة في جيمناي وارفق: `00_RULES_FOR_GEMINI.md` + لا شيء آخر (أيقونة: بلا صورة مرجع، حتى لا يرجع مشهد القرية).
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط، واكتب تحتها اسم الملف: torch.png».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`torch.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/torch.webp`.

- الملف: `public/art/items/torch.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: مشعل الممر في c4-l4 (اختياري؛ الواجهة ترسم المحطات بنفسها).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A single old wooden torch with a rag-wrapped head burning with a warm orange-gold flame and a thin curl of smoke, held upright, the wood dark and worn.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ألسنة نار نيون، أكثر من مشعل، يد ظاهرة
- فحص القبول:
  1. مشعل خشبي قديم بلهب دافئ هادئ
  2. مقروء بالحجم الصغير
  3. خلفية رمادية فاتحة وحواف نظيفة
