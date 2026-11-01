# الأصوات (من النص إلى صوت)
## الخيارات (من الأفضل للأقل أصالة)
1. **تسجيل بشري (الأصدق):** سجّل أنت وأصحابك بالموبايل في غرفة هادية، 44.1kHz، وحسّن الصوت بـ Audacity أو Adobe Podcast Enhance. **الدارجي السوداني الحقيقي ما بتقدر عليهو أي أداة AI بشكل مضمون.**
2. **Gemini TTS في Google AI Studio** (aistudio.google.com، نماذج Gemini TTS): بتكتب النص وتحدد الأسلوب بجملة (مثلاً الطبع والسرعة واللهجة)، وبيدعم عدة متحدّثين. جرّب وراجع النتيجة.
3. **ElevenLabs** (elevenlabs.io): الرصيد المجاني محدود جداً. فيها **Voice Design** (تصف الصوت بنص فيطلع صوت) والعربية مدعومة، لكن ما في ضمان للهجة السودانية.
> بصراحة: الأدوات غالباً بتطلّع نطق «فصيح/مصري/خليجي». للتقريب، اكتب النص بالحروف كما هو واذكر في البرومبت: «Sudanese Arabic accent, pronounce ق as hard g». لو النتيجة ما اقتنعت بيها، استخدم التسجيل البشري للشخصيات الرئيسية (صفية ونور) والـAI للبقية.

## وصف صوت كل شخصية (للصق في Voice Design أو كأمر أسلوب)
- **صفية:** `Elderly Sudanese Arabic woman, about 75, warm, slightly husky, very slow and tender, soft gentle echo like a voice reading from an old notebook, wise and loving.`
- **نور:** `Young Sudanese Arabic woman, about 24, warm clear voice, thoughtful and curious, medium pace, light Khartoum accent.`
- **بشير:** `Sudanese Arabic man, about 62, deep warm slow voice, gentle storyteller, smiling tone, Nile-side accent.`
- **يونس:** `Sudanese Arabic man, about 45, lively and quick, playful trader's tone, Omdurman market accent.`
- **حليمة:** `Sudanese Arabic woman, about 55, warm motherly voice, friendly and slightly laughing, Omdurman accent.`
- **آدم:** `Sudanese Arabic man, about 38, calm smooth baritone, confident and quiet, Nile boatman.`
- **هالة:** `Sudanese Arabic woman, about 45, low firm voice, serious and brief, no-nonsense.`
- **الحاج عثمان:** `Very old Sudanese Arabic man, about 78, deep calm very slow voice, dignified and wise.`
- **رحاب:** `Sudanese Arabic woman, about 32, soft precise voice, calm and educated, reader's tone.`
- **سيف (مستقبلاً):** `Sudanese Arabic boy, about 10, bright excited energetic voice.`

## الأسطر (كل سطر ملف MP3 مستقل، بالاسم الموضّح)
اضغط الصمت: أول 0.2 ثانية وآخر 0.2 ثانية فقط.
| الملف | المتكلّم | النص | المدّة المسموحة |
|---|---|---|---|
| `vo_01_safiya.mp3` | صفية | يا نور... لو الدفتر دا وصل ليك، يعني أنا سافرت ولسه ما لحقت أحكي ليك. | ≤ 5.5 ث |
| `vo_02_safiya.mp3` | صفية | كل حاجة مهمة كتبتها هنا. وخبّيت ليك سر على ضفة النيل. | ≤ 6.5 ث |
| `vo_03_nour.mp3` | نور | حبوبتي ما كانت بتخبّي حاجة من غير سبب. | ≤ 4.5 ث |
| `vo_04_safiya.mp3` | صفية | تلاتة علامات: الشمس، والطيّر، والمركب. دوّري عليهم. | ≤ 5.5 ث |
| `vo_05_safiya.mp3` | صفية | والعلامات بتودّيك لخريطة... متقطّعة في خمس حتّات. | ≤ 6.5 ث |
| `vo_06a_bashir.mp3` | بشير | الحبوبة كانت بتخبّي الحاجة في المكان البشبهها. | ≤ 2.8 ث |
| `vo_06b_yunus.mp3` | يونس | الأغراض بتتكلّم يا بتي... بس بدفتر السوق. | ≤ 2.8 ث |
| `vo_06c_halima.mp3` | حليمة | اقعدي اشربي الشاي الأول يا بتي. | ≤ 2.8 ث |
| `vo_06d_adam.mp3` | آدم | النجوم ما بتكضّب، بس لازم تعرفي تقريها. | ≤ 2.8 ث |
| `vo_06e_hala.mp3` | هالة | الحيط دا أقدم من كل الحارسات. | ≤ 2.8 ث |
| `vo_06f_othman.mp3` | الحاج عثمان | الحجر بيحكي زي الناس. | ≤ 2.8 ث |
| `vo_06g_rihab.mp3` | رحاب | الزول البيحفظ المكان بيحفظ الحكاية. | ≤ 2.8 ث |
| `vo_07_nour.mp3` | نور | حأفتح الحكاية... حتّة حتّة. | ≤ 4.5 ث |
| `vo_08_safiya.mp3` | صفية | والسر دا... ليك يا نور. | ≤ 5 ث |

## برومبت Gemini TTS (قالب، غيّر الاسم والنص)
```
Read the following line as [PERSONA from the list above]. Sudanese Arabic dialect, pronounce the letter ق as a hard "g" as Sudanese speakers do. Natural, emotional, not theatrical, no robotic pauses. Speak at [slow/medium] pace.
Text: «[النص]»
```
**لو نتيجة سطر أطول من الوقت:** قصّ الصمت، أو زد السرعة 5–8% في Audacity (Effect → Change Tempo).
**مخرجاتك:** 14 ملف `vo_*.mp3` (أو 5 للشخصيات الرئيسية + بقيتها بالتسجيل).
