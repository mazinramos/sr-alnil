# صورة 11 — symbol-c1

> **الخطوة 1:** ارفق مع هذا الملف في جيمناي: `00_RULES_FOR_GEMINI.md` (إن لم تكن مرفوعة في نفس المحادثة) + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`symbol-c1.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/items/symbol-c1.webp`.

- الملف: `public/art/items/symbol-c1.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: رمز الفصل 1 (الشمس) حسب SYMBOLS.md. يُمنح عند c1-l7 ويُستعمل في c4-l5 وc5-l5 وc5-l6.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A round sandstone plaque with a simple carved relief of a sun: a gold-copper disc with eight short straight rays, bold and clean, readable at a small size, looks chiseled into the stone with soft worn edges. Part of a matching set of five chapter symbols: the same round sandstone plaque shape, same carved relief style, same gold-copper color on a warm sand-colored stone.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أشعة طويلة كثيرة تضيع بالحجم الصغير، حروف أو أرقام، لمعان معدني ساطع
- فحص القبول:
  1. رمز شمس بسيط (قرص + أشعة قصيرة) مقروء بـ 64px
  2. لوح حجري دائري بلون رمل ونقش ذهبي-نحاسي
  3. خلفية رمادية فاتحة وحواف نظيفة
