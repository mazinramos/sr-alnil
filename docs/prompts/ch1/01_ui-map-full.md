# صورة 01 — ui-map-full

> **الخطوة 1:** ارفق مع هذا الملف في جيمناي: `00_RULES_FOR_GEMINI.md` (إن لم تكن مرفوعة في نفس المحادثة) + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`ui-map-full.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/ui/map-full.webp`.

- الملف: `public/art/ui/map-full.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خريطة صفية الكاملة. jigsaw يقتطع منها خلية مربعة بـ `#cell=n` (شبكة 3×2): الفصل n يستعمل الخلية n، والفصل 5 يركّب الصورة كاملة (12 قطعة). تظهر أيضاً في شاشة الخريطة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Override for this image only: this is a flat top-down map, ignore the horizon and empty-lower-third rule.
Scene: An old hand-drawn treasure-style map of an imagined Nile valley, laid flat on aged parchment paper seen straight from above. Sandy-gold paper with warm brown stains and a very faint paper grain, soft fold creases, slightly frayed deckled edges. The image is divided into a grid of SIX equal SQUARE cells, 3 columns by 2 rows, each cell exactly one third of the image width (about 512x512 pixels). Cell numbering: top row from right to left is cell 1, cell 2, cell 3; bottom row from left to right is cell 4, cell 5, cell 6. Cell borders are marked only by faint soft fold creases, never by hard lines, and nothing important sits within 5 percent of a cell border.
One single continuous Nile river in an S shape, drawn in calm Nile-blue watercolor wash with darker blue-brown ink banks, about 3 percent of the image width: it enters from the right edge at about 32 percent of the height, flows left through cell 1 and cell 2, crosses into cell 3, turns down at the left side and flows through cell 4, then right through cell 5 and leaves at the bottom edge at the center. It crosses each cell border cleanly and without any break, roughly perpendicular to the border, at these points (x, y as percent of the image): right edge entry (100, 32), border between cell 1 and 2 at (67, 38), border between cell 2 and 3 at (33, 36), border between cell 3 and 4 at (22, 50), border between cell 4 and 5 at (33, 84), exit at the bottom edge (50, 100).
Each of cells 1 to 5 contains one clear small ink-and-wash landmark on the bank, no text:
Cell 1: a small cluster of mud-brick houses with a few palms, on the south bank near (86, 41).
Cell 2: a low island with reeds in the middle of the river near (50, 37).
Cell 3: a few market awnings and canopies on the left bank near (11, 40).
Cell 4: a broken stone wall and two fallen columns near (10, 88).
Cell 5: a quiet shore with a small wooden jetty and a moored wooden boat near (58, 85).
In the upper area of each cell 1 to 5, one embossed gold-copper emblem about 12 percent of the image width, simple and bold: cell 1 a sun disc with short rays at (77, 15); cell 2 three wavy water lines at (43, 15); cell 3 a balance scale with two level pans at (10, 15); cell 4 a carved eye in a stone at (10, 65); cell 5 a thread tied in a knot at (43, 65).
Cell 6 (bottom right) is purely decorative: only a simple compass rose with no letters at about (83, 75) and a thin hand-inked terracotta border ornament, no landmarks, otherwise empty parchment.
Composition: flat top-down parchment, no perspective, each cell reads as its own balanced square picture, the river is the visual spine that links them.
Constraints: no text, no letters, no numbers, no compass letters, no pseudo-writing, no people, no faces, no watermark.
```
- مواضع إلزامية:
  - كل خلية مربع ≈512×512: خلية 1 أعلى اليمين، 2 أعلى الوسط، 3 أعلى اليسار، 4 أسفل اليسار، 5 أسفل الوسط، 6 أسفل اليمين (زخرفية)
  - النهر S متصل يقطع الحدود عند (x,y): دخول (100,32) | بين 1 و2 (67,38) | بين 2 و3 (33,36) | بين 3 و4 (22,50) | بين 4 و5 (33,84) | خروج (50,100)
  - الرموز بحجم ≈12% من العرض: شمس (77,15) | موجة (43,15) | ميزان (10,15) | عين (10,65) | خيط (43,65)
  - المعالم: قرية (86,41) | جزيرة (50,37) | سوق (11,40) | أطلال (10,88) | ضفة وجسر خشبي (58,85)
  - الخلية 6 بوصلة بلا حروف وإطار فقط، ولا عناصر مهمة على خطوط الحدود بين الخلايا (هامش 5%)
- تجنّب: كتابة أو حروف شبه عربية أو إنجليزية على الخريطة، بوصلة بحروف (N/E/S/W) أو مقياس رسم، خلايا غير مربعة أو غير متساوية، نهر ينقطع عند حدود الخلايا أو ينتهي داخل الصورة، معلم أو رمز يقع على خط الحدود فيُقطَع عند القصّ، وجوه أو أشخاص، أزرق مشبع أو منظور ثلاثي الأبعاد
- فحص القبول:
  1. ست خلايا مربعة متساوية تُقرأ بوضوح، والرموز في الخلايا 1 إلى 5 بالترتيب الصحيح (شمس، موجة، ميزان، عين، خيط)
  2. النهر متصل على شكل S ويقطع كل حدود الخلايا بلا انقطاع، والخلية 6 زخرفية فقط
  3. لا نص أو حروف، ولا عنصر مهم على خطوط الحدود، وألوان ورق وحبر هادئة من عالم village.jpg
