# PROMPTS_03 — الدفعة 3: الفصل الثالث (سوق الحكايات)

> الحساب F — مدير الفن. **20 صورة** للفصل 3 (سوق الحكايات): 7 خلفيات، 3 بورتريهات (حليمة وتعبيرها + تعبير يونس)، 10 أيقونات.
> الترتيب: خلفيات الطبقة A (`c3-l1` ثم `c3-l4` ثم `c3-l7`) ← حليمة ← أيقونات A (رمز الميزان، الخرزة، الوزن، المكوك، التوابل الأربع) ← الطبقة B.
> الإضاءة: ضوء دافئ مرشّح عبر أقمشة السوق.
> مصدر الحقيقة: `src/content/chapters/ch3.ts` (E) و`docs/LEVELS.md`.

## طريقة العمل لكل صورة (مازن)
1. ارفق المرجع المكتوب في «المرجع المرفق». الخلفيات والشاشات: `docs/reference/village.jpg`. **الأيقونات: لا ترفق أي مرجع** (المرجع يجلب مشهد القرية). البورتريهات: `docs/reference/nour.png`، وللشخصيات الموجودة (آدم ويونس وهالة) ارفق أيضاً صورتها neutral من `public/art/chars/` ليثبت الوجه.
2. انسخ كتلة «البرومبت الكامل» كما هي بدون تعديل. لا تحذف سطر الوصف الثابت للشخصية.
3. افحص الناتج بنقاط «فحص القبول» وقائمة «تجنّب». لو فشلت نقطة، أعد التوليد (أو استعمل البديل المختصر في `GENERATION_ORDER.md`).
4. حوّل واحفظ بالاسم والمقاس بالضبط: `cwebp -q 80`. البورتريهات والأيقونات تُزال خلفيتها أولاً.
5. لألغاز المواضع (hotspot وroute): بعد الحفظ افتح `#/preview/coords?img=/art/cN/lM.webp` وسلّم الإحداثيات لصاحب الفصل.

**حدود الحجم:** خلفية ≤ 250KB، شاشة عامة ≤ 300KB، بورتريه ≤ 200KB، أيقونة ≤ 40KB.

## ملاحظات هذه الدفعة
- **c3-l4 (memory):** الحل بالألوان، فالصورة تعرض ثمانية أكياس في أربعة أزواج متجاورة بألوان متميّزة (أوكر، قرفة، عنّابي، فحمي). ألوان أيقونات التوابل الأربع لازم تطابقها.
- **أسماء الأيقونات:** مأخوذة من `grep "icon:"` في `ch3.ts`: `bead-blue`, `copper-weight`, `weaver-shuttle`, `spice-cumin`, `spice-cinnamon`, `spice-clove`, `spice-pepper`. لا تغيير عن الجرد.
- **اختيارية:** `ledger-page` و`tea-glass` ليس لهما مرجع في الكود حالياً؛ ولّدهما آخراً. (حذفت `market-scissors` من الجرد لأنه تخمين بلا مرجع.)
- **الشخصيات:** يونس موجود (neutral)، فتعبيره يُولَّد مع إرفاق `public/art/chars/yunus-neutral.webp`. حليمة جديدة.

---

### 1 — c3-l1
- الملف: `public/art/c3/l1.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: خلفية c3-l1 «ثلاثة أغراض وثلاثة مصادر» (matching): ممر سوق مسقوف وأقمشة معلّقة. تلمّح بخفّة للمصادر الثلاثة: قوافل، حدّاد، نسّاجون.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A covered market alley in a Sudanese river town in warm filtered light. The roof is woven palm mats and patchwork cloth awnings with thin stripes of golden sun falling through the gaps onto the dusty ground. Muted dyed fabrics hang from ropes overhead in indigo, ochre and terracotta. Three quiet hints of three trades, none of them dominating: on the left a weaver's wooden loom with half-woven cloth standing at a shop entrance; on the right the open front of a blacksmith's small forge with a faintly glowing ember, an anvil and a few copper pieces hanging on the wall; at the far end of the alley bundles, saddlebags and rope-tied packs stacked as if just arrived with a caravan, with a string of blue beads hanging from one pack. No people.
Composition: one-point perspective, the vanishing point near the center at about x 50 percent, y 47 percent. The loom at the left around x 18 percent, the forge at the right around x 82 percent, the caravan bundles at the far end around x 50 percent. The lower third is the empty dusty street.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - ثلاث إشارات متباعدة: نول يسار x≈18% | حدّاد يمين x≈82% | حزم قافلة في نهاية الممر x≈50%
  - لا شيء مكتوب على اللافتات أو الأقمشة
- تجنّب: لافتات أو كتابة على الدكاكين، أشخاص في الممر، إضاءة فلورية أو مباني حديثة، ألوان أقمشة ساطعة، إشارة واحدة تطغى على الباقي
- فحص القبول:
  1. ممر سوق مسقوف بأقمشة هادئة وخطوط شمس ذهبية على الأرض
  2. الإشارات الثلاث (نول، حدّاد، حزم قافلة) ظاهرة وغير بارزة
  3. الثلث السفلي هادئ ولا نص ولا أشخاص

### 2 — c3-l4
- الملف: `public/art/c3/l4.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: خلفية c3-l4 «روائح السوق» (memory): أكياس توابل ملوّنة، لكل لون كيسان متجاوران (حسب دلائل `ch3.ts`).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A spice stall in the market in warm filtered golden light. Eight cloth sacks of spices stand open at the top on low wooden stands and hang from a rail, arranged as FOUR colored PAIRS, the two sacks of each pair side by side and the same color as their cloth and as the spice heaped in the open top: a pair of golden ochre sacks (cumin), a pair of warm cinnamon red-brown sacks, a pair of deep maroon-brown sacks (cloves), and a pair of charcoal-gray sacks with a few green flecks (pepper). The four pairs are clearly distinct in color and evenly spaced along the stall. Small clay scoops and a brass scale on the counter, bundles of dried herbs hanging above, a palm-mat awning. No people, no labels or writing.
Composition: camera at counter height, slightly angled. The four pairs sit at x about 16, 38, 62 and 84 percent, from left to right: ochre, cinnamon, maroon, charcoal. The counter edge gives a horizon-like line at about 62 percent. The lower third is the empty counter front and ground.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - أربعة أزواج متجاورة من اليسار: أوكر ذهبي (كمّون) | قرفة أحمر-بنّي | عنّابي غامق (قرنفل) | فحمي رمادي بنقط خضراء (فلفل)
  - كل زوج كيسان متطابقان لوناً بجانب بعضهما
- تجنّب: أكياس بألوان متقاربة (القرفة والقرنفل يجب أن يتميّزا)، ملصقات أو كتابة، أشخاص، ألوان توابل نيون، أكثر أو أقل من 8 أكياس
- فحص القبول:
  1. ثمانية أكياس في أربعة أزواج متجاورة بأربعة ألوان واضحة
  2. التوابل في فوهة كل كيس بنفس لون الكيس
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 3 — c3-l7
- الملف: `public/art/c3/l7.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: خلفية c3-l7 «صفحة الرموز» (cipher boss): غرفة خلفية للدكان بدفاتر مكدّسة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: The back room of a merchant's shop, dim and quiet, a single warm shaft of late-afternoon light falling from a small high window onto old dust in the air. Shelves from floor to ceiling crammed with tall stacks of old closed ledgers with worn leather and cloth spines, more ledgers piled on the floor, a low wooden desk with an unlit clay oil lamp and an inkwell, a rolled mat, a faded curtain half drawn over a doorway. Wood, leather and clay in muted browns, sandy gold and warm violet shadows. No people. No readable writing on any spine or page.
Composition: camera at eye level facing the back wall. The window shaft falls on the desk at about x 62 percent, y 60 percent. A shelf line gives a horizon-like division at about 50 percent. The lower third is the empty floor.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: كتابة على كعوب الدفاتر أو الأوراق، أشخاص، مصباح كهربائي، ضوء بنفسجي نيون، غرفة مبهرجة
- فحص القبول:
  1. دفاتر قديمة مكدّسة على رفوف وأرضية بجو هادئ وخافت
  2. شعاع ضوء دافئ واحد من نافذة عالية على المكتب
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 4 — halima-neutral
- الملف: `public/art/chars/halima-neutral.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: حليمة ست الشاي. تتكلم في c3-l4 وتظهر في c3-l6.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A Sudanese woman in her fifties who sells tea in the market, round warm face, laugh lines, bright knowing eyes, tiny gold stud earrings. She wears a colorful but muted tob in terracotta red, mustard gold and Nile blue stripes draped over her hair and shoulders, a plain cream cotton blouse underneath. Slight three-quarter view, shoulders turned a little to the right.
Expression: warm, knowing and friendly, a gentle smile in the eyes, mouth softly closed.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ألوان ثوب مشبعة أو نيون، ابتسامة عريضة، مجوهرات كثيرة لامعة، أيدٍ ظاهرة مشوّهة
- فحص القبول:
  1. امرأة خمسينية بثوب مخطّط ترابي وخردلي وأزرق هادئ على رأسها وكتفيها
  2. وجه ودود بتجاعيد ضحك وقرطين ذهبيين صغيرين
  3. الخلفية رمادية فاتحة نظيفة وأسلوب nour.png

### 5 — symbol-c3
- الملف: `public/art/items/symbol-c3.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: رمز الفصل 3 (الميزان) حسب SYMBOLS.md. يُمنح عند c3-l7 ويُستعمل في c4-l5 وc5-l5 وc5-l6.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A round sandstone plaque with a simple carved relief of a balance scale: a central post, a level beam and two level hanging pans, bold and clean, readable at a small size, gold-copper color, looks chiseled into the stone with soft worn edges. Part of a matching set of five chapter symbols: the same round sandstone plaque shape, same carved relief style, same gold-copper color on a warm sand-colored stone.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: سلاسل وتفاصيل دقيقة تضيع بالحجم الصغير، كفتان غير متوازنتين، حروف أو أرقام
- فحص القبول:
  1. ميزان بسيط بكفتين متوازنتين مقروء بـ 64px
  2. نفس اللوح الحجري الدائري والنقش الذهبي-النحاسي في بقية الرموز
  3. خلفية رمادية فاتحة وحواف نظيفة

### 6 — bead-blue
- الملف: `public/art/items/bead-blue.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: الخرزة الزرقاء في c3-l1 (matching): الغرض الذي مصدره القوافل.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A single hand-made glass bead in a deep muted Nile-blue with faint swirls, round with a small threaded hole, on a short loop of natural cord, shown large and clear.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أكثر من خرزة، أزرق نيون مشبع، حروف أو علامات
- فحص القبول:
  1. خرزة زرقاء واحدة بدرجة أزرق النيل الهادئ مع خيط قصير
  2. مقروءة كخرزة بالحجم الصغير
  3. خلفية رمادية فاتحة وحواف نظيفة

### 7 — copper-weight
- الملف: `public/art/items/copper-weight.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: الوزن النحاسي في c3-l1 (matching): الغرض الذي مصدره الحدّاد (ويُستعمل أيضاً في c3-l3).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A single small aged copper weight, a squat bell-shaped cone with a flat base and a small ring on top, warm copper with green-brown patina in the crevices, no markings.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: علامات أو أرقام على الوزن، نحاس لامع جديد، أكثر من وزن
- فحص القبول:
  1. وزن نحاسي قديم على شكل جرس قصير بحلقة علوية
  2. مميّز عن الخرزة والمكوك بالشكل واللون
  3. خلفية رمادية فاتحة وحواف نظيفة

### 8 — weaver-shuttle
- الملف: `public/art/items/weaver-shuttle.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: مكوك النسّاج في c3-l1 (matching): الغرض الذي مصدره النسّاجون.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A single weaver's wooden shuttle, a slender boat-shaped piece of polished aged wood with pointed ends, a spool of cream-colored thread visible in its middle slot with a loose thread end.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أكثر من مكوك، خيوط ملوّنة ساطعة، شكل يشبه قارباً كاملاً
- فحص القبول:
  1. مكوك خشبي نحيل مدبّب الطرفين مع بكرة خيط كريمية
  2. مميّز عن قطعة المركب boat-piece (أنحف، وفيه خيط)
  3. خلفية رمادية فاتحة وحواف نظيفة

### 9 — spice-cumin
- الملف: `public/art/items/spice-cumin.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: بطاقة الكمّون في c3-l4 (memory). الحل بالألوان، فلون كل بهار لازم يتميّز.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A small plain round terracotta saucer holding a soft heap of small golden ochre cumin seeds, the dominant color of the spice clearly golden ochre. Part of a set of four spice icons with an identical saucer and view; only the spice and its color change.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: لونان متقاربان بين القرنفل والقرفة، كتابة أو ملصق، أكثر من بهار، طبق مختلف الشكل بين الأيقونات
- فحص القبول:
  1. اللون المهيمن golden ochre واضح
  2. الطبق نفسه ونفس الزاوية في الأيقونات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة

### 10 — spice-cinnamon
- الملف: `public/art/items/spice-cinnamon.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: بطاقة القرفة في c3-l4 (memory). الحل بالألوان، فلون كل بهار لازم يتميّز.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A small plain round terracotta saucer holding a small bundle of rolled cinnamon sticks in warm red-brown tied with a thin cord, the dominant color of the spice clearly warm cinnamon red-brown. Part of a set of four spice icons with an identical saucer and view; only the spice and its color change.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: لونان متقاربان بين القرنفل والقرفة، كتابة أو ملصق، أكثر من بهار، طبق مختلف الشكل بين الأيقونات
- فحص القبول:
  1. اللون المهيمن warm cinnamon red-brown واضح
  2. الطبق نفسه ونفس الزاوية في الأيقونات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة

### 11 — spice-clove
- الملف: `public/art/items/spice-clove.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: بطاقة القرنفل في c3-l4 (memory). الحل بالألوان، فلون كل بهار لازم يتميّز.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A small plain round terracotta saucer holding a small heap of dark maroon-brown cloves, the little nail-shaped buds with round heads, the dominant color of the spice clearly deep maroon-brown. Part of a set of four spice icons with an identical saucer and view; only the spice and its color change.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: لونان متقاربان بين القرنفل والقرفة، كتابة أو ملصق، أكثر من بهار، طبق مختلف الشكل بين الأيقونات
- فحص القبول:
  1. اللون المهيمن deep maroon-brown واضح
  2. الطبق نفسه ونفس الزاوية في الأيقونات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة

### 12 — spice-pepper
- الملف: `public/art/items/spice-pepper.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة A
- الغرض: بطاقة الفلفل في c3-l4 (memory). الحل بالألوان، فلون كل بهار لازم يتميّز.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A small plain round terracotta saucer holding a small heap of round charcoal-gray black peppercorns with a few green ones, the dominant color of the spice clearly charcoal gray with a few green flecks. Part of a set of four spice icons with an identical saucer and view; only the spice and its color change.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: لونان متقاربان بين القرنفل والقرفة، كتابة أو ملصق، أكثر من بهار، طبق مختلف الشكل بين الأيقونات
- فحص القبول:
  1. اللون المهيمن charcoal gray with a few green flecks واضح
  2. الطبق نفسه ونفس الزاوية في الأيقونات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة

### 13 — c3-l2
- الملف: `public/art/c3/l2.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 3 — الطبقة B
- الغرض: خلفية c3-l2 «من باع ماذا؟» (deduction): ثلاث دكاكين متجاورة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: Three small market shops standing side by side in a row along a dusty lane in warm afternoon light, each with a different muted awning color: ochre on the left, Nile blue in the middle, terracotta red-brown on the right, mud-brick fronts with wooden counters. The goods on their counters and shelves are only softly suggested as small shapes and colored heaps, never clearly identifiable, and there are no signs or writing. A few hanging baskets and a lantern. No people.
Composition: camera at eye level, facing the three shops frontally and evenly spaced at x about 17, 50 and 83 percent. A rooftop line gives a horizon-like division at about 28 percent. The lower third is the empty lane.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - الدكاكين الثلاثة x≈17% وx≈50% وx≈83% بمظلّات أوكر وأزرق وأحمر ترابي
- تجنّب: بضاعة واضحة التمييز (تناقض جدول الاستنتاج)، لافتات أو كتابة، أشخاص، دكاكين متلاصقة بلا فواصل
- فحص القبول:
  1. ثلاث دكاكين متجاورة بمظلّات بثلاثة ألوان هادئة
  2. البضاعة موحية فقط وغير مقروءة
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 14 — c3-l3
- الملف: `public/art/c3/l3.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 3 — الطبقة B
- الغرض: خلفية c3-l3 «ميزان النحاس» (balance): ميزان نحاسي على طاولة خشب.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A large aged copper balance scale standing on a thick wooden table in a quiet corner of the market, warm light from the side. The scale has a central post, a level beam and two hanging pans on chains, held almost level, one pan empty and the other holding a small bare cloth. Beside it a small wooden tray with several round copper weights of different sizes without any markings. The market is a soft blurred background of awnings and hanging cloths. No people, no writing.
Composition: camera at table height, slightly angled. The scale is at the center, around x 50 percent, y 50 percent. The blurred market gives a horizon-like division at about 35 percent. The lower third is the empty tabletop and its edge.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أرقام أو علامات على الأوزان، ميزان حديث رقمي، أشخاص، نحاس لامع جديد
- فحص القبول:
  1. ميزان نحاسي قديم بكفتين شبه متوازنتين وصينية أوزان بلا علامات
  2. إضاءة جانبية دافئة والسوق ضبابي خلفه
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 15 — c3-l5
- الملف: `public/art/c3/l5.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 3 — الطبقة B
- الغرض: خلفية c3-l5 «الدكان الناقص» (hotspot): دكان نسّاج بنول عند المدخل. فيه تفاصيل صغيرة متميّزة ليجد اللاعب فروقاً بينها وبين صفحة الدفتر.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: The front of a weaver's shop in warm late-afternoon light, the entrance open. A traditional wooden loom with stretched cream warp threads and a half-woven striped cloth stands at the entrance. The shop is rich with small distinct details spread across it, each easy to spot on its own: a string of blue beads hanging on the left doorpost; a small brass bell hanging above the door; a bolt of folded red-brown cloth on the top shelf; a small clay oil lamp on a ledge; a spool of yellow thread resting on the loom; a wooden stool with a folded cloth beside the door. Shelves with neatly folded muted cloth, a few spools of thread. No people, no writing.
Composition: camera at eye level facing the shop front. The six small details are spread widely across the frame and well separated. A doorframe line gives a horizon-like division at about 30 percent. The lower third is the empty doorstep and ground.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - تفاصيل صغيرة متباعدة (مواضع مؤقتة، يضبطها E): خرز أزرق x≈12,y≈38 | جرس نحاسي x≈45,y≈14 | قماش أحمر على الرف x≈72,y≈25 | مصباح طيني x≈86,y≈48 | بكرة خيط أصفر x≈30,y≈62 | كرسي بقماش x≈60,y≈70
- تجنّب: تفاصيل ملتصقة أو مخفية، كتابة على الدكان، أشخاص، ألوان ساطعة
- فحص القبول:
  1. نول عند المدخل وست تفاصيل صغيرة واضحة متباعدة
  2. ألوان أقمشة هادئة وضوء العصر دافئ
  3. لا نص ولا أشخاص

### 16 — c3-l6
- الملف: `public/art/c3/l6.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 3 — الطبقة B
- الغرض: خلفية c3-l6 «مثل التاجر» (choice): مقهى سوق وحليمة تصبّ الشاي (حليمة تظهر ببورتريه منفصل).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A small open-air tea corner in the market under a striped patchwork awning in warm late-afternoon light. A charcoal stove with a dented brass kettle and a small blackened teapot steaming gently, a wooden tray with six small glass tea cups with amber tea, a few low wooden stools and a small low table, a hanging oil lantern, a woven mat on the ground. Soft steam, warm violet shadows. No people.
Composition: camera at eye level, the tea stove at the center around x 48 percent, y 52 percent, the stools around it. An awning edge gives a horizon-like division at about 30 percent. The lower third is the empty ground and mat.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أشخاص، كتابة على الأكواب أو اللافتات، أدوات حديثة (ثلاجة، إضاءة نيون)، بخار كثيف يحجب المشهد
- فحص القبول:
  1. ركن شاي بموقد فحم وإبريق وأكواب وكراسٍ منخفضة
  2. ضوء دافئ وألوان هادئة وبخار خفيف
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 17 — halima-smiling
- الملف: `public/art/chars/halima-smiling.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة B
- الغرض: تعبير الضحك الدافئ لحليمة عند النجاح.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A Sudanese woman in her fifties who sells tea in the market, round warm face, laugh lines, bright knowing eyes, tiny gold stud earrings. She wears a colorful but muted tob in terracotta red, mustard gold and Nile blue stripes draped over her hair and shoulders, a plain cream cotton blouse underneath. Slight three-quarter view, shoulders turned a little to the right.
Expression: a broad warm laughing smile with deep laugh lines, eyes bright and almost closed with amusement.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن halima-neutral، ابتسامة كرتونية مبالغة، تغيير الثوب
- فحص القبول:
  1. نفس الوجه والثوب المخطّط وقرطي الذهب في halima-neutral
  2. ضحكة دافئة طبيعية بتجاعيد ضحك
  3. الخلفية رمادية فاتحة نظيفة

### 18 — yunus-smiling
- الملف: `public/art/chars/yunus-smiling.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة B
- الغرض: تعبير الابتسام ليونس التاجر عند النجاح.
- المرجع المرفق: `artifacts/nile-secrets/public/art/chars/yunus-neutral.webp` + `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A Sudanese merchant in his fifties, warm round-featured face, short curly black hair with gray at the temples, a short gray-white beard, a kind knowing half-smile. He wears a tan collarless cotton shirt and a terracotta-brown sleeveless waistcoat. Facing the viewer, shoulders squared. KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.
Expression: a relaxed, knowing, genuinely warm smile, the eyes crinkled kindly, gaze straight at the viewer.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن yunus-neutral، ابتسامة عريضة بأسنان، تغيير القميص أو السترة
- فحص القبول:
  1. نفس الوجه والقميص الأسمر والسترة الترابية في yunus-neutral
  2. ابتسامة دافئة عارفة طبيعية
  3. الخلفية رمادية فاتحة نظيفة

### 19 — ledger-page
- الملف: `public/art/items/ledger-page.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة B
- الغرض: صفحة الدفتر القديمة (اختيارية؛ لا يوجد مرجع لها في الكود حالياً).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A single aged ledger page, yellowed paper with faint ruled columns and rows, soft stains and a torn corner, a few abstract ink tick marks that are not letters or numbers.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أرقام أو حروف، ورق أبيض جديد، أكثر من صفحة
- فحص القبول:
  1. صفحة دفتر قديمة بأعمدة خفيفة وبقع
  2. الخطوط علامات مجردة لا حروف
  3. خلفية رمادية فاتحة وحواف نظيفة

### 20 — tea-glass
- الملف: `public/art/items/tea-glass.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 3 — الطبقة B
- الغرض: كوب شاي حليمة (اختيارية؛ لا يوجد مرجع لها في الكود حالياً).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A single small clear glass cup of strong amber tea with a thin curl of steam, a small spoon resting on the saucer, a simple gold line around the rim.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: كتابة على الكوب، أكثر من كوب، بخار كثيف
- فحص القبول:
  1. كوب شاي زجاجي صغير بلون كهرماني دافئ
  2. مقروء بالحجم الصغير
  3. خلفية رمادية فاتحة وحواف نظيفة

---

## جدول التتبّع
| # | ID | الطبقة | وُلّدت | قُبلت | حُفظت بالاسم | ملاحظات |
|---|---|---|---|---|---|---|
| 1 | c3-l1 | A | [ ] | [ ] | [ ] | |
| 2 | c3-l4 | A | [ ] | [ ] | [ ] | |
| 3 | c3-l7 | A | [ ] | [ ] | [ ] | |
| 4 | halima-neutral | A | [ ] | [ ] | [ ] | |
| 5 | symbol-c3 | A | [ ] | [ ] | [ ] | |
| 6 | bead-blue | A | [ ] | [ ] | [ ] | |
| 7 | copper-weight | A | [ ] | [ ] | [ ] | |
| 8 | weaver-shuttle | A | [ ] | [ ] | [ ] | |
| 9 | spice-cumin | A | [ ] | [ ] | [ ] | |
| 10 | spice-cinnamon | A | [ ] | [ ] | [ ] | |
| 11 | spice-clove | A | [ ] | [ ] | [ ] | |
| 12 | spice-pepper | A | [ ] | [ ] | [ ] | |
| 13 | c3-l2 | B | [ ] | [ ] | [ ] | |
| 14 | c3-l3 | B | [ ] | [ ] | [ ] | |
| 15 | c3-l5 | B | [ ] | [ ] | [ ] | |
| 16 | c3-l6 | B | [ ] | [ ] | [ ] | |
| 17 | halima-smiling | B | [ ] | [ ] | [ ] | |
| 18 | yunus-smiling | B | [ ] | [ ] | [ ] | |
| 19 | ledger-page | B | [ ] | [ ] | [ ] | |
| 20 | tea-glass | B | [ ] | [ ] | [ ] | |

## أسئلة وملاحظات لأصحاب الفصول
1. **c3-l2 (E):** الخلفية بثلاث دكاكين بمظلّات ملوّنة وبضاعة موحية غير مقروءة حتى لا تناقض جدول الاستنتاج. أخبرني لو تريد بضاعة محدّدة لكل دكان.
2. **c3-l5 (E):** تفاصيل الدكان الستة (خرز، جرس، قماش أحمر، مصباح، بكرة أصفر، كرسي) مقترحة. أخبرني بالفروق الخمسة الفعلية لأعدّل الصورة وفقها.
3. **c3-l7 (E):** مفتاح الشفرة يستعمل رموزاً نصية؛ لم أرسمها في الصورة لتبقى مستقلة (وقرار A: لا رموز إيموجي ملوّنة، أشكال هندسية أو حروف فقط).
4. **c3-l3 (E):** الأوزان النحاسية على الصينية بلا علامات؛ الأرقام تأتي من الواجهة.
