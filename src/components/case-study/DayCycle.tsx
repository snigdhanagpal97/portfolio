// "A day in a dark store" for the markdown engine case study, rebuilt from
// the original diagram as real text so it stays readable at any size.

const WINDOWS = [
  { label: "Full-price window", hours: "6 AM to 6 PM", span: 12, color: "bg-[#ada8a3]" },
  { label: "Boost", hours: "6 to 8 PM", span: 2, color: "bg-purple-600" },
  { label: "Dynamic pricing", hours: "8 PM to 12 AM", span: 4, color: "bg-[#e0582a]" },
  { label: "Reset + inbound", hours: "12 to 6 AM", span: 6, color: "bg-ink" },
];

const MOMENTS = [
  {
    time: "6 AM",
    title: "Inbound complete",
    body: "Fresh stock is on shelves. Morning demand peak hits.",
    accent: "border-[#ada8a3]",
  },
  {
    time: "6 PM",
    title: "Impression boost",
    body: "At-risk SKUs are promoted in search and browse. No price change yet.",
    accent: "border-purple-600",
  },
  {
    time: "8 PM",
    title: "Eligibility + dynamic price change",
    body: "Expiring stock identified. Below forecast, prices nudge up. In excess, markdowns fire. Reruns hourly until midnight.",
    accent: "border-purple-600",
  },
  {
    time: "12 AM",
    title: "Reset, disposal + inbound",
    body: "Markdown ends and prices revert. Expiring SKUs are disposed of and the new inbound cycle begins.",
    accent: "border-[#e0582a]",
  },
];

export function DayCycle() {
  return (
    <div className="bg-surface-50 p-5 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-80">A day in a dark store</p>
        <p className="text-sm italic text-ink-52">Illustrative</p>
      </div>

      {/* 24-hour bar, starting at 6 AM */}
      <div className="mt-6" aria-hidden>
        <div className="flex h-3 overflow-hidden rounded-full">
          {WINDOWS.map((w) => (
            <span key={w.label} className={w.color} style={{ flex: w.span }} />
          ))}
        </div>
        <div className="mt-2 hidden text-[12px] text-ink-60 sm:flex">
          {WINDOWS.map((w) => (
            <span key={w.label} style={{ flex: w.span }} className="min-w-0 pr-2">
              <span className="block truncate font-semibold uppercase tracking-wide">{w.label}</span>
              <span className="block truncate">{w.hours}</span>
            </span>
          ))}
        </div>
        {/* On phones the slices are too thin to label, so use a legend */}
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px] text-ink-60 sm:hidden">
          {WINDOWS.map((w) => (
            <li key={w.label} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${w.color}`} />
              <span>
                <span className="font-semibold">{w.label}</span> · {w.hours}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MOMENTS.map((m) => (
          <li key={m.time} className={`rounded-card border-l-4 bg-white p-4 shadow-sm ${m.accent}`}>
            <p className="font-numeric text-sm font-bold text-purple-600">{m.time}</p>
            <p className="mt-1 font-display text-lg font-bold leading-snug">{m.title}</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-70">{m.body}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 rounded-card bg-lavender px-5 py-4 text-base text-ink-80 md:text-lg">
        <span className="font-display font-bold text-purple-600">Principle · </span>
        Recover with visibility before sacrificing margin with markdown.
      </p>
    </div>
  );
}
