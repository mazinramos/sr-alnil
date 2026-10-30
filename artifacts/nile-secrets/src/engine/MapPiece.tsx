import { useState } from "react";

const MAP = "/art/ui/map-full.webp";
// حافة ممزقة (clip-path) لقطعة الفصل
const TORN =
  "polygon(2% 5%, 9% 1%, 17% 4%, 26% 0%, 36% 3%, 47% 0%, 58% 4%, 69% 1%, 79% 4%, 89% 0%, 97% 5%, 99% 16%, 96% 27%, 100% 39%, 97% 51%, 99% 63%, 96% 75%, 99% 87%, 95% 97%, 85% 99%, 75% 96%, 64% 100%, 52% 97%, 41% 100%, 30% 96%, 19% 99%, 9% 97%, 3% 99%, 0% 88%, 3% 76%, 0% 64%, 3% 52%, 0% 40%, 3% 28%, 0% 16%)";

/** الخلية n (1..6) في شبكة 3×2: 1 أعلى اليمين، 2 أعلى الوسط، 3 أعلى اليسار، 4 أسفل اليسار، 5 أسفل الوسط، 6 أسفل اليمين (CONTRACT §10). */
export function cellPosition(n: number) {
  const col = [2, 1, 0, 0, 1, 2][n - 1] ?? 0; // العمود من اليسار
  const row = n <= 3 ? 0 : 1;
  return { x: col * 50, y: row * 100 };
}

/** قطعة الخريطة: قصاصة من map-full مقتطعة بـ background-position، أو الصورة كاملة (full). */
export default function MapPiece({ cell, full = false, label }: { cell?: number; full?: boolean; label: string }) {
  const [ok, setOk] = useState(true);
  const pos = cellPosition(cell ?? 1);
  const style: React.CSSProperties = ok
    ? full
      ? { backgroundImage: `url(${MAP})`, backgroundSize: "cover", backgroundPosition: "center", aspectRatio: "3 / 2" }
      : { backgroundImage: `url(${MAP})`, backgroundSize: "300% 200%", backgroundPosition: `${pos.x}% ${pos.y}%`, aspectRatio: "1 / 1" }
    : { backgroundImage: "linear-gradient(145deg, #e6d3ad, #b88a5a)", aspectRatio: full ? "3 / 2" : "1 / 1" };
  return (
    <figure className="rw-piece-wrap">
      <img src={MAP} alt="" className="rw-hidden" onError={() => setOk(false)} />
      <div className="rw-piece" style={{ ...style, clipPath: full ? undefined : TORN }} role="img" aria-label={label} />
      <figcaption>{label}</figcaption>
    </figure>
  );
}
