# صورة 15 — adam-smiling

> **الخطوة 1:** افتح محادثة جديدة في جيمناي وارفق: `00_RULES_FOR_GEMINI.md` + `_references/nour.png` + `_references/adam-neutral.png` (وجه الشخصية نفسها، ليبقى الوجه ثابتاً).
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط، واكتب تحتها اسم الملف: adam-smiling.png».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`adam-smiling.png`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `public/art/chars/adam-smiling.webp`.

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
