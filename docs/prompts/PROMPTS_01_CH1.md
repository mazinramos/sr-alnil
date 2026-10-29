# PROMPTS_01_CH1 — الدفعة 1: الفصل الأول (القرية القديمة)

> الحساب F — مدير الفن. الدفعة 0 معتمدة من A. **27 صورة.** كل برومبت كامل وجاهز للنسخ.
> الترتيب: `ui-map-full` أولاً (5 مستويات jigsaw تعتمد عليه) ← `ui-title` ← الطبقة A ← الطبقة B.

## طريقة العمل لكل صورة (مازن)
1. افتح أداة التوليد وارفق المرجع المكتوب في حقل «المرجع المرفق»: `docs/reference/village.jpg` (خلفيات وشاشات وأيقونات) أو `docs/reference/nour.png` (بورتريهات).
2. انسخ كتلة «البرومبت الكامل» كما هي بدون تعديل.
3. افحص الناتج بنقاط «فحص القبول» وبقائمة «تجنّب». لو فشلت نقطة، أعد التوليد.
4. حوّل واحفظ بالاسم والمقاس بالضبط: `cwebp -q 80`. البورتريهات والأيقونات تُزال خلفيتها أولاً.
5. للألغاز المعتمدة على مواضع (hotspot): بعد الحفظ افتح `#/preview/coords?img=/art/c1/l1.webp` وخذ الإحداثيات الفعلية.

**حدود الحجم:** خلفية ≤ 250KB، شاشة عامة ≤ 300KB، بورتريه ≤ 200KB، أيقونة ≤ 40KB.

## تغييرات عن الجرد (الدفعة 0)
- الجرار الأربعة (`jar-*`) رُفعت من B إلى **A** لأن c1-l4 (matching) من الطبقة A وتحتاجها.
- لا توجد تغييرات في أسماء الأيقونات من `grep "icon:"`: `src/content/chapters/` غير موجود بعد (لم يسلّم C ch1.ts). سأعيد الفحص قبل الدفعة 2.
- البورتريهات neutral الأربعة (nour, adam, yunus, hala) لم تكن في الجرد أصلاً، فلا حذف مطلوب.

---

### 1 — ui-map-full
- الملف: `public/art/ui/map-full.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خريطة صفية الكاملة. 5 مستويات jigsaw (l7 في كل فصل) تقتطع منها قصاصة بـ `#strip=N` (1 = أقصى اليمين)، والفصل 5 يركّبها كاملة. تظهر أيضاً في شاشة الخريطة.
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Override for this image only: this is a flat top-down map, ignore the horizon and empty-lower-third rule.
Scene: An old hand-drawn treasure-style map of an imagined Nile valley, laid flat on aged parchment paper seen straight from above. Sandy-gold paper with warm brown stains, soft fold creases, slightly frayed deckled edges, a thin hand-inked terracotta border frame with a clear empty margin all around. The paper is divided into FIVE vertical strips of exactly equal width (each strip is 20 percent of the image width), separated only by faint soft fold creases, never by hard lines. One continuous river, drawn in calm Nile-blue watercolor wash with darker blue-brown ink banks, meanders from the right edge to the left edge through all five strips; it crosses every strip boundary at about 55 to 60 percent of the image height so the strips join smoothly. Each strip has a small ink-and-wash miniature landscape, no text:
Strip 1 (rightmost): a small cluster of mud-brick houses with a few palms on the bank.
Strip 2: a low island with reeds in the middle of the river.
Strip 3: a few market awnings and canopies on the bank.
Strip 4: broken stone walls and two fallen columns beside the water.
Strip 5 (leftmost): a quiet shore with a small wooden jetty and a moored boat.
At the top of each strip, centered in the strip, one small embossed gold-copper emblem about 7 percent of the image width: strip 1 a sun disc with short rays, strip 2 three wavy water lines, strip 3 a balance scale with two level pans, strip 4 a carved eye, strip 5 a thread tied in a knot.
Composition: flat top-down parchment, nothing perspective, emblems all at the same height near the top, river as the visual spine, quiet empty paper around the miniatures.
Constraints: no text, no letters, no numbers, no compass letters, no pseudo-writing, no people, no watermark.
```
- مواضع إلزامية:
  - الرموز الخمسة أعلى كل شريط، مراكزها: الشمس x≈90%,y≈14% | الموجة x≈70%,y≈14% | الميزان x≈50%,y≈14% | العين x≈30%,y≈14% | الخيط x≈10%,y≈14%
  - النهر يقطع حدود الأشرطة عند x≈80% وx≈60% وx≈40% وx≈20% في ارتفاع y≈55-60%
  - الأشرطة الخمسة بعرض متساوٍ (~307px لكل واحد من 1536)
- تجنّب: كتابة أو حروف شبه عربية أو إنجليزية على الخريطة، بوصلة بحروف أو مقياس رسم، شرائط بعروض غير متساوية، نهر ينقطع أو ينتهي داخل الصورة، أزرق مشبع أو ظلال ثلاثية الأبعاد، ناس أو مراكب كبيرة
- فحص القبول:
  1. خمسة أشرطة متساوية تقريباً والرمز الصحيح في كل شريط بالترتيب (من اليمين: شمس، موجة، ميزان، عين، خيط)
  2. النهر متصل ويقطع كل الحدود بين الأشرطة
  3. لا نص أو حروف، وألوان الورق والحبر هادئة كأنها من نفس عالم village.jpg

### 2 — ui-title
- الملف: `public/art/ui/title.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خلفية شاشة العنوان. اسم اللعبة يُكتب بالكود فوق الصورة، لذلك الثلث العلوي لازم يكون هادئاً وفارغاً.
- المرجع المرفق: `village.jpg`
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
- الغرض: خلفية c1-l1 «الغرفة التي لم تتغير» (hotspot): اللاعبة تبحث عن 3 رموز مخفية. تُستعمل أيضاً كخلفية احتياطية للفصل 1 بـ focal مختلف.
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: Interior of an old Sudanese mud-brick room that has not changed in decades, late-afternoon golden light. A small open window on the right wall lets in warm gold light with floating dust motes and a glimpse of the Nile and a palm outside. Thick rough clay walls, a wooden roof beam with woven reed ceiling, a worn reed mat on the packed-earth floor. Left-center: an old carved wooden chest with a rounded lid. Right side: three clay jars of different sizes on a low clay bench. A low wooden stool near the center. Hidden in the room but visible to a careful eye: (1) a small copper sun disc hanging from an iron nail on the left wall, dull with age; (2) a simple bird carved into the front edge of a wooden shelf on the right wall; (3) a small weathered wooden boat-shaped fragment resting on the stool. The three hidden items are small, in clearly separate areas and not touching each other. Warm violet shadows in corners.
Composition: camera at eye level facing the back wall, slight depth. The window and floor line give a clear horizon-like line at about 55 percent. The lower third is the empty mat and floor.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - قرص نحاسي صغير على مسمار بالجدار الأيسر: x≈20%, y≈30%
  - نقش طائر على حافة رف خشبي بالجدار الأيمن: x≈80%, y≈42%
  - قطعة مركب خشبية صغيرة فوق الكرسي الخشبي: x≈50%, y≈68%
  - الثلاثة متباعدة (فرق أفقي ≥ 30% بين كل اثنين) وغير متلاصقة
- تجنّب: الرموز الثلاثة ملتصقة أو في مكان واحد، الرمز مخفي لدرجة لا تُرى، نص أو رموز مكتوبة على الجدران، أثاث حديث أو إضاءة كهربائية، أشخاص، إضاءة نيون بنفسجية
- فحص القبول:
  1. الرموز الثلاثة ظاهرة لعين منتبهة ومتباعدة في مناطق مختلفة
  2. ضوء العصر الذهبي نفسه في village.jpg، وألوان الطين والخشب هادئة
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 4 — c1-l4
- الملف: `public/art/c1/l4.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خلفية c1-l4 «الجرار الأربعة» (matching): رف جرار فخارية في ركن الغرفة.
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A corner of the same old mud-brick room, a long rough wooden shelf mounted on a thick clay wall holding exactly four clay jars in one even row, each clearly different so they can be told apart: (1) a wide round-bellied jar with a cloth cover tied with cord; (2) a tall narrow-necked jar with a faint reddish-orange stain at the rim; (3) a small jar with a perforated clay lid and a faint soot mark; (4) a squat jar with a woven palm-leaf lid. Soft late-afternoon golden light enters from a small window on the left and rakes across the jars, casting long warm violet shadows on the wall. A woven reed mat and a small clay bowl on the floor below, a faint cobweb of light in the corner, textured plaster with small cracks.
Composition: camera at shelf height, slightly angled. The shelf runs across the middle at y about 45 to 55 percent. The four jars are evenly spaced at x about 20, 40, 60 and 80 percent. A wall line gives the horizon-like division. The lower third is the empty floor and mat.
Constraints: no text, no letters, no numbers, no people, no watermark; no labels on the jars.
```
- مواضع إلزامية:
  - الجرار الأربعة على رف واحد بالترتيب من اليسار: غطاء قماش x≈20% | رقبة طويلة x≈40% | غطاء مثقّب x≈60% | غطاء سعف x≈80% (y≈45-55%)
- تجنّب: جرار متطابقة الشكل (لازم تتميّز)، ملصقات أو كتابة على الجرار، أكثر أو أقل من 4 جرار، ضوء ساطع يحرق الألوان
- فحص القبول:
  1. أربع جرار فقط، لكل واحدة شكل وغطاء مختلف بوضوح
  2. الرف في منتصف الصورة والثلث السفلي هادئ
  3. ضوء دافئ وألوان فخار هادئة بلا نص

### 5 — c1-l7
- الملف: `public/art/c1/l7.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خلفية c1-l7 «القطعة الأولى» (jigsaw boss): الفناء عند الغروب. تُستعمل أيضاً كصورة ختام الفصل 1.
- المرجع المرفق: `village.jpg`
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
- المرجع المرفق: `nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: An elderly Sudanese woman in her seventies, calm gentle face with soft deep lines and kind steady eyes, a faint peaceful half-smile. She wears a white cotton tob draped over her head and shoulders, with a simple plain edge. The image should look like a faded old photograph that has been painted: slightly desaturated warm sepia-tinted tones, soft focus, gentle low contrast, faint paper-age warmth in the skin tones, while the background stays plain flat light-gray for cutout. Slight three-quarter view, shoulders turned a little to the left. Hands out of frame.
Expression: neutral, serene, warm.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: إطار صورة أو حواف ورق أو كتابة، ملامح شابة أو مكياج، ألوان زاهية بدل الباهتة، ذراعين أو أيدٍ مشوّهة، مجوهرات لامعة
- فحص القبول:
  1. تبدو امرأة مسنّة هادئة بصورة قديمة باهتة (دفء سيبيا خفيف)
  2. الخلفية رمادية فاتحة مسطحة وحواف نظيفة للقص
  3. لا نص ولا أيدٍ ظاهرة غريبة

### 7 — bashir-neutral
- الملف: `public/art/chars/bashir-neutral.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: بشير، جار الجدة وحافظ الحكايات. يتكلم في حوارات الفصل 1.
- المرجع المرفق: `nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A Sudanese man in his sixties, the grandmother's old neighbor and keeper of stories, warm weathered face with deep smile lines, short neat gray beard, kind amused eyes and a light gentle smile. He wears a clean white cloth turban (imama) wound neatly, and a long off-white cotton jalabiya with a rounded collar, a folded muted blue-gray cloth over one shoulder. Slight three-quarter view, shoulders turned a little to the right so he faces the player's left. Hands out of frame. Visually consistent with the other existing portraits (simple worn natural fabrics, soft painterly faces).
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
- المرجع المرفق: `nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: The same young Sudanese woman as in the reference image, KEEP THE EXACT SAME FACE, hair, navy-blue draped headscarf, worn gray-blue jacket over a cream shirt, and the same dark notebook held at the lower right, the same half-body framing and slight three-quarter pose turned to the left as the reference. Only the facial expression and the small head tilt change.
Expression: worried and anxious. Eyebrows drawn together and slightly raised in the middle, eyes looking slightly off to the side with a hint of concern, lips pressed together, a small tension in the jaw. Natural, not melodramatic.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن nour.png، دموع أو مبالغة مسرحية، تغيير الملابس أو الدفتر، تغيير اتجاه الجسم
- فحص القبول:
  1. نفس الوجه والحجاب والجاكيت والدفتر في nour.png بالضبط
  2. التعبير قلق واضح لكن طبيعي
  3. الخلفية رمادية فاتحة نظيفة

### 9 — nour-smiling
- الملف: `public/art/chars/nour-smiling.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: تعبير الابتسام لنور عند النجاح والاكتشاف.
- المرجع المرفق: `nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: The same young Sudanese woman as in the reference image, KEEP THE EXACT SAME FACE, hair, navy-blue draped headscarf, worn gray-blue jacket over a cream shirt, and the same dark notebook held at the lower right, the same half-body framing and slight three-quarter pose turned to the left as the reference. Only the facial expression and the small head tilt change.
Expression: smiling warmly. A soft genuine smile with the corners of the lips raised and a little crinkle around bright relieved eyes, looking toward the viewer. Natural, not a wide cartoon grin.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ابتسامة عريضة مبالغ فيها، وجه مختلف عن nour.png، تغيير الملابس أو الدفتر
- فحص القبول:
  1. نفس الوجه والملابس والدفتر في nour.png
  2. ابتسامة دافئة طبيعية وعينان مرتاحتان
  3. الخلفية رمادية فاتحة نظيفة

### 10 — nour-determined
- الملف: `public/art/chars/nour-determined.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: تعبير العزم لنور في الألغاز الصعبة وقبل البوس.
- المرجع المرفق: `nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: The same young Sudanese woman as in the reference image, KEEP THE EXACT SAME FACE, hair, navy-blue draped headscarf, worn gray-blue jacket over a cream shirt, and the same dark notebook held at the lower right, the same half-body framing and slight three-quarter pose turned to the left as the reference. Only the facial expression and the small head tilt change.
Expression: determined and resolute. A steady direct gaze straight at the viewer, eyebrows slightly lowered, lips closed and firm, jaw set, chin lifted a little. Calm strength, not anger.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: غضب أو عبوس مبالغ فيه، وجه مختلف عن nour.png، تغيير الملابس أو الدفتر
- فحص القبول:
  1. نفس الوجه والملابس والدفتر في nour.png
  2. نظرة ثابتة مباشرة وقوة هادئة لا غضب
  3. الخلفية رمادية فاتحة نظيفة

### 11 — symbol-c1
- الملف: `public/art/items/symbol-c1.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: رمز الفصل 1 (الشمس) حسب SYMBOLS.md. يُمنح عند c1-l7 ويُستعمل في c4-l5 وc5-l5 وc5-l6.
- المرجع المرفق: `village.jpg`
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

### 12 — sun-disc
- الملف: `public/art/items/sun-disc.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: الرمز المخفي الأول في c1-l1 وعنصر دليل في c1-l2.
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small hand-hammered copper disc, dull and aged with green-brown patina at the edges, a sun pattern of short engraved rays around a small center circle, a tiny hole near the top where it hung from a nail.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
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
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small rectangular piece of aged dark wood with a simple bird carved into it in shallow relief, a graceful wading bird with a long neck and slender legs in profile, worn edges, tiny cracks in the grain.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
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
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small weathered wooden boat-shaped fragment, a curved hull piece with a carved prow notch at one end, faint remnants of faded Nile-blue paint along the edge, a few worm holes, old and smooth with handling.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
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
- الغرض: جرّة قمح في c1-l4 (matching). كل جرة لها شكل غطاء مميّز تتفرّق به عن الباقي.
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A wide round-bellied terracotta jar with a wide mouth covered by a piece of cloth tied with cord, a few golden wheat grains and two wheat ears resting beside it. The jar silhouette and top must be clearly different from the other three jars of this set (wheat, henna, incense, dates).
Constraints: no text, no letters, no numbers, no watermark, no label, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ملصق أو كتابة على الجرة، جرّة تشبه الجرار الأخرى في الشكل، أكثر من جرّة واحدة
- فحص القبول:
  1. جرّة قمح واضحة وغطاؤها المميّز ظاهر
  2. تتميّز عن الجرار الثلاث الأخرى بالحجم الصغير (قارنها بجانبها)
  3. خلفية رمادية فاتحة وحواف نظيفة

### 16 — jar-henna
- الملف: `public/art/items/jar-henna.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جرّة حنّاء في c1-l4 (matching). كل جرة لها شكل غطاء مميّز تتفرّق به عن الباقي.
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A tall narrow-necked terracotta jar with a reddish-orange stain at the rim, a small pinch of fine orange-brown henna powder in a small pile beside it. The jar silhouette and top must be clearly different from the other three jars of this set (wheat, henna, incense, dates).
Constraints: no text, no letters, no numbers, no watermark, no label, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ملصق أو كتابة على الجرة، جرّة تشبه الجرار الأخرى في الشكل، أكثر من جرّة واحدة
- فحص القبول:
  1. جرّة حنّاء واضحة وغطاؤها المميّز ظاهر
  2. تتميّز عن الجرار الثلاث الأخرى بالحجم الصغير (قارنها بجانبها)
  3. خلفية رمادية فاتحة وحواف نظيفة

### 17 — jar-incense
- الملف: `public/art/items/jar-incense.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جرّة بخور في c1-l4 (matching). كل جرة لها شكل غطاء مميّز تتفرّق به عن الباقي.
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small dark-rimmed terracotta jar with a perforated clay lid and a faint soot mark around the holes, a thin delicate wisp of pale smoke rising from the holes. The jar silhouette and top must be clearly different from the other three jars of this set (wheat, henna, incense, dates).
Constraints: no text, no letters, no numbers, no watermark, no label, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ملصق أو كتابة على الجرة، جرّة تشبه الجرار الأخرى في الشكل، أكثر من جرّة واحدة
- فحص القبول:
  1. جرّة بخور واضحة وغطاؤها المميّز ظاهر
  2. تتميّز عن الجرار الثلاث الأخرى بالحجم الصغير (قارنها بجانبها)
  3. خلفية رمادية فاتحة وحواف نظيفة

### 18 — jar-dates
- الملف: `public/art/items/jar-dates.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: جرّة تمر في c1-l4 (matching). كل جرة لها شكل غطاء مميّز تتفرّق به عن الباقي.
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A squat wide terracotta jar with a woven palm-leaf lid slightly lifted, three brown dates visible beside it. The jar silhouette and top must be clearly different from the other three jars of this set (wheat, henna, incense, dates).
Constraints: no text, no letters, no numbers, no watermark, no label, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ملصق أو كتابة على الجرة، جرّة تشبه الجرار الأخرى في الشكل، أكثر من جرّة واحدة
- فحص القبول:
  1. جرّة تمر واضحة وغطاؤها المميّز ظاهر
  2. تتميّز عن الجرار الثلاث الأخرى بالحجم الصغير (قارنها بجانبها)
  3. خلفية رمادية فاتحة وحواف نظيفة

### 19 — c1-l2
- الملف: `public/art/c1/l2.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: خلفية c1-l2 «نقش الصندوق» (sequence): لقطة قريبة للصندوق المفتوح نصفاً.
- المرجع المرفق: `village.jpg`
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
- المرجع المرفق: `village.jpg`
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
- المرجع المرفق: `village.jpg`
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
- المرجع المرفق: `village.jpg`
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
- المرجع المرفق: `village.jpg`
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
- المرجع المرفق: `nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: The same young Sudanese woman as in the reference image, KEEP THE EXACT SAME FACE, hair, navy-blue draped headscarf, worn gray-blue jacket over a cream shirt, and the same dark notebook held at the lower right, the same half-body framing and slight three-quarter pose turned to the left as the reference. Only the facial expression and the small head tilt change.
Expression: curious and intrigued. A slight tilt of the head, eyebrows gently raised, eyes bright and looking slightly off to the side and upward at something just out of frame, lips softly parted. Natural, not exaggerated.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: فم مفتوح بمبالغة (صدمة)، وجه مختلف عن nour.png، تغيير الملابس أو الدفتر
- فحص القبول:
  1. نفس الوجه والملابس والدفتر في nour.png
  2. ميل رأس خفيف وحاجبان مرفوعان قليلاً بفضول
  3. الخلفية رمادية فاتحة نظيفة

### 25 — calendar-page
- الملف: `public/art/items/calendar-page.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 1 — الطبقة B
- الغرض: أيقونة تقويم صفية في c1-l5 (codelock).
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small hand-made wooden calendar board in aged wood with a neat grid of tiny round wooden pegs in five rows and seven columns, a few pegs wrapped with colored thread in muted terracotta, Nile blue and gold. No numbers or letters anywhere.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
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
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A torn fragment of an old sepia photograph with irregular deckled torn edges, slightly curled, showing a faint blurred landscape of a palm and a river line, no faces, no people, yellowed paper tone, soft crease marks.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
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
- المرجع المرفق: `village.jpg`
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
Object: A small round clay seal, terracotta with a pressed abstract pattern of a short sun-like cross of lines inside a circle, a tiny hole at the top with a short loop of natural cord, slightly chipped and aged.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
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

## أسئلة وملاحظات لـ A وC
1. **c1-l2 (sequence):** نقش غطاء الصندوق في الصورة عمداً باهت وغير مقروء حتى لا يناقض ترتيب الحل في `ch1.ts`. الترتيب الفعلي يصل اللاعبة عبر الدليل المكتوب.
2. **c1-l5 (codelock):** التقويم الخشبي في الصورة بلا أرقام. تواريخ التقويم تظهر كدليل مكتوب في `Clue`.
3. **c1-l1 (hotspot):** المواضع المذكورة تقريبية. C يضع `x,y,r` النهائية من صفحة `/preview/coords` بعد وصول الصورة الفعلية.
4. **الأيقونات:** `sun-disc` و`bird-carving` و`boat-piece` تقابل الرموز الثلاثة في c1-l1. تأكيد أسمائها من `ch1.ts` عند وصوله.
5. **ui-map-full:** الرموز الخمسة صغيرة على الأشرطة. الجدول السابق مطابق لـ `docs/SYMBOLS.md` (شمس، موجة، ميزان، عين، خيط).
