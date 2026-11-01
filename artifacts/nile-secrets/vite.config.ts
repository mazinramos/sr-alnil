import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const port = Number(process.env.PORT ?? 5173);
const base = process.env.BASE_PATH ?? "/";

/** روابط og:image تحتاج عنواناً مطلقاً كي تعرضها واتساب وفيسبوك.
 *  الأولوية: SITE_URL (يضعه مازن لو استعمل نطاقاً خاصاً) ثم نطاق Vercel الإنتاجي (متغيّر نظام تلقائي)، وإلا يبقى الرابط نسبياً. */
function siteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return vercel ? `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}` : "";
}
const siteMeta = (): Plugin => ({
  name: "site-meta",
  transformIndexHtml: (html) => html.replaceAll("__SITE__", siteUrl()),
});

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), siteMeta()],
  server: { port, host: true },
  preview: { port, host: true },
  build: { outDir: "dist", sourcemap: false },
});
