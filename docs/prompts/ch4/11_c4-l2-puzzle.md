# صورة 11 — c4-l2-puzzle

> **الخطوة 1:** افتح محادثة جديدة في جيمناي وارفق: `00_RULES_FOR_GEMINI.md` + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط، واكتب تحتها اسم الملف: c4-l2-puzzle.png».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`c4-l2-puzzle.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/c4/l2-puzzle.webp`.

- الملف: `public/art/c4/l2-puzzle.webp`
- الحجم المطلوب: 1024×1024 (1:1)
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: صورة لغز c4-l2 (tiles 3×3): تُقصّ تسع قطع وتُدوَّر. لازم تكون غير متناظرة ليعرف اللاعب اتجاه كل قطعة. المسار معتمد من A (CONTRACT §10).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Override for this image only: use a SQUARE 1:1 ratio, 1024x1024, instead of 3:2; this is a flat square carved relief mural seen straight on, ignore the horizon and empty-lower-third rule.
Scene: A single square carved sandstone relief mural seen straight on, warm gold-ochre stone with shallow carving, lit by a soft light from the upper left so every carved line casts a small shadow toward the lower right (this shadow direction tells which way is up). Inside a narrow plain border: in the upper left a sun disc with straight rays; below and to the right of it a bird in flight facing left with wings spread; across the middle three wavy water lines running from the upper right down to the lower left in a diagonal; at the lower right a moored wooden boat with a small anchor hanging from it. The composition is clearly NOT symmetric: every one of the nine thirds of the picture contains a different distinct part of the carving, no area is empty, and no part looks like another part. Fine hairline cracks and worn edges.
Constraints: no text, no letters, no numbers, no people, no faces, no watermark.
```
- مواضع إلزامية:
  - مركّبة غير متناظرة: شمس أعلى اليسار، طائر يواجه اليسار أسفلها يميناً، ثلاثة خطوط ماء قطرية، ومركب بمرساة أسفل اليمين
  - كل ثلث من الصورة (3×3) فيه جزء مميّز، وظلال النقش نحو الأسفل-اليمين
- تجنّب: تناظر أو تكرار نقش بين الأجزاء (يُربك الدوران)، مناطق فارغة كبيرة، حروف أو أرقام، وجوه، إطار سميك يبتلع قطع الأطراف
- فحص القبول:
  1. الصورة مربعة وغير متناظرة وكل ثلث فيه جزء مميّز
  2. اتجاه الأعلى والأسفل واضح (شمس أعلى، ماء قطري، مركب أسفل) وظلال النقش ثابتة الاتجاه
  3. لا نص ولا وجوه وحجمها ≤ 250KB بعد التحويل
