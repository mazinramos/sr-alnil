# NEXT2_B — تحقق آلي للمحتوى + دليل النشر
شغلك السابق ممتاز (نتيجة البوس والصوت والترحيل والاختبارات). تبقى:
## قبل ما تبدأ
`git pull --rebase origin main` (آخر main فيه عمل B وC وD وE وF). نفس ملف START والتوكن. اعمل في ملفاتك فقط. قبل كل push: `npm run typecheck` ثم `npm run check` (وبعد الـ rebase دائماً). ارسل لمازن التقرير بنفس القالب بعد كل push.
**المواعيد:** أول دفعة السبت 14:00، كل شيء السبت 22:00، ثم G2 الأحد 12:00.

## المهام
1. **`scripts/check-content.mjs` + `npm run test:content`:** يمرّ على كل مستويات `content/chapters/*` ويفشل (exit 1) عند: id مكرر أو لا يطابق chapter/index؛ `hints` ليست 3؛ `dialogue` خارج 2–4؛ `clues` أقل من 2؛ لغز sequence/codelock/cipher/matching/route/deduction/choice فيه معرّف في `solution`/`correct`/`answer` غير موجود ضمن عناصره؛ codelock طول الحل لا يساوي `length`؛ balance لا يوجد مجموع ممكن يساوي الهدف ضمن `maxItems`؛ `reward` غير موجود في مستوى boss؛ مستوى 7 بدون `isBoss`. يطبع تحذيراً (لا فشلاً) لـ `clues` أكثر من 3.
2. **`docs/MISSING_ASSETS.md` مولَّد آلياً** بـ `npm run report:assets`: كل `background` و`icon` و`portrait` مستعمل في المحتوى ولا يوجد ملفه في `public/art`، مرتبة بالفصل والأولوية (الطبقة A: l1 وl4 وl7). مازن يستعمله كقائمة مراجعة بعد التوليد.
3. **`docs/DEPLOY.md`:** خطوات بالعربية لمازن لربط الريبو بـ Vercel (Root Directory=`artifacts/nile-secrets`، Build=`npm run build`، Output=`dist`)، وكيف يتأكد بعد النشر (فتح `#/` على الموبايل). بدون افتراض أنه يعرف Vercel.
4. **نظّف:** أي نص "قيد التطوير" يظهر لنوع لغز موجود فعلاً، وأي مرجع إلى `src/game/` القديم.
5. بعد وصول الصور (مازن يرفعها): شغّل `optimize-images` على ما رُفع وأبلغ إن تجاوز أي ملف الحد.
