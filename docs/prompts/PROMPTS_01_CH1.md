# PROMPTS_01 — الدفعة 1: الفصل الأول (القرية القديمة)

> الحساب F — مدير الفن. **27 صورة.** كل برومبت كامل وجاهز للنسخ.
> الترتيب: `ui-map-full` أولاً (jigsaw في الفصول الخمسة يعتمد عليه) ← `ui-title` ← الطبقة A ← الطبقة B.
> **نسخة محدّثة (31/10):** الخريطة صارت شبكة 3×2 خلايا (`#cell=n`)، وطُوبقت c1-l1 وc1-l4 والجرار مع `ch1.ts`، وتوحّدت أوصاف الشخصيات الثابتة.

## طريقة العمل لكل صورة (مازن)
1. ارفق المرجع المكتوب في «المرجع المرفق». الخلفيات والشاشات: `docs/reference/village.jpg`. **الأيقونات: لا ترفق أي مرجع** (المرجع يجلب مشهد القرية). البورتريهات: `docs/reference/nour.png`، وللشخصيات الموجودة (آدم ويونس وهالة) ارفق أيضاً صورتها neutral من `public/art/chars/` ليثبت الوجه.
2. انسخ كتلة «البرومبت الكامل» كما هي بدون تعديل. لا تحذف سطر الوصف الثابت للشخصية.
3. افحص الناتج بنقاط «فحص القبول» وقائمة «تجنّب». لو فشلت نقطة، أعد التوليد (أو استعمل البديل المختصر في `GENERATION_ORDER.md`).
4. حوّل واحفظ بالاسم والمقاس بالضبط: `cwebp -q 80`. البورتريهات والأيقونات تُزال خلفيتها أولاً.
5. لألغاز المواضع (hotspot وroute): بعد الحفظ افتح `#/preview/coords?img=/art/cN/lM.webp` وسلّم الإحداثيات لصاحب الفصل.

**حدود الحجم:** خلفية ≤ 250KB، شاشة عامة ≤ 300KB، بورتريه ≤ 200KB، أيقونة ≤ 40KB.

## ملاحظات هذه الدفعة
- **ui-map-full:** أعيدت كتابته على شبكة **3×2 من خلايا مربعة** (`#cell=n`) حسب `NOTE_MAPFULL_CELLS.md`: نهر S متصل، معلم ورمز لكل خلية 1 إلى 5، والخلية 6 زخرفية (بوصلة بلا حروف).
- **c1-l1:** مواضع الرموز الثلاثة صارت مطابقة لتلميحات `ch1.ts` (كوّة معتمة عليا يسرى، إطار الباب الخشبي، بين الجرار والسلّة). إن كنت ولّدتها بالنسخة القديمة فأعد التوليد.
- **c1-l4:** الجرار الأربع **متطابقة الشكل وتختلف بلون الغطاء فقط** (أحمر، أزرق، أخضر، بنّي) كما في الدلائل. إن ولّدتها بالنسخة القديمة فأعد التوليد.
- **أيقونات `jar-*`:** تُظهر المحتوى (قمح، حنّاء، بخور، تمر) بلا أغطية ملوّنة حتى لا تكشف حل c1-l4.
- **البورتريهات:** كل برومبت يلصق «الوصف الثابت» للشخصية حرفياً (المصدر `CHARACTERS.md`). أوصاف صفية وبشير ونور لم تتغير عن النسخة السابقة.
- الجرد: لا تغيير في الأسماء. `ch1.ts` لا يضع `icon:` إلا للجرار الأربع؛ باقي أيقونات ch1 (`sun-disc`, `bird-carving`, `boat-piece`, `calendar-page`, `old-photo`, `clay-seal`) تبقى مؤقتة حتى يكتب C المستويات B.

---

### 1 — ui-map-full
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

### 2 — ui-title
- الملف: `public/art/ui/title.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خلفية شاشة العنوان. اسم اللعبة يُكتب بالكود فوق الصورة، لذلك الثلث العلوي لازم يكون هادئاً وفارغاً.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A wide quiet view of the Nile at golden hour seen from a low mud-brick jetty. The low sun sits just above the far horizon, warm gold light on slow calm water with long soft reflections. On the left bank a few mud-brick houses with reed roofs and two dusty palms. Mid-water a single small wooden sailboat with a patched cream lateen sail drifts slowly, far from the camera. In the near foreground the weathered wooden planks of the jetty edge and one clay pot with a coil of rope. Light haze softens the far bank. Mood: calm, mysterious, the beginning of a journey. Time of day: golden hour, sun low.
Composition: horizon at about 55 percent of the height. The top 35 percent is soft empty sky with gentle clouds, left clear for the game title. The boat sits slightly right of center at about x 62 percent, y 58 percent, small. Houses and palms stay in the left 30 percent. The lower third is calm water and jetty planks, fairly empty.
Constraints: no text, no letters, no numbers, no people, no watermark.
```
- مواضع إلزامية:
  - مساحة السماء العلوية (y من 0 إلى 35%) فارغة تماماً للعنوان
  - المركب x≈62%,y≈58% صغير
- تجنّب: شمس كبيرة قوية البياض أو هالة نيون، كتابة على المركب أو الشراع، أشخاص على الجسر، أبنية حديثة أو أعمدة كهرباء، سماء مزدحمة بالغيوم تعيق قراءة العنوان
- فحص القبول:
  1. الثلث العلوي هادئ وفارغ يصلح للعنوان
  2. نفس الألوان الذهبية الهادئة لـ village.jpg بدون تشبّع
  3. لا أشخاص ولا نص

### 3 — c1-l1
- الملف: `public/art/c1/l1.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خلفية c1-l1 «الغرفة التي لم تتغير» (hotspot): اللاعبة تبحث عن 3 رموز مخفية. الأماكن مطابقة لتلميحات `ch1.ts` (كوّة معتمة عليا يسرى، إطار الباب الخشبي، بين الجرار والسلّة).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: Interior of an old Sudanese mud-brick room that has not changed in decades, late-afternoon golden light. On the left-center a tall open doorway framed by a thick weathered wooden lintel and a wooden door jamb on its right side, bright golden daylight pouring in through it with floating dust motes and a glimpse of the Nile outside. High up in the wall above and to the left of the doorway a small dark recess (a niche in the clay wall) holding a dull aged copper sun disc, partly in shadow. A simple bird carved in shallow relief on the wooden door jamb. On the floor just inside the doorway, left of the center, a group of clay jars and a woven reed basket standing close together, and among them a small weathered wooden boat-shaped fragment leaning between a jar and the basket. On the right half of the room: an old carved wooden chest with a rounded lid against the wall, a low wooden stool, a worn reed mat on the packed-earth floor. Thick rough clay walls, a woven reed ceiling with a wooden beam, warm violet shadows in the corners.
The three hidden items are small, clearly separated from each other, visible to a careful eye but not obvious.
Composition: camera at eye level facing the back wall, slight depth. The doorway occupies roughly x 12 to 40 percent. The floor line gives a horizon-like division at about 62 percent. The right half and the lower area are calm.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - قرص نحاسي باهت داخل كوّة صغيرة معتمة في الجدار: x≈19%, y≈13% (r≈5%)
  - نقش طائر على إطار الباب الخشبي الأيمن: x≈36%, y≈32% (r≈5%)
  - قطعة مركب خشبية صغيرة بين الجرار والسلّة داخل الباب: x≈28%, y≈68% (r≈6%)
  - الإحداثيات من `ch1.ts` مؤقتة وتُضبط بصفحة `/preview/coords` بعد وصول الصورة الفعلية
  - الرموز الثلاثة في مناطق منفصلة وغير متلاصقة
- تجنّب: الرموز الثلاثة ملتصقة أو في مكان واحد، الرمز مخفي لدرجة لا يُرى، نص أو رموز مكتوبة على الجدران، أثاث حديث أو إضاءة كهربائية، أشخاص، إضاءة نيون بنفسجية
- فحص القبول:
  1. الكوّة المعتمة العليا اليسرى فيها قرص نحاسي، وطائر منقوش على إطار الباب، وقطعة مركب بين الجرار والسلّة
  2. ضوء العصر الذهبي نفسه في village.jpg، وألوان الطين والخشب هادئة
  3. لا نص ولا أشخاص والرموز الثلاثة متباعدة

### 4 — c1-l4
- الملف: `public/art/c1/l4.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خلفية c1-l4 «الجرار الأربعة» (matching): جرار متطابقة الشكل يميّزها لون الغطاء فقط (أحمر، أزرق، أخضر، بنّي) حسب `ch1.ts`.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A corner of the same old mud-brick room, a long rough wooden shelf mounted on a thick clay wall holding exactly four IDENTICAL round-bellied terracotta jars of the same size and shape in one even row. The only difference between the jars is the color of their covers, each cover a piece of cloth tied with natural cord over the mouth: the first jar has a muted RED cover, the second a muted NILE-BLUE cover, the third a muted GREEN cover, the fourth a muted BROWN cover. A tiny folded slip of white paper (completely blank) is tucked under the edge of each cover. Soft late-afternoon golden light enters from a small window on the left and rakes across the jars, casting long warm violet shadows on the wall. A woven reed mat and a small clay bowl on the floor below, textured plaster with small cracks.
Composition: camera at shelf height, slightly angled. The shelf runs across the middle at y about 45 to 55 percent. The four jars are evenly spaced at x about 20, 40, 60 and 80 percent, left to right: red, blue, green, brown. A wall line gives the horizon-like division. The lower third is the empty floor and mat.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - الجرار الأربع متطابقة الشكل على رف واحد بالترتيب من اليسار: غطاء أحمر x≈20% | أزرق x≈40% | أخضر x≈60% | بنّي x≈80% (y≈45-55%)
  - ورقة بيضاء صغيرة فارغة تبرز من تحت كل غطاء
- تجنّب: جرار مختلفة الشكل أو الحجم (لازم تتطابق وتختلف بلون الغطاء فقط)، ألوان أغطية مشبعة أو متقاربة (أحمر وبنّي لازم يتميّزا)، كتابة على الأوراق أو الجرار، أكثر أو أقل من 4 جرار
- فحص القبول:
  1. أربع جرار متطابقة تماماً بأغطية: أحمر، أزرق، أخضر، بنّي بوضوح
  2. الرف في منتصف الصورة والثلث السفلي هادئ
  3. ضوء دافئ، ولا نص (الأوراق فارغة)

### 5 — c1-l7
- الملف: `public/art/c1/l7.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خلفية c1-l7 «القطعة الأولى» (jigsaw boss): الفناء عند الغروب. تُستعمل أيضاً كصورة ختام الفصل 1.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: The courtyard of the old mud-brick house at sunset. A low rough clay wall runs across the back of the courtyard, and beyond it the broad Nile glows gold and soft pink-violet under a low sun. A single dusty palm leans over the wall on the right, a couple of reeds in the water behind. In the courtyard: a woven reed mat on the packed earth in the lower left, one clay jar by the wall, an old wooden stool, and a swept dusty floor with long soft violet shadows stretching toward the camera. Quiet, still, emotional mood of a discovery about to be completed. Time of day: sunset, sun low.
Composition: horizon is the river line at about 45 percent of the height, the wall slightly below it. Warm sky occupies the top 40 percent. The lower third is the empty swept courtyard floor with long shadows.
Constraints: no text, no letters, no numbers, no people, no watermark.
```
- مواضع إلزامية: لا يوجد
- تجنّب: شمس بيضاء ساطعة أو ألوان نيون، أشخاص في الفناء، سور عالٍ يحجب النهر، كتابة على الجدار
- فحص القبول:
  1. النيل ظاهر خلف السور واضح كخط أفق
  2. غروب دافئ بنفس لوحة الألوان بدون تشبّع
  3. الثلث السفلي هادئ وفارغ بلا نص ولا أشخاص

### 6 — safiya-neutral
- الملف: `public/art/chars/safiya-neutral.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: صفية الجدة بصورة قديمة باهتة. تظهر في الفصل 1 (دفتر وغرفة الجدة) وفي رسالة الفصل 5.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: An elderly Sudanese woman in her seventies, calm gentle face with soft deep lines and kind steady eyes, a faint peaceful half-smile. She wears a white cotton tob draped over her head and shoulders, with a simple plain edge. The image should look like a faded old photograph that has been painted: slightly desaturated warm sepia-tinted tones, soft focus, gentle low contrast, faint paper-age warmth in the skin tones. Slight three-quarter view, shoulders turned a little to the left.
Expression: neutral, serene, warm.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: إطار صورة أو حواف ورق أو كتابة، ملامح شابة أو مكياج، ألوان زاهية بدل الباهتة، أيدٍ ظاهرة مشوّهة، مجوهرات لامعة
- فحص القبول:
  1. تبدو امرأة مسنّة هادئة بصورة قديمة باهتة (دفء سيبيا خفيف)
  2. الخلفية رمادية فاتحة مسطحة وحواف نظيفة للقص
  3. لا نص ولا أيدٍ ظاهرة غريبة

### 7 — bashir-neutral
- الملف: `public/art/chars/bashir-neutral.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: بشير، جار الجدة وحافظ الحكايات. يتكلم في مستويات الفصل 1 كلها.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A Sudanese man in his sixties, the grandmother's old neighbor and keeper of stories, warm weathered face with deep smile lines, short neat gray beard, kind amused eyes. He wears a clean white cloth turban (imama) wound neatly, and a long off-white cotton jalabiya with a rounded collar, a folded muted blue-gray cloth over one shoulder. Slight three-quarter view, shoulders turned a little to the right.
Expression: gentle light smile, friendly and trustworthy.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: لباس مزخرف أو ملوّن بشدة، عمامة كبيرة مبالغ فيها، ابتسامة عريضة تكشف الأسنان، يدان ظاهرتان مشوّهتان، أي كتابة
- فحص القبول:
  1. رجل ستيني بعمامة بيضاء وابتسامة خفيفة وجلباب بسيط
  2. نفس أسلوب الرسم والإضاءة في nour.png وبقية البورتريهات
  3. الخلفية رمادية فاتحة مسطحة نظيفة

### 8 — nour-worried
- الملف: `public/art/chars/nour-worried.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: تعبير القلق لنور في لحظات التوتر في حوارات الفصول.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A young Sudanese woman in her early twenties, smooth dark-brown skin, calm direct dark eyes, strong straight eyebrows, full lips, small curls of black hair showing at the temple. She wears a navy-blue draped headscarf wrapped loosely around her head and neck, a worn gray-blue canvas jacket with a turned collar over a cream cotton shirt, and holds a dark brown spiral notebook against the lower right of the frame. Half-body, shoulders turned slightly to the left. KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.
Expression: worried and anxious. Eyebrows drawn together and slightly raised in the middle, eyes looking slightly off to the side with a hint of concern, lips pressed together, a small tension in the jaw. Natural, not melodramatic.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن nour.png، مبالغة مسرحية أو دموع، تغيير الملابس أو الدفتر أو اتجاه الجسم
- فحص القبول:
  1. نفس الوجه والحجاب والجاكيت والدفتر في nour.png بالضبط
  2. التعبير قلق واضح لكن طبيعي
  3. الخلفية رمادية فاتحة نظيفة

### 9 — nour-smiling
- الملف: `public/art/chars/nour-smiling.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: تعبير الابتسام لنور عند النجاح والاكتشاف.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A young Sudanese woman in her early twenties, smooth dark-brown skin, calm direct dark eyes, strong straight eyebrows, full lips, small curls of black hair showing at the temple. She wears a navy-blue draped headscarf wrapped loosely around her head and neck, a worn gray-blue canvas jacket with a turned collar over a cream cotton shirt, and holds a dark brown spiral notebook against the lower right of the frame. Half-body, shoulders turned slightly to the left. KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.
Expression: smiling warmly. A soft genuine smile with the corners of the lips raised and a little crinkle around bright relieved eyes, looking toward the viewer. Natural, not a wide cartoon grin.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن nour.png، مبالغة مسرحية أو دموع، تغيير الملابس أو الدفتر أو اتجاه الجسم
- فحص القبول:
  1. نفس الوجه والحجاب والجاكيت والدفتر في nour.png بالضبط
  2. ابتسامة دافئة طبيعية وعينان مرتاحتان
  3. الخلفية رمادية فاتحة نظيفة

### 10 — nour-determined
- الملف: `public/art/chars/nour-determined.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: تعبير العزم لنور في الألغاز الصعبة وقبل البوس.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A young Sudanese woman in her early twenties, smooth dark-brown skin, calm direct dark eyes, strong straight eyebrows, full lips, small curls of black hair showing at the temple. She wears a navy-blue draped headscarf wrapped loosely around her head and neck, a worn gray-blue canvas jacket with a turned collar over a cream cotton shirt, and holds a dark brown spiral notebook against the lower right of the frame. Half-body, shoulders turned slightly to the left. KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.
Expression: determined and resolute. A steady direct gaze straight at the viewer, eyebrows slightly lowered, lips closed and firm, jaw set, chin lifted a little. Calm strength, not anger.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن nour.png، مبالغة مسرحية أو دموع، تغيير الملابس أو الدفتر أو اتجاه الجسم
- فحص القبول:
  1. نفس الوجه والحجاب والجاكيت والدفتر في nour.png بالضبط
  2. نظرة ثابتة مباشرة وقوة هادئة لا غضب
  3. الخلفية رمادية فاتحة نظيفة

### 11 — symbol-c1
- الملف: `public/art/items/symbol-c1.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: رمز الفصل 1 (الشمس) حسب SYMBOLS.md. يُمنح عند c1-l7 ويُستعمل في c4-l5 وc5-l5 وc5-l6.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A round sandstone plaque with a simple carved relief of a sun: a gold-copper disc with eight short straight rays, bold and clean, readable at a small size, looks chiseled into the stone with soft worn edges. Part of a matching set of five chapter symbols: the same round sandstone plaque shape, same carved relief style, same gold-copper color on a warm sand-colored stone.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أشعة طويلة كثيرة تضيع بالحجم الصغير، حروف أو أرقام، لمعان معدني ساطع
- فحص القبول:
  1. رمز شمس بسيط (قرص + أشعة قصيرة) مقروء بـ 64px
  2. لوح حجري دائري بلون رمل ونقش ذهبي-نحاسي
  3. خلفية رمادية فاتحة وحواف نظيفة

### 12 — sun-disc
- الملف: `public/art/items/sun-disc.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: الرمز المخفي الأول في c1-l1 وعنصر دليل في c1-l2.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small hand-hammered copper disc, dull and aged with green-brown patina at the edges, a sun pattern of short engraved rays around a small center circle, a tiny hole near the top where it hung from a nail.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: نحاس لامع جديد، أشعة طويلة، حروف أو أرقام
- فحص القبول:
  1. قرص نحاسي قديم بنقش شمس بسيط
  2. ثقب صغير للتعليق ظاهر
  3. خلفية رمادية فاتحة وحواف نظيفة

### 13 — bird-carving
- الملف: `public/art/items/bird-carving.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: الرمز المخفي الثاني في c1-l1 وعنصر دليل في c1-l2.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small rectangular piece of aged dark wood with a simple bird carved into it in shallow relief, a graceful wading bird with a long neck and slender legs in profile, worn edges, tiny cracks in the grain.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: طائر معقّد التفاصيل، حروف أو علامات، خشب جديد لامع
- فحص القبول:
  1. قطعة خشب قديمة مع طائر بسيط محفور
  2. الطائر مقروء بالحجم الصغير
  3. خلفية رمادية فاتحة وحواف نظيفة

### 14 — boat-piece
- الملف: `public/art/items/boat-piece.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: الرمز المخفي الثالث في c1-l1 وعنصر دليل في c1-l2.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small weathered wooden boat-shaped fragment, a curved hull piece with a carved prow notch at one end, faint remnants of faded Nile-blue paint along the edge, a few worm holes, old and smooth with handling.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: مركب كامل بشراع، حروف أو أرقام، ألوان طلاء ساطعة
- فحص القبول:
  1. قطعة خشب منحنية تشبه جزءاً من مركب مع بقايا أزرق باهت
  2. شكلها مقروء وغير ملتبس بقطعة خشب عادية
  3. خلفية رمادية فاتحة وحواف نظيفة

### 15 — jar-wheat
- الملف: `public/art/items/jar-wheat.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جواب «قمح» في c1-l4 (matching، الجهة اليمنى). يُظهر المحتوى فقط (بلا غطاء ملوّن) حتى لا يكشف الحل.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small open round terracotta jar filled to the brim with golden wheat grains, spilling a few grains, two ears of wheat leaning on the rim. Do NOT show any red, blue, green or brown cloth cover: the icon shows only the contents, so it does not reveal the puzzle answer.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: غطاء قماش أحمر أو أزرق أو أخضر أو بنّي (يكشف الحل)، ملصق أو كتابة، أكثر من عنصر واحد
- فحص القبول:
  1. المحتوى قمح ذهبي واضح مع سنبلتين
  2. لا يظهر أي غطاء ملوّن
  3. خلفية رمادية فاتحة وحواف نظيفة

### 16 — jar-henna
- الملف: `public/art/items/jar-henna.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جواب «حنّاء» في c1-l4 (matching، الجهة اليمنى). يُظهر المحتوى فقط (بلا غطاء ملوّن) حتى لا يكشف الحل.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small shallow terracotta dish holding a soft mound of fine orange-brown henna powder, a few green henna leaves beside it. Do NOT show any red, blue, green or brown cloth cover: the icon shows only the contents, so it does not reveal the puzzle answer.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: غطاء قماش أحمر أو أزرق أو أخضر أو بنّي (يكشف الحل)، ملصق أو كتابة، أكثر من عنصر واحد
- فحص القبول:
  1. المحتوى مسحوق حنّاء برتقالي-بنّي وأوراق خضراء
  2. لا يظهر أي غطاء ملوّن
  3. خلفية رمادية فاتحة وحواف نظيفة

### 17 — jar-incense
- الملف: `public/art/items/jar-incense.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جواب «بخور» في c1-l4 (matching، الجهة اليمنى). يُظهر المحتوى فقط (بلا غطاء ملوّن) حتى لا يكشف الحل.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small terracotta incense burner with a few glowing embers and pale resin grains on top, a thin delicate wisp of pale smoke curling up. Do NOT show any red, blue, green or brown cloth cover: the icon shows only the contents, so it does not reveal the puzzle answer.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: غطاء قماش أحمر أو أزرق أو أخضر أو بنّي (يكشف الحل)، ملصق أو كتابة، أكثر من عنصر واحد
- فحص القبول:
  1. مبخرة صغيرة بجمر وخيط دخان رقيق
  2. لا يظهر أي غطاء ملوّن
  3. خلفية رمادية فاتحة وحواف نظيفة

### 18 — jar-dates
- الملف: `public/art/items/jar-dates.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جواب «تمر» في c1-l4 (matching، الجهة اليمنى). يُظهر المحتوى فقط (بلا غطاء ملوّن) حتى لا يكشف الحل.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A wide shallow woven palm-leaf basket heaped with glossy brown dates, a few dates fallen beside it. Do NOT show any red, blue, green or brown cloth cover: the icon shows only the contents, so it does not reveal the puzzle answer.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: غطاء قماش أحمر أو أزرق أو أخضر أو بنّي (يكشف الحل)، ملصق أو كتابة، أكثر من عنصر واحد
- فحص القبول:
  1. سلّة سعف مليئة بالتمر البنّي اللامع
  2. لا يظهر أي غطاء ملوّن
  3. خلفية رمادية فاتحة وحواف نظيفة

### 19 — c1-l2
- الملف: `public/art/c1/l2.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: خلفية c1-l2 «نقش الصندوق» (sequence): لقطة قريبة للصندوق المفتوح نصفاً.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A close view of an old carved wooden chest standing on a woven reed mat, its lid open about halfway and tilted back. The chest is aged dark wood with iron corner straps and a small worn latch. The outer face of the lid carries a horizontal band of shallow carved pictograms in a row, deliberately worn, shallow and partly in shadow so they read only as abstract simple shapes. The inside of the chest is dark and quiet. Soft late-afternoon golden light enters from the right and rakes across the carved band, casting long warm violet shadows. Behind the chest a rough clay wall and a faint window glow. A single clay jar blurred in the background on the left.
Composition: camera slightly above, three-quarter view, chest occupies the center-left about 50 percent of the width, carved band in the upper middle at y about 38 percent. A clay wall line gives a horizon-like division at about 40 percent. The lower third is the empty reed mat.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable symbols or writing on the carving.
```
- مواضع إلزامية:
  - الصندوق مركز الصورة يسار الوسط، شريط النقش x≈40%,y≈38%
- تجنّب: رموز واضحة مقروءة بترتيب محدد (حتى لا تناقض حل اللغز)، أحرف أو نص على النقش، ذهب لامع أو جواهر، أشخاص
- فحص القبول:
  1. الصندوق مفتوح نصفاً والنقش باهت غير مقروء تفصيلاً
  2. الإضاءة الدافئة الجانبية والثلث السفلي هادئ
  3. لا نص ولا أشخاص

### 20 — c1-l3
- الملف: `public/art/c1/l3.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: خلفية c1-l3 «هامش الدفتر» (choice): دفتر مفتوح على طاولة قرب النافذة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A rough wooden table beside a small window in the old mud-brick room. On the table an open worn notebook with cream pages filled with soft pencil-like scribble lines that look like handwriting but never form real letters, a few pages curling, a small dried flower pressed between pages. Beside it a clay cup, a short stub of pencil and a folded piece of cloth. Through the window a blurred view of the Nile and a palm in late-afternoon golden light, warm light falling across the notebook, dust motes floating, long soft violet shadows.
Composition: camera slightly above table level, three-quarter view. The notebook sits center-left at about 35 to 55 percent of the width and y about 55 percent. The window at the upper right gives a clear horizon at about 38 percent. The lower third is the empty floor and the table edge.
Constraints: no text, no letters, no numbers, no people, no watermark; handwriting must be abstract scribbles only.
```
- مواضع إلزامية:
  - الدفتر x≈45%,y≈55%
- تجنّب: حروف حقيقية أو شبه حروف مقروءة في الدفتر، دفتر حديث بسلك لولبي لامع، أشخاص، إضاءة اصطناعية
- فحص القبول:
  1. دفتر قديم مفتوح بخطوط كتابة غير مقروءة
  2. ضوء النافذة الدافئ والنيل ضبابي خلفها
  3. لا حروف حقيقية ولا أشخاص

### 21 — c1-l5
- الملف: `public/art/c1/l5.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: خلفية c1-l5 «تقويم صفية» (codelock): فناء البيت وتقويم على الجدار.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: The sunlit courtyard of the old house in the afternoon. A hand-made calendar hangs on the mud wall: a flat wooden board with a neat grid of small round wooden pegs in five rows and seven columns, a few pegs wrapped with colored thread in muted terracotta, blue and gold, no numbers or writing anywhere on it. Beneath it a low clay bench with two clay jars, a woven reed mat on the ground, and a small leafy tree at the right with dappled warm light. A glimpse of the Nile beyond a low wall at the far right.
Composition: camera at eye level. The calendar is at the left-center, x about 35 percent, y about 35 percent, large enough to be a focal point but not close up. Wall and courtyard give a horizon-like line at about 55 percent. The lower third is the empty packed-earth floor and mat.
Constraints: no text, no letters, no numbers, no people, no watermark; the calendar has no numerals.
```
- مواضع إلزامية:
  - التقويم الخشبي x≈35%,y≈35%
- تجنّب: أرقام أو حروف على التقويم، تقويم ورقي حديث مطبوع، أشخاص، ألوان خيوط ساطعة نيون
- فحص القبول:
  1. تقويم خشبي بشبكة أوتاد وخيوط ملوّنة هادئة بلا أرقام
  2. الفناء مضاء بضوء العصر ودافئ
  3. الثلث السفلي هادئ ولا أشخاص

### 22 — c1-l6
- الملف: `public/art/c1/l6.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: خلفية c1-l6 «صور قديمة» (memory): صندوق صور ممزقة على حصير.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A small old wooden box open on a woven reed mat on the floor of the mud-brick room, spilling torn fragments of faded sepia photographs across the mat. The fragments are irregular torn pieces with deckled edges showing only soft, blurred, indistinct landscape shapes, such as palms, a river line and a mud wall, with absolutely no faces or recognizable people. Warm side light from a window on the right casts long violet shadows. Around the mat: a clay jar at the left and a wooden stool. The back wall is rough clay with a faint doorway.
Composition: camera slightly above the floor, three-quarter view looking down at the mat. The mat is in the lower center, the wall at the top gives a horizon-like line at about 35 percent. The box at x about 40 percent, y about 62 percent. The lower third shows only the mat and a few scattered fragments.
Constraints: no text, no letters, no numbers, no people, no faces, no watermark.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجوه أو أشخاص في الصور الممزقة، كتابة على خلفية الصور، صور ملوّنة حديثة، صندوق معدني لامع
- فحص القبول:
  1. قصاصات سيبيا باهتة بلا وجوه على حصير
  2. ضوء جانبي دافئ والثلث السفلي هادئ
  3. لا نص ولا أشخاص

### 23 — ui-nile-map
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

### 24 — nour-curious
- الملف: `public/art/chars/nour-curious.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: تعبير الفضول لنور عند اكتشاف شيء جديد.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A young Sudanese woman in her early twenties, smooth dark-brown skin, calm direct dark eyes, strong straight eyebrows, full lips, small curls of black hair showing at the temple. She wears a navy-blue draped headscarf wrapped loosely around her head and neck, a worn gray-blue canvas jacket with a turned collar over a cream cotton shirt, and holds a dark brown spiral notebook against the lower right of the frame. Half-body, shoulders turned slightly to the left. KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.
Expression: curious and intrigued. A slight tilt of the head, eyebrows gently raised, eyes bright and looking slightly off to the side and upward at something just out of frame, lips softly parted. Natural, not exaggerated.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن nour.png، مبالغة مسرحية أو دموع، تغيير الملابس أو الدفتر أو اتجاه الجسم
- فحص القبول:
  1. نفس الوجه والحجاب والجاكيت والدفتر في nour.png بالضبط
  2. ميل رأس خفيف وحاجبان مرفوعان قليلاً بفضول
  3. الخلفية رمادية فاتحة نظيفة

### 25 — calendar-page
- الملف: `public/art/items/calendar-page.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: أيقونة تقويم صفية في c1-l5 (codelock).
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small hand-made wooden calendar board in aged wood with a neat grid of tiny round wooden pegs in five rows and seven columns, a few pegs wrapped with colored thread in muted terracotta, Nile blue and gold. No numbers or letters anywhere.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أرقام أو حروف، تقويم ورقي مطبوع، خيوط نيون
- فحص القبول:
  1. لوح خشبي بشبكة أوتاد وخيوط ملوّنة هادئة
  2. الشبكة مقروءة بالحجم الصغير بلا أرقام
  3. خلفية رمادية فاتحة وحواف نظيفة

### 26 — old-photo
- الملف: `public/art/items/old-photo.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: أيقونة قطعة الصورة القديمة في c1-l6 (memory).
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A torn fragment of an old sepia photograph with irregular deckled torn edges, slightly curled, showing a faint blurred landscape of a palm and a river line, no faces, no people, yellowed paper tone, soft crease marks.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجوه أو أشخاص، إطار صورة حديث، كتابة بخط اليد
- فحص القبول:
  1. قصاصة صورة سيبيا ممزقة الحواف بلا وجوه
  2. منظر ضبابي لنخلة ونهر فقط
  3. خلفية رمادية فاتحة وحواف نظيفة

### 27 — clay-seal
- الملف: `public/art/items/clay-seal.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: أيقونة ختم الطين، دليل إضافي في الفصل 1.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small round clay seal, terracotta with a pressed abstract pattern of a short sun-like cross of lines inside a circle, a tiny hole at the top with a short loop of natural cord, slightly chipped and aged.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: حروف أو كتابة على الختم، ختم معدني لامع، تفاصيل كثيرة
- فحص القبول:
  1. ختم طيني دائري بنقش بسيط وثقب وحبل صغير
  2. مقروء بالحجم الصغير
  3. خلفية رمادية فاتحة وحواف نظيفة

---

## جدول التتبّع
| # | ID | الطبقة | وُلّدت | قُبلت | حُفظت بالاسم | ملاحظات |
|---|---|---|---|---|---|---|
| 1 | ui-map-full | A | [ ] | [ ] | [ ] | |
| 2 | ui-title | A | [ ] | [ ] | [ ] | |
| 3 | c1-l1 | A | [ ] | [ ] | [ ] | |
| 4 | c1-l4 | A | [ ] | [ ] | [ ] | |
| 5 | c1-l7 | A | [ ] | [ ] | [ ] | |
| 6 | safiya-neutral | A | [ ] | [ ] | [ ] | |
| 7 | bashir-neutral | A | [ ] | [ ] | [ ] | |
| 8 | nour-worried | A | [ ] | [ ] | [ ] | |
| 9 | nour-smiling | A | [ ] | [ ] | [ ] | |
| 10 | nour-determined | A | [ ] | [ ] | [ ] | |
| 11 | symbol-c1 | A | [ ] | [ ] | [ ] | |
| 12 | sun-disc | A | [ ] | [ ] | [ ] | |
| 13 | bird-carving | A | [ ] | [ ] | [ ] | |
| 14 | boat-piece | A | [ ] | [ ] | [ ] | |
| 15 | jar-wheat | A | [ ] | [ ] | [ ] | |
| 16 | jar-henna | A | [ ] | [ ] | [ ] | |
| 17 | jar-incense | A | [ ] | [ ] | [ ] | |
| 18 | jar-dates | A | [ ] | [ ] | [ ] | |
| 19 | c1-l2 | B | [ ] | [ ] | [ ] | |
| 20 | c1-l3 | B | [ ] | [ ] | [ ] | |
| 21 | c1-l5 | B | [ ] | [ ] | [ ] | |
| 22 | c1-l6 | B | [ ] | [ ] | [ ] | |
| 23 | ui-nile-map | B | [ ] | [ ] | [ ] | |
| 24 | nour-curious | B | [ ] | [ ] | [ ] | |
| 25 | calendar-page | B | [ ] | [ ] | [ ] | |
| 26 | old-photo | B | [ ] | [ ] | [ ] | |
| 27 | clay-seal | B | [ ] | [ ] | [ ] | |

## أسئلة وملاحظات لأصحاب الفصول
1. **c1-l1 (hotspot):** الإحداثيات من `ch1.ts` ما زالت مؤقتة. بعد وصول الصورة تُضبط بـ `/preview/coords`.
2. **c1-l2 (sequence):** نقش غطاء الصندوق باهت عمداً حتى لا يناقض ترتيب الحل. C يؤكد.
3. **c1-l5 (codelock):** التقويم الخشبي بلا أرقام؛ التواريخ تأتي في الدلائل المكتوبة.
4. **ui-map-full:** مطابقة لـ `docs/SYMBOLS.md` ولـ `NOTE_MAPFULL_CELLS.md`؛ التفاصيل في فحص القبول.
