# PROMPTS_02 — الدفعة 2: الفصل الثاني (جزيرة الأسرار)

> الحساب F — مدير الفن. **22 صورة** للفصل 2 (جزيرة الأسرار): 7 خلفيات، 3 بورتريهات (سيف + تعبيرا آدم)، 12 أيقونة.
> الترتيب: خلفيات الطبقة A (`c2-l1` ثم `c2-l4` ثم `c2-l7`) ← سيف ← أيقونات A (رمز الموجة ونجوم الملاّح) ← الطبقة B.
> الإضاءة: نهار صافٍ وضباب نهري ناعم (l1 وl2 وl3 وl5 وl6)، غسق (l4)، غروب (l7).
> مصدر الحقيقة: `src/content/chapters/ch2.ts` (أنا قرأته في 31/10) و`docs/LEVELS.md`.

## طريقة العمل لكل صورة (مازن)
1. ارفق المرجع المكتوب في «المرجع المرفق». الخلفيات والشاشات: `docs/reference/village.jpg`. **الأيقونات: لا ترفق أي مرجع** (المرجع يجلب مشهد القرية). البورتريهات: `docs/reference/nour.png`، وللشخصيات الموجودة (آدم ويونس وهالة) ارفق أيضاً صورتها neutral من `public/art/chars/` ليثبت الوجه.
2. انسخ كتلة «البرومبت الكامل» كما هي بدون تعديل. لا تحذف سطر الوصف الثابت للشخصية.
3. افحص الناتج بنقاط «فحص القبول» وقائمة «تجنّب». لو فشلت نقطة، أعد التوليد (أو استعمل البديل المختصر في `GENERATION_ORDER.md`).
4. حوّل واحفظ بالاسم والمقاس بالضبط: `cwebp -q 80`. البورتريهات والأيقونات تُزال خلفيتها أولاً.
5. لألغاز المواضع (hotspot وroute): بعد الحفظ افتح `#/preview/coords?img=/art/cN/lM.webp` وسلّم الإحداثيات لصاحب الفصل.

**حدود الحجم:** خلفية ≤ 250KB، شاشة عامة ≤ 300KB، بورتريه ≤ 200KB، أيقونة ≤ 40KB.

## ملاحظات هذه الدفعة
- **c2-l1 (route):** إحداثيات الأحجار والرغوة والدوّامة وماء الهدوء مأخوذة من `ch2.ts`. اتجاه التيار من اليسار لليمين. الإحداثيات مؤقتة وتُعاد معايرتها بـ `/preview/coords`.
- **c2-l4:** السماء بلا أبراج مقروءة (أيقونات النجوم الخمس تأتي من الواجهة). `star-sign-1..5` = السلّة، القصب، الطائر، الشراع، المرسى، بنفس ترتيب `ch2.ts`.
- **أيقونات اختيارية:** `river-stone` و`cargo-sack` ليس لها مرجع في الكود حالياً؛ ولّدها آخراً.
- **الشخصيات:** آدم موجود (neutral)، فتعابيره تُولَّد مع إرفاق `public/art/chars/adam-neutral.webp` ليثبت الوجه. سيف جديد.

---

### 1 — c2-l1
- الملف: `public/art/c2/l1.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: خلفية c2-l1 «الممر الضحل» (route): 5 أحجار على قطر من الضفة نحو الجزيرة. الآمن ما خلفه ماء هادئ، وغير الآمن خلفه رغوة أو دوّامة (حسب `ch2.ts`).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A wide shallow channel of the Nile on a clear bright day, soft river mist near the water, the current flowing gently from left to right. Five dark rounded river stones stand out of the shallow sand-gold water along a diagonal line that runs from a sandy shore with reed clumps at the lower left up to a low reed-covered island with a few dusty palms at the upper right. The stones are of similar size, each about 5 to 6 percent of the image width, evenly spaced along the diagonal. What happens in the water just behind each stone (downstream, to its right) is the clue and must be clearly readable: behind stone 1 a patch of white foam swirling; behind stone 2 calm clear glassy water; behind stone 3 a small whirlpool eddy pulling a few reed leaves round; behind stone 4 calm smooth water; behind stone 5 calm still water. All reed clumps on the shore and the island lean gently to the right with the current, and faint ripple lines across the whole channel run from left to right, so the direction of flow is obvious and "behind a stone" clearly means the water on its right-hand side. The water behind stones 2, 4 and 5 must be a smooth glassy patch with no foam, no rings and no eddy, at least 8 percent of the image width long, so the contrast with stones 1 and 3 is unmistakable. Warm sunlight, pale sky with thin clouds, a far bank low on the horizon.
Composition: horizon (the far bank) at about 25 percent of the height. The stones follow a clean diagonal. Calm open water around the path so route markers can be drawn over it. Stone 1 is low in the frame, an accepted exception to the empty lower third.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - الأحجار الخمسة على قطر من أسفل اليسار لأعلى اليمين (إحداثيات `ch2.ts` المؤقتة): حجر1 x≈40,y≈86 | حجر2 x≈58,y≈74 | حجر3 x≈68,y≈62 | حجر4 x≈76,y≈50 | حجر5 x≈86,y≈38
  - خلف حجر1 رغوة بيضاء، خلف حجر3 دوّامة صغيرة، وخلف الأحجار 2 و4 و5 ماء هادئ صافٍ (اتجاه التيار من اليسار لليمين)
  - تُضبط الإحداثيات النهائية بصفحة `/preview/coords` بعد وصول الصورة
- تجنّب: رغوة أو دوّامة خلف الأحجار 2 و4 و5 (تلغي الحل)، أحجار متلاصقة أو بأحجام متفاوتة جداً، قوارب أو أشخاص، نص أو علامات على الأحجار، ماء أزرق مشبع أو نيون
- فحص القبول:
  1. خمسة أحجار على قطر واضح بنفس الإحداثيات تقريباً
  2. رغوة خلف 1، دوّامة خلف 3، وماء هادئ خلف 2 و4 و5 بوضوح
  3. أسلوب village.jpg بلا نص ولا أشخاص

### 2 — c2-l4
- الملف: `public/art/c2/l4.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: خلفية c2-l4 «نجوم الملاّح» (sequence): سماء المساء وقارب على الماء. أيقونات النجوم الخمس تُعرض بالواجهة، فالسماء لا تُظهر أبراجاً مقروءة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A calm river at early night right after sunset. The sky fades from a thin band of warm amber and dusty rose at the horizon through soft violet to deep Nile-blue indigo overhead, with the first stars scattered naturally and faintly, no recognizable constellation pattern. In the middle of the still water a small wooden river boat with a patched cream lateen sail lies at anchor, no people on board, a small oil lantern glowing warm on the deck, its light reflected in long soft streaks on the dark water. On the left bank low silhouettes of reeds and one palm. The far bank is a dark low line.
Composition: horizon at about 50 percent of the height. The boat sits slightly left of center at about x 42 percent, small. The upper half is open starry sky. The lower third is calm dark reflective water, fairly empty.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - القارب x≈42%,y≈52% صغير، والفانوس هو العنصر الدافئ الوحيد
  - السماء العلوية مفتوحة بنجوم متفرقة بلا أبراج مقروءة
- تجنّب: أبراج أو نجوم مرتّبة بنمط مقروء يناقض الأغنية، قمر كبير ساطع، أشخاص على القارب، نجوم نيون أو سماء سوداء خالصة، كتابة على الشراع
- فحص القبول:
  1. غسق هادئ بألوان كهرماني-بنفسجي-نيلي مكتومة وفانوس دافئ واحد
  2. قارب بشراع مرقّع صغير والماء ساكن يعكس الضوء
  3. لا نص ولا أشخاص ولا أبراج مقروءة

### 3 — c2-l7
- الملف: `public/art/c2/l7.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: خلفية c2-l7 «القطعة الثانية» (jigsaw boss): ضفة الجزيرة الأخرى عند الغروب. تُستعمل أيضاً كصورة ختام الفصل 2.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: The far shore of the low island at sunset. A gentle curve of pale golden sand, thick clumps of reeds swaying lightly, three dusty palms leaning toward the water, and a small old wooden boat pulled up on the sand with a coil of rope beside it, no people. The calm river reflects a sky of warm gold shading to soft rose and violet, a low sun just above the far bank. Long soft violet shadows stretch across the sand. A quiet, satisfied mood: something about to be completed.
Composition: horizon (the far bank across the water) at about 42 percent of the height. The boat sits at the lower left around x 25 percent, y 62 percent. The lower third is empty sand and shallow water with soft reflections.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: شمس بيضاء ساطعة أو ألوان نيون، أشخاص، مراكب كثيرة، كتابة على القارب
- فحص القبول:
  1. ضفة رملية وقصب ونخيل وقارب صغير مسحوب على الرمل
  2. غروب ذهبي-وردي هادئ بنفس لوحة الألوان
  3. الثلث السفلي هادئ ولا نص ولا أشخاص

### 4 — saif-neutral
- الملف: `public/art/chars/saif-neutral.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: سيف ابن آدم. يتكلم في c2-l1 ويظهر كمتحدّث في c2-l7. ملامحه تشبه أباه (آدم) بالقميص الأزرق الرمادي.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A Sudanese boy of about ten, Adam's young son, slim with short black hair, big bright curious dark eyes, a small gap-toothed hint of a smile, a tiny scar on his chin. He wears a faded blue-gray cotton shirt a little too large for him with the collar open, like a smaller version of his father's, and a thin twine bracelet. Slight three-quarter view, chin a little raised.
Expression: bright, curious and lively, a hint of an eager smile, eyes looking straight at the viewer.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ملامح شاب بدل طفل، ملابس مزخرفة أو حديثة، ابتسامة كرتونية مبالغة، أيدٍ ظاهرة مشوّهة
- فحص القبول:
  1. صبي في العاشرة بقميص أزرق رمادي واسع وبحبل خيط في المعصم
  2. فضول واضح وبشرة وإضاءة بنفس أسلوب nour.png
  3. خلفية رمادية فاتحة نظيفة

### 5 — symbol-c2
- الملف: `public/art/items/symbol-c2.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: رمز الفصل 2 (الموجة) حسب SYMBOLS.md. يُمنح عند c2-l7 ويُستعمل في c4-l5 وc5-l5 وc5-l6.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A round sandstone plaque with a simple carved relief of a wave: three parallel wavy water lines, bold and clean, readable at a small size, gold-copper color, looks chiseled into the stone with soft worn edges. Part of a matching set of five chapter symbols: the same round sandstone plaque shape, same carved relief style, same gold-copper color on a warm sand-colored stone.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: خطوط موجة كثيرة رفيعة تضيع بالحجم الصغير، حروف أو أرقام، لمعان معدني ساطع
- فحص القبول:
  1. ثلاثة خطوط ماء متعرجة بسيطة مقروءة بـ 64px
  2. نفس اللوح الحجري الدائري والنقش الذهبي-النحاسي في symbol-c1
  3. خلفية رمادية فاتحة وحواف نظيفة

### 6 — star-sign-1
- الملف: `public/art/items/star-sign-1.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: نجمة «السلّة» (رقم 1) في c2-l4 (sequence). 1 من 5 علامات نجوم تُرتَّب حسب أغنية آدم.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small round dark Nile-blue indigo clay disc with a thin warm-gold rim, on it a constellation drawn as about seven small glowing gold stars joined by thin gold lines forming the simple outline of a round woven basket with a curved handle. The shape must be bold and must read as its named object at 48 pixels, with a clearly different silhouette from the other four star signs, the only shape on the disc. Part of a set of five star signs with identical disc, rim and star style; only the shape changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أكثر من شكل واحد على القرص، حروف أو أرقام، نجوم كثيرة تضيع الشكل، ألوان نيون
- فحص القبول:
  1. الشكل (basket) واضح من 7 نجوم وخطوط رفيعة
  2. القرص والإطار الذهبي متطابقان مع بقية النجوم الخمس
  3. خلفية رمادية فاتحة وحواف نظيفة

### 7 — star-sign-2
- الملف: `public/art/items/star-sign-2.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: نجمة «القصب» (رقم 2) في c2-l4 (sequence). 2 من 5 علامات نجوم تُرتَّب حسب أغنية آدم.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small round dark Nile-blue indigo clay disc with a thin warm-gold rim, on it a constellation drawn as about seven small glowing gold stars joined by thin gold lines forming the simple outline of a bundle of three tall reed stalks with leaves. The shape must be bold and must read as its named object at 48 pixels, with a clearly different silhouette from the other four star signs, the only shape on the disc. Part of a set of five star signs with identical disc, rim and star style; only the shape changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أكثر من شكل واحد على القرص، حروف أو أرقام، نجوم كثيرة تضيع الشكل، ألوان نيون
- فحص القبول:
  1. الشكل (reed) واضح من 7 نجوم وخطوط رفيعة
  2. القرص والإطار الذهبي متطابقان مع بقية النجوم الخمس
  3. خلفية رمادية فاتحة وحواف نظيفة

### 8 — star-sign-3
- الملف: `public/art/items/star-sign-3.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: نجمة «الطائر» (رقم 3) في c2-l4 (sequence). 3 من 5 علامات نجوم تُرتَّب حسب أغنية آدم.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small round dark Nile-blue indigo clay disc with a thin warm-gold rim, on it a constellation drawn as about seven small glowing gold stars joined by thin gold lines forming the simple outline of a bird in flight with wings spread. The shape must be bold and must read as its named object at 48 pixels, with a clearly different silhouette from the other four star signs, the only shape on the disc. Part of a set of five star signs with identical disc, rim and star style; only the shape changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أكثر من شكل واحد على القرص، حروف أو أرقام، نجوم كثيرة تضيع الشكل، ألوان نيون
- فحص القبول:
  1. الشكل (bird) واضح من 7 نجوم وخطوط رفيعة
  2. القرص والإطار الذهبي متطابقان مع بقية النجوم الخمس
  3. خلفية رمادية فاتحة وحواف نظيفة

### 9 — star-sign-4
- الملف: `public/art/items/star-sign-4.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: نجمة «الشراع» (رقم 4) في c2-l4 (sequence). 4 من 5 علامات نجوم تُرتَّب حسب أغنية آدم.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small round dark Nile-blue indigo clay disc with a thin warm-gold rim, on it a constellation drawn as about seven small glowing gold stars joined by thin gold lines forming the simple outline of a triangular lateen sail on a mast. The shape must be bold and must read as its named object at 48 pixels, with a clearly different silhouette from the other four star signs, the only shape on the disc. Part of a set of five star signs with identical disc, rim and star style; only the shape changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أكثر من شكل واحد على القرص، حروف أو أرقام، نجوم كثيرة تضيع الشكل، ألوان نيون
- فحص القبول:
  1. الشكل (sail) واضح من 7 نجوم وخطوط رفيعة
  2. القرص والإطار الذهبي متطابقان مع بقية النجوم الخمس
  3. خلفية رمادية فاتحة وحواف نظيفة

### 10 — star-sign-5
- الملف: `public/art/items/star-sign-5.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة A
- الغرض: نجمة «المرسى» (رقم 5) في c2-l4 (sequence). 5 من 5 علامات نجوم تُرتَّب حسب أغنية آدم.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small round dark Nile-blue indigo clay disc with a thin warm-gold rim, on it a constellation drawn as about seven small glowing gold stars joined by thin gold lines forming the simple outline of a ship anchor with a ring and curved flukes. The shape must be bold and must read as its named object at 48 pixels, with a clearly different silhouette from the other four star signs, the only shape on the disc. Part of a set of five star signs with identical disc, rim and star style; only the shape changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أكثر من شكل واحد على القرص، حروف أو أرقام، نجوم كثيرة تضيع الشكل، ألوان نيون
- فحص القبول:
  1. الشكل (anchor) واضح من 7 نجوم وخطوط رفيعة
  2. القرص والإطار الذهبي متطابقان مع بقية النجوم الخمس
  3. خلفية رمادية فاتحة وحواف نظيفة

### 11 — c2-l2
- الملف: `public/art/c2/l2.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: خلفية c2-l2 «اتجاه القصب» (hotspot): 4 قصبات مائلة مع جريان الماء بين قصب كثيف قائم. المواضع ملزمة (مطابقة لإحداثيات الكود بعد مراجعة D).
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A dense reed bank on the edge of slow brown-green water in soft morning light, with long gentle ripple lines in the water all running to the right, showing that the current flows from left to right. Hundreds of tall reed stalks stand upright and orderly, and among them exactly four reeds are clearly bent over toward the right, leaning with the current. The four leaning reeds must be placed at about (22,55), (41,40), (63,52) and (80,35) percent of the image width and height. Each is bent 25 to 35 degrees to the right, about 10 percent of the image height tall, standing in a small clearing of upright reeds so it is isolated from its neighbours, with a thin warm sun ray touching it. Every other reed stays within 5 degrees of vertical, and the ripple lines on the water run to the right. A few wet clay stones at the water edge, a dragonfly resting on a stalk, mist over the far bank.
Composition: camera at water level looking along the bank, reeds filling the upper two thirds, calm water in the lower third. A far low bank gives a horizon at about 35 percent. The four leaning reeds are spread across the width, none touching.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - أربع قصبات مائلة نحو اليمين (ملزمة): x≈22,y≈55 | x≈41,y≈40 | x≈63,y≈52 | x≈80,y≈35 (نسبة من العرض والارتفاع)
  - كل قصبة مائلة 25 إلى 35 درجة لليمين وارتفاعها ≈10% من ارتفاع الصورة، في فسحة صغيرة من القصب القائم، ويمسّها شعاع شمس رفيع
  - باقي القصب قائم (≤5 درجات عن العمودي) وتموّجات الماء كلها تتجه لليمين
- تجنّب: قصبات مائلة لليسار أو بكل الاتجاهات (تناقض اتجاه التيار)، أكثر أو أقل من 4 قصبات مائلة أو قصبتان متجاورتان، قصب مائل بين الباقي بلا فسحة تعزله، حيوانات كبيرة أو أشخاص، نص
- فحص القبول:
  1. أربع قصبات مائلة بوضوح لليمين، كل واحدة معزولة بفسحة ويمسّها شعاع شمس
  2. باقي القصب قائم وتموّج الماء يؤكد التيار لليمين
  3. ألوان هادئة بلا نص ولا أشخاص

### 12 — c2-l3
- الملف: `public/art/c2/l3.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: خلفية c2-l3 «حمولة المركب» (balance): مركب خشبي عند مرسى صغير وحمولة على الرصيف.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A small old wooden cargo boat tied at a tiny wooden mooring on the Nile in clear morning light, the deck empty and open, a patched cream sail furled on the boom. On the packed-earth quay beside it neatly stacked cargo waiting to be loaded: burlap sacks of grain, several clay jars of different sizes, a coil of thick rope, two woven baskets and a small wooden crate. Calm river behind, a few reeds, a warm low sun and long soft shadows. No people, no labels or marks on the cargo.
Composition: camera at quay level, slightly angled. The boat fills the center and right at about x 55 to 90 percent, the cargo at the left at about x 10 to 45 percent. Horizon (the far bank) at about 38 percent. The lower third is empty quay ground.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: كتابة أو علامات على الأكياس والجرار، أشخاص أو بحّارة، مراكب حديثة أو محرّكات، حمولة على سطح المركب (لازم فارغ)
- فحص القبول:
  1. مركب خشبي بسطح فارغ وحمولة منظمة على الرصيف (أكياس وجرار وحبل وسلال)
  2. إضاءة صباحية دافئة وألوان هادئة
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 13 — c2-l5
- الملف: `public/art/c2/l5.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: خلفية c2-l5 «قنوات الماء» (tiles 3×3): حقل صغير وقنوات ري طينية.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A small irrigated field beside the Nile seen from a raised three-quarter view in warm midday light. A shallow clay-lined water inlet at the upper left takes water from the river, and hand-dug clay channels branch out across a small rectangular plot of green vegetables and millet at the lower right, dry sand-gold ground around it, a few reeds at the water's edge, one small clay water jar. The channels are clean and readable, the field is calm and tidy. No people, no tools, no signs.
Composition: camera raised at about 40 degrees, the river and a low far bank at the top giving a horizon at about 20 percent, the field in the center and lower right. The lower third is the field and bare earth, calm.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: مضخات أو أنابيب حديثة، أشخاص أو حيوانات، كتابة، حقل مزدحم بالتفاصيل
- فحص القبول:
  1. قنوات ري طينية واضحة تتفرّع من مدخل الماء إلى الحقل
  2. ضوء ظهيرة دافئ وألوان هادئة
  3. لا نص ولا أشخاص

### 14 — c2-l6
- الملف: `public/art/c2/l6.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: خلفية c2-l6 «عقد الصيّادين» (cipher): شباك صيد معلّقة على جذع ومفتاح عقد ملوّنة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A leaning palm trunk at the river's edge draped with old fishing nets hanging in soft folds, with wooden floats and small weights tied along the net edges, in warm late-morning light. Beside the nets, from a wooden peg driven into the trunk, hangs a short cord with four thick knots tied along it, in muted terracotta red, Nile blue, mustard yellow and dusty green. The four knots on the cord are decorative: evenly spaced, with no pattern, no marks and nothing that looks like a code or letters. A small clay pot and a coil of cord at the base of the trunk, the calm river and reeds behind. No people, no writing.
Composition: camera at eye level, trunk slightly right of center. The knotted cord hangs at about x 68 percent, y 38 percent, large enough to read the four colors. Horizon (the far bank) at about 45 percent. The lower third is bare sand and the pot, calm.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - حبل العقد الأربع الملوّنة x≈68%,y≈38% بالترتيب من الأعلى: أحمر، أزرق، أصفر، أخضر (مؤقت)
- تجنّب: أشخاص أو صيّادون، كتابة على العقد أو الخشب، ألوان عقد ساطعة أو أكثر من 4 عقد، شباك بلاستيكية حديثة
- فحص القبول:
  1. شباك معلّقة على جذع نخلة وحبل بأربع عقد بألوان أحمر وأزرق وأصفر وأخضر هادئة
  2. الألوان الأربعة تتميّز بوضوح
  3. لا نص ولا أشخاص

### 15 — adam-smiling
- الملف: `public/art/chars/adam-smiling.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: تعبير الابتسام لآدم عند النجاح أو حين يتحدّث عن جدّه.
- المرجع المرفق: `artifacts/nile-secrets/public/art/chars/adam-neutral.webp` + `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A lean Sudanese man in his thirties, a river navigator, dark-brown skin, short trimmed black beard and thin mustache, strong cheekbones and watchful eyes. He wears a small snug knitted kufi cap in muted beige and blue patterns, a faded blue-gray cotton shirt with an open collar, and a coil of natural rope resting on his shoulder. Head turned slightly to the left. KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.
Expression: a warm, proud half-smile, the eyes crinkling kindly at the corners, looking slightly past the viewer.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن adam-neutral، ابتسامة عريضة بأسنان، تغيير القبعة أو القميص أو الحبل
- فحص القبول:
  1. نفس الوجه والكوفية والقميص والحبل في adam-neutral
  2. ابتسامة دافئة فخورة خفيفة
  3. الخلفية رمادية فاتحة نظيفة

### 16 — adam-serious
- الملف: `public/art/chars/adam-serious.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: تعبير الجدّية لآدم وهو يقرأ الماء أو يحذّر.
- المرجع المرفق: `artifacts/nile-secrets/public/art/chars/adam-neutral.webp` + `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A lean Sudanese man in his thirties, a river navigator, dark-brown skin, short trimmed black beard and thin mustache, strong cheekbones and watchful eyes. He wears a small snug knitted kufi cap in muted beige and blue patterns, a faded blue-gray cotton shirt with an open collar, and a coil of natural rope resting on his shoulder. Head turned slightly to the left. KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.
Expression: serious and focused, eyebrows slightly lowered, a steady gaze toward the left as if reading the water, lips closed and calm.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن adam-neutral، عبوس غاضب، تغيير القبعة أو القميص أو الحبل
- فحص القبول:
  1. نفس الوجه والكوفية والقميص والحبل في adam-neutral
  2. نظرة جادة ثابتة لا غضب
  3. الخلفية رمادية فاتحة نظيفة

### 17 — knot-red
- الملف: `public/art/items/knot-red.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: عقدة صيّاد الأحمر في c2-l6 (cipher): أحد 4 عقد ملوّنة في مفتاح الشفرة.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A short length of thick natural-fiber cord tied into one bold fisherman's knot, the cord dyed terracotta red, frayed ends, slightly worn, shown large and simple so the knot shape and its color read instantly. Part of a set of four knots with identical knot shape and cord thickness; only the color changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: عقدة معقّدة التفاصيل، ألوان ساطعة، أكثر من عقدة، حروف أو أرقام
- فحص القبول:
  1. عقدة واحدة بلون terracotta red واضح
  2. نفس شكل العقدة وسماكة الحبل في الألوان الأربعة
  3. خلفية رمادية فاتحة وحواف نظيفة

### 18 — knot-blue
- الملف: `public/art/items/knot-blue.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: عقدة صيّاد الأزرق في c2-l6 (cipher): أحد 4 عقد ملوّنة في مفتاح الشفرة.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A short length of thick natural-fiber cord tied into one bold fisherman's knot, the cord dyed calm Nile blue, frayed ends, slightly worn, shown large and simple so the knot shape and its color read instantly. Part of a set of four knots with identical knot shape and cord thickness; only the color changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: عقدة معقّدة التفاصيل، ألوان ساطعة، أكثر من عقدة، حروف أو أرقام
- فحص القبول:
  1. عقدة واحدة بلون calm Nile blue واضح
  2. نفس شكل العقدة وسماكة الحبل في الألوان الأربعة
  3. خلفية رمادية فاتحة وحواف نظيفة

### 19 — knot-yellow
- الملف: `public/art/items/knot-yellow.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: عقدة صيّاد الأصفر في c2-l6 (cipher): أحد 4 عقد ملوّنة في مفتاح الشفرة.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A short length of thick natural-fiber cord tied into one bold fisherman's knot, the cord dyed mustard yellow, frayed ends, slightly worn, shown large and simple so the knot shape and its color read instantly. Part of a set of four knots with identical knot shape and cord thickness; only the color changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: عقدة معقّدة التفاصيل، ألوان ساطعة، أكثر من عقدة، حروف أو أرقام
- فحص القبول:
  1. عقدة واحدة بلون mustard yellow واضح
  2. نفس شكل العقدة وسماكة الحبل في الألوان الأربعة
  3. خلفية رمادية فاتحة وحواف نظيفة

### 20 — knot-green
- الملف: `public/art/items/knot-green.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: عقدة صيّاد الأخضر في c2-l6 (cipher): أحد 4 عقد ملوّنة في مفتاح الشفرة.
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A short length of thick natural-fiber cord tied into one bold fisherman's knot, the cord dyed dusty palm green, frayed ends, slightly worn, shown large and simple so the knot shape and its color read instantly. Part of a set of four knots with identical knot shape and cord thickness; only the color changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: عقدة معقّدة التفاصيل، ألوان ساطعة، أكثر من عقدة، حروف أو أرقام
- فحص القبول:
  1. عقدة واحدة بلون dusty palm green واضح
  2. نفس شكل العقدة وسماكة الحبل في الألوان الأربعة
  3. خلفية رمادية فاتحة وحواف نظيفة

### 21 — river-stone
- الملف: `public/art/items/river-stone.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: أيقونة حجر آمن في c2-l1 وفي الحقيبة (اختيارية؛ الواجهة ترسم العقد بنفسها).
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A single smooth dark river stone, rounded and slightly flattened, wet with a soft sheen and a few drops of water, a hint of moss at the base.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: صخرة خشنة حادة، أكثر من حجر، حروف أو علامات
- فحص القبول:
  1. حجر نهري داكن أملس وبلل خفيف
  2. مقروء بالحجم الصغير
  3. خلفية رمادية فاتحة وحواف نظيفة

### 22 — cargo-sack
- الملف: `public/art/items/cargo-sack.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 2 — الطبقة B
- الغرض: كيس حمولة في c2-l3 (balance) (اختيارية؛ يُحدَّد عند كتابة المستوى).
- المرجع المرفق: لا شيء (لا ترفق أي صورة)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A plump burlap sack of grain tied at the neck with natural cord, sitting upright, slightly creased, tiny loose grains at its base, no printing or marks.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
Plain flat light-gray background only: do NOT include any scene, room, wall, floor, mat, table or sky behind the object. The object floats alone on the gray, centered, with clean edges.
```
- مواضع إلزامية: لا يوجد
- تجنّب: شعارات أو كتابة على الكيس، أكثر من كيس، حبوب كثيرة متناثرة
- فحص القبول:
  1. كيس خيش ممتلئ مربوط بحبل
  2. بلا أي علامات
  3. خلفية رمادية فاتحة وحواف نظيفة

---

## جدول التتبّع
| # | ID | الطبقة | وُلّدت | قُبلت | حُفظت بالاسم | ملاحظات |
|---|---|---|---|---|---|---|
| 1 | c2-l1 | A | [ ] | [ ] | [ ] | |
| 2 | c2-l4 | A | [ ] | [ ] | [ ] | |
| 3 | c2-l7 | A | [ ] | [ ] | [ ] | |
| 4 | saif-neutral | A | [ ] | [ ] | [ ] | |
| 5 | symbol-c2 | A | [ ] | [ ] | [ ] | |
| 6 | star-sign-1 | A | [ ] | [ ] | [ ] | |
| 7 | star-sign-2 | A | [ ] | [ ] | [ ] | |
| 8 | star-sign-3 | A | [ ] | [ ] | [ ] | |
| 9 | star-sign-4 | A | [ ] | [ ] | [ ] | |
| 10 | star-sign-5 | A | [ ] | [ ] | [ ] | |
| 11 | c2-l2 | B | [ ] | [ ] | [ ] | |
| 12 | c2-l3 | B | [ ] | [ ] | [ ] | |
| 13 | c2-l5 | B | [ ] | [ ] | [ ] | |
| 14 | c2-l6 | B | [ ] | [ ] | [ ] | |
| 15 | adam-smiling | B | [ ] | [ ] | [ ] | |
| 16 | adam-serious | B | [ ] | [ ] | [ ] | |
| 17 | knot-red | B | [ ] | [ ] | [ ] | |
| 18 | knot-blue | B | [ ] | [ ] | [ ] | |
| 19 | knot-yellow | B | [ ] | [ ] | [ ] | |
| 20 | knot-green | B | [ ] | [ ] | [ ] | |
| 21 | river-stone | B | [ ] | [ ] | [ ] | |
| 22 | cargo-sack | B | [ ] | [ ] | [ ] | |

## أسئلة وملاحظات لأصحاب الفصول
1. **c2-l1 (D):** تأكيد اتجاه التيار (يسار → يمين) وأن الرغوة/الدوّامة تقع «خلف» الحجر في اتجاه التيار.
2. **c2-l2 (D):** مواضع القصبات الأربع المائلة تقريبية. تحدّد النهائية بعد وصول الصورة.
3. **c2-l3 (D):** ما هي عناصر الحمولة بالضبط؟ الخلفية فيها أكياس وجرار وحبل وسلال بلا علامات؛ لو في عناصر معينة أخبرني لأضيف `icon:` لها.
4. **c2-l5 (D):** هل `tiles.image` يستعمل صورة خاصة؟ لو نعم أعطني المسار والوصف وأكتب لها برومبت مربعاً مثل `c4-l2-puzzle`.
5. **c2-l6 (D):** الحبل بأربع عقد ملوّنة بالترتيب أحمر، أزرق، أصفر، أخضر؛ تأكيد أنه يطابق المفتاح.
