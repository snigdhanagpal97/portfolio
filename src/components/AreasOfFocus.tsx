import { Reveal } from "@/components/Reveal";

// Copy from the current site's "Areas of focus".
const AREAS = [
  {
    title: "Growth & Activation",
    body: "Driving user acquisition, reactivation, and lifecycle engagement through data-driven experiments.",
    icon: "M3 17l6-6 4 4 8-8 M15 7h6v6",
  },
  {
    title: "Analytics & Experimentation",
    body: "Building measurement frameworks, A/B tests, and data pipelines to inform product decisions.",
    icon: "M3 21h18 M6 17v-5 M11 17V7 M16 17v-3 M21 17V9",
  },
  {
    title: "Pricing & Monetization",
    body: "Designing pricing strategies, markdown engines, and margin optimization strategies.",
    icon: "M12 3v18 M16.5 7.5c0-1.7-2-2.8-4.5-2.8S7.5 5.8 7.5 7.6s2 2.5 4.5 3 4.5 1.3 4.5 3.2-2 3-4.5 3-4.5-1.2-4.5-3",
  },
  {
    title: "Platform & Operations",
    body: "Optimizing supply chains, dark store layouts, and inventory systems at scale.",
    icon: "M12 3 2 8l10 5 10-5-10-5Z M2 13l10 5 10-5 M2 18l10 5 10-5",
  },
  {
    title: "0 ➝ 1 Building",
    body: "Founding and scaling products from scratch. From idea to revenue to repeatable growth.",
    icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  },
  {
    title: "Cross-Functional Collaboration",
    body: "Working with engineering, ops, and business teams toward shared outcomes and goals.",
    icon: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M2 21v-1a7 7 0 0 1 14 0v1 M16 3.5a4 4 0 0 1 0 7 M22 21v-1a7 7 0 0 0-4-6.3",
  },
];

export function AreasOfFocus() {
  return (
    <section aria-labelledby="areas-title" className="bg-surface-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="areas-title"
            className="font-display text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
          >
            Areas of focus
          </h2>
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-10 md:gap-5">
          {AREAS.map((a, i) => (
            <li key={a.title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className="group h-full rounded-card border border-black/10 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-purple-600/30 hover:shadow-[0_12px_32px_-18px_rgb(83_65_132/0.5)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-tile bg-lavender text-purple-600 transition-colors duration-300 group-hover:bg-purple-600 group-hover:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d={a.icon} />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{a.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-70">{a.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
