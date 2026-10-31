# PROMPTS_04 — الدفعة 4: الفصل الرابع (أطلال النهر)

> الحساب F — مدير الفن. **19 صورة** للفصل 4 (أطلال النهر): 7 خلفيات، صورة لغز `c4-l2-puzzle` (1024×1024)، بورتريهان (الحاج عثمان + تعبير هالة)، 9 أيقونات.
> الترتيب: خلفيات الطبقة A (`c4-l1` ثم `c4-l4` ثم `c4-l7`) ← الحاج عثمان ← أيقونات A (رمز العين وعلامات النقش الأربع) ← الطبقة B.
> الإضاءة: حجر بارد مع وهج مشاعل وفوانيس دافئ عند الغسق.
> مصدر الحقيقة: `src/content/chapters/ch4.ts` (A) و`docs/SYMBOLS.md`.

## طريقة العمل لكل صورة (مازن)
1. ارفق المرجع المكتوب في «المرجع المرفق». الخلفيات والشاشات: `docs/reference/village.jpg`. **الأيقونات: لا ترفق أي مرجع** (المرجع يجلب مشهد القرية). البورتريهات: `docs/reference/nour.png`، وللشخصيات الموجودة (آدم ويونس وهالة) ارفق أيضاً صورتها neutral من `public/art/chars/` ليثبت الوجه.
2. انسخ كتلة «البرومبت الكامل» كما هي بدون تعديل. لا تحذف سطر الوصف الثابت للشخصية.
3. افحص الناتج بنقاط «فحص القبول» وقائمة «تجنّب». لو فشلت نقطة، أعد التوليد (أو استعمل البديل المختصر في `GENERATION_ORDER.md`).
4. حوّل واحفظ بالاسم والمقاس بالضبط: `cwebp -q 80`. البورتريهات والأيقونات تُزال خلفيتها أولاً.
5. لألغاز المواضع (hotspot وroute): بعد الحفظ افتح `#/preview/coords?img=/art/cN/lM.webp` وسلّم الإحداثيات لصاحب الفصل.

**حدود الحجم:** خلفية ≤ 250KB، شاشة عامة ≤ 300KB، بورتريه ≤ 200KB، أيقونة ≤ 40KB.

## ملاحظات هذه الدفعة
- **c4-l4 (route):** المحطات الثماني بمواضعها وحالاتها (5 مشتعلة جافة: 1 و3 و4 و6 و8، و3 مطفأة: 2 و5 و7) من `ch4.ts`. هذا أصعب برومبت في الدفعة، وقد يحتاج عدة محاولات؛ استعمل البديل المختصر في `GENERATION_ORDER.md` إن تعثّر.
- **c4-l1 (sequence) محدّث 31/10:** الجدار فيه **ست علامات** كما في `ch4.ts` الجديد: أربع في صف التسلسل من اليمين (ضوء، جناح، مجرى، مرسى) ثم حجر أملس، واثنتان زخرفة أصغر أسفل الجدار (نجمة، قصبة) ليستا من التسلسل.
- **c4-l5 (codelock):** العين منقوشة على الباب وأربع فتحات فارغة، حسب `SYMBOLS.md`.
- **أيقونات النقوش (قرار A 31/10):** `carve-light` و`carve-wing` و`carve-channel` و`carve-anchor` و`carve-star` و`carve-reed` + `carve-smooth` اختيارية. أُضيفت الثلاث الأخيرة في **آخر** الدفعة (أرقام 17 إلى 19) حتى لا تتغير أرقام الملفات الأخرى. A يضيف حقول `icon:` بعد وصول الصور.
- **c4-l2-puzzle (محدّث بقرار A 31/10):** لوحة حجرية مربّعة تملأ الصورة بإطار مستقيم الحواف، **عين في المركز** و**مجرى ماء من الأعلى إلى الأسفل**، وبلا ظلال تقطع الحواف لأنها ستُقصّ إلى 9 حجارة. المسار `public/art/c4/l2-puzzle.webp` معتمد (CONTRACT §10).
- **الشخصيات:** هالة موجودة (neutral)، فتعبيرها يُولَّد مع إرفاق `public/art/chars/hala-neutral.webp`. الحاج عثمان جديد.

---

### 1 — c4-l1
- الملف: `public/art/c4/l1.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: خلفية c4-l1 «تسلسل المرسى» (sequence): جدار حجري بست علامات حسب `ch4.ts` المحدّث: أربع في صف التسلسل (ضوء، جناح، مجرى، مرسى) واثنتان زخرفة أسفل الجدار (نجمة، قصبة) ليستا من التسلسل. الترتيب في الصورة يوافق الحل: من اليمين إلى اليسار.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A massive ancient sandstone wall of ruins by the river at late dusk, cool gray-ochre stone with warm violet shadows, a thin ray of low golden light touching the wall from the upper right. Along the wall, in one horizontal row at mid-height, four shallow carved relief signs, each in its own worn rectangular panel, ordered from right to left: first a sunburst of straight rays (light) where the golden ray lands, second a spread wing with feather lines (wing), third a wavy channel line with parallel groove edges (channel), fourth an anchor shape (mooring). Beyond the anchor, at the far left end of the row, the wall is smooth blank stone. Lower on the wall, near its base and clearly apart from the main row, two smaller purely decorative carvings that are not part of the sequence: an eight-pointed star and a small bundle of reeds. Thin carved water lines run along the base of the wall. Dust, small cracks, a hint of green moss at the base, sand on the ground. No people.
Composition: camera at eye level facing the wall frontally. The four sequence carvings are evenly spaced along a horizontal line at y about 42 percent. The two decorative carvings are smaller and sit lower at y about 72 percent: the star at x about 34 percent and the reeds at x about 64 percent. A wall top line and the base give a horizon-like division at about 20 percent. The bottom edge is sandy ground, fairly empty.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - أربعة نقوش التسلسل على صف واحد بالترتيب من اليمين: ضوء x≈78% | جناح x≈58% | مجرى x≈38% | مرسى x≈18% (كلها y≈42%)
  - أقصى يسار الصف (x<8%) حجر أملس بلا نقش
  - زخرفتان أصغر أسفل الجدار وخارج الصف: نجمة x≈34%,y≈72% | قصبة x≈64%,y≈72%
  - ست علامات في المجموع على الجدار (حوار نور يقول «ست علامات»)
- تجنّب: ترتيب نقوش التسلسل بغير ترتيب الحل (ضوء ثم جناح ثم مجرى ثم مرسى من اليمين)، وضع النجمة أو القصبة داخل صف التسلسل، نقوش بحروف أو كتابة، أشخاص، ألوان مشبعة، إضاءة نيون
- فحص القبول:
  1. أربعة نقوش واضحة في الصف بالترتيب الصحيح من اليمين لليسار، ثم حجر أملس في الطرف
  2. نجمة وقصبة صغيرتان منفصلتان أسفل الجدار (المجموع ست علامات)
  3. لا نص ولا أشخاص وشعاع الضوء يلمس أول نقش

### 2 — c4-l4
- الملف: `public/art/c4/l4.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: خلفية c4-l4 «ممر المشاعل» (route): 8 محطات، 5 آمنة بمشاعل مشتعلة وأرضية جافة و3 غرف ماء بمشاعل مطفأة. التطابق الدقيق مع `ch4.ts` مطلوب.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A long ruined stone hall seen from a high three-quarter view looking along its length, the stone floor receding upward in the frame, cool gray stone walls, dusk light from the open end with warm torch glow. Eight raised square flagstone stations, each with a free-standing iron torch stand, are arranged in a zigzag path from the bottom center to the far end, where a doorway stands open with light beyond. FIVE stations are safe: a torch burning with a warm flame and a dry dusty floor. THREE stations are water rooms: a cold unlit torch with a faint wisp of smoke, with clear signs of water: one with a damp dark wet wall beside it, one with water dripping from the ceiling in thin streaks and splashing on the floor, one with a shallow puddle on the floor. Warm violet shadows, small cracks, a few fallen stones. No people.
Composition: The stations are at these positions (percent of width, percent of height): station 1 (50, 88) lit and dry; station 2 (30, 76) unlit with a damp wet wall; station 3 (62, 64) lit and dry; station 4 (36, 52) lit and dry; station 5 (66, 42) unlit with water dripping from the ceiling; station 6 (40, 32) lit and dry; station 7 (64, 22) unlit with a puddle; station 8 (48, 12) lit, the open doorway just ahead. The floor is wide and open between stations so route lines can be drawn over it. Station 1 sits low in the frame, an accepted exception to the empty lower third.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - ثماني محطات (إحداثيات `ch4.ts` المؤقتة): م1 (50,88) مشعل مشتعل وأرضية جافة | م2 (30,76) مطفأ وجدار رطب | م3 (62,64) مشتعل جاف | م4 (36,52) مشتعل جاف | م5 (66,42) مطفأ وماء ينزّ من السقف | م6 (40,32) مشتعل جاف | م7 (64,22) مطفأ وبركة | م8 (48,12) مشتعل والباب مفتوح أمامها
  - الآمنة: 1 و3 و4 و6 و8. المطفأة (غرف الماء): 2 و5 و7
  - تُضبط الإحداثيات النهائية بصفحة `/preview/coords` بعد وصول الصورة
- تجنّب: مشعل مشتعل في محطة مطفأة أو العكس (يلغي الحل)، محطات أكثر أو أقل من 8، أشخاص، نار ساطعة تحرق الصورة، نص
- فحص القبول:
  1. ثماني محطات بنفس المواضع تقريباً: 5 مشاعل مشتعلة (1 و3 و4 و6 و8) و3 مطفأة (2 و5 و7)
  2. علامات الماء ظاهرة عند 2 و5 و7 والأرضية جافة عند الباقي
  3. ألوان حجر باردة ودفء المشاعل بلا نص ولا أشخاص

### 3 — c4-l7
- الملف: `public/art/c4/l7.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: خلفية c4-l7 «القطعة الرابعة» (jigsaw boss): حافظة سجلات خلف لوحة. تُستعمل أيضاً كصورة ختام الفصل 4.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A quiet stone chamber in the ruins lit by a warm oil lantern standing on the floor. On the cool gray-ochre stone wall hangs a large old wooden-framed painted panel of a faded abstract landscape (a pale river line, a dim palm, no figures, no faces), swung aside on iron hinges like a door to reveal a square recessed niche in the wall. Inside the niche on a stone shelf rests a worn flat leather records folder tied with a cord, dust on it, untouched for years. Dust motes in the lantern light, warm violet shadows, sand on the floor. A moment of quiet discovery. No people.
Composition: camera at eye level facing the wall, the open niche at about x 55 percent, y 45 percent with the folder visible, the swung panel at the left. A floor line gives a horizon-like division at about 62 percent. The lower third is the empty sandy floor with the lantern near the lower left.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - النيش (الفجوة) في منتصف الصورة وفيه الحافظة الجلدية x≈55%,y≈45%
- تجنّب: وجوه أو أشخاص في اللوحة، كتابة على الحافظة أو اللوحة، كنز ذهب لامع (الحافظة سجلات لا كنز)، إضاءة نيون
- فحص القبول:
  1. لوحة قديمة مفتوحة كباب تكشف فجوة فيها حافظة سجلات جلدية مغبرّة
  2. ضوء فانوس دافئ وجو هادئ مليء بالغبار
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 4 — othman-neutral
- الملف: `public/art/chars/othman-neutral.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: الحاج عثمان راوي المكان. يتكلم في c4-l1 وغيره من مستويات الفصل 4.
- المرجع المرفق: `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A very old Sudanese sheikh in his late seventies, thin dignified face with deep lines, a full white beard, calm wise deep-set eyes. He wears a white cloth turban (imama) and a plain cream cotton jalabiya, and a string of dark brown wooden prayer beads hangs around his neck over the robe. Slight three-quarter view, shoulders turned a little to the left.
Expression: calm, wise and gently attentive, the faintest warm smile under the white beard, eyes steady and kind.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: لحية مزخرفة أو ملابس فاخرة، ابتسامة عريضة، مسبحة مبالغ في حجمها، أيدٍ ظاهرة مشوّهة
- فحص القبول:
  1. شيخ في السبعينات بلحية بيضاء وعمامة بيضاء وجلباب كريمي ومسبحة خشبية حول العنق
  2. نظرة حكيمة هادئة وتجاعيد عميقة
  3. الخلفية رمادية فاتحة نظيفة وأسلوب nour.png

### 5 — symbol-c4
- الملف: `public/art/items/symbol-c4.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: رمز الفصل 4 (العين) حسب SYMBOLS.md. يُمنح عند c4-l7 ويُستعمل في c4-l5 وc5-l5 وc5-l6 (وهو منقوش أيضاً على باب c4-l5).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A round sandstone plaque with a simple carved relief of an eye: an almond-shaped eye outline with a round iris and pupil and one short curved brow line above, bold and clean, readable at a small size, gold-copper color, looks chiseled into the stone with soft worn edges. Part of a matching set of five chapter symbols: the same round sandstone plaque shape, same carved relief style, same gold-copper color on a warm sand-colored stone.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: رموش وتفاصيل دقيقة تضيع بالحجم الصغير، عين واقعية بدل الرمز، حروف أو أرقام
- فحص القبول:
  1. عين لوزية بسيطة بقزحية دائرية وحاجب واحد مقروءة بـ 64px
  2. نفس اللوح الحجري الدائري والنقش الذهبي-النحاسي في بقية الرموز
  3. خلفية رمادية فاتحة وحواف نظيفة

### 6 — carve-light
- الملف: `public/art/items/carve-light.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: علامة «الضوء» في c4-l1 (sequence). تُستعمل فقط إن أضاف A حقل `icon:` لعناصر المستوى (الآن تظهر نصاً).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel with a shallow carved relief of a sunburst: a small round center with about twelve straight rays of alternating long and short length, worn edges and a few hairline cracks, tinted warm gold-copper in the carved lines. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; only the carved sign changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: تفاصيل دقيقة تضيع بالحجم الصغير، أكثر من علامة، حروف أو أرقام، لوح دائري (هذه الأيقونات مربعة، والرموز دائرية)
- فحص القبول:
  1. العلامة (الضوء) واضحة ومميّزة عن الباقي
  2. نفس اللوح المربع وعمق النقش في العلامات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة

### 7 — carve-wing
- الملف: `public/art/items/carve-wing.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: علامة «الجناح» في c4-l1 (sequence). تُستعمل فقط إن أضاف A حقل `icon:` لعناصر المستوى (الآن تظهر نصاً).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel with a shallow carved relief of a single spread bird wing with five clear curved feather lines, worn edges and a few hairline cracks, tinted warm gold-copper in the carved lines. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; only the carved sign changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: تفاصيل دقيقة تضيع بالحجم الصغير، أكثر من علامة، حروف أو أرقام، لوح دائري (هذه الأيقونات مربعة، والرموز دائرية)
- فحص القبول:
  1. العلامة (الجناح) واضحة ومميّزة عن الباقي
  2. نفس اللوح المربع وعمق النقش في العلامات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة

### 8 — carve-channel
- الملف: `public/art/items/carve-channel.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: علامة «المجرى» في c4-l1 (sequence). تُستعمل فقط إن أضاف A حقل `icon:` لعناصر المستوى (الآن تظهر نصاً).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel with a shallow carved relief of a wavy water channel: one wide wavy groove running across with two thin parallel lines along its edges, worn edges and a few hairline cracks, tinted warm gold-copper in the carved lines. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; only the carved sign changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: تفاصيل دقيقة تضيع بالحجم الصغير، أكثر من علامة، حروف أو أرقام، لوح دائري (هذه الأيقونات مربعة، والرموز دائرية)
- فحص القبول:
  1. العلامة (المجرى) واضحة ومميّزة عن الباقي
  2. نفس اللوح المربع وعمق النقش في العلامات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة

### 9 — carve-anchor
- الملف: `public/art/items/carve-anchor.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: علامة «المرسى» في c4-l1 (sequence). تُستعمل فقط إن أضاف A حقل `icon:` لعناصر المستوى (الآن تظهر نصاً).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel with a shallow carved relief of a ship's anchor with a ring at the top, a shaft, a crossbar and two curved flukes, worn edges and a few hairline cracks, tinted warm gold-copper in the carved lines. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; only the carved sign changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: تفاصيل دقيقة تضيع بالحجم الصغير، أكثر من علامة، حروف أو أرقام، لوح دائري (هذه الأيقونات مربعة، والرموز دائرية)
- فحص القبول:
  1. العلامة (المرسى) واضحة ومميّزة عن الباقي
  2. نفس اللوح المربع وعمق النقش في العلامات الأربع
  3. خلفية رمادية فاتحة وحواف نظيفة

### 10 — c4-l2
- الملف: `public/art/c4/l2.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: خلفية c4-l2 «نقوش الجدار» (tiles): حجارة منقوشة على الأرض. (صورة اللغز نفسها ملف منفصل `c4-l2-puzzle`.)
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: Nine square carved sandstone blocks lying on the sandy ground inside the ruins, each tilted at a different angle and slightly apart, as if they fell from a wall, each with a fragment of shallow carving of wavy lines and rays, warm low sunlight raking across them with long soft violet shadows, a broken wall and a standing column blurred behind. Sand, small stones, a little moss. No people, no writing.
Composition: camera slightly raised, the nine blocks loosely arranged across the center in about three rows, with open sand around them. A broken wall top gives a horizon-like division at about 28 percent. The lower third is empty sand with one or two blocks at its edge.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: كتابة على الحجارة، أشخاص، أكثر أو أقل من 9 حجارة، نقوش مطابقة لصورة اللغز (تكشف الحل)
- فحص القبول:
  1. تسع حجارة مربعة منقوشة على الرمل بزوايا مختلفة
  2. إضاءة جانبية دافئة وظلال بنفسجية
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 11 — c4-l2-puzzle
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

### 12 — c4-l3
- الملف: `public/art/c4/l3.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: خلفية c4-l3 «مفتاح النقوش» (cipher): عمود حجري عليه نقش ومفتاح.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: Inside a ruined hall of the old river ruins, a tall round standing sandstone column in the center catches a single shaft of warm golden light from a high gap in the ceiling. Carved around the column at eye level is a horizontal band of eight small distinct abstract pictograms in two rows of four, simple geometric shapes only (a circle, a triangle, a wavy line, a cross, a diamond, a square, a crescent and a dot ring), none of them letters. Cool gray-ochre stone, warm violet shadows, sand on the floor, a fallen block beside the base, faint dust in the beam. No people.
Composition: camera at eye level facing the column, the carved band at about x 50 percent, y 42 percent, large enough to read the shapes. A floor line gives a horizon-like division at about 66 percent. The lower third is the empty sandy floor.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - شريط النقش على العمود x≈50%,y≈42% بثمانية رموز هندسية في صفين
- تجنّب: حروف أو أحرف شبه عربية في النقش، أشخاص، رموز كثيرة صغيرة لا تُقرأ، ضوء نيون
- فحص القبول:
  1. عمود حجري بشريط من ثمانية رموز هندسية بسيطة (لا حروف)
  2. شعاع ضوء دافئ وألوان حجر هادئة
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 13 — c4-l5
- الملف: `public/art/c4/l5.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: خلفية c4-l5 «قفل الحجر» (codelock): باب حجري مغلق وفتحة رموز. العين منقوشة على الباب نفسه حسب SYMBOLS.md.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: A massive closed stone door set in the ruins, a single huge slab of weathered sandstone with hairline seams, framed by two heavy standing pillars, lit by a warm oil torch on the right that makes the carvings glow, the rest in cool gray-ochre shadow. At the upper center of the door a large bold carved eye (an almond-shaped outline with a round iris and pupil and a short brow line), worn but clear. Below it, in one neat horizontal row, four empty round carved recesses of equal size, like sockets waiting for tokens, evenly spaced. Sand and fallen stones at the base of the door. No people, no writing.
Composition: camera at eye level facing the door frontally. The carved eye at about x 50 percent, y 36 percent, about 12 percent of the image width. The four round recesses in a row at y about 62 percent, at x about 33, 44, 56 and 67 percent. A threshold line gives a horizon-like division at about 85 percent. The lower third is mostly the door and sand.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - العين المنقوشة x≈50%,y≈36% بعرض ≈12%
  - أربع فتحات دائرية فارغة في صف واحد y≈62% عند x≈33 وx≈44 وx≈56 وx≈67
  - الفتحات فارغة تماماً
- تجنّب: رموز داخل الفتحات (تكشف الحل)، حروف أو أرقام، أكثر أو أقل من 4 فتحات، أشخاص، قفل حديث
- فحص القبول:
  1. باب حجري ضخم بعين منقوشة واضحة أعلى الوسط وأربع فتحات دائرية فارغة في صف
  2. ضوء مشعل دافئ على النقش وبقية المشهد بارد
  3. لا نص ولا أشخاص

### 14 — c4-l6
- الملف: `public/art/c4/l6.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: خلفية c4-l6 «سجل الحارسة» (deduction): مكتب خشب وسجلات هالة.
- المرجع المرفق: `docs/reference/village.jpg`
- البرومبت الكامل (للصق):
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
Scene: The small office of the ruins' guardian in warm lantern light: a sturdy old wooden desk with several stacked closed ledgers and one lying open with blank ruled lines blurred beyond reading, an oil lantern, a clay inkwell and a reed pen. On the stone wall behind the desk a wooden board with four iron hooks each holding an old iron key, four small wooden shuttered storeroom hatches in the wall beside it, a woven mat on the floor, a small window with cool evening light. No people, no writing.
Composition: camera at eye level facing the desk and wall. The key board at about x 30 percent, y 40 percent; the four hatches in a row at the right at about x 62 to 90 percent, y 38 percent; the desk at the center bottom. A wall-floor line gives a horizon-like division at about 62 percent. The lower third is the desk front and empty floor.
Constraints: no text, no letters, no numbers, no people, no watermark; no readable writing on any object.
```
- مواضع إلزامية:
  - لوحة بأربعة خطّافات وأربعة مفاتيح x≈30%,y≈40%
  - أربع فتحات مخازن صغيرة في صف x≈62-90%,y≈38%
- تجنّب: كتابة على الدفاتر أو المفاتيح، أشخاص، أكثر أو أقل من 4 مفاتيح، إضاءة نيون
- فحص القبول:
  1. مكتب خشب قديم بدفاتر وفانوس ولوحة بأربعة مفاتيح وأربع فتحات مخازن
  2. إضاءة فانوس دافئة وألوان هادئة
  3. لا نص ولا أشخاص والثلث السفلي هادئ

### 15 — hala-serious
- الملف: `public/art/chars/hala-serious.webp`
- الحجم المطلوب: 768×768 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: تعبير الجدّية لهالة الحارسة، لحظات التحذير وقراءة الأطلال.
- المرجع المرفق: `artifacts/nile-secrets/public/art/chars/hala-neutral.webp` + `docs/reference/nour.png`
- البرومبت الكامل (للصق):
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
Subject: A Sudanese woman in her forties, the guardian of the ruins, composed and watchful with steady dark eyes and a firm calm mouth. She wears a charcoal-gray scarf draped over her head and neck, and a dark navy work shirt with a small chest pocket and collar. Facing the viewer. KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.
Expression: serious and guarded, a steady watchful gaze straight at the viewer, lips firm, a faint tension in the jaw, composed and not angry.
Constraints: no text, no letters, no watermark, plain flat light-gray background, nothing behind the subject.
```
- مواضع إلزامية: لا يوجد
- تجنّب: وجه مختلف عن hala-neutral، غضب أو عبوس مبالغ فيه، تغيير الوشاح أو القميص
- فحص القبول:
  1. نفس الوجه والوشاح الفحمي والقميص الكحلي في hala-neutral
  2. نظرة جادة ثابتة وحذرة بلا غضب
  3. الخلفية رمادية فاتحة نظيفة

### 16 — torch
- الملف: `public/art/items/torch.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: مشعل الممر في c4-l4 (اختياري؛ الواجهة ترسم المحطات بنفسها).
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A single old wooden torch with a rag-wrapped head burning with a warm orange-gold flame and a thin curl of smoke, held upright, the wood dark and worn.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: ألسنة نار نيون، أكثر من مشعل، يد ظاهرة
- فحص القبول:
  1. مشعل خشبي قديم بلهب دافئ هادئ
  2. مقروء بالحجم الصغير
  3. خلفية رمادية فاتحة وحواف نظيفة

### 17 — carve-star
- الملف: `public/art/items/carve-star.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: علامة «النجمة» في c4-l1: زخرفة أسفل الجدار وعنصر مشتّت في اللغز (ليست من التسلسل). أُضيفت بقرار A.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel with a shallow carved relief of an eight-pointed star: a bold simple star with a small round center, worn edges and a few hairline cracks, tinted warm gold-copper in the carved lines. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; only the carved sign changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: نجمة بخمس رؤوس سداسية معقّدة، حروف أو أرقام، لوح دائري (هذه الأيقونات مربعة)، تفاصيل دقيقة تضيع بالحجم الصغير
- فحص القبول:
  1. نجمة ثمانية رؤوس بسيطة واضحة
  2. نفس اللوح المربع وعمق النقش في علامات c4-l1
  3. خلفية رمادية فاتحة بلا أي مشهد وحواف نظيفة

### 18 — carve-reed
- الملف: `public/art/items/carve-reed.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة A
- الغرض: علامة «القصبة» في c4-l1: زخرفة أسفل الجدار وعنصر مشتّت في اللغز (ليست من التسلسل). أُضيفت بقرار A.
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel with a shallow carved relief of a bundle of three tall reed stalks with narrow leaves and feathery tops, worn edges and a few hairline cracks, tinted warm gold-copper in the carved lines. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; only the carved sign changes.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: قصب كثيف يضيع بالحجم الصغير، حروف أو أرقام، لوح دائري، نبات مختلف (نخلة أو زهرة)
- فحص القبول:
  1. حزمة من ثلاث قصبات واضحة ومميّزة عن النجمة والجناح
  2. نفس اللوح المربع وعمق النقش
  3. خلفية رمادية فاتحة بلا أي مشهد وحواف نظيفة

### 19 — carve-smooth
- الملف: `public/art/items/carve-smooth.webp`
- الحجم المطلوب: 256×256 شفاف
- الدفعة والأولوية: Batch 4 — الطبقة B
- الغرض: الحجر الأملس في c4-l1 بعد المرسى (اختياري). A: «carve-smooth (اختياري)».
- المرجع المرفق: لا شيء (أيقونة: لا ترفق أي صورة مرجع، حتى لا يرجع مشهد القرية)
- البرومبت الكامل (للصق):
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
Object: A flat square sandstone panel of completely smooth, uncarved stone with only gentle weathering, a few hairline cracks and a soft warm patina, no carving or sign of any kind. Part of a set of four carved sign panels with an identical flat square sandstone panel, same carved relief depth and same gold-copper tint; this one has no carving at all.
Constraints: no text, no letters, no numbers, no watermark, plain flat light-gray background, only one object.
```
- مواضع إلزامية: لا يوجد
- تجنّب: أي نقش أو علامة على اللوح، حروف أو أرقام، لوح دائري
- فحص القبول:
  1. لوح مربع أملس بلا أي نقش
  2. نفس الحجر واللون والحواف في علامات c4-l1
  3. خلفية رمادية فاتحة بلا أي مشهد وحواف نظيفة

---

## جدول التتبّع
| # | ID | الطبقة | وُلّدت | قُبلت | حُفظت بالاسم | ملاحظات |
|---|---|---|---|---|---|---|
| 1 | c4-l1 | A | [ ] | [ ] | [ ] | |
| 2 | c4-l4 | A | [ ] | [ ] | [ ] | |
| 3 | c4-l7 | A | [ ] | [ ] | [ ] | |
| 4 | othman-neutral | A | [ ] | [ ] | [ ] | |
| 5 | symbol-c4 | A | [ ] | [ ] | [ ] | |
| 6 | carve-light | A | [ ] | [ ] | [ ] | |
| 7 | carve-wing | A | [ ] | [ ] | [ ] | |
| 8 | carve-channel | A | [ ] | [ ] | [ ] | |
| 9 | carve-anchor | A | [ ] | [ ] | [ ] | |
| 10 | c4-l2 | B | [ ] | [ ] | [ ] | |
| 11 | c4-l2-puzzle | B | [ ] | [ ] | [ ] | |
| 12 | c4-l3 | B | [ ] | [ ] | [ ] | |
| 13 | c4-l5 | B | [ ] | [ ] | [ ] | |
| 14 | c4-l6 | B | [ ] | [ ] | [ ] | |
| 15 | hala-serious | B | [ ] | [ ] | [ ] | |
| 16 | torch | B | [ ] | [ ] | [ ] | |
| 17 | carve-star | A | [ ] | [ ] | [ ] | |
| 18 | carve-reed | A | [ ] | [ ] | [ ] | |
| 19 | carve-smooth | B | [ ] | [ ] | [ ] | |

## أسئلة وملاحظات لأصحاب الفصول
1. **c4-l4 (A):** تأكيد تفسيري: المحطات منصّات حجرية مربعة بمشاعل قائمة في قاعة مرئية من زاوية عالية (لا ممر بمنظور مباشر)، لأن الإحداثيات تتبدّل يميناً ويساراً بعرض واسع. هل هذا مقصودك؟
2. **c4-l1 (A):** الحجر الأملس في الطرف الأيسر بعد المرسى؛ يوافق دليل هالة «بعده حجر أملس».
3. **c4-l3 (A):** الرموز الثمانية على العمود هندسية مجرّدة (دائرة، مثلث، موجة، صليب، معيّن، مربع، هلال، حلقة نقطة)؛ لو تريد نقوش محدّدة أرسلها.
4. **c4-l6 (A):** أربع مفاتيح وأربع فتحات مخازن. لو عدد المخازن غير ذلك أخبرني.
5. **أيقونات `carve-*`:** تنتظر إضافة `icon:` في `ch4.ts` بعد وصول الصور (قرار A).
