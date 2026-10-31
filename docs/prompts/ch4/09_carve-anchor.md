# صورة 09 — carve-anchor

> **الخطوة 1:** افتح محادثة جديدة في جيمناي وارفق: `00_RULES_FOR_GEMINI.md` + لا شيء آخر (أيقونة: بلا صورة مرجع، حتى لا يرجع مشهد القرية).
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط، واكتب تحتها اسم الملف: carve-anchor.png».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`carve-anchor.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/carve-anchor.webp`.

- الملف: `public/art/items/carve-anchor.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: علامة «المرسى» في c4-l1 (sequence). تُستعمل فقط إن أضاف A حقل `icon:` لعناصر المستوى (الآن تظهر نصاً).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel with a shallow carved relief of a ship's anchor with a ring at the top, a shaft, a crossbar and two curved flukes, worn edges and a few hairline cracks, tinted warm gold-copper in the carved lines. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; only the carved sign changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: تفاصيل دقيقة تضيع بالحجم الصغير، أكثر من علامة، حروف أو أرقام، لوح دائري (هذه الأيقونات مربعة، والرموز دائرية)
- فحص القبول:
  1. العلامة (المرسى) واضحة ومميّزة عن الباقي
  2. نفس اللوح المربع وعمق النقش في العلامات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة
