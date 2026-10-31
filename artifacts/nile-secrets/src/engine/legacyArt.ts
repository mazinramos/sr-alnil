import { useEffect, useRef, useState } from "react";

/** صور الواجهة الأصلية (ريبلت): تُستعمل كبديل لحد ما تصل الخلفيات الجديدة. مرتبة حسب الفصل 1..5. */
export const STOP_ART = ["village", "island", "market", "archive", "cove"].map((n) => `/art/legacy/${n}.webp`);
/** خلفية CSS متعددة الطبقات: لو الصورة الأولى ما اتحمّلت تظهر الثانية بدون JS. */
export const layered = (...urls: (string | undefined)[]) => urls.filter(Boolean).map((u) => `url(${u})`).join(", ");

export const PUZZLE_NAMES: Record<string, string> = {
  sequence: "ترتيب الرموز", hotspot: "بحث في المشهد", matching: "ربط ومطابقة", codelock: "قفل الرموز",
  choice: "اختيار", route: "رسم المسار", balance: "الميزان", tiles: "تدوير القطع", memory: "ذاكرة الأزواج",
  cipher: "فكّ الشفرة", deduction: "جدول الاستنتاج", jigsaw: "تركيب القطعة",
};
export const CHAPTER_FALLBACK = ["القرية القديمة", "جزيرة الأسرار", "سوق الحكايات", "أطلال النهر", "الضفة الهادئة"];
export const pad2 = (n: number) => String(n).padStart(2, "0");

/** صورة أساسية مع بديل: يُطلب الأساسي وحده، والبديل (legacy) لا يُحمَّل إلا لو فشل الأساسي.
 *  يُرجع قيمة background-image جاهزة. (بدلاً من layered التي تحمّل الصورتين دائماً.) */
/** يجرّب الروابط بالترتيب: الأول يُطلب مباشرة، وإن فشل ننتقل للتالي (الصورة الأخيرة تبقى مهما حدث). */
export function useArtChain(urls: string[], enabled = true): string {
  const key = urls.join("|");
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setIdx(0);
    if (!enabled || urls.length < 2) return;
    let off = false, i = 0;
    let img: HTMLImageElement | null = null;
    const tryCurrent = () => {
      img = new Image();
      img.onerror = () => { if (!off && i < urls.length - 1) { i += 1; setIdx(i); tryCurrent(); } };
      img.src = urls[i];
    };
    tryCurrent();
    return () => { off = true; if (img) img.onerror = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);
  if (!enabled) return "";
  return urls[Math.min(idx, urls.length - 1)];
}

export function useArtUrl(primary: string, fallback?: string, enabled = true): string {
  return useArtChain(fallback ? [primary, fallback] : [primary], enabled);
}

/** نفس الفكرة لكن بقيمة CSS جاهزة لـ background-image. */
export const useArt = (primary: string, fallback?: string): string => `url(${useArtUrl(primary, fallback)})`;

/** مصغّرة الصورة: "/art/c1/l4.webp" ← "/art/thumbs/c1-l4.webp"، و"/art/legacy/village.webp" ← "/art/thumbs/legacy-village.webp" (تُولَّد بـ npm run thumbs). */
export const thumbOf = (src: string) => src.replace(/^\/art\/(c\d|legacy)\/([a-z0-9-]+)\.webp$/, "/art/thumbs/$1-$2.webp");

/** يصير true أول مرة يقترب العنصر من الشاشة (لتحميل الصور المصغّرة كسولاً على الشبكات البطيئة). */
export function useInView<T extends Element>(rootMargin = "240px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(typeof IntersectionObserver === "undefined");
  useEffect(() => {
    if (seen || !ref.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); }
    }, { rootMargin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, rootMargin]);
  return [ref, seen] as const;
}

/** خلفية مصغّرة كسولة: لا تُطلب الصورة حتى يقترب العنصر من الشاشة؛ تجرّب الروابط بالترتيب. */
export function useLazyArt<T extends Element>(...urls: (string | undefined)[]) {
  const [ref, seen] = useInView<T>();
  const url = useArtChain(urls.filter((u): u is string => !!u), seen);
  return [ref, url ? `url(${url})` : "none"] as const;
}
