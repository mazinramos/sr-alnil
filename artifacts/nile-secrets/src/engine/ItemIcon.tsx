import { useEffect, useState } from "react";
import type { Item } from "../content/types";

/** Item.icon إمّا معرّف ("sun-disc" ← /art/items/sun-disc.webp) أو مسار يبدأ بـ "/".
 *  عند غياب الأيقونة أو فشل تحميل الصورة يُعرض label نصاً. */
export function iconSrc(icon?: string): string | null {
  if (!icon) return null;
  return icon.startsWith("/") ? icon : `/art/items/${icon}.webp`;
}

type Props = {
  item: Pick<Item, "label" | "icon">;
  size?: number;          // بالبكسل (الافتراضي 40)
  className?: string;
  showLabel?: boolean;    // يعرض النص بجانب الصورة حتى لو الصورة موجودة
};

export default function ItemIcon({ item, size = 40, className = "", showLabel = false }: Props) {
  const src = iconSrc(item.icon);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return <span className={`inline-block text-center leading-tight ${className}`}>{item.label}</span>;
  }
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={src}
        alt={showLabel ? "" : item.label}
        width={size}
        height={size}
        loading="lazy"
        draggable={false}
        style={{ width: size, height: size, objectFit: "contain" }}
        onError={() => setFailed(true)}
      />
      {showLabel && <span>{item.label}</span>}
    </span>
  );
}
