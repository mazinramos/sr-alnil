# PROMPTS_00_INVENTORY — الدفعة 0: الجرد + الأنكورات + قواعد التوليد

> الحساب F — مدير الفن. **ينتظر موافقة A (المشرف) قبل بدء الدفعة 1.**
> المرجع: CONTRACT §5 (الأسماء والمقاسات) وBRIEF_F. أي تعارض: العقد يكسب.

---

## 1) الأنكورات الثلاثة (تُنسخ حرفياً، لا تتغير كلمة)

### STYLE_ANCHOR (كل الخلفيات والشاشات العامة)
```
Painterly realistic digital illustration, soft warm natural light with gentle atmospheric haze, Sudanese Nile riverside setting, mud-brick, woven reed mats, clay pots, aged wood and hand-woven cloth. Muted palette only: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Low saturation, no neon, no harsh contrast. Cinematic composition with a clearly visible horizon and a relatively empty lower third. Same art style, palette and lighting quality as the reference image. No text, no letters, no numbers, no people, no watermark. Landscape 3:2 ratio, 1536x1024.
```
> مزاج الإضاءة لكل فصل يُكتب داخل وصف المشهد (مش في الأنكور) عشان الأنكور يبقى ثابتاً:
> ف1 عصر ذهبي داخل البيت | ف2 نهار صافٍ وضباب نهري ناعم | ف3 ضوء دافئ مرشّح عبر أقمشة السوق | ف4 حجر بارد مع وهج مشاعل دافئ عند الغسق | ف5 غروب هادئ وماء ساكن.

### CHAR_ANCHOR (كل البورتريهات)
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
```

### ICON_ANCHOR (كل الأيقونات، نسخة 2 بتاريخ 31/10)
> عُدّل بعد تجربة مازن: أيقونة بمرجع مشهد ترجع بمشهد القرية. الآن لا مرجع للأيقونات، ويُنصّ في الأنكور على خلفية رمادية فقط بلا مشهد.
```
Single game puzzle icon, painterly realistic digital painting with soft shading, warm hand-painted game-icon illustration style, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. The background must be plain flat light-gray only, with nothing else behind the object: no scene, room, wall, floor, mat or sky. The object floats alone on the gray, centered, with clean edges. Square 1:1 ratio, 1024x1024.
```

**ملاحظة تقنية من الـ repo (محدّثة):** `puzzles/jigsaw` يقرأ `"/art/ui/map-full.webp#cell=n"` على شبكة **3×2 من خلايا مربعة** (≈512×512 من 1536×1024). ترقيم الخلايا: 1 أعلى اليمين، 2 أعلى الوسط، 3 أعلى اليسار، 4 أسفل اليسار، 5 أسفل الوسط، 6 أسفل اليمين (زخرفية). الفصل n يستعمل `cell=n`، والفصل 5 يركّب الصورة كاملة (12 قطعة). الصيغة القديمة `#strip=n` ملغاة. التفاصيل في `NOTE_MAPFULL_CELLS.md`.

**استثناء واحد (يحتاج موافقة A):** `ui/map-full` و`ui/nile-map` خرائط مسطّحة، فبرومبتاتها تستعمل STYLE_ANCHOR حرفياً ثم تكتب في المشهد: "this is a flat top-down map, ignore the horizon and empty-lower-third rule".

---

## 2) قواعد مازن للتوليد

1. ارفق المرجع في **كل** توليد: `village.jpg` للخلفيات والشاشات والأيقونات، `nour.png` للبورتريهات. وقل: *"same art style, palette and lighting quality as the reference"*.
2. لو الأسلوب انحرف عن المرجع (ألوان أو ملمس)، أعد التوليد، لا تقبلها.
3. عيوب تُرفض: نص أو حروف مشوّهة، أيدٍ غريبة، أبنية غير منطقية، ألوان نيون أو تشبّع عالٍ، أشخاص في الخلفيات.
4. التحويل: `cwebp -q 80 input.png -o output.webp` بالمقاس المطلوب (البورتريهات تُولَّد 1024 وتُصغَّر لـ 768 شفاف، والأيقونات تُولَّد 1024 وتُصغَّر لـ 256 شفاف).
5. **الاسم الدقيق للملف أهم من الجمال**: المحرّك يعتمد عليه.
6. الطبقة A أولاً (l1 وl4 وl7). لو الوقت ضاق: خلفية واحدة لكل فصل (`l1`) والباقي بـ `focal` (CONTRACT §5).
7. أي صورة رُفضت بسبب أسلوبها: أبلّغ A وأعيد كتابة برومبتها.
8. الحجم الأقصى: خلفية ≤ 250KB، شاشة عامة ≤ 300KB، بورتريه ≤ 200KB، أيقونة ≤ 40KB.
9. للبورتريهات والأيقونات: أزل الخلفية (remove.bg أو Photopea) قبل التحويل لـ WebP.
10. **الأيقونات بلا مرجع مشهد (قرار A 31/10):** لا ترفق `village.jpg` ولا أي مشهد مع برومبت أيقونة، فالمرجع يجلب مشهد القرية. الأسلوب يأتي من نص الأنكور. أرفق مرجعاً فقط إن انحرف الأسلوب، وليكن أيقونة معتمدة سبق توليدها لا مشهداً. وإن ظهر مشهد خلف الأيقونة فأعد التوليد.
11. **الرموز:** ممنوع أي رمز يظهر إيموجي ملوّناً على الهاتف؛ في الصور أيضاً لا نص ولا حروف.

---

## 3) الجرد الكامل (101 صورة، محدّث 31/10)

**الفئات:** UI = شاشات عامة | BG = خلفية مستوى | CH = بورتريه | EX = تعبير إضافي | IC = أيقونة | PZ = صورة لغز.
**الطبقة:** A = أولوية قصوى، B = بعدها.

### 3.1 الشاشات العامة (3)
| # | ID | الملف | المقاس | الفئة | الطبقة | الدفعة |
|---|---|---|---|---|---|---|
| 1 | ui-map-full | public/art/ui/map-full.webp | 1536×1024 | UI | A | 1 |
| 2 | ui-title | public/art/ui/title.webp | 1536×1024 | UI | A | 1 |
| 3 | ui-nile-map | public/art/ui/nile-map.webp | 1536×1024 | UI | B | 1 |

### 3.2 خلفيات المستويات (35) — كلها 1536×1024
| ID | الملف | الفئة | الطبقة | الدفعة | مواضع إلزامية؟ |
|---|---|---|---|---|---|
| c1-l1 | public/art/c1/l1.webp | BG | A | 1 | نعم (3 رموز) |
| c1-l4 | public/art/c1/l4.webp | BG | A | 1 | لا |
| c1-l7 | public/art/c1/l7.webp | BG | A | 1 | لا |
| c1-l2 | public/art/c1/l2.webp | BG | B | 1 | لا |
| c1-l3 | public/art/c1/l3.webp | BG | B | 1 | لا |
| c1-l5 | public/art/c1/l5.webp | BG | B | 1 | لا |
| c1-l6 | public/art/c1/l6.webp | BG | B | 1 | لا |
| c2-l1 | public/art/c2/l1.webp | BG | A | 2 | نعم (5 أحجار) |
| c2-l4 | public/art/c2/l4.webp | BG | A | 2 | لا |
| c2-l7 | public/art/c2/l7.webp | BG | A | 2 | لا |
| c2-l2 | public/art/c2/l2.webp | BG | B | 2 | نعم (4 قصبات) |
| c2-l3 | public/art/c2/l3.webp | BG | B | 2 | لا |
| c2-l5 | public/art/c2/l5.webp | BG | B | 2 | لا |
| c2-l6 | public/art/c2/l6.webp | BG | B | 2 | لا |
| c3-l1 | public/art/c3/l1.webp | BG | A | 3 | لا |
| c3-l4 | public/art/c3/l4.webp | BG | A | 3 | لا |
| c3-l7 | public/art/c3/l7.webp | BG | A | 3 | لا |
| c3-l2 | public/art/c3/l2.webp | BG | B | 3 | لا |
| c3-l3 | public/art/c3/l3.webp | BG | B | 3 | لا |
| c3-l5 | public/art/c3/l5.webp | BG | B | 3 | نعم (5 أغراض) |
| c3-l6 | public/art/c3/l6.webp | BG | B | 3 | لا |
| c4-l1 | public/art/c4/l1.webp | BG | A | 4 | لا |
| c4-l4 | public/art/c4/l4.webp | BG | A | 4 | نعم (5 محطات + غرفتا ماء) |
| c4-l7 | public/art/c4/l7.webp | BG | A | 4 | لا |
| c4-l2 | public/art/c4/l2.webp | BG | B | 4 | لا |
| c4-l3 | public/art/c4/l3.webp | BG | B | 4 | لا |
| c4-l5 | public/art/c4/l5.webp | BG | B | 4 | لا |
| c4-l6 | public/art/c4/l6.webp | BG | B | 4 | لا |
| c5-l1 | public/art/c5/l1.webp | BG | A | 5 | لا |
| c5-l4 | public/art/c5/l4.webp | BG | A | 5 | لا |
| c5-l7 | public/art/c5/l7.webp | BG | A | 5 | لا |
| c5-l2 | public/art/c5/l2.webp | BG | B | 5 | نعم (5 علامات مجرى) |
| c5-l3 | public/art/c5/l3.webp | BG | B | 5 | نعم (قطع خريطة منفصلة) |
| c5-l5 | public/art/c5/l5.webp | BG | B | 5 | لا |
| c5-l6 | public/art/c5/l6.webp | BG | B | 5 | لا |

### 3.3 البورتريهات (6 جديدة + 4 تعابير نور + 6 تعابير إضافية) — كلها 768×768 شفاف
| ID | الملف | الفئة | الطبقة | الدفعة |
|---|---|---|---|---|
| safiya-neutral (صورة قديمة باهتة) | public/art/chars/safiya-neutral.webp | CH | A | 1 |
| bashir-neutral | public/art/chars/bashir-neutral.webp | CH | A | 1 |
| nour-worried | public/art/chars/nour-worried.webp | EX | A | 1 |
| nour-smiling | public/art/chars/nour-smiling.webp | EX | A | 1 |
| nour-determined | public/art/chars/nour-determined.webp | EX | A | 1 |
| nour-curious | public/art/chars/nour-curious.webp | EX | B | 1 |
| saif-neutral | public/art/chars/saif-neutral.webp | CH | A | 2 |
| adam-smiling | public/art/chars/adam-smiling.webp | EX | B | 2 |
| adam-serious | public/art/chars/adam-serious.webp | EX | B | 2 |
| halima-neutral | public/art/chars/halima-neutral.webp | CH | A | 3 |
| halima-smiling | public/art/chars/halima-smiling.webp | EX | B | 3 |
| yunus-smiling | public/art/chars/yunus-smiling.webp | EX | B | 3 |
| othman-neutral (الحاج عثمان) | public/art/chars/othman-neutral.webp | CH | A | 4 |
| hala-serious | public/art/chars/hala-serious.webp | EX | B | 4 |
| rihab-neutral | public/art/chars/rihab-neutral.webp | CH | A | 5 |
| rihab-serious | public/art/chars/rihab-serious.webp | EX | B | 5 |

### 3.4 الأيقونات (46) — كلها 256×256 شفاف، `public/art/items/{id}.webp`
> **القائمة مؤقتة:** الـ IDs النهائية تأتي من حقل `icon` في ملفات الفصول (C وD وE وA). سأعدّل بعد استلامها.

| الدفعة | الأيقونات |
|---|---|
| 1 (11) | sun-disc, bird-carving, boat-piece, jar-wheat, jar-henna, jar-incense, jar-dates, calendar-page, old-photo, clay-seal, symbol-c1 |
| 2 (12) | river-stone, star-sign-1, star-sign-2, star-sign-3, star-sign-4, star-sign-5, knot-red, knot-blue, knot-yellow, knot-green, cargo-sack, symbol-c2 |
| 3 (10) | bead-blue, copper-weight, weaver-shuttle, spice-cumin, spice-cinnamon, spice-clove, spice-pepper, ledger-page, tea-glass, symbol-c3 |
| 4 (9) | carve-light, carve-wing, carve-channel, carve-anchor, carve-star, carve-reed, carve-smooth (اختياري), torch, symbol-c4 |
| 5 (4) | symbol-c5, notebook-safiya, brass-scale, stone-key |

الطبقة: A لـ sun-disc وbird-carving وboat-piece وsymbol-c1..c5 (مطلوبة في c4-l5 وc5-l5/l6)، والباقي B (بديلها lucide).

### 3.5 صورة لغز خاصة (1)
| ID | الملف المقترح | المقاس | الفئة | الطبقة | الدفعة |
|---|---|---|---|---|---|
| c4-l2-puzzle | public/art/c4/l2-puzzle.webp | 1024×1024 | PZ | B | 4 |

### 3.6 توزيع الدفعات
| الدفعة | الملف | المحتوى | العدد |
|---|---|---|---|
| 1 | PROMPTS_01_CH1.md | 3 UI + 7 BG + صفية وبشير + 4 تعابير نور + 11 أيقونة | 27 |
| 2 | PROMPTS_02_CH2.md | 7 BG + سيف + 2 تعبير آدم + 12 أيقونة | 22 |
| 3 | PROMPTS_03_CH3.md | 7 BG + حليمة (2 تعبير) + تعبير يونس + 10 أيقونات | 20 |
| 4 | PROMPTS_04_CH4.md | 7 BG + الحاج عثمان + تعبير هالة + c4-l2-puzzle + 9 أيقونات | 19 |
| 5 | PROMPTS_05_CH5.md | 7 BG + رحاب (2 تعبير) + 4 أيقونات | 13 |
| | | **المجموع** | **101** |

الترتيب داخل كل دفعة: UI (إن وُجدت) ← الطبقة A (l1, l4, l7) ← l2, l3, l5, l6 ← بورتريهات ← أيقونات. وفي آخر كل ملف جدول تتبّع بـ checkbox.

---

## 4) قرارات A على الأسئلة (معتمدة)

1. مسار صورة لغز c4: `public/art/c4/l2-puzzle.webp` (1024×1024).
2. IDs الشخصيات: `nour, safiya, bashir, adam, saif, yunus, halima, hala, othman, rihab` والصيغة `{id}-{mood}`.
3. البورتريه 768 (العقد).
4. `docs/SYMBOLS.md` جاهز: الشمس، الموجة، الميزان، العين، الخيط (`symbol-c1..c5`). تظهر بشكل صغير (≈12% من العرض) على خلايا `ui/map-full`، رمز لكل خلية من 1 إلى 5.
5. المرجع في `docs/reference/` (`village.jpg` و`nour.png`). بورتريهات neutral لـ nour وadam وyunus وhala موجودة في `public/art/chars` ولا تُعاد (لم تكن في الجرد أصلاً).
6. استثناء الخرائط من الأنكور: موافق.
7. أسماء الأيقونات مؤقتة: قبل كل دفعة `grep "icon:" src/content/chapters/*.ts` وتحديث الجرد وإبلاغ مازن بالتغيير.

**تعديل لاحق (الدفعة 1):** (أ) `ui/map-full` صار خلايا لا شرائح. (ب) أيقونات `jar-*` تُظهر المحتوى بلا أغطية ملوّنة. (ج) تحديث 31/10: صار المجموع 98 (حُذف `market-scissors` تخميناً بلا مرجع؛ `carving-*` صارت `carve-light/wing/channel/anchor` لتطابق ids عناصر `ch4.ts`؛ أُضيفت `notebook-safiya` و`brass-scale` و`stone-key` لأزواج c5-l1). (د) تحديث NEXT4 (31/10): c4-l1 صار بست علامات فأُضيفت `carve-star` و`carve-reed` و`carve-smooth` (المجموع 101)، وأُعيدت كتابة `c4-l2-puzzle` (عين في المركز ومجرى من الأعلى للأسفل بلا ظلال على الحواف)، واعتُمد ICON_ANCHOR نسخة 2 والأيقونات بلا مرجع. (هـ) `jar-wheat` و`jar-henna` و`jar-incense` و`jar-dates` من الطبقة B إلى **A** (c1-l4 من الطبقة A).

---

## 5) جدول التتبّع (الدفعة 0)
- [x] A وافق على الجرد
- [x] الأنكورات الثلاثة معتمدة
- [x] أسئلة القسم 4 اتجاوبت
- [ ] مازن استلم القواعد (القسم 2)
