# صورة 02 — ui-title

> **الخطوة 1:** ارفق مع هذا الملف في جيمناي: `00_RULES_FOR_GEMINI.md` (إن لم تكن مرفوعة في نفس المحادثة) + صورة المرجع `_references/village.jpg`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`ui-title.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/ui/title.webp`.

- الملف: `public/art/ui/title.webp`
- الحجم المطلوب: 1536×1024 (3:2)
- الدفعة والأولوية: Batch 1 — الطبقة A
- الغرض: خلفية شاشة العنوان. اسم اللعبة يُكتب بالكود فوق الصورة، لذلك الثلث العلوي لازم يكون هادئاً وفارغاً.
- المرجع المرفق: `docs/reference/village.jpg`
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
