import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PUBLISHED as PROJECTS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work · Snigdha Nagpal",
  description: "Case studies in pricing, recommendations, assortment, operations and 0 to 1 product.",
};

// Copy from the current site's Work page.
const FRAMEWORK = [
  {
    step: "Locate",
    body: "Pull the data before touching a solution. Most problem statements are assumptions dressed up as facts.",
  },
  {
    step: "Structure",
    body: "Find the lever, not a list of ideas. Work backwards from the outcome and build the simplest system that gets there.",
  },
  {
    step: "Ship",
    body: "Get something real in front of the world. A v1 that works teaches you more than a perfect spec that never ships.",
  },
];

export default function WorkPage() {
  return (
    <>
      <main className="flex-1">
        <section aria-labelledby="work-title" className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 md:pt-16 md:pb-20 lg:px-8">
          <Reveal>
            <h1
              id="work-title"
              className="font-display text-[38px] font-bold leading-tight tracking-tight md:text-[52px]"
            >
              How I think about a product
            </h1>
            <div className="mt-5 max-w-4xl space-y-4 text-lg leading-relaxed text-ink-70 md:text-xl">
              <p>
                I&rsquo;ve worked on enough complex problems to notice that the
                ones that go wrong usually fail at the same point. Not
                execution, not ideation, but framing. The problem statement was
                wrong to begin with.
              </p>
              <p>
                Over time I&rsquo;ve developed a framework I keep coming back
                to: <strong className="whitespace-nowrap text-ink">Locate, Structure, Ship.</strong>
              </p>
            </div>
          </Reveal>

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {FRAMEWORK.map((f, i) => (
              <li key={f.step}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-card border border-black/10 bg-surface-50 p-6">
                    <span className="font-numeric text-sm font-bold text-purple-600">0{i + 1}</span>
                    <h2 className="mt-1 font-display text-2xl font-bold">{f.step}</h2>
                    <p className="mt-2 text-base leading-relaxed text-ink-70">{f.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="projects-title" className="border-t border-black/10 bg-surface-50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="projects-title"
              className="font-display text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
            >
              Projects
            </h2>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-10 md:grid-cols-2">
              {PROJECTS.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={(i % 2) * 0.08}>
                    <Link href={`/work/${p.slug}`} className="group block">
                      <div className="overflow-hidden rounded-card border border-black/10 bg-white">
                        <Image
                          src={`/images/project-${p.slug}.png`}
                          alt=""
                          width={1248}
                          height={946}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="mt-5 text-[13px] uppercase tracking-wide text-ink-52">{p.context}</p>
                      <h3 className="mt-1 font-display text-2xl font-bold leading-snug transition-colors group-hover:text-purple-600">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-ink-70 md:text-lg">{p.subtitle}</p>
                      {p.metric && (
                        <p className="mt-4 flex items-baseline gap-2 border-l-2 border-purple-600 pl-3">
                          <span className="font-numeric text-xl font-bold leading-none">{p.metric.value}</span>
                          <span className="text-sm text-ink-60">{p.metric.label}</span>
                        </p>
                      )}
                      <p className="mt-4 text-sm text-ink-60">{p.tags.join(" | ")}</p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
