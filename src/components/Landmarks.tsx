// Small ink + lavender landmarks for each journey stop (52 x 52 viewBox).
const lav = "rgb(106 38 171 / 0.15)";

export function Landmark({ kind }: { kind: "cake" | "bag" | "store" | "well" }) {
  return (
    <svg
      viewBox="0 0 52 52"
      fill="none"
      stroke="#111"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-full w-full"
    >
      {kind === "cake" && (
        <>
          <path d="M26 6 Q24 9 26 11 Q28 9 26 6 Z" fill="#f49f0b" strokeWidth={1.6} />
          <path d="M26 12 L26 19" />
          <rect x="15" y="19" width="22" height="11" rx="2" fill={lav} />
          <rect x="9" y="30" width="34" height="14" rx="2" fill="#fff" />
          <path d="M9 36 Q13 39 17 36 Q21 39 26 36 Q30 39 35 36 Q39 39 43 36" strokeWidth={2} />
          <path d="M5 46 L47 46" />
        </>
      )}
      {kind === "bag" && (
        <>
          <path d="M19 17 Q19 8 26 8 Q33 8 33 17" />
          <path d="M11 17 L41 17 L39 46 L13 46 Z" fill={lav} />
          <path d="M28 22 L22 32 L27 32 L24 41 L31 29 L26 29 Z" fill="#f49f0b" strokeWidth={1.8} />
        </>
      )}
      {kind === "store" && (
        <>
          <path d="M8 22 L44 22 L44 46 L8 46 Z" fill="#fff" />
          <path d="M6 14 L46 14 L44 22 L8 22 Z" fill={lav} />
          <path d="M14 14 L13 22 M22 14 L21 22 M30 14 L31 22 M38 14 L39 22" strokeWidth={1.8} />
          <rect x="14" y="29" width="10" height="17" fill={lav} />
          <rect x="29" y="29" width="10" height="8" />
        </>
      )}
      {kind === "well" && (
        <>
          <path d="M8 18 Q26 4 44 18 Z" fill={lav} />
          <path d="M26 7 L26 3" />
          <path d="M8 18 L44 18" />
          <path d="M11 18 L11 42 M20 18 L20 42 M32 18 L32 42 M41 18 L41 42" />
          <path d="M17 36 Q26 32 35 36 L35 42 L17 42 Z" fill="#fff" />
          <path d="M6 46 L46 46" />
        </>
      )}
    </svg>
  );
}
