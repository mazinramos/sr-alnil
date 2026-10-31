# PROMPTS_05 — الدفعة 5: الفصل الخامس (الضفة الهادئة)

> الحساب F — مدير الفن. **13 صورة** للفصل 5 (الضفة الهادئة): 7 خلفيات، بورتريهان (رحاب وتعبيرها)، 4 أيقونات.
> الترتيب: خلفيات الطبقة A (`c5-l1` ثم `c5-l4` ثم `c5-l7`) ← رحاب ← أيقونات A (رمز الخيط وأغراض الذاكرة) ← الطبقة B.
> الإضاءة: غروب هادئ وماء ساكن، وفي الأرشيف ضوء مصابيح دافئ.
> مصدر الحقيقة: `src/content/chapters/ch5.ts` (A) و`docs/SYMBOLS.md`.

## طريقة العمل لكل صورة (مازن)
1. ارفق المرجع المكتوب في «المرجع المرفق». الخلفيات والشاشات والأيقونات: `docs/reference/village.jpg`. البورتريهات: `docs/reference/nour.png`، وللشخصيات الموجودة (آدم ويونس وهالة) ارفق أيضاً صورتها neutral من `public/art/chars/` ليثبت الوجه.
2. انسخ كتلة «البرومبت الكامل» كما هي بدون تعديل. لا تحذف سطر الوصف الثابت للشخصية.
3. افحص الناتج بنقاط «فحص القبول» وقائمة «تجنّب». لو فشلت نقطة، أعد التوليد (أو استعمل البديل المختصر في `GENERATION_ORDER.md`).
4. حوّل واحفظ بالاسم والمقاس بالضبط: `cwebp -q 80`. البورتريهات والأيقونات تُزال خلفيتها أولاً.
5. لألغاز المواضع (hotspot وroute): بعد الحفظ افتح `#/preview/coords?img=/art/cN/lM.webp` وسلّم الإحداثيات لصاحب الفصل.

**حدود الحجم:** خلفية ≤ 250KB، شاشة عامة ≤ 300KB، بورتريه ≤ 200KB، أيقونة ≤ 40KB.

## ملاحظات هذه الدفعة
- **c5-l1 (memory):** أزواج الذاكرة الخمسة: دفتر صفية، قرص الشمس، قطعة المركب، الميزان النحاسي، مفتاح الحجر. لدينا من قبل `sun-disc` و`boat-piece` (الدفعة 1)، وأضفت جديداً: `notebook-safiya` و`brass-scale` و`stone-key`. أزواج `ch5.ts` بلا `icon:` الآن فتظهر نصاً؛ اقتراح لـ A: أضف `icon: "notebook-safiya"` و`"sun-disc"` و`"boat-piece"` و`"brass-scale"` و`"stone-key"`.
- **c5-l4 (matching):** لوحات الأسماء بنقوش خطية مجرّدة عمداً؛ أي رسم دالّ (سمك، نجوم، خبز) يكشف حل الربط.
- **c5-l2 وc5-l3:** القطع الخمس في الصورتين بمنمنمات ورموز مطابقة لخلايا `ui/map-full` (1: قرية وشمس، 2: جزيرة وموجة، 3: سوق وميزان، 4: أطلال وعين، 5: ضفة وخيط). ولّدهما **بعد** اعتماد `map-full`.
- **c5-l5:** صندوق بسيط بلا نقش عمداً؛ يتباين مع صندوق صفية المنقوش في الفصل 1.
- **c5-l7:** ضوء بعيد صغير على الأفق تلميح لحكاية ثانية، كما في الخاتمة.
- **الشخصيات:** رحاب جديدة. دفترها كريمي رفيع ولا يشبه دفتر نور الأسود اللولبي.

---

### 1 — c5-l1
- الملف: `public/art/c5/l1.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 5 — الطبقة A
- الغرض: خلفية c5-l1 «ذاكرة الرحلة» (memory): مرسى صغير عند الغروب. (البطاقات أغراض الرحلة الخمسة: دفتر صفية، قرص الشمس، قطعة المركب، الميزان النحاسي، مفتاح الحجر.)
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A small wooden jetty in a quiet cove at sunset, the water still and mirror-like, reflecting a sky of warm gold and soft rose fading to violet. A small old wooden boat is moored at the jetty's end with a coil of rope, a lantern hanging on a post not yet lit, reeds along the shore, a few dusty palms in silhouette. At the left end of the jetty a low wooden crate with a cloth spread over it holds five small objects softly suggested without detail, as if they were the traveler's collected things. Calm, nostalgic mood. No people.
Composition: horizon (the far shore) at about 45 percent of the height. The jetty runs from the lower left toward the center. The crate sits at about x 22 percent, y 60 percent. The lower third is calm reflective water and jetty planks, fairly empty.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - الصندوق الخشبي بخمسة أغراض موحية x≈22%,y≈60% (تفاصيل ضبابية لا تُقرأ)
- تجنّب: أغراض مفصّلة واضحة (تكشف بطاقات اللغز)، أشخاص، كتابة على القارب، غروب نيون
- فحص القبول:
  1. مرسى خشبي هادئ بماء ساكن وانعكاس غروب دافئ
  2. صندوق صغير بخمسة أغراض موحية غير مفصّلة
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 2 — c5-l4
- الملف: `public/art/c5/l4.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 5 — الطبقة A
- الغرض: خلفية c5-l4 «أسماء على الجدار» (matching): جدار أسماء في الأرشيف. اللوحات بلا نقوش دالّة حتى لا تكشف ربط العائلات بحكاياتها.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: The wall of names in an old river archive hall, warm lamplight. A long pale plastered stone wall holds five wooden name plaques of slightly different sizes mounted in a loose staggered row, each plaque carved with a short abstract pattern of simple parallel lines (clearly not letters and not pictures), darkened with age. Beneath the plaques a row of small clay oil lamps with soft flames, shelves of old archive boxes tied with cord at both sides, a woven mat on the floor, dust in the lamplight. Quiet, respectful mood. No people.
Composition: camera at eye level facing the wall. The five plaques at x about 14, 32, 50, 68 and 86 percent, at slightly different heights around y 40 percent. The lamps sit below at y about 58 percent. A wall-floor line gives a horizon-like division at about 66 percent. The lower third is the empty floor and mat.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - خمس لوحات أسماء متقطّعة الارتفاع x≈14,32,50,68,86% حول y≈40%
- تجنّب: رسومات أو رموز على اللوحات (سمك، نجوم، خبز…) لأنها تكشف الربط، حروف أو كتابة، أشخاص، أكثر أو أقل من 5 لوحات
- فحص القبول:
  1. جدار أرشيف بخمس لوحات خشبية بنقوش خطية مجرّدة لا تدل على شيء
  2. مصابيح زيت صغيرة بضوء دافئ ورفوف صناديق
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 3 — c5-l7
- الملف: `public/art/c5/l7.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 5 — الطبقة A
- الغرض: خلفية c5-l7 «الخريطة الكاملة» (jigsaw final): ضفة هادئة عند الغروب وماء ساكن. فيها إشارة خفيفة لحكاية ثانية (ضوء بعيد على الأفق). تُستعمل أيضاً كصورة الختام.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A quiet river bank at sunset where the story comes to rest. A gentle curve of pale sand and low reeds at the left, a few dusty palms, the river wide and perfectly still like a mirror reflecting a sky of gold, rose and soft violet, a low sun touching the far horizon. A small old wooden boat rests on the sand near the water with its rope coiled beside it. Far across the water on the horizon, very small and faint, a single tiny warm lantern light of a distant boat or far shore, a quiet hint of another story to come. Deep calm, reflective, hopeful. No people.
Composition: horizon at about 45 percent of the height. The boat sits at the lower left around x 24 percent, y 64 percent. The distant light at about x 72 percent, y 46 percent, tiny. The lower third is smooth reflective water and sand, empty.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - ضوء بعيد صغير جداً على الأفق x≈72%,y≈46%
  - القارب الصغير على الرمل x≈24%,y≈64%
- تجنّب: شمس بيضاء ساطعة أو ألوان نيون، أشخاص، مراكب كثيرة أو كبيرة، كتابة
- فحص القبول:
  1. ضفة هادئة وماء مرآة بغروب ذهبي-وردي بنفس لوحة الألوان
  2. ضوء بعيد صغير على الأفق كتلميح لحكاية ثانية
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 4 — rihab-neutral
- الملف: `public/art/chars/rihab-neutral.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 5 — الطبقة A
- الغرض: رحاب أمينة الأرشيف. تتكلم في c5-l1 وc5-l4 وc5-l7 وغيرها من الفصل 5.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A young Sudanese woman in her late twenties, the archive keeper, clever focused face, thin round tortoiseshell glasses, a faint curious half-smile. She wears a dusty palm-green cotton headscarf neatly wrapped, an olive knitted cardigan over a cream blouse, a pencil tucked in at the side of the scarf, and a thin cream-covered ledger held against her chest with only its cover edge visible. Slight three-quarter view, shoulders turned a little to the right.
Expression: attentive and thoughtful, a faint curious half-smile, eyes bright behind the glasses, looking at the viewer.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: نظارة مربّعة أو عصرية جداً، أيدٍ ظاهرة مشوّهة، ملابس مزخرفة، دفتر يشبه دفتر نور (غلاف أسود)
- فحص القبول:
  1. شابة في أواخر العشرينات بنظارة دائرية رفيعة ووشاح أخضر ترابي وكارديغان زيتوني
  2. دفتر كريمي رفيع على صدرها وقلم عند الوشاح
  3. الخلفية رمادية فاتحة نظيفة وأسلوب nour.png

### 5 — symbol-c5
- الملف: `public/art/items/symbol-c5.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 5 — الطبقة A
- الغرض: رمز الفصل 5 (الخيط) حسب SYMBOLS.md. يُمنح عند c5-l7 ويُستعمل في c5-l5 وc5-l6.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A round sandstone plaque with a simple carved relief of a thread tied in a knot: one smooth thread forming a bold loop with a simple knot at its center and two short loose ends, bold and clean, readable at a small size, gold-copper color, looks chiseled into the stone with soft worn edges. Part of a matching set of five chapter symbols: the same round sandstone plaque shape, same carved relief style, same gold-copper color on a warm sand-colored stone.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: خيوط كثيرة متشابكة تضيع بالحجم الصغير، حروف أو أرقام، لمعان معدني ساطع
- فحص القبول:
  1. خيط واحد بعقدة واضحة في المنتصف مقروء بـ 64px
  2. نفس اللوح الحجري الدائري والنقش الذهبي-النحاسي في بقية الرموز الخمسة
  3. خلفية رمادية فاتحة وحواف نظيفة

### 6 — notebook-safiya
- الملف: `public/art/items/notebook-safiya.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 5 — الطبقة A
- الغرض: دفتر صفية في c5-l1 (memory). مقترح: A يضيف `icon:` لأزواج الذاكرة في `ch5.ts` (الآن بلا أيقونات فتظهر نصاً).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A single old hand-bound notebook with a faded olive-green cloth cover worn at the corners, tied shut with a thin cord, slightly thick with pages, no title and no markings.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: عنوان أو كتابة على الغلاف، دفتر لولبي أسود (هذا دفتر نور)، أكثر من دفتر
- فحص القبول:
  1. دفتر قديم بغلاف قماش زيتوني باهت وحبل ربط
  2. مميّز عن دفتر نور الأسود اللولبي
  3. خلفية رمادية فاتحة وحواف نظيفة

### 7 — brass-scale
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

### 8 — stone-key
- الملف: `public/art/items/stone-key.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 5 — الطبقة A
- الغرض: مفتاح الحجر في c5-l1 (memory). مقترح: A يضيف `icon:` لأزواج الذاكرة في `ch5.ts`.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A single old heavy key whose large round bow and thick shaft look carved from weathered gray-ochre stone, with a worn dark iron bit at the end, small cracks and tiny moss in the crevices.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: مفتاح حديث أو لامع، حروف أو علامات، أكثر من مفتاح
- فحص القبول:
  1. مفتاح ثقيل قديم بمقبض وساق حجريين ورأس حديدي
  2. مميّز عن بقية أغراض الذاكرة بالشكل والمادة
  3. خلفية رمادية فاتحة وحواف نظيفة

### 9 — c5-l2
- الملف: `public/art/c5/l2.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 5 — الطبقة B
- الغرض: خلفية c5-l2 «حواف الخريطة» (hotspot): طاولة عليها قطع الخريطة الخمس، وعلى حافة كل قطعة علامة خط مجرى صغيرة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A long old wooden table in a quiet archive in warm lamplight, five small square pieces of aged parchment laid in a row across it. Each piece is a small square of aged parchment, about 12 percent of the image width, with torn deckled edges, carrying a tiny ink-and-wash miniature and one small embossed gold-copper emblem, no text: the first piece shows mud-brick houses and palms with a sun disc emblem; the second a reed island with three wavy water lines; the third market awnings with a balance scale; the fourth broken walls and fallen columns with a carved eye; the fifth a quiet shore with a jetty and a thread tied in a knot. Every piece has a short stub of a blue-ink river line crossing one of its edges. A brass lamp with a soft flame at the upper left, an old magnifying glass, a reed pen and a small clay inkwell at the edges of the table, shelves of archive boxes blurred behind. No people, no writing.
Composition: camera slightly raised looking down at the table. The pieces are in a row, from right to left: piece 1 at x about 86 percent, piece 2 at 68, piece 3 at 50, piece 4 at 32, piece 5 at 14, all at y about 52 percent, each slightly rotated by a few degrees. The river-line stubs are on the outer edges. A shelf line gives a horizon-like division at about 25 percent. The lower third is the empty table edge.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - خمس قطع من اليمين: قطعة1 x≈86 | 2 x≈68 | 3 x≈50 | 4 x≈32 | 5 x≈14 (كلها y≈52%)
  - علامة خط المجرى (بقعة حبر زرقاء قصيرة) على حافة كل قطعة (مواضع مؤقتة يضبطها صاحب المستوى)
- تجنّب: كتابة على القطع، أكثر أو أقل من 5 قطع، قطع متلاصقة أو متراكبة، أشخاص
- فحص القبول:
  1. خمس قطع خريطة صغيرة متباعدة بمنمنمات ورموز مختلفة (قرية، جزيرة، سوق، أطلال، ضفة)
  2. على حافة كل قطعة علامة نهر زرقاء قصيرة ظاهرة
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 10 — c5-l3
- الملف: `public/art/c5/l3.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 5 — الطبقة B
- الغرض: خلفية c5-l3 «خط المجرى» (route): الخريطة ممتدة على الحصير. القطع الخمس متباعدة بفراغات يصلها اللاعب بخط الماء بالترتيب.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A large woven reed mat spread on the floor of the archive in soft warm light, seen from above at a high angle. Five small square pieces of aged parchment lie on the mat with clear bare gaps of mat between them, arranged along the shape of an S: three across the top from right to left, then two across the bottom from left to center. Each piece is a small square of aged parchment, about 12 percent of the image width, with torn deckled edges, carrying a tiny ink-and-wash miniature and one small embossed gold-copper emblem, no text: the first piece shows mud-brick houses and palms with a sun disc emblem; the second a reed island with three wavy water lines; the third market awnings with a balance scale; the fourth broken walls and fallen columns with a carved eye; the fifth a quiet shore with a jetty and a thread tied in a knot. Every piece has a short stub of a blue-ink river line crossing one of its edges. A brass lamp and a small cord coil at the edge of the mat, wooden floor beyond. No people, no writing.
Composition: high angle looking down. The pieces' centers (percent of width, height): piece 1 at (82, 26), piece 2 at (55, 22), piece 3 at (27, 27), piece 4 at (28, 62), piece 5 at (58, 68). The gaps between pieces are bare mat so a water line can be drawn across. A wooden floor line gives a horizon-like division at about 12 percent. The lower third is mostly empty mat.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - مراكز القطع الخمس (مؤقتة): ق1 (82,26) | ق2 (55,22) | ق3 (27,27) | ق4 (28,62) | ق5 (58,68)
  - فراغات حصير واضحة بين القطع لرسم خط الماء
- تجنّب: قطع متلاصقة بلا فراغ، كتابة، أشخاص، أكثر أو أقل من 5 قطع
- فحص القبول:
  1. خمس قطع على حصير بترتيب شكل S وفراغات واضحة بينها
  2. منمنمات القطع ورموزها مطابقة لوصف الفصول الخمسة
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 11 — c5-l5
- الملف: `public/art/c5/l5.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 5 — الطبقة B
- الغرض: خلفية c5-l5 «الصندوق غير المزخرف» (codelock): صندوق حفظ بسيط على طاولة. يتباين عمداً مع صندوق صفية المنقوش في الفصل 1.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A plain light-wood storage box standing on a bare wooden table in the quiet archive in warm lamplight. The box is completely unadorned: flat lid, straight sides, no carving, no paint, just a simple small iron latch and two plain iron hinges, clearly humble compared with an ornately carved chest. A single oil lamp with a small flame beside it, soft dust in the light, shelves of archive boxes blurred behind. No people, no writing.
Composition: camera at eye level facing the box slightly from above. The box sits at the center around x 50 percent, y 55 percent. A shelf line gives a horizon-like division at about 30 percent. The lower third is the empty tabletop and its edge.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - الصندوق البسيط مركز الصورة x≈50%,y≈55%
- تجنّب: أي نقش أو زخرفة على الصندوق، كتابة، أشخاص، قفل رقمي حديث
- فحص القبول:
  1. صندوق خشب فاتح بسيط تماماً بلا نقش مع مزلاج حديد صغير
  2. مصباح زيت وضوء دافئ
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 12 — c5-l6
- الملف: `public/art/c5/l6.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 5 — الطبقة B
- الغرض: خلفية c5-l6 «رسالة صفية» (cipher): ورقة رسالة بخط يد. الكتابة خطوط مجرّدة غير مقروءة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A single aged letter sheet lying on a wooden desk in warm candle and lamp light, the paper yellowed and softly creased from being folded, covered with many lines of old ink handwriting drawn only as flowing abstract scribbled lines that never form real letters. Beside it a small clay inkwell with a reed pen, a dried flower pressed flat, and a small unlit candle. The wooden desk grain, dust in the light, a dim archive wall behind. No people.
Composition: camera slightly above, three-quarter view. The letter fills the center around x 50 percent, y 52 percent, about 45 percent of the width. A wall-desk line gives a horizon-like division at about 25 percent. The lower third is the empty desk surface.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - ورقة الرسالة مركز الصورة x≈50%,y≈52%
- تجنّب: حروف حقيقية أو شبه حروف مقروءة، أرقام، أشخاص، ختم أو شعار
- فحص القبول:
  1. ورقة رسالة قديمة بخطوط حبر مجرّدة غير مقروءة
  2. دواة وقلم قصب ووردة مجففة وضوء دافئ
  3. لا حروف حقيقية ولا أشخاص والثلث السفلي هادئ

### 13 — rihab-serious
- الملف: `public/art/chars/rihab-serious.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 5 — الطبقة B
- الغرض: تعبير الجدّية لرحاب في لحظات التركيز والتحذير.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A young Sudanese woman in her late twenties, the archive keeper, clever focused face, thin round tortoiseshell glasses, a faint curious half-smile. She wears a dusty palm-green cotton headscarf neatly wrapped, an olive knitted cardigan over a cream blouse, a pencil tucked in at the side of the scarf, and a thin cream-covered ledger held against her chest with only its cover edge visible. Slight three-quarter view, shoulders turned a little to the right.
Expression: serious and focused, the eyes slightly narrowed behind the thin glasses, lips firm, a steady gaze at the viewer.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن rihab-neutral، غضب، تغيير الوشاح أو النظارة أو الدفتر
- فحص القبول:
  1. نفس الوجه والنظارة الدائرية والوشاح الأخضر والكارديغان في rihab-neutral
  2. نظرة جادة مركّزة بلا غضب
  3. الخلفية رمادية فاتحة نظيفة

---

## جدول التتبّع
| # | ID | الطبقة | وُلّدت | قُبلت | حُفظت بالاسم | ملاحظات |
|---|---|---|---|---|---|---|
| 1 | c5-l1 | A | [ ] | [ ] | [ ] | |
| 2 | c5-l4 | A | [ ] | [ ] | [ ] | |
| 3 | c5-l7 | A | [ ] | [ ] | [ ] | |
| 4 | rihab-neutral | A | [ ] | [ ] | [ ] | |
| 5 | symbol-c5 | A | [ ] | [ ] | [ ] | |
| 6 | notebook-safiya | A | [ ] | [ ] | [ ] | |
| 7 | brass-scale | A | [ ] | [ ] | [ ] | |
| 8 | stone-key | A | [ ] | [ ] | [ ] | |
| 9 | c5-l2 | B | [ ] | [ ] | [ ] | |
| 10 | c5-l3 | B | [ ] | [ ] | [ ] | |
| 11 | c5-l5 | B | [ ] | [ ] | [ ] | |
| 12 | c5-l6 | B | [ ] | [ ] | [ ] | |
| 13 | rihab-serious | B | [ ] | [ ] | [ ] | |

## أسئلة وملاحظات لأصحاب الفصول
1. **ch5.ts (A):** إضافة `icon:` لأزواج c5-l1 (الأسماء في الملاحظات أعلاه).
2. **c5-l2 (B/A):** علامة خط المجرى على حافة كل قطعة (بقعة حبر زرقاء قصيرة) مواضعها مؤقتة؛ تُضبط من `/preview/coords` بعد وصول الصورة.
3. **c5-l3 (B/A):** مراكز القطع مأخوذة من ترتيب S نفسه في الخريطة (1 و2 و3 أعلى، 4 و5 أسفل)؛ لو اختلف الترتيب أخبرني.
4. **c5-l6 (A):** مفتاح الشفرة أيقونات `symbol-c1..c5`؛ لم أرسم رموزاً على الورقة حتى لا تكشف الحل.
