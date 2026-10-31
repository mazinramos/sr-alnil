# CHARACTERS — وصف ثابت لكل شخصية (الحساب F)

> المصدر الوحيد لوصف الشخصيات. كل برومبت بورتريه في `PROMPTS_01..05` يلصق «الوصف الثابت» هنا **حرفياً**. جيمناي لا يحافظ على نفس الوجه دائماً، فالوصف الحرفي مع إرفاق صورة الشخصية الموافق عليها هو ما يثبّت الشكل.
> المعرّفات من CONTRACT §10. صورة التعبير: `public/art/chars/{id}-{mood}.webp` (768×768 شفاف).

## كيف تُولَّد التعابير
1. أرفق `docs/reference/nour.png` (الأسلوب) وصورة الشخصية الموافق عليها إن وُجدت.
2. الصق **CHAR_ANCHOR** ثم سطر `Subject:` (الوصف الثابت أدناه) ثم سطر `Expression:` ثم `Constraints:`. هذا بالضبط ما في برومبتات الدفعات.
3. للشخصيات الموجودة (nour, adam, yunus, hala) أضف الجملة: *KEEP THE EXACT SAME FACE, hair, clothing and framing as the attached portrait of this character; only the facial expression and a small head tilt change.*

## إن اختلف الوجه بين تعبيرين
ثبات تعابير الشخصيات الجديدة **لم يُختبر بعد**، وجيمناي يحرّف الوجه أحياناً. قارن كل تعبير جديد بصورة الشخصية neutral المعتمدة. إن اختلف الوجه (الشكل، العينان، لون البشرة، الشعر أو الغطاء، الملابس) فقل لجيمناي إحدى الجملتين، **ومعها صورة neutral المعتمدة مرفقة في الرسالة نفسها**:

**1) إعادة توليد (الأولى دائماً):**
```
Regenerate this image. It must be exactly the same person as in the attached approved portrait: the same face shape, eyes, nose, mouth, skin tone, hair, head covering and clothing, with the same framing and pose. Only the facial expression changes, to: <التعبير>.
```
**2) إن فشلت الأولى مرة، عدّل الصورة بدل توليد جديدة:**
```
Edit the attached approved portrait instead of creating a new one. Keep everything identical (face, hair, head covering, clothing, framing, plain light-gray background) and change ONLY the facial expression to: <التعبير>.
```
- ولّد كل تعابير الشخصية في **المحادثة نفسها** التي ولّدت فيها neutral.
- إن فشل التعبير **مرتين**: اتركه وأخبر A. اللعبة تعمل بدونه، إذ تعرض الواجهة تعبيراً مفقوداً بصورة neutral (ثم بحرف الاسم الأول إن غابت neutral).
- **لا تغيّر وجه neutral المعتمد أبداً** لتوافق تعبيراً جديداً. التعبير هو الذي يُعاد.

## CHAR_ANCHOR
```
Half-body character portrait, painterly realistic digital painting, same style, palette and lighting quality as the reference image, soft warm light from the front-left, calm dignified presence, Sudanese character with natural proportions and natural hands (hands out of frame or simply resting), plain flat light-gray background with clean edges for easy cutout, no shadows on the background. Muted palette: sandy gold, terracotta brown-red, calm Nile blue, dusty palm green, warm violet shadows. No text, no letters, no watermark, no logo-like props. Square 1:1 ratio, 1024x1024.
```

## الشخصيات
| المعرّف | الاسم | الحالة | المرجع المرفق | بصمة لونية | التعابير |
|---|---|---|---|---|---|
| nour | نور | موجودة | `docs/reference/nour.png` | كحلي + رمادي أزرق | neutral، worried، smiling، determined، curious |
| safiya | صفية | جديدة | `docs/reference/nour.png` | أبيض باهت (سيبيا) | neutral |
| bashir | بشير | جديد | `docs/reference/nour.png` | كريمي + رمادي أزرق | neutral |
| adam | آدم | موجود | `public/art/chars/adam-neutral.webp` | أزرق رمادي | neutral، smiling، serious |
| saif | سيف | جديد | `docs/reference/nour.png` | أزرق رمادي (أصغر من أبيه) | neutral |
| yunus | يونس | موجود | `public/art/chars/yunus-neutral.webp` | أسمر + ترابي | neutral، smiling |
| halima | حليمة | جديدة | `docs/reference/nour.png` | ترابي + خردلي + أزرق | neutral، smiling |
| hala | هالة | موجودة | `public/art/chars/hala-neutral.webp` | فحمي + كحلي | neutral، serious |
| othman | الحاج عثمان | جديد | `docs/reference/nour.png` | أبيض + كريمي + بنّي | neutral |
| rihab | رحاب | جديدة | `docs/reference/nour.png` | أخضر ترابي + زيتوني + كريمي | neutral، serious |

### nour — نور
- الحالة: موجودة (أرفق صورتها neutral مع كل تعبير)
- المرجع المرفق: `docs/reference/nour.png`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A young Sudanese woman in her early twenties, smooth dark-brown skin, calm direct dark eyes, strong straight eyebrows, full lips, small curls of black hair showing at the temple. She wears a navy-blue draped headscarf wrapped loosely around her head and neck, a worn gray-blue canvas jacket with a turned collar over a cream cotton shirt, and holds a dark brown spiral notebook against the lower right of the frame. Half-body, shoulders turned slightly to the left.
```

### safiya — صفية
- الحالة: جديدة (ولّد neutral أولاً ثم اعتمدها كمرجع للتعابير)
- المرجع المرفق: `docs/reference/nour.png`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
An elderly Sudanese woman in her seventies, calm gentle face with soft deep lines and kind steady eyes, a faint peaceful half-smile. She wears a white cotton tob draped over her head and shoulders, with a simple plain edge. The image should look like a faded old photograph that has been painted: slightly desaturated warm sepia-tinted tones, soft focus, gentle low contrast, faint paper-age warmth in the skin tones. Slight three-quarter view, shoulders turned a little to the left.
```

### bashir — بشير
- الحالة: جديدة (ولّد neutral أولاً ثم اعتمدها كمرجع للتعابير)
- المرجع المرفق: `docs/reference/nour.png`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A Sudanese man in his sixties, the grandmother's old neighbor and keeper of stories, warm weathered face with deep smile lines, short neat gray beard, kind amused eyes. He wears a clean white cloth turban (imama) wound neatly, and a long off-white cotton jalabiya with a rounded collar, a folded muted blue-gray cloth over one shoulder. Slight three-quarter view, shoulders turned a little to the right.
```

### adam — آدم
- الحالة: موجودة (أرفق صورتها neutral مع كل تعبير)
- المرجع المرفق: `public/art/chars/adam-neutral.webp`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A lean Sudanese man in his thirties, a river navigator, dark-brown skin, short trimmed black beard and thin mustache, strong cheekbones and watchful eyes. He wears a small snug knitted kufi cap in muted beige and blue patterns, a faded blue-gray cotton shirt with an open collar, and a coil of natural rope resting on his shoulder. Head turned slightly to the left.
```

### saif — سيف
- الحالة: جديدة (ولّد neutral أولاً ثم اعتمدها كمرجع للتعابير)
- المرجع المرفق: `docs/reference/nour.png`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A Sudanese boy of about ten, Adam's young son, slim with short black hair, big bright curious dark eyes, a small gap-toothed hint of a smile, a tiny scar on his chin. He wears a faded blue-gray cotton shirt a little too large for him with the collar open, like a smaller version of his father's, and a thin twine bracelet. Slight three-quarter view, chin a little raised.
```

### yunus — يونس
- الحالة: موجودة (أرفق صورتها neutral مع كل تعبير)
- المرجع المرفق: `public/art/chars/yunus-neutral.webp`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A Sudanese merchant in his fifties, warm round-featured face, short curly black hair with gray at the temples, a short gray-white beard, a kind knowing half-smile. He wears a tan collarless cotton shirt and a terracotta-brown sleeveless waistcoat. Facing the viewer, shoulders squared.
```

### halima — حليمة
- الحالة: جديدة (ولّد neutral أولاً ثم اعتمدها كمرجع للتعابير)
- المرجع المرفق: `docs/reference/nour.png`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A Sudanese woman in her fifties who sells tea in the market, round warm face, laugh lines, bright knowing eyes, tiny gold stud earrings. She wears a colorful but muted tob in terracotta red, mustard gold and Nile blue stripes draped over her hair and shoulders, a plain cream cotton blouse underneath. Slight three-quarter view, shoulders turned a little to the right.
```

### hala — هالة
- الحالة: موجودة (أرفق صورتها neutral مع كل تعبير)
- المرجع المرفق: `public/art/chars/hala-neutral.webp`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A Sudanese woman in her forties, the guardian of the ruins, composed and watchful with steady dark eyes and a firm calm mouth. She wears a charcoal-gray scarf draped over her head and neck, and a dark navy work shirt with a small chest pocket and collar. Facing the viewer.
```

### othman — الحاج عثمان
- الحالة: جديدة (ولّد neutral أولاً ثم اعتمدها كمرجع للتعابير)
- المرجع المرفق: `docs/reference/nour.png`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A very old Sudanese sheikh in his late seventies, thin dignified face with deep lines, a full white beard, calm wise deep-set eyes. He wears a white cloth turban (imama) and a plain cream cotton jalabiya, and a string of dark brown wooden prayer beads hangs around his neck over the robe. Slight three-quarter view, shoulders turned a little to the left.
```

### rihab — رحاب
- الحالة: جديدة (ولّد neutral أولاً ثم اعتمدها كمرجع للتعابير)
- المرجع المرفق: `docs/reference/nour.png`
- الوصف الثابت (يُلصق حرفياً في سطر `Subject:`):
```
A young Sudanese woman in her late twenties, the archive keeper, clever focused face, thin round tortoiseshell glasses, a faint curious half-smile. She wears a dusty palm-green cotton headscarf neatly wrapped, an olive knitted cardigan over a cream blouse, a pencil tucked in at the side of the scarf, and a thin cream-covered ledger held against her chest with only its cover edge visible. Slight three-quarter view, shoulders turned a little to the right.
```

## ملاحظات اتساق
- **الألوان:** كل شخصية لها بصمة لونية في الجدول لتتميّز عن غيرها وهي تقف بجانب نور في الحوارات. لا تغيّر ألوان الملابس بين التعابير.
- **الاتجاه:** نور وآدم يميلان لليسار، وبشير وسيف وحليمة ورحاب لليمين، لتتوزّع الشخصيات يميناً ويساراً في شاشة الحوار.
- **الملابس والإكسسوار:** كل إكسسوار مذكور في الوصف (حبل آدم، مسبحة عثمان، نظارة رحاب، دفتر رحاب الكريمي) هو علامة التعرّف الأولى، فلا يُحذف.
- **الأيدي:** بورتريه نصف جسم بلا أيدٍ ظاهرة قدر الإمكان.
- **الصور القديمة (صفية):** الباهتة سيبيا ملاحظة فنية متعمّدة؛ الخلفية تبقى رمادية فاتحة للقص.
