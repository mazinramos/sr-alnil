# GENERATION_ORDER — ترتيب التوليد لمازن (الحساب F)

> الهدف: أن تكون **أول 35 صورة** كافية لتسليم قابل للعب (الطبقة A بالكامل). الإجمالي 98 صورة. كل صف يشير للملف ورقم البرومبت الجاهز للنسخ.
> المرجع في كل توليد: `docs/reference/village.jpg` (خلفيات وشاشات وأيقونات)، و`docs/reference/nour.png` (بورتريهات). لتعابير آدم ويونس وهالة أرفق صورة neutral الخاصة بكل منهم من `public/art/chars/`.

## قبل أن تبدأ (10 دقائق)
1. افتح محادثة جيمناي واحدة جديدة، وارفق `village.jpg` في أول رسالة وقل: «هذا مرجع الأسلوب. كل الصور القادمة بنفس الأسلوب واللوحة اللونية والإضاءة». ابقَ في **نفس المحادثة** قدر الإمكان فالثبات أفضل. ابدأ محادثة جديدة لكل نوع (خلفيات، بورتريهات، أيقونات) وأعد إرفاق المرجع.
2. الخريطة أولاً، ولا تبدأ غيرها قبل اعتمادها: 5 مستويات jigsaw تعتمد عليها (`#cell=n`) وشاشة الخريطة أيضاً.
3. بعد كل 5 صور: ضع الصور بجانب `village.jpg` وتحقق أن الألوان والإضاءة من نفس العالم. أي انحراف: أعد التوليد قبل أن تكمل (ثبات الأسلوب أهم من السرعة).
4. احفظ باسم الملف **الحرفي** (العمود 3) فهو ما يقرأه الكود.

## أول 35 صورة (الطبقة A: لعبة كاملة قابلة للّعب)
| # | ID | الملف | البرومبت | الطبقة |
|---|---|---|---|---|
| 1 | `ui-map-full` | `public/art/ui/map-full.webp` | PROMPTS_01_CH1.md #1 | A |
| 2 | `c1-l1` | `public/art/c1/l1.webp` | PROMPTS_01_CH1.md #3 | A |
| 3 | `c2-l1` | `public/art/c2/l1.webp` | PROMPTS_02_CH2.md #1 | A |
| 4 | `c4-l4` | `public/art/c4/l4.webp` | PROMPTS_04_CH4.md #2 | A |
| 5 | `c1-l4` | `public/art/c1/l4.webp` | PROMPTS_01_CH1.md #4 | A |
| 6 | `c1-l7` | `public/art/c1/l7.webp` | PROMPTS_01_CH1.md #5 | A |
| 7 | `c2-l4` | `public/art/c2/l4.webp` | PROMPTS_02_CH2.md #2 | A |
| 8 | `c2-l7` | `public/art/c2/l7.webp` | PROMPTS_02_CH2.md #3 | A |
| 9 | `c3-l1` | `public/art/c3/l1.webp` | PROMPTS_03_CH3.md #1 | A |
| 10 | `c3-l4` | `public/art/c3/l4.webp` | PROMPTS_03_CH3.md #2 | A |
| 11 | `c3-l7` | `public/art/c3/l7.webp` | PROMPTS_03_CH3.md #3 | A |
| 12 | `c4-l1` | `public/art/c4/l1.webp` | PROMPTS_04_CH4.md #1 | A |
| 13 | `c4-l7` | `public/art/c4/l7.webp` | PROMPTS_04_CH4.md #3 | A |
| 14 | `c5-l1` | `public/art/c5/l1.webp` | PROMPTS_05_CH5.md #1 | A |
| 15 | `c5-l4` | `public/art/c5/l4.webp` | PROMPTS_05_CH5.md #2 | A |
| 16 | `c5-l7` | `public/art/c5/l7.webp` | PROMPTS_05_CH5.md #3 | A |
| 17 | `bashir-neutral` | `public/art/chars/bashir-neutral.webp` | PROMPTS_01_CH1.md #7 | A |
| 18 | `saif-neutral` | `public/art/chars/saif-neutral.webp` | PROMPTS_02_CH2.md #4 | A |
| 19 | `halima-neutral` | `public/art/chars/halima-neutral.webp` | PROMPTS_03_CH3.md #4 | A |
| 20 | `othman-neutral` | `public/art/chars/othman-neutral.webp` | PROMPTS_04_CH4.md #4 | A |
| 21 | `rihab-neutral` | `public/art/chars/rihab-neutral.webp` | PROMPTS_05_CH5.md #4 | A |
| 22 | `safiya-neutral` | `public/art/chars/safiya-neutral.webp` | PROMPTS_01_CH1.md #6 | A |
| 23 | `symbol-c1` | `public/art/items/symbol-c1.webp` | PROMPTS_01_CH1.md #11 | A |
| 24 | `symbol-c2` | `public/art/items/symbol-c2.webp` | PROMPTS_02_CH2.md #5 | A |
| 25 | `symbol-c3` | `public/art/items/symbol-c3.webp` | PROMPTS_03_CH3.md #5 | A |
| 26 | `symbol-c4` | `public/art/items/symbol-c4.webp` | PROMPTS_04_CH4.md #5 | A |
| 27 | `symbol-c5` | `public/art/items/symbol-c5.webp` | PROMPTS_05_CH5.md #5 | A |
| 28 | `jar-wheat` | `public/art/items/jar-wheat.webp` | PROMPTS_01_CH1.md #15 | A |
| 29 | `jar-henna` | `public/art/items/jar-henna.webp` | PROMPTS_01_CH1.md #16 | A |
| 30 | `jar-incense` | `public/art/items/jar-incense.webp` | PROMPTS_01_CH1.md #17 | A |
| 31 | `jar-dates` | `public/art/items/jar-dates.webp` | PROMPTS_01_CH1.md #18 | A |
| 32 | `bead-blue` | `public/art/items/bead-blue.webp` | PROMPTS_03_CH3.md #6 | A |
| 33 | `copper-weight` | `public/art/items/copper-weight.webp` | PROMPTS_03_CH3.md #7 | A |
| 34 | `weaver-shuttle` | `public/art/items/weaver-shuttle.webp` | PROMPTS_03_CH3.md #8 | A |
| 35 | `sun-disc` | `public/art/items/sun-disc.webp` | PROMPTS_01_CH1.md #12 | A |

**لماذا هذا الترتيب؟**
- **1:** الخريطة تحكم 5 مستويات jigsaw وشاشة الخريطة. المستويات 2 إلى 4 هي التي تحتاج إحداثيات من أصحاب الفصول: `c1-l1` (hotspot، C) و`c2-l1` (route، D) و`c4-l4` (route، A). ولّدها مبكراً ليضبطوا الإحداثيات بـ `/preview/coords` والأحد صباحاً قبل G2.
- **5 إلى 16:** باقي خلفيات الطبقة A، فصلاً فصلاً.
- **17 إلى 22:** الشخصيات الجديدة بحسب ظهورها (بشير يتكلم في كل مستويات الفصل 1، وصفية آخراً لأنها لا تتكلم في مستويات الطبقة A). الوصف الثابت لكل شخصية في `CHARACTERS.md`.
- **23 إلى 35:** الأيقونات التي تُعرض فعلاً في الطبقة A: رموز الفصول الخمسة، الجرار (c1-l4)، أغراض c3-l1، وقرص الشمس. الباقي يظهر نصاً مؤقتاً (`ItemIcon` يعرض `label` عند غياب الصورة).

## الدفعة التالية (36 إلى 57): تحسين الطبقة A
| # | ID | الملف | البرومبت | الطبقة |
|---|---|---|---|---|
| 36 | `ui-title` | `public/art/ui/title.webp` | PROMPTS_01_CH1.md #2 | A |
| 37 | `nour-worried` | `public/art/chars/nour-worried.webp` | PROMPTS_01_CH1.md #8 | A |
| 38 | `nour-smiling` | `public/art/chars/nour-smiling.webp` | PROMPTS_01_CH1.md #9 | A |
| 39 | `nour-determined` | `public/art/chars/nour-determined.webp` | PROMPTS_01_CH1.md #10 | A |
| 40 | `star-sign-1` | `public/art/items/star-sign-1.webp` | PROMPTS_02_CH2.md #6 | A |
| 41 | `star-sign-2` | `public/art/items/star-sign-2.webp` | PROMPTS_02_CH2.md #7 | A |
| 42 | `star-sign-3` | `public/art/items/star-sign-3.webp` | PROMPTS_02_CH2.md #8 | A |
| 43 | `star-sign-4` | `public/art/items/star-sign-4.webp` | PROMPTS_02_CH2.md #9 | A |
| 44 | `star-sign-5` | `public/art/items/star-sign-5.webp` | PROMPTS_02_CH2.md #10 | A |
| 45 | `spice-cumin` | `public/art/items/spice-cumin.webp` | PROMPTS_03_CH3.md #9 | A |
| 46 | `spice-cinnamon` | `public/art/items/spice-cinnamon.webp` | PROMPTS_03_CH3.md #10 | A |
| 47 | `spice-clove` | `public/art/items/spice-clove.webp` | PROMPTS_03_CH3.md #11 | A |
| 48 | `spice-pepper` | `public/art/items/spice-pepper.webp` | PROMPTS_03_CH3.md #12 | A |
| 49 | `notebook-safiya` | `public/art/items/notebook-safiya.webp` | PROMPTS_05_CH5.md #6 | A |
| 50 | `brass-scale` | `public/art/items/brass-scale.webp` | PROMPTS_05_CH5.md #7 | A |
| 51 | `stone-key` | `public/art/items/stone-key.webp` | PROMPTS_05_CH5.md #8 | A |
| 52 | `bird-carving` | `public/art/items/bird-carving.webp` | PROMPTS_01_CH1.md #13 | A |
| 53 | `boat-piece` | `public/art/items/boat-piece.webp` | PROMPTS_01_CH1.md #14 | A |
| 54 | `carve-light` | `public/art/items/carve-light.webp` | PROMPTS_04_CH4.md #6 | A |
| 55 | `carve-wing` | `public/art/items/carve-wing.webp` | PROMPTS_04_CH4.md #7 | A |
| 56 | `carve-channel` | `public/art/items/carve-channel.webp` | PROMPTS_04_CH4.md #8 | A |
| 57 | `carve-anchor` | `public/art/items/carve-anchor.webp` | PROMPTS_04_CH4.md #9 | A |

## الطبقة B: خلفيات (58 إلى 79)
| # | ID | الملف | البرومبت | الطبقة |
|---|---|---|---|---|
| 58 | `c1-l2` | `public/art/c1/l2.webp` | PROMPTS_01_CH1.md #19 | B |
| 59 | `c1-l3` | `public/art/c1/l3.webp` | PROMPTS_01_CH1.md #20 | B |
| 60 | `c1-l5` | `public/art/c1/l5.webp` | PROMPTS_01_CH1.md #21 | B |
| 61 | `c1-l6` | `public/art/c1/l6.webp` | PROMPTS_01_CH1.md #22 | B |
| 62 | `c2-l2` | `public/art/c2/l2.webp` | PROMPTS_02_CH2.md #11 | B |
| 63 | `c2-l3` | `public/art/c2/l3.webp` | PROMPTS_02_CH2.md #12 | B |
| 64 | `c2-l5` | `public/art/c2/l5.webp` | PROMPTS_02_CH2.md #13 | B |
| 65 | `c2-l6` | `public/art/c2/l6.webp` | PROMPTS_02_CH2.md #14 | B |
| 66 | `c3-l2` | `public/art/c3/l2.webp` | PROMPTS_03_CH3.md #13 | B |
| 67 | `c3-l3` | `public/art/c3/l3.webp` | PROMPTS_03_CH3.md #14 | B |
| 68 | `c3-l5` | `public/art/c3/l5.webp` | PROMPTS_03_CH3.md #15 | B |
| 69 | `c3-l6` | `public/art/c3/l6.webp` | PROMPTS_03_CH3.md #16 | B |
| 70 | `c4-l2` | `public/art/c4/l2.webp` | PROMPTS_04_CH4.md #10 | B |
| 71 | `c4-l2-puzzle` | `public/art/c4/l2-puzzle.webp` | PROMPTS_04_CH4.md #11 | B |
| 72 | `c4-l3` | `public/art/c4/l3.webp` | PROMPTS_04_CH4.md #12 | B |
| 73 | `c4-l5` | `public/art/c4/l5.webp` | PROMPTS_04_CH4.md #13 | B |
| 74 | `c4-l6` | `public/art/c4/l6.webp` | PROMPTS_04_CH4.md #14 | B |
| 75 | `c5-l2` | `public/art/c5/l2.webp` | PROMPTS_05_CH5.md #9 | B |
| 76 | `c5-l3` | `public/art/c5/l3.webp` | PROMPTS_05_CH5.md #10 | B |
| 77 | `c5-l5` | `public/art/c5/l5.webp` | PROMPTS_05_CH5.md #11 | B |
| 78 | `c5-l6` | `public/art/c5/l6.webp` | PROMPTS_05_CH5.md #12 | B |
| 79 | `ui-nile-map` | `public/art/ui/nile-map.webp` | PROMPTS_01_CH1.md #23 | B |

## المتبقي: تعابير وأيقونات اختيارية (80 إلى 98)
| # | ID | الملف | البرومبت | الطبقة |
|---|---|---|---|---|
| 80 | `nour-curious` | `public/art/chars/nour-curious.webp` | PROMPTS_01_CH1.md #24 | B |
| 81 | `calendar-page` | `public/art/items/calendar-page.webp` | PROMPTS_01_CH1.md #25 | B |
| 82 | `old-photo` | `public/art/items/old-photo.webp` | PROMPTS_01_CH1.md #26 | B |
| 83 | `clay-seal` | `public/art/items/clay-seal.webp` | PROMPTS_01_CH1.md #27 | B |
| 84 | `adam-smiling` | `public/art/chars/adam-smiling.webp` | PROMPTS_02_CH2.md #15 | B |
| 85 | `adam-serious` | `public/art/chars/adam-serious.webp` | PROMPTS_02_CH2.md #16 | B |
| 86 | `knot-red` | `public/art/items/knot-red.webp` | PROMPTS_02_CH2.md #17 | B |
| 87 | `knot-blue` | `public/art/items/knot-blue.webp` | PROMPTS_02_CH2.md #18 | B |
| 88 | `knot-yellow` | `public/art/items/knot-yellow.webp` | PROMPTS_02_CH2.md #19 | B |
| 89 | `knot-green` | `public/art/items/knot-green.webp` | PROMPTS_02_CH2.md #20 | B |
| 90 | `river-stone` | `public/art/items/river-stone.webp` | PROMPTS_02_CH2.md #21 | B |
| 91 | `cargo-sack` | `public/art/items/cargo-sack.webp` | PROMPTS_02_CH2.md #22 | B |
| 92 | `halima-smiling` | `public/art/chars/halima-smiling.webp` | PROMPTS_03_CH3.md #17 | B |
| 93 | `yunus-smiling` | `public/art/chars/yunus-smiling.webp` | PROMPTS_03_CH3.md #18 | B |
| 94 | `ledger-page` | `public/art/items/ledger-page.webp` | PROMPTS_03_CH3.md #19 | B |
| 95 | `tea-glass` | `public/art/items/tea-glass.webp` | PROMPTS_03_CH3.md #20 | B |
| 96 | `hala-serious` | `public/art/chars/hala-serious.webp` | PROMPTS_04_CH4.md #15 | B |
| 97 | `torch` | `public/art/items/torch.webp` | PROMPTS_04_CH4.md #16 | B |
| 98 | `rihab-serious` | `public/art/chars/rihab-serious.webp` | PROMPTS_05_CH5.md #13 | B |

## جدول مقترح (القاهرة)
| الموعد | الهدف |
|---|---|
| السبت قبل 22:00 | الصور 1 إلى 35 (الطبقة A) ورفعها. الخريطة وc1-l1 وc2-l1 وc4-l4 أولاً |
| الأحد قبل 12:00 (G2) | الصور 36 إلى 57 + خلفيات الطبقة B المكتوبة مستوياتها |
| بعد G2 | باقي الطبقة B والاختياري. أي نقص يُبلَّغ قبل G2 |

---

## ماذا تفعل إن أخرج جيمناي نتيجة غير مناسبة؟

### جدول الأعطال الشائعة
| العرَض | الحل |
|---|---|
| النسبة مربعة بدل 3:2 | أعد التوليد وقل صراحة «landscape 3:2, 1536x1024». إن بقيت مربعة فاقتص أو وسّع بأداة الرسم؛ للخلفيات اقتصاص أعلى/أسفل مقبول إن بقي الثلث السفلي هادئاً |
| ظهر نص أو حروف مشوّهة | أعد التوليد مع إضافة «all surfaces completely blank and unmarked». أو امسح الموضع بـ Photopea (Clone Stamp) |
| ظهر أشخاص في الخلفية | أضف «deserted, empty of people». أو امسحهم بأداة الـ inpainting |
| الأسلوب انحرف (لامع، ثلاثي الأبعاد، كرتوني، مشبع) | أعد إرفاق `village.jpg` وقل: «match the brushwork, color grading and lighting of the reference exactly, a painted realistic image, not a 3D render, desaturated». ثم جرّب البرومبت المختصر أدناه |
| الوجه تغيّر بين التعابير | أرفق صورة الشخصية الموافق عليها (neutral) وقل: «same person as the attached portrait, only the expression changes». ولّد كل تعابير الشخصية في المحادثة نفسها. إن بقي الانحراف ولّد neutral ثم عدّل بطلب «change only the expression to …» |
| أيدٍ مشوّهة | اقتص الصورة من الأسفل لإخفاء الأيدي (البورتريه نصف جسم) أو أعد التوليد |
| تعذّرت الشفافية | جيمناي لا يخرج قناة ألفا: اترك الخلفية رمادية فاتحة مسطحة وأزلها بـ remove.bg أو Photopea، وافحص حواف الصورة من الهالة الرمادية |
| لغز يعتمد على المواضع خرج بعناصر في مواضع غير المطلوبة (c1-l1 وc2-l1 وc4-l4) | لا تُعِد التوليد كثيراً: المهم أن تُقرأ **الإشارات الصحيحة** (رغوة/دوّامة، مشعل مشتعل/مطفأ، الرموز الثلاثة). اعتمد الصورة وأرسلها لصاحب الفصل ليضبط الإحداثيات من `/preview/coords` |
| الخريطة لم تُقسَّم لخلايا واضحة | أعد التوليد مع ذكر أرقام الخلايا ومواضع النهر. إن بقيت المشكلة فالخلايا الست لا تحتاج حدوداً مرئية، يكفي أن يمرّ النهر S متصلاً وأن يقع كل رمز داخل مربعه |

### برامبتات بديلة مختصرة (للتجربة عند فشل الطويل)
**خلفية:**
```
Warm painterly realistic digital painting in the style of the attached reference, golden light, muted colors, Sudanese Nile village setting, mud-brick and reed. No text, no people. Landscape 3:2. Scene: <جملة واحدة من وصف المشهد>.
```
**خريطة `ui-map-full`:**
```
An old parchment map seen from above in warm muted colors and ink-and-wash style, divided into six equal square cells (3 columns by 2 rows). One continuous S-shaped blue Nile river enters from the right edge at the top row, flows left through the top row, down on the left, and right through the bottom row, leaving at the bottom center. Cells 1 to 5 each have one small landmark and one small gold emblem: 1 village with sun disc, 2 reed island with three wavy lines, 3 market awnings with a balance scale, 4 ruins with a carved eye, 5 quiet shore with a thread tied in a knot. Cell 6 (bottom right) has only a plain compass rose without letters. Cells numbered from top right to top left, then bottom left to bottom right. No text, no people. Landscape 3:2.
```
**بورتريه:**
```
Half-body painted portrait in the style of the attached reference, soft warm light, plain light-gray background, no text. <سطر واحد من الوصف الثابت في CHARACTERS.md>. Expression: <التعبير>.
```
**أيقونة:**
```
One painted game icon of <الغرض>, centered, filling most of a square, soft warm light, plain light-gray background, muted warm colors, instantly readable when small, no text.
```
**صورة لغز c4-l2-puzzle:**
```
A square carved sandstone relief mural seen straight on, soft light from the upper left. A sun disc with rays in the upper left, a bird in flight facing left below it, three wavy water lines running diagonally across the middle, a moored boat with an anchor at the lower right. Asymmetric composition, no empty areas, no text. Square 1:1.
```

### نقاط القبول السريعة لأي صورة
1. لا نص ولا حروف ولا أشخاص في الخلفيات.
2. نفس لوحة الألوان الهادئة والإضاءة الدافئة مثل `village.jpg` (بدون نيون).
3. يتّسق الاسم والمقاس والحجم مع جدول الجرد (خلفية ≤ 250KB، أيقونة ≤ 40KB، بورتريه ≤ 200KB).
4. للألغاز: الإشارة الحاسمة (حسب «مواضع إلزامية» في برومبت الصورة) ظاهرة وواضحة.
