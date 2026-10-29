import { useSyncExternalStore } from "react";

/** راوتر بالـ hash: #/ ، #/level/c1-l1 ، #/preview/hotspot ، #/preview/coords?img=/art/c1/l1.webp
 *  ما يحتاج إعدادات rewrite في Vercel. */
export type Route = { path: string[]; query: URLSearchParams };

function parse(): Route {
  const h = window.location.hash.replace(/^#/, "") || "/";
  const [p, q = ""] = h.split("?");
  return { path: p.split("/").filter(Boolean), query: new URLSearchParams(q) };
}

let cached = { key: "", route: parse() };
function snapshot(): Route {
  const key = window.location.hash;
  if (key !== cached.key) cached = { key, route: parse() };
  return cached.route;
}
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

export const useRoute = () => useSyncExternalStore(subscribe, snapshot);
export const navigate = (to: string) => { window.location.hash = to; };
