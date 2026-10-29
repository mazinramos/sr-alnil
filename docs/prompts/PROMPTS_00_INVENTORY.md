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

### ICON_ANCHOR (كل الأيقونات)
```
Single game puzzle icon, painterly realistic digital painting with soft shading, same art style, palette and lighting quality as the reference image, the object centered and filling about 80 percent of the square, slightly three-quarter view, soft warm light from the upper left, plain flat light-gray background with clean edges for easy cutout, no cast shadow on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. Instantly readable at small size. No text, no letters, no numbers, no watermark. Square 1:1 ratio, 1024x1024.
```

**ملاحظة تقنية من الـ repo:** `puzzles/jigsaw` يقرأ `"/art/ui/map-full.webp#strip=N"` حيث N=1 أقصى اليمين، فالخريطة لازم تتقسّم تكوينياً لخمسة أشرطة عمودية متساوية (كل شريط ~307px من 1536).

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

---

## 3) الجرد الكامل (96 صورة)

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

### 3.4 الأيقونات (41) — كلها 256×256 شفاف، `public/art/items/{id}.webp`
> **القائمة مؤقتة:** الـ IDs النهائية تأتي من حقل `icon` في ملفات الفصول (C وD وE وA). سأعدّل بعد استلامها.

| الدفعة | الأيقونات |
|---|---|
| 1 (11) | sun-disc, bird-carving, boat-piece, jar-wheat, jar-henna, jar-incense, jar-dates, calendar-page, old-photo, clay-seal, symbol-c1 |
| 2 (12) | river-stone, star-sign-1, star-sign-2, star-sign-3, star-sign-4, star-sign-5, knot-red, knot-blue, knot-yellow, knot-green, cargo-sack, symbol-c2 |
| 3 (11) | bead-blue, copper-weight, weaver-shuttle, spice-cumin, spice-cinnamon, spice-clove, spice-pepper, ledger-page, tea-glass, market-scissors, symbol-c3 |
| 4 (6) | carving-light, carving-wing, carving-channel, carving-mooring, torch, symbol-c4 |
| 5 (1) | symbol-c5 |

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
| 3 | PROMPTS_03_CH3.md | 7 BG + حليمة (2 تعبير) + تعبير يونس + 11 أيقونة | 21 |
| 4 | PROMPTS_04_CH4.md | 7 BG + الحاج عثمان + تعبير هالة + c4-l2-puzzle + 6 أيقونات | 16 |
| 5 | PROMPTS_05_CH5.md | 7 BG + رحاب (2 تعبير) + 1 أيقونة | 10 |
| | | **المجموع** | **96** |

الترتيب داخل كل دفعة: UI (إن وُجدت) ← الطبقة A (l1, l4, l7) ← l2, l3, l5, l6 ← بورتريهات ← أيقونات. وفي آخر كل ملف جدول تتبّع بـ checkbox.

---

## 4) أسئلة لـ A (قبل الموافقة)

1. **مسار c4-l2-puzzle:** العقد §5 ما فيه مسار لصورة اللغز. المقترح `public/art/c4/l2-puzzle.webp` (1024×1024، ≤ 250KB). موافق، أم مسار تاني؟
2. **IDs الشخصيات:** افترضت `safiya`, `bashir`, `saif`, `halima`, `othman`, `rihab` و`{id}-{mood}`. لا يوجد `gameData.ts` ولا `CHARACTERS` في الـ repo حالياً؛ B سيبني `engine/characters.ts` (REVIEW_B_D1 §5). أحتاج تأكيد IDs هناك، وأن الموجودين `nour`, `adam`, `yunus`, `hala`.
3. **بورتريه 768 مقابل 1024:** ART.md يقول 1024 والعقد يقول 768. اعتمدت العقد (توليد 1024 ثم تصغير لـ 768).
4. **رموز الفصول الخمسة:** `SYMBOLS.md` غير موجود في الـ repo بعد (BRIEF_A يكلّف A بكتابته). سأستعمل الرموز الافتراضية من BRIEF_A: **ف1 الشمس، ف2 الموجة، ف3 الميزان، ف4 العين، ف5 الخيط** كقيم مؤقتة في `ui/map-full` و`symbol-c1..c5`. لو غيّرها A في `SYMBOLS.md` أعدّل البرومبتات المتأثرة. متى يجهز الملف؟
5. **ما زال ناقصاً عندي:** `village.jpg` و`nour.png` (مرجع التوليد، مع مازن). أما `PLAN_5DAYS.md` فقرأته من الـ repo.
6. **استثناء الخرائط من الأنكور** (القسم 1) موافق؟
7. **قائمة الأيقونات المؤقتة** (3.4): هل ترسل A/C/D/E أسماء الأيقونات الفعلية؟

---

## 5) جدول التتبّع (الدفعة 0)
- [ ] A وافق على الجرد
- [ ] الأنكورات الثلاثة معتمدة
- [ ] أسئلة القسم 4 اتجاوبت
- [ ] مازن استلم القواعد (القسم 2)
