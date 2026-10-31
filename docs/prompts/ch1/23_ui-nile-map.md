# صورة 23 — ui-nile-map

> **الخطوة 1:** ارفق مع هذا الملف في جيمناي: `00_RULES_FOR_GEMINI.md` (إن لم تكن مرفوعة في نفس المحادثة) + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`ui-nile-map.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/ui/nile-map.webp`.

- الملف: `public/art/ui/nile-map.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: خلفية شاشة اختيار الفصل (نظرة عامة على النيل). تُوضع عليها 5 عُقد فصول بالكود.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A soft panoramic view from a high vantage point over a broad Nile valley, painted in warm hazy golden light. One wide calm river winds in a gentle S curve from the right foreground to the far left distance. Along its banks, five distinct, well-separated landmarks seen small and from afar, from right to left: (1) a small cluster of mud-brick houses and palms; (2) a low reed-covered island in the middle of the river; (3) a small bank with colorful market awnings; (4) a broken stone wall with a few fallen columns at the water's edge; (5) a quiet shore with a small wooden jetty. Green dusty fields, dry sand-gold hills and a pale warm sky with a soft sun low on the left horizon. Light haze between landmarks. Quiet, hopeful mood.
Composition: horizon at about 28 percent of the height, the river S-curve fills the middle, the five landmarks are spaced evenly along it at x about 88, 70, 50, 30 and 12 percent with open empty land and water around each so interface markers can be placed on top. The lower third is calm river and sandy bank, fairly empty.
Constraints: no text, no letters, no numbers, no people, no watermark.
```
- مواضع إلزامية:
  - المعالم من اليمين: قرية x≈88% | جزيرة x≈70% | سوق x≈50% | أطلال x≈30% | ضفة هادئة x≈12%
- تجنّب: معالم كبيرة متلاصقة تغطي بعضها، كتابة أو خرائط ملصقة، ألوان نيون أو تشبّع، أشخاص أو مراكب كثيرة
- فحص القبول:
  1. خمسة معالم صغيرة متباعدة على النهر بالترتيب من اليمين
  2. مساحات فارغة حول كل معلم لوضع العُقد
  3. نفس الألوان الذهبية الهادئة بلا نص
