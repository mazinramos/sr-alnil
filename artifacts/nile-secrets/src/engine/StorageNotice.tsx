import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useStorageOk } from "./store";

/** تنبيه صغير حين لا يمكن حفظ التقدّم (وضع خاص، تخزين ممتلئ أو معطّل). اللعبة تعمل في الذاكرة. */
export default function StorageNotice() {
  const ok = useStorageOk();
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => { if (ok) setDismissed(false); }, [ok]);
  if (ok || dismissed) return null;
  return (
    <div className="storage-notice" role="status">
      <span>التقدّم لن يُحفظ في هذا الوضع</span>
      <button onClick={() => setDismissed(true)} aria-label="إغلاق التنبيه"><X size={16} aria-hidden /></button>
    </div>
  );
}
