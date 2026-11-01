# تحريك الصور → مقاطع (الأداة: صورة إلى فيديو)
## الأدوات (جرّب بالترتيب حسب رصيدك)
أي أداة بتدّي صورة→فيديو: **Kling** (kling.ai)، **Hailuo/MiniMax** (hailuoai.video)، **Luma Dream Machine**، **PixVerse**، **Pika**، **Adobe Firefly (فيديو)**، أو **Veo** في Gemini لو حسابك بيتيحو. حسب مقارنات منشورة، الرصيد المجاني محدود ومعاه علامة مائية غالباً ودقة 480–720p والمقطع حوالي 4–10 ثواني. دا كافي لمشروعنا.
> العلامة المائية: قص الإطار (crop) 5% من الأطراف بالمونتاج أو استخدم أداة بلا علامة (Firefly/Canva). لا تحاول إزالتها بأدوات خارجية؛ نذكر الأداة في التقرير.

## القواعد
1. **ارفع الصورة من `images/` كما هي** (16:9). اختار 16:9 ومدة 5 ثواني، ودقة 720p أو أعلى.
2. اكتب البرومبت بالإنجليزي (أدق). الصق الـ Negative إن وُجد خانة له.
3. **لا تُغيّر الوجوه:** لو الوجه اتغيّر، أعد المحاولة أو استخدم Ken Burns بدل المقطع.
4. جرّب 2–3 مرات للمشهد واختار الأحسن.
5. سمّي الناتج بالاسم الموجود في الجدول (clip_01.mp4 ...). **لا تُجري S06 بالـ AI** (7 لقطات): وفّر رصيدك.

## البرومبتات
**clip_01** — الصورة: `01_dawn_village.jpg`
```
Slow gentle camera push-in over the calm Nile at sunrise. The small sailboat drifts slowly across the water, soft ripples spread, light mist floats above the river, warm golden light shifts gradually. Keep the painterly illustration style exactly. No people, no text, no new objects, no camera shake.
```
**clip_02** — `02b_safiya_voice.jpg`
```
Very slow push-in. The pages of the open handwritten notebook flutter very slightly in a warm breeze, dust motes drift in the window light, palm leaves outside sway gently. The elderly woman breathes softly and blinks once, her face stays identical. Painterly style preserved. No text, no new objects.
```
**clip_03** — `03_nour_in_room.jpg`
```
The young woman slowly turns her head and looks around the room with a worried, wondering expression, she blinks and breathes subtly. Warm light from the doorway shifts softly, dust floats. Keep the face, hair, scarf and clothing identical. Painterly style preserved. No text.
```
**clip_04** — `04_chest_signs.jpg`
```
Slow camera push-in toward the open carved wooden chest. A shaft of warm light moves slowly across the chest and the wall, dust motes sparkle in the air, the river outside the window glimmers. Painterly style preserved. No people, no text, no new objects.
```
**clip_05** — `05_map_pieces.jpg`
```
Slow zoom in on the old parchment map. The blue river gently shimmers as if water is flowing along its course, the parchment glows softly. Subtle, elegant motion only. No text changes, no new objects, painterly style preserved.
```
**clip_07** — `07_nour_determined.jpg`
```
The young woman lifts her gaze toward the horizon with quiet determination, her head scarf moves gently in the breeze, the sunset glow slowly shifts on the water behind her. Slow push-in. Keep the face and clothing identical. Painterly style preserved. No text.
```
**clip_08** — `08_title_river.jpg`
```
Slow aerial glide forward along the winding Nile at golden hour, gentle water sparkle, light haze, palm trees on the banks sway very slightly. Painterly style preserved. No people, no text.
```
**Negative (لو في خانة):** `morphing, distorted face, extra fingers, text, subtitles, watermark, flicker, fast camera movement, new characters`

## مخرجاتك
`clip_01.mp4`, `clip_02.mp4`, `clip_03.mp4`, `clip_04.mp4`, `clip_05.mp4`, `clip_07.mp4`, `clip_08.mp4`.
لو مقطع ما نجح: الصورة نفسها بـ Ken Burns في المونتاج (مقبول وسريع).
