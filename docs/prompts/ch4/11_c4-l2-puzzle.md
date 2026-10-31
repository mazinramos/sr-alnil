# صورة 11 — c4-l2-puzzle

> **الخطوة 1:** افتح محادثة جديدة في جيمناي وارفق: `00_RULES_FOR_GEMINI.md` + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط، واكتب تحتها اسم الملف: c4-l2-puzzle.png».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`c4-l2-puzzle.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/c4/l2-puzzle.webp`.

- الملف: `public/art/c4/l2-puzzle.webp`
- الحجم المطلوب: 1024×1024 (1:1)
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: صورة لغز c4-l2 (tiles 3×3): تُقصّ تسع حجارة وتُدوَّر. لوحة حجرية مربّعة بإطار مستقيم، عين في المركز ومجرى ماء من الأعلى إلى الأسفل، وبلا ظلال تقطع الحواف (قرار A). المسار معتمد (CONTRACT §10).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Override for this image only: use a SQUARE 1:1 ratio, 1024x1024, instead of 3:2; this is a flat, straight-on square stone slab that fills the entire canvas edge to edge (no background, no margin, no perspective), so ignore the horizon and empty-lower-third rule.
Scene: A single perfectly square slab of weathered gray-ochre sandstone seen straight on, filling the whole image from edge to edge, with a narrow plain flat carved frame border (about 3 percent wide) running perfectly straight along all four sides. The lighting is soft, even and diffuse from the front, with NO cast shadows, no dark gradients and nothing that crosses or darkens the outer edges, because the image will be cut into nine equal square stones. At the exact center, a large bold carved eye: an almond-shaped outline with a round iris and pupil and a short curved brow line above it (the brow line is at the top). A carved water channel passes through the whole slab from top to bottom: a wavy groove with two thin parallel edge lines that enters at the top edge at the center, flows down behind the eye, and leaves at the bottom edge at the center, narrower at the top and a little wider at the bottom. Each of the nine equal thirds of the picture carries different carving so the nine stones can be told apart and turned the right way: top-left corner a sunburst of straight rays, top-right corner a spread wing, bottom-left corner a bundle of reeds, bottom-right corner an eight-pointed star; the left middle third a short vertical row of three small carved dots, the right middle third a short vertical row of two small carved dots; the top-middle and bottom-middle thirds are the water channel and the center third is the eye. Fine hairline cracks and small worn spots in the stone, a warm gold-ochre tint in the carved lines, muted palette. No people.
Constraints: no text, no letters, no numbers, no people, no faces, no watermark.
```
- مواضع إلزامية:
  - لوحة مربعة تملأ الصورة من الحافة للحافة بإطار مستقيم الحواف (≈3% عرض) وبلا هامش أو خلفية
  - عين في المركز تماماً (50,50) وحاجبها للأعلى
  - مجرى ماء يدخل من منتصف الحافة العليا ويخرج من منتصف الحافة السفلى، أضيق من فوق وأعرض من تحت
  - زوايا مميزة: شمس أعلى اليسار | جناح أعلى اليمين | قصب أسفل اليسار | نجمة أسفل اليمين؛ ثلاث نقاط يسار الوسط ونقطتان يمينه
  - إضاءة منتظمة بلا ظلال تعبر الحواف (ستُقصّ إلى 9 حجارة)
- تجنّب: ظلال أو تدرّج غامق عند الحواف، هامش أو خلفية حول اللوحة أو منظور مائل، تناظر كامل أو تكرار نفس النقش في أكثر من جزء، حروف أو أرقام، وجوه أو أشخاص، إطار سميك أو زخرفي يبتلع حجارة الأطراف
- فحص القبول:
  1. اللوحة مربعة تملأ الصورة بإطار مستقيم الحواف وبلا ظلال عند الحواف
  2. عين في المركز ومجرى ماء يعبر من الأعلى إلى الأسفل، وكل ثلث فيه نقش مميّز
  3. لا نص ولا وجوه، وحجمها ≤ 250KB بعد التحويل
