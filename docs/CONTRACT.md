# CONTRACT.md — عقد مشروع "سر النيل" (35 مستوى)

> كل حساب بيلصق الملف دا في أول رسالة. أي تعارض بين brief وهذا العقد، **العقد يكسب**. أي تعديل في العقد بيجي من المشرف (A) بس.

## 0. القرارات الثابتة
- المشروع الحالي: React 19 + Vite + TypeScript + Tailwind v4، داخل `artifacts/nile-secrets/`. **ما بنبدأ مشروع جديد ولا بنغيّر أسماء ملفات موجودة.**
- اللعبة بيانات (data-driven): المستوى = ملف بيانات + نوع لغز جاهز. إضافة مستوى = إضافة كائن، مش كود.
- 35 مستوى = **5 فصول × 7 مستويات**. الفصل الخامس نفسو هو "سر النيل". للتوسّع لـ 100: فصول جديدة بس (ملف واحد لكل فصل).
- بدون مؤقت. 3 تلميحات لكل مستوى. نجوم 1-3 حسب التلميحات والمحاولات.
- حفظ محلي (localStorage) أولاً. Firebase اختياري خلف flag (القسم 7).
- كل النصوص عربي RTL. اللاعبة بتتخاطب بالمؤنث ("اختاري"، "رتّبي").

## 1. هيكل المجلدات وملكية كل حساب
```
artifacts/nile-secrets/src/
  engine/            ← B فقط  (LevelRunner, store, router, audio, coords picker)
  puzzles/<type>/    ← مالك النوع فقط (index.tsx + demo.ts)
    sequence hotspot matching codelock choice      ← C
    route balance tiles memory                     ← D
    cipher deduction jigsaw                        ← E
  content/
    types.ts         ← A فقط (القسم 2) — B ينسخه للمشروع
    chapters/ch1.ts  ← C    ch2.ts ← D    ch3.ts ← E    ch4.ts, ch5.ts ← A
  game/              ← قديم. B يهاجر منه ثم يتركه (لا حذف قبل ما اللعبة تشتغل بالجديد)
public/art/          ← F يكتب البرومبتات، ومازن يولّد ويضع الملفات
  c1/l1.webp ... c5/l7.webp   ← خلفيات المستويات (القسم 5)
  chars/<id>-<mood>.webp      ← بورتريهات شفافة
  items/<id>.webp             ← أيقونات الألغاز
  ui/title.webp  ui/nile-map.webp  ui/map-full.webp  ← شاشات عامة
```
قاعدة: **ما أحد بيلمس ملف مالكو حساب تاني.** محتاج تعديل؟ اكتبو في تقريرك تحت "يحتاج من حساب تاني".

## 2. العقد البرمجي — `content/types.ts` (A يكتبو، الباقي يقرأ)
```ts
export type Item = { id: string; label: string; detail?: string; icon?: string };

export type PuzzleConfig =
  | { type: "sequence";  items: Item[]; solution: string[] }
  | { type: "hotspot";   targets: { id: string; label: string; x: number; y: number; r: number }[]; needed: number } // x,y,r بالنسبة المئوية من الصورة
  | { type: "matching";  left: Item[]; right: Item[]; solution: Record<string, string> }
  | { type: "codelock";  symbols: Item[]; length: number; solution: string[] }
  | { type: "choice";    question: string; options: Item[]; correct: string[]; multi?: boolean }
  | { type: "route";     nodes: { id: string; x: number; y: number; label: string; detail?: string }[]; pick: number; solution: string[] }
  | { type: "balance";   weights: { id: string; label: string; value: number }[]; target: number; maxItems?: number }
  | { type: "tiles";     size: [number, number]; tiles: { id: string; rot: number }[]; solution: { id: string; rot: number }[] }
  | { type: "memory";    pairs: Item[] }
  | { type: "cipher";    key: Item[]; cipherText: string[]; answer: string[] }
  | { type: "deduction"; rows: Item[]; cols: Item[]; solution: Record<string, string> }
  | { type: "jigsaw";    image: string; pieces: number };

export interface Clue { id: string; title: string; text: string; source: string }

export interface Level {
  id: `c${number}-l${number}`;       // مثال: c3-l4
  chapter: number;                   // 1..5
  index: number;                     // 1..7
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  background: string;                // "/art/c3/l4.webp"
  focal?: { x: number; y: number; zoom?: number }; // لو استخدمنا خلفية الفصل مشتركة (القسم 5)
  character: string;                 // id في CHARACTERS
  dialogue: { speaker: string; text: string }[];   // 2-4 أسطر
  objective: string;                 // جملة "ما ينبغي فعله"
  clues: Clue[];                     // 2-3 دلائل، الحل ممكن يُستنتج منها فقط
  puzzle: PuzzleConfig;
  hints: [string, string, string];   // الثالث بس يقدر يكشف الحل
  successText: string;
  isBoss?: boolean;                  // المستوى 7 في كل فصل
  reward?: { id: string; label: string };  // قطعة الخريطة في المستوى 7
}

export interface Chapter {
  id: number; title: string; location: string; summary: string;
  mapPiece: { id: string; label: string };
  levels: Level[];                   // الموجود فعلياً (1..7) بترتيب index — مو لازم 7
}

export interface PuzzleProps<C extends PuzzleConfig> {
  config: C;
  background: string;                // مسار خلفية المستوى ("/art/c1/l1.webp"). hotspot وroute يرسمانه بإطار 3:2 ويضعان النقاط فوقه بالنسب المئوية
  hintLevel: 0 | 1 | 2 | 3;          // المحرّك يمرّرو؛ النوع يقدر يبرز تلميح بصري (اختياري)
  onResult: (correct: boolean) => void;  // يُنادى عند كل "تأكيد"، النوع ما بيقرر النجوم
}
```
**كل نوع لغز = مكوّن واحد** `export default function XPuzzle(props: PuzzleProps<Extract<PuzzleConfig,{type:"x"}>>)` في `puzzles/x/index.tsx`، + ملف `demo.ts` فيه `export const demo: Extract<PuzzleConfig,{type:"x"}>` شغّال يستعملو B في صفحة المعاينة.

## 3. قواعد اللغز الجيّد (تُراجَع في البوابات)
1. **ممنوع الحل بالتخمين:** عدد الاحتمالات ≥ 100، أو الإجابة محتاجة دليلاً مكتوباً.
2. **الدلائل لازم تكفي:** لو شلنا الدلائل، المستوى ما ينحلّ بالمنطق.
3. **التلميح 1** يوجّه للدليل، **2** يضيّق، **3** وحدو يكشف الحل.
4. اللمس أولاً: أزرار ≥ 44px، سحب وإفلات لازم يكون عندو بديل "اضغطي للاختيار".
5. لا مؤقت. لا فشل نهائي. رسالة الخطأ تقول شنو غلط من غير ما تكشف الحل.
6. كل مستوى يتحل في 1-4 دقائق (الأصعب 5).

## 4. التقدّم والنجوم (B يطبّق)
```ts
type ProgressV2 = {
  version: 2;
  completed: Record<string /*levelId*/, { stars: 1|2|3; hints: number; attempts: number }>;
  discoveredClues: string[];
  lastLevel: string;
  settings: { sound: boolean; textScale: 1 | 1.15 | 1.3 };
};
```
- نجوم: **3** = بدون تلميح وأقل من محاولتين خاطئتين، **2** = تلميح واحد أو حتى 3 أخطاء، **1** غير ذلك.
- **فتح مستوى:** *المستوى الموجود* السابق في ترتيب المحتوى (الفصول بالترتيب، والمستويات بحسب `index`) مكتمل. **فتح فصل:** آخر مستوى موجود في الفصل السابق مكتمل. (هذا يسمح بتسليم الطبقة A فقط: l1 ثم l4 ثم l7 تُفتح بالتتابع بدون أن يعلق اللاعب على مستويات غير موجودة.)
- ترحيل: `ProgressV1 → V2` (المراحل الخمس القديمة تتحوّل إلى c1-l2, c2-l1, c3-l1, c4-l1, c5-l7).
- مفتاح الحفظ الجديد: `nile-secrets-progress-v2`. القديم ما يتمسح.

## 5. الصور — مقاسات وتسمية
| النوع | الملف | المقاس | الصيغة |
|---|---|---|---|
| خلفية مستوى | `public/art/c{ch}/l{n}.webp` | 1536×1024 (3:2) | WebP ≤ 250KB |
| بورتريه | `public/art/chars/{id}-{mood}.webp` | 768×768 شفاف | WebP ≤ 200KB |
| أيقونة لغز | `public/art/items/{id}.webp` | 256×256 شفاف | WebP ≤ 40KB |
| شاشات عامة | `public/art/ui/title.webp` و`nile-map.webp` و`map-full.webp` | 1536×1024 | WebP ≤ 300KB |
- **الخريطة الكاملة:** صورة واحدة `map-full.webp` (خريطة صفية). قطعة كل فصل = **قصاصة** منها (الصورة تُقسَّم لخمسة أشرطة عمودية متساوية؛ قطعة الفصل n = الشريط n بدءاً من اليمين، حسب اتجاه القراءة العربي)، تُقتطع بالكود (`background-position`) وتُعرض بحافة ممزقة (`clip-path`). مستوى jigsaw يقطّع القصاصة لأجزاء. **الفصل 5 يركّب الصورة كاملة.** لا صور منفصلة للقطع.
- **إحداثيات الألغاز المعتمدة على الصورة (hotspot, route):** B يبني صفحة `/preview/coords?img=<path>`: ضغطة على الصورة تطبع `x,y` بالمئة. مالك المستوى يأخذ الإحداثيات منها بعد وصول الصورة الفعلية. لا تخمّن إحداثيات قبل رؤية الصورة؛ استخدم قيماً مؤقتة وسجّلها في التقرير.
- **خطة الطوارئ للصور:** لو ما كفى الوقت، المستوى يستخدم خلفية الفصل `c{ch}/l1.webp` مع `focal` مختلف (تكبير وإزاحة) فيظهر كمشهد مختلف.
- لو الصورة الفعلية ما وصلت بعد، الحساب يكتب المسار الصحيح، والمحرّك يعرض تدرّج لوني بديل (B يضيف fallback).

## 6. أسلوب الكتابة
- السرد: فصحى بسيطة. كلام الشخصيات: لهجة سودانية خفيفة مفهومة (مثل الموجود في `gameData.ts`).
- الحوار 2-4 أسطر. الدليل 1-2 جملة. التلميح جملة.
- **ما نخترع حقائق تاريخية.** القصة خيالية (ضفاف متخيّلة). لا أسماء أماكن أثرية حقيقية كحقيقة.
- كل نص بيتراجع من A لتوحيد الصوت. ممنوع تكرار نفس الصيغة ("الفكرة المهمة:" وأمثالها).

## 7. Firebase — **مؤجّل لما بعد التسليم (المرحلة 2)**. التصميم محفوظ هنا، لا يُنفَّذ قبل 2 نوفمبر.
- flag: `VITE_USE_FIREBASE=true`. لو false أو فشل الاتصال، اللعبة تشتغل محلياً بدون أي رسالة خطأ للاعبة.
- Auth: Anonymous كبداية (+ Google اختياري لاحقاً).
- Firestore: `users/{uid}` ← `{ progress: ProgressV2, updatedAt }`.
- دمج: لكل مستوى `max(stars)`، اتحاد الدلائل، `lastLevel` الأحدث.
- Rules: القراءة والكتابة للمستخدم صاحب الـ uid فقط.
- الواجهة في `engine/cloud.ts`: `loadCloud(uid)` و`saveCloud(uid, progress)`. بدون تفاصيل Firebase خارج هذا الملف.
- مفاتيح Firebase في `.env.local` ولا ترفع للـ repo.

## 8. سير العمل
- **الحسابات:** A (المشرف) وB فقط عندهم GitHub. C وD وE وF يسلّمون ملفات كاملة لمازن ليضعها في المشروع. **كل مخرج = ملفات كاملة بمساراتها، بدون diff.**
- قالب التقرير بنهاية كل جلسة:
```
الحساب: _ | اليوم: _ | الساعة: _
تم: (قائمة)
الملفات الجاهزة: (مسارات كاملة)
مشاكل / أسئلة:
يحتاج من حساب تاني:
جاهز للمراجعة؟ نعم/لا
```
- **الموعد النهائي: الاثنين 2 نوفمبر.** الجدول في PLAN_5DAYS.md.
- **بوابات:** G1 (الجمعة 30/10 مساءً): المحرّك + 12 نوع لغز في صفحة المعاينة. G2 (الأحد 1/11 ظهراً): كل ما هو جاهز مدمج وقابل للعب. G3 (الاثنين 2/11 صباحاً): تجميد الكود، ما يدخل إلا إصلاح خطأ يوقف اللعب.
- لا يُبدأ شغل جديد وفي ملاحظات حرجة من البوابة السابقة.
- **الطبقات:** الطبقة A = l1 وl4 وl7 من كل فصل (15 مستوى) تُسلَّم أولاً. الباقي (20) يُدمج كلما اكتمل.

## 9. المكتبات وملف package.json
- مشروع Vite مستقل داخل `artifacts/nile-secrets/` (npm). المرجع: ما هو مدفوع في الـ repo.
- المتوفر: React 19، Tailwind 4. **يضيف B في اليوم 1:** `framer-motion` و`lucide-react`. لا أحد غير B يعدّل `package.json`؛ تحتاج مكتبة؟ اكتب اسمها وسببها في تقريرك.
- قبل تسليم أي ملف لمازن للدمج: `npm run typecheck` يجب أن يمرّ بدون أخطاء.
- الأنماط: Tailwind + متغيرات `--nile-deep` و`--nile-water` و`--papyrus` و`--ink` و`--ember` من `index.css`. لا ألوان جديدة خارج هذه المتغيرات إلا للضرورة.
