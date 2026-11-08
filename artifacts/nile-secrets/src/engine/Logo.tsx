/** شعار «سرّ النيل»: حرف ن على هيئة مركب (الهلال = الجسم، والنقطة = شمس فوق النهر)، داخل ختم بوصلة. */
export default function Logo({ size = 96, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg className={`logo${animated ? " logo-anim" : ""}`} width={size} height={size} viewBox="0 0 220 220" role="img" aria-label="شعار سرّ النيل">
      <defs>
        <radialGradient id="lg" cx="50%" cy="38%" r="70%"><stop offset="0" stopColor="#2f6b73" /><stop offset="1" stopColor="#1b2a2f" /></radialGradient>
        <clipPath id="lc"><circle cx="110" cy="110" r="80" /></clipPath>
      </defs>
      <circle cx="110" cy="110" r="104" fill="url(#lg)" />
      <circle className="lg-ring" cx="110" cy="110" r="102" fill="none" stroke="#e0b15a" strokeWidth="3" />
      <circle cx="110" cy="110" r="88" fill="none" stroke="#e0b15a" strokeWidth="1" opacity=".55" />
      <g className="lg-ticks" stroke="#e0b15a" strokeWidth="2" strokeLinecap="round" opacity=".8">
        <path d="M110 8v8M110 204v8M8 110h8M204 110h8M38 38l5 5M182 38l-5 5M38 182l5-5M182 182l-5-5" />
      </g>
      <g clipPath="url(#lc)">
        <circle className="lg-glow" cx="110" cy="66" r="34" fill="#e0b15a" opacity=".16" />
        <g className="lg-wave"><path d="M-70 160q22-10 45 0t45 0 45 0 45 0 45 0 45 0 45 0 45 0" fill="none" stroke="#2f6b73" strokeWidth="5" strokeLinecap="round" /></g>
        <g className="lg-wave lg-wave2"><path d="M-70 176q22-10 45 0t45 0 45 0 45 0 45 0 45 0 45 0 45 0" fill="none" stroke="#2f6b73" strokeWidth="4" strokeLinecap="round" opacity=".7" /></g>
      </g>
      <path className="lg-hull" d="M62 104q0 50 48 50t48-50" fill="none" stroke="#e0b15a" strokeWidth="9" strokeLinecap="round" />
      <path className="lg-sail" d="M110 150V84M110 86l30 40h-30z" fill="#efe3c8" stroke="#efe3c8" strokeWidth="3" strokeLinejoin="round" opacity=".95" />
      <circle className="lg-sun" cx="110" cy="56" r="10" fill="#e0b15a" />
      <g stroke="#e0b15a" strokeWidth="2.5" strokeLinecap="round" className="lg-rays"><path d="M110 36v-6M90 56h-6M130 56h6M96 42l-4-4M124 42l4-4" /></g>
    </svg>
  );
}
