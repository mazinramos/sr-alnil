# GENERATION_ORDER — ترتيب التوليد لمازن (الحساب F)

> **تحديث 31/10 (NEXT4):** الفصل الأول وُلّد (ما عدا ما يظهر في قائمة «المنجز» أدناه)، فالأولوية الآن للفصول 2 إلى 5. الإجمالي المخطّط **101 صورة**: منجز 37، متبقٍ 64. القائمة تُحسب من الملفات الموجودة فعلاً في `public/art/`.
> **الأولوية حسب A:** (1) خلفيات الألغاز الأعلى تأثيراً في الفصول 2 إلى 5، (2) بورتريهات الشخصيات الجديدة، (3) الأيقونات، ثم باقي الخلفيات والتعابير.
> كل صف يشير للملف الجاهز لك (ملف لكل صورة في المجلد `docs/prompts/chN/`).
> **الحالة الحيّة لكل صورة في `STATUS.md`** (يُولَّد بـ `python3 docs/prompts/make_status.py`). هذا الملف ترتيب مقترح فقط.

## قبل أن تبدأ
1. **الخلفيات والشاشات:** محادثة جيمناي جديدة، ارفق `00_RULES_FOR_GEMINI.md` و`_references/village.jpg`. **البورتريهات:** محادثة أخرى بـ `00_RULES_FOR_GEMINI.md` و`_references/nour.png` (وللتعابير الموجودة أرفق صورة الشخصية neutral).
2. **الأيقونات: بلا أي مرجع** (قرار A 31/10). المرجع يجلب مشهد القرية. ارفع `00_RULES_FOR_GEMINI.md` فقط. وإن ظهر مشهد خلف الأيقونة فأعد التوليد.
3. بعد كل 5 صور: ضعها بجانب `village.jpg` وتأكد أن الألوان والإضاءة من نفس العالم. انحراف الأسلوب يُعاد قبل أن تكمل.
4. احفظ باسم **`id.png`** كما في أول ملف الصورة، وأرسل الدفعة لـ A ليحوّلها.

## المنجز (37)
`ui-map-full`, `ui-title`, `c1-l1`, `c1-l4`, `c1-l7`, `safiya-neutral`, `bashir-neutral`, `nour-worried`, `nour-smiling`, `nour-determined`, `symbol-c1`, `sun-disc`, `bird-carving`, `boat-piece`, `jar-wheat`, `jar-henna`, `jar-incense`, `jar-dates`, `c1-l2`, `c1-l3`, `c1-l5`, `c1-l6`, `ui-nile-map`, `nour-curious`, `calendar-page`, `old-photo`, `clay-seal`, `c3-l1`, `c3-l4`, `c3-l7`, `halima-neutral`, `c3-l2`, `c3-l3`, `c3-l5`, `c3-l6`, `halima-smiling`, `yunus-smiling`

## أول 35 صورة متبقية (الأهم أولاً)
| # | ID | يُحفظ في | ملف البرومبت | الطبقة |
|---|---|---|---|---|
| 1 | `c2-l1` | `public/art/c2/l1.webp` | `ch2/01_c2-l1.md` | A |
| 2 | `c4-l4` | `public/art/c4/l4.webp` | `ch4/02_c4-l4.md` | A |
| 3 | `c4-l2-puzzle` | `public/art/c4/l2-puzzle.webp` | `ch4/11_c4-l2-puzzle.md` | A |
| 4 | `c2-l2` | `public/art/c2/l2.webp` | `ch2/11_c2-l2.md` | B |
| 5 | `c5-l2` | `public/art/c5/l2.webp` | `ch5/09_c5-l2.md` | B |
| 6 | `c5-l3` | `public/art/c5/l3.webp` | `ch5/10_c5-l3.md` | B |
| 7 | `c4-l1` | `public/art/c4/l1.webp` | `ch4/01_c4-l1.md` | A |
| 8 | `c5-l7` | `public/art/c5/l7.webp` | `ch5/03_c5-l7.md` | A |
| 9 | `c2-l4` | `public/art/c2/l4.webp` | `ch2/02_c2-l4.md` | A |
| 10 | `c2-l7` | `public/art/c2/l7.webp` | `ch2/03_c2-l7.md` | A |
| 11 | `c4-l7` | `public/art/c4/l7.webp` | `ch4/03_c4-l7.md` | A |
| 12 | `c5-l1` | `public/art/c5/l1.webp` | `ch5/01_c5-l1.md` | A |
| 13 | `c5-l4` | `public/art/c5/l4.webp` | `ch5/02_c5-l4.md` | A |
| 14 | `saif-neutral` | `public/art/chars/saif-neutral.webp` | `ch2/04_saif-neutral.md` | A |
| 15 | `othman-neutral` | `public/art/chars/othman-neutral.webp` | `ch4/04_othman-neutral.md` | A |
| 16 | `rihab-neutral` | `public/art/chars/rihab-neutral.webp` | `ch5/04_rihab-neutral.md` | A |
| 17 | `symbol-c2` | `public/art/items/symbol-c2.webp` | `ch2/05_symbol-c2.md` | A |
| 18 | `symbol-c3` | `public/art/items/symbol-c3.webp` | `ch3/05_symbol-c3.md` | A |
| 19 | `symbol-c4` | `public/art/items/symbol-c4.webp` | `ch4/05_symbol-c4.md` | A |
| 20 | `symbol-c5` | `public/art/items/symbol-c5.webp` | `ch5/05_symbol-c5.md` | A |
| 21 | `star-sign-1` | `public/art/items/star-sign-1.webp` | `ch2/06_star-sign-1.md` | A |
| 22 | `star-sign-2` | `public/art/items/star-sign-2.webp` | `ch2/07_star-sign-2.md` | A |
| 23 | `star-sign-3` | `public/art/items/star-sign-3.webp` | `ch2/08_star-sign-3.md` | A |
| 24 | `star-sign-4` | `public/art/items/star-sign-4.webp` | `ch2/09_star-sign-4.md` | A |
| 25 | `star-sign-5` | `public/art/items/star-sign-5.webp` | `ch2/10_star-sign-5.md` | A |
| 26 | `bead-blue` | `public/art/items/bead-blue.webp` | `ch3/06_bead-blue.md` | A |
| 27 | `copper-weight` | `public/art/items/copper-weight.webp` | `ch3/07_copper-weight.md` | A |
| 28 | `weaver-shuttle` | `public/art/items/weaver-shuttle.webp` | `ch3/08_weaver-shuttle.md` | A |
| 29 | `spice-cumin` | `public/art/items/spice-cumin.webp` | `ch3/09_spice-cumin.md` | A |
| 30 | `spice-cinnamon` | `public/art/items/spice-cinnamon.webp` | `ch3/10_spice-cinnamon.md` | A |
| 31 | `spice-clove` | `public/art/items/spice-clove.webp` | `ch3/11_spice-clove.md` | A |
| 32 | `spice-pepper` | `public/art/items/spice-pepper.webp` | `ch3/12_spice-pepper.md` | A |
| 33 | `carve-light` | `public/art/items/carve-light.webp` | `ch4/06_carve-light.md` | A |
| 34 | `carve-wing` | `public/art/items/carve-wing.webp` | `ch4/07_carve-wing.md` | A |
| 35 | `carve-channel` | `public/art/items/carve-channel.webp` | `ch4/08_carve-channel.md` | A |

**لماذا هذا الترتيب؟**
- **صور الألغاز المعتمدة عليها أولاً (1 إلى 7):** `c2-l1` (route) و`c4-l4` (route) و`c4-l2-puzzle` (tiles، ضرورية لتشغيل المستوى) و`c3-l5` (hotspot، البرومبت محدّث بمراجعة E) و`c2-l2` (hotspot) و`c5-l2` (hotspot) و`c5-l3` (route). ولّدها وتحقّق منها **قبل غيرها**، فإحداثيات ألغازها تُضبط من الصورة الفعلية.
- **c2-l1 وc3-l1 وc4-l1 وc5-l7:** صور **مؤقتة** من النسخة الأولى ما زالت في الـ repo (`PLACEHOLDERS.md`)؛ تُستبدل بنفس الأسماء (c2-l1 ضمن أول سبع، والثلاث الباقية في 8 إلى 10).
- **c2-l1 وc4-l4:** لغزا route يعتمدان على مواضع محدّدة (الأحجار الآمنة، المشاعل المضاءة) ويحتاج D وA إحداثيات منهما. **c4-l2-puzzle** هي الصورة التي يُركَّب منها لغز c4-l2 نفسه. **c5-l2 وc5-l3** يعتمدان على قطع الخريطة (ولّدهما بعد اعتماد `map-full` وهو معتمد).
- **خلفيات A الباقية** (c2-l4 وc2-l7 وc3-l4 وc3-l7 وc4-l7 وc5-l1 وc5-l4): تكفي مع البورتريهات لتسليم قابل للعب.
- **البورتريهات الجديدة:** سيف وحليمة والحاج عثمان ورحاب (بشير وصفية منجزان).
- **الأيقونات:** رموز الفصول، ونجوم آدم، وأغراض c3-l1، والتوابل، وعلامات الجدار الست في c4-l1، وأغراض ذاكرة c5-l1. ما لم يصل منها يظهر نصاً مؤقتاً (`ItemIcon` يعرض `label`).

## المتبقي بعدها (29)
| # | ID | يُحفظ في | ملف البرومبت | الطبقة |
|---|---|---|---|---|
| 36 | `carve-anchor` | `public/art/items/carve-anchor.webp` | `ch4/09_carve-anchor.md` | A |
| 37 | `carve-star` | `public/art/items/carve-star.webp` | `ch4/17_carve-star.md` | A |
| 38 | `carve-reed` | `public/art/items/carve-reed.webp` | `ch4/18_carve-reed.md` | A |
| 39 | `notebook-safiya` | `public/art/items/notebook-safiya.webp` | `ch5/06_notebook-safiya.md` | A |
| 40 | `brass-scale` | `public/art/items/brass-scale.webp` | `ch5/07_brass-scale.md` | A |
| 41 | `stone-key` | `public/art/items/stone-key.webp` | `ch5/08_stone-key.md` | A |
| 42 | `c2-l3` | `public/art/c2/l3.webp` | `ch2/12_c2-l3.md` | B |
| 43 | `c2-l5` | `public/art/c2/l5.webp` | `ch2/13_c2-l5.md` | B |
| 44 | `c2-l6` | `public/art/c2/l6.webp` | `ch2/14_c2-l6.md` | B |
| 45 | `c4-l2` | `public/art/c4/l2.webp` | `ch4/10_c4-l2.md` | B |
| 46 | `c4-l3` | `public/art/c4/l3.webp` | `ch4/12_c4-l3.md` | B |
| 47 | `c4-l5` | `public/art/c4/l5.webp` | `ch4/13_c4-l5.md` | B |
| 48 | `c4-l6` | `public/art/c4/l6.webp` | `ch4/14_c4-l6.md` | B |
| 49 | `c5-l5` | `public/art/c5/l5.webp` | `ch5/11_c5-l5.md` | B |
| 50 | `c5-l6` | `public/art/c5/l6.webp` | `ch5/12_c5-l6.md` | B |
| 51 | `adam-smiling` | `public/art/chars/adam-smiling.webp` | `ch2/15_adam-smiling.md` | B |
| 52 | `adam-serious` | `public/art/chars/adam-serious.webp` | `ch2/16_adam-serious.md` | B |
| 53 | `hala-serious` | `public/art/chars/hala-serious.webp` | `ch4/15_hala-serious.md` | B |
| 54 | `rihab-serious` | `public/art/chars/rihab-serious.webp` | `ch5/13_rihab-serious.md` | B |
| 55 | `knot-red` | `public/art/items/knot-red.webp` | `ch2/17_knot-red.md` | B |
| 56 | `knot-blue` | `public/art/items/knot-blue.webp` | `ch2/18_knot-blue.md` | B |
| 57 | `knot-yellow` | `public/art/items/knot-yellow.webp` | `ch2/19_knot-yellow.md` | B |
| 58 | `knot-green` | `public/art/items/knot-green.webp` | `ch2/20_knot-green.md` | B |
| 59 | `river-stone` | `public/art/items/river-stone.webp` | `ch2/21_river-stone.md` | B |
| 60 | `cargo-sack` | `public/art/items/cargo-sack.webp` | `ch2/22_cargo-sack.md` | B |
| 61 | `ledger-page` | `public/art/items/ledger-page.webp` | `ch3/19_ledger-page.md` | B |
| 62 | `tea-glass` | `public/art/items/tea-glass.webp` | `ch3/20_tea-glass.md` | B |
| 63 | `torch` | `public/art/items/torch.webp` | `ch4/16_torch.md` | B |
| 64 | `carve-smooth` | `public/art/items/carve-smooth.webp` | `ch4/19_carve-smooth.md` | B |

## جدول مقترح (القاهرة)
| الموعد | الهدف |
|---|---|
| السبت قبل 22:00 | الصور الأولى حتى نهاية البورتريهات الجديدة، وبداية الأيقونات |
| الأحد قبل 12:00 (G2) | باقي الـ35 + أكبر قدر من خلفيات الطبقة B |
| بعد G2 | الباقي والتعابير والأيقونات الاختيارية |

---

## ماذا تفعل إن أخرج جيمناي نتيجة غير مناسبة؟

### جدول الأعطال الشائعة
| العرَض | الحل |
|---|---|
| **أيقونة رجعت بمشهد خلفها (قرية، غرفة، أرض)** | لا ترفق أي مرجع. أعد التوليد في محادثة جديدة بلا صور، وأضف في آخر البرومبت: «The background must be plain flat light-gray only. Do NOT include any scene, room, wall, floor, mat or sky. The object floats alone on the gray.» |
| النسبة مربعة بدل 3:2 | أعد التوليد وقل صراحة «landscape 3:2, 1536x1024». إن بقيت مربعة فاقتص أو وسّع بأداة الرسم؛ اقتصاص أعلى/أسفل مقبول إن بقي الثلث السفلي هادئاً |
| ظهر نص أو حروف مشوّهة | أعد التوليد مع إضافة «all surfaces completely blank and unmarked». أو امسح الموضع بـ Photopea (Clone Stamp) |
| ظهر أشخاص في الخلفية | أضف «deserted, empty of people». أو امسحهم بأداة الـ inpainting |
| الأسلوب انحرف (لامع، ثلاثي الأبعاد، كرتوني، مشبع) | أعد إرفاق `village.jpg` (للخلفيات) وقل: «match the brushwork, color grading and lighting of the reference exactly, a painted realistic image, not a 3D render, desaturated». ثم جرّب البرومبت المختصر أدناه |
| الوجه تغيّر بين التعابير | أرفق صورة الشخصية الموافق عليها (neutral) وقل: «same person as the attached portrait, only the expression changes». ولّد كل تعابير الشخصية في المحادثة نفسها. إن بقي الانحراف ولّد neutral ثم عدّل بطلب «change only the expression to …» |
| أيدٍ مشوّهة | اقتص الصورة من الأسفل لإخفاء الأيدي أو أعد التوليد |
| صورة اللغز c4-l2-puzzle فيها ظلال أو هامش عند الحواف | أعد التوليد وأكّد: «the slab fills the whole square edge to edge, even flat diffuse light, absolutely no shadows near the edges». الظلال تُظهر خطوط قصّ غير نظيفة بعد التقسيم لتسع حجارة |
| لغز يعتمد على المواضع خرج بعناصر في مواضع غير المطلوبة (c2-l1 وc4-l4) | لا تُعِد التوليد كثيراً: المهم أن تُقرأ **الإشارات الصحيحة** (رغوة/دوّامة، مشعل مشتعل/مطفأ). اعتمد الصورة وأرسلها لصاحب الفصل ليضبط الإحداثيات من `/preview/coords` |
| الخريطة لم تُقسَّم لخلايا واضحة | المعتمدة موجودة (`ui/map-full`)؛ لا تُعاد |

### برامبتات بديلة مختصرة (للتجربة عند فشل الطويل)
**خلفية:**
```
Warm painterly realistic digital painting in the style of the attached reference, golden light, muted colors, Sudanese Nile village setting, mud-brick and reed. No text, no people. Landscape 3:2. Scene: <جملة واحدة من وصف المشهد>.
```
**بورتريه:**
```
Half-body painted portrait in the style of the attached reference, soft warm light, plain light-gray background, no text. <سطر واحد من الوصف الثابت في CHARACTERS.md>. Expression: <التعبير>.
```
**أيقونة (بلا مرجع):**
```
One painted game icon of <الغرض>, centered, filling most of a square, soft warm light, muted warm colors, instantly readable when small, no text. The background is plain flat light-gray only, nothing else behind it: no scene, room, wall, floor or sky. Square 1:1.
```
**صورة لغز c4-l2-puzzle:**
```
A perfectly square sandstone slab filling the whole image edge to edge, straight carved frame, even flat light with no shadows. A large carved eye at the exact center, a wavy carved water channel running from the top edge to the bottom edge behind it. Different carving in each corner (sun, wing, reeds, star). No text, no people. Square 1:1.
```

### نقاط القبول السريعة لأي صورة
1. لا نص ولا حروف ولا أشخاص في الخلفيات.
2. نفس لوحة الألوان الهادئة والإضاءة الدافئة مثل `village.jpg` (بدون نيون).
3. الأيقونات: خلفية رمادية فاتحة فقط بلا أي مشهد.
4. للألغاز: الإشارة الحاسمة (حسب «مواضع إلزامية» في برومبت الصورة) ظاهرة وواضحة.
