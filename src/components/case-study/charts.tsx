// Small, self-contained charts for case studies. Real text and real numbers,
// so they stay sharp at any size and every value is readable without color.
// Colors: purple-600 for a single series; purple-400 and amber when two
// series sit side by side (checked for colorblind separation).

const SERIES = ["#8163d4", "#f49f0b"];
const BEFORE_AFTER = ["#e0582a", "#8163d4"];

const pct = (value: number, total: number) => (total ? Math.round((value / total) * 100) : 0);

function Frame({
  title,
  subtitle,
  n,
  takeaway,
  note,
  children,
}: {
  title: string;
  subtitle?: string;
  n?: string;
  takeaway?: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-10 rounded-card border border-black/10 bg-surface-50 p-5 shadow-[0_18px_40px_-32px_rgb(83_65_132/0.45)] md:p-8">
      <figcaption className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-80">{title}</p>
        {n && <p className="shrink-0 text-sm text-ink-52">{n}</p>}
      </figcaption>
      {subtitle && <p className="mt-1 text-sm text-ink-60">{subtitle}</p>}
      <div className="mt-6">{children}</div>
      {note && <p className="mt-5 text-sm italic text-ink-52">{note}</p>}
      {takeaway && (
        <p className="mt-6 rounded-card bg-lavender px-5 py-4 text-base text-ink-80">
          <span className="font-display font-bold text-purple-600">Takeaway · </span>
          {takeaway}
        </p>
      )}
    </figure>
  );
}

/** One series of horizontal bars, labeled with percentages. */
export function BarChart({
  title,
  subtitle,
  n,
  takeaway,
  rows,
}: {
  title: string;
  subtitle?: string;
  n?: string;
  takeaway?: string;
  rows: { label: string; value: number; total: number; dim?: boolean }[];
}) {
  return (
    <Frame title={title} subtitle={subtitle} n={n} takeaway={takeaway}>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[170px_1fr_48px]"
            title={`${row.label}: ${pct(row.value, row.total)}%`}
          >
            <span className="text-sm font-medium text-ink-80 md:text-base">{row.label}</span>
            <span className="order-last col-span-2 h-6 overflow-hidden rounded-md bg-black/[0.05] sm:order-none sm:col-span-1">
              <span
                className="block h-full rounded-md"
                style={{
                  width: `${pct(row.value, row.total)}%`,
                  backgroundColor: row.dim ? "rgb(83 65 132 / 0.3)" : "#534184",
                }}
              />
            </span>
            <span className="text-right font-numeric text-sm font-bold tabular-nums text-ink-80">
              {pct(row.value, row.total)}%
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/** Two groups compared on the same questions, as paired bars. */
export function SplitBars({
  title,
  subtitle,
  n,
  takeaway,
  groups,
  rows,
}: {
  title: string;
  subtitle?: string;
  n?: string;
  takeaway?: string;
  groups: [string, string];
  rows: { label: string; values: [{ value: number; total: number }, { value: number; total: number }] }[];
}) {
  return (
    <Frame title={title} subtitle={subtitle} n={n} takeaway={takeaway}>
      <ul className="space-y-5">
        {rows.map((row) => (
          <li key={row.label} className="grid gap-x-4 gap-y-2 sm:grid-cols-[210px_1fr] sm:items-center">
            <p className="text-sm font-medium text-ink-80 md:text-base">{row.label}</p>
            <div className="space-y-[2px]">
              {row.values.map((v, i) => (
                <div
                  key={groups[i]}
                  className="grid grid-cols-[1fr_48px] items-center gap-3"
                  title={`${groups[i]}: ${pct(v.value, v.total)}%`}
                >
                  <span className="h-5 overflow-hidden rounded-md bg-black/[0.05]">
                    <span
                      className="block h-full rounded-md"
                      style={{ width: `${Math.max(pct(v.value, v.total), 1)}%`, backgroundColor: SERIES[i] }}
                    />
                  </span>
                  <span className="text-right font-numeric text-sm font-bold tabular-nums text-ink-80">
                    {pct(v.value, v.total)}%
                  </span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-70">
        {groups.map((group, i) => (
          <span key={group} className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: SERIES[i] }} />
            {group}
          </span>
        ))}
      </div>
    </Frame>
  );
}

/** Before and after on the same scale, in the style of the markdown engine results. */
export function BeforeAfter({
  title,
  n,
  note,
  rows,
}: {
  title: string;
  n?: string;
  note?: string;
  rows: { label: string; before: number; after: number; beforeLabel: string; afterLabel: string }[];
}) {
  const bar = (width: number, color: string, label: string) => (
    <div className="grid grid-cols-[1fr_96px] items-center gap-3">
      <span className="h-6 overflow-hidden rounded-md bg-black/[0.05]">
        <span className="block h-full rounded-md" style={{ width: `${Math.max(width, 1.5)}%`, backgroundColor: color }} />
      </span>
      <span className="text-right font-numeric text-sm font-bold tabular-nums text-ink-80">{label}</span>
    </div>
  );
  return (
    <Frame title={title} n={n} note={note}>
      <ul className="space-y-6">
        {rows.map((row) => (
          <li key={row.label} className="grid gap-x-4 gap-y-2 sm:grid-cols-[190px_1fr] sm:items-center">
            <p className="text-sm font-medium text-ink-80 md:text-base">{row.label}</p>
            <div className="space-y-[2px]">
              {bar(row.before, BEFORE_AFTER[0], row.beforeLabel)}
              {bar(row.after, BEFORE_AFTER[1], row.afterLabel)}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex justify-center gap-5 text-sm text-ink-70">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: BEFORE_AFTER[0] }} /> Before Backpocket
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: BEFORE_AFTER[1] }} /> With Backpocket
        </span>
      </div>
    </Frame>
  );
}

/** Stages of a journey, each with the share of people for whom it works. */
export function Lifecycle({
  title,
  subtitle,
  n,
  takeaway,
  stages,
}: {
  title: string;
  subtitle?: string;
  n?: string;
  takeaway?: string;
  stages: { step: string; label: string; value: number; total: number; works: boolean }[];
}) {
  return (
    <Frame title={title} subtitle={subtitle} n={n} takeaway={takeaway}>
      <ol className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stages.map((stage) => (
          <li
            key={stage.step}
            className={`flex flex-col rounded-tile border p-4 ${
              stage.works ? "border-purple-600/30 bg-[#f4f1fa]" : "border-black/10 bg-surface-50"
            }`}
            title={`${stage.step}: ${stage.value} of ${stage.total}`}
          >
            <span className="text-[13px] font-semibold uppercase tracking-wide text-ink-60">{stage.step}</span>
            <span className="mt-2 font-display text-4xl font-bold tabular-nums text-ink">
              {pct(stage.value, stage.total)}%
            </span>
            <span className="mt-1 text-sm text-ink-70">{stage.label}</span>
            <span className="mt-3 h-2 rounded-full bg-black/[0.06]">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${pct(stage.value, stage.total)}%`,
                  backgroundColor: stage.works ? "#534184" : "rgb(83 65 132 / 0.3)",
                }}
              />
            </span>
            <span className={`mt-3 text-sm font-semibold ${stage.works ? "text-purple-600" : "text-[#b4441a]"}`}>
              {stage.works ? "✓ Works" : "✕ Breaks"}
            </span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/** A 2×2 positioning map. x and y run 0 to 100. */
export function Quadrant({
  title,
  subtitle,
  takeaway,
  x,
  y,
  points,
}: {
  title: string;
  subtitle?: string;
  takeaway?: string;
  x: [string, string];
  y: [string, string];
  points: { name: string; x: number; y: number; highlight?: boolean }[];
}) {
  return (
    <Frame title={title} subtitle={subtitle} takeaway={takeaway}>
      <div>
        {/* Axis labels sit inside the plot, so it keeps the full width on phones. */}
        <div className="relative aspect-square rounded-tile border border-black/10 bg-white sm:aspect-[16/9]">
          <span className="absolute right-0 top-0 h-1/2 w-1/2 rounded-tr-tile bg-lavender" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-black/10" />
          <span className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
          <span className="absolute right-2 top-2 text-[11px] font-semibold uppercase tracking-wide text-purple-600 md:text-xs">
            Open space
          </span>
          <span className="absolute left-2 top-2 text-[11px] text-ink-52 md:text-xs">↑ {y[1]}</span>
          <span className="absolute bottom-2 left-2 text-[11px] text-ink-52 md:text-xs">↓ {y[0]}</span>
          {points.map((p) => (
            <span
              key={p.name}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: `${p.x}%`, top: `${100 - p.y}%` }}
            >
              <span
                className={`rounded-full ring-2 ring-white ${p.highlight ? "h-5 w-5 ring-4 ring-purple-400/30" : "h-3 w-3"}`}
                style={{ backgroundColor: p.highlight ? "#534184" : "#ada8a3" }}
              />
              <span
                className={`whitespace-nowrap text-xs md:text-sm ${p.highlight ? "font-bold text-purple-600" : "text-ink-70"}`}
              >
                {p.name}
              </span>
            </span>
          ))}
        </div>
        <div className="mt-2 flex justify-between gap-4 text-xs text-ink-60 md:text-sm">
          <span>← {x[0]}</span>
          <span>{x[1]} →</span>
        </div>
      </div>
    </Frame>
  );
}
