import { Component, type ErrorInfo, type ReactNode } from "react";
import { navigate } from "./router";

type Props = {
  children: ReactNode;
  /** يتغيّر عند تغيّر الصفحة أو المستوى فتُمسح حالة الخطأ تلقائياً. */
  resetKey?: string;
  /** compact: داخل لوحة اللغز. full: الشاشة كلها. */
  variant?: "compact" | "full";
};
type State = { error: Error | null };

/** يمنع الشاشة البيضاء: رسالة هادئة + زر «العودة للخريطة». الخطأ يُسجَّل في console فقط. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[سرّ النيل] انهار مكوّن:", error, info.componentStack);
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) this.setState({ error: null });
  }

  render() {
    if (!this.state.error) return this.props.children;
    const back = () => {
      this.setState({ error: null });
      navigate("/map");
    };
    const box = (
      <div role="alert" style={{ textAlign: "center", padding: this.props.variant === "full" ? 28 : 18, color: "inherit" }}>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>حدث خلل بسيط في هذه الشاشة.</p>
        <p style={{ margin: "0 0 14px", fontSize: 13, opacity: 0.8 }}>تقدّمك محفوظ. يمكنك العودة إلى الخريطة والمحاولة مرة أخرى.</p>
        <button className="button button-light" onClick={back}>العودة للخريطة</button>
      </div>
    );
    return this.props.variant === "full" ? (
      <main className="game-shell" dir="rtl" style={{ display: "grid", placeItems: "center" }}>{box}</main>
    ) : box;
  }
}
