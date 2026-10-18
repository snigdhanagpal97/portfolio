import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { DemoVideo } from "@/components/case-study/DemoVideo";
import { Zoomable } from "@/components/case-study/Zoomable";
import type { CaseMeta } from "@/components/case-study/types";
import { PUBLISHED, getProject } from "@/content/projects";

export function generateStaticParams() {
  return PUBLISHED.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: `${project?.title} · Snigdha Nagpal`, description: project?.subtitle };
}

const anchor = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.draft) notFound();
  const mod = (await import(`@/content/case-studies/${slug}.mdx`)) as {
    default: React.ComponentType;
    meta: CaseMeta;
    Demo?: React.ComponentType;
  };
  const { default: Story, meta, Demo } = mod;
  const { demo } = meta;

  // Next case study to read, wrapping around the list.
  const next = PUBLISHED[(PUBLISHED.findIndex((p) => p.slug === slug) + 1) % PUBLISHED.length];

  return (
    <>
      <main className="flex-1">
        <article className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 md:pt-12 lg:px-8">
          <Link href="/work" className="group text-sm font-semibold text-ink-60 transition-colors hover:text-purple-600">
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> All work
          </Link>

          {/* Header */}
          <header className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-[13px] uppercase tracking-wide text-ink-52">{project.context}</p>
              <h1 className="mt-2 font-display text-[34px] font-bold leading-[1.1] tracking-tight md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-70 md:text-xl">{project.subtitle}</p>
              <p className="mt-3 text-sm text-ink-60">{project.tags.join(" | ")}</p>
            </div>
            {demo.link && (
              <a
                href={demo.link.href}
                target="_blank"
                rel="noopener"
                className="shrink-0 rounded-pill bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-800"
              >
                {demo.link.label} ↗
              </a>
            )}
          </header>

          {/* Demo first, full width */}
          <section aria-label="Demo" className="mt-8 md:mt-10">
            <div className="overflow-hidden rounded-panel border border-black/10 bg-surface-50 shadow-[0_18px_40px_-28px_rgb(83_65_132/0.45)]">
              {demo.type === "custom" && Demo ? (
                <Demo />
              ) : demo.type === "video" ? (
                <div
                  className={`flex justify-center ${
                    demo.portrait ? "bg-[linear-gradient(135deg,#f4f1fa,#fafafa)] px-4 py-6 md:py-10" : ""
                  }`}
                >
                  <DemoVideo src={demo.src} label={demo.caption ?? "Demo"} portrait={!!demo.portrait} />
                </div>
              ) : demo.type === "image" ? (
                <Zoomable src={demo.src} alt={demo.alt}>
                  <Image
                    src={demo.src}
                    alt={demo.alt}
                    width={demo.width}
                    height={demo.height}
                    preload
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    className="mx-auto h-auto max-h-[80vh] w-auto max-w-full"
                  />
                </Zoomable>
              ) : null}
            </div>
            {demo.caption && <p className="mt-3 text-sm text-ink-52">{demo.caption}</p>}
          </section>

          {/* Quick facts */}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-black/10 py-6 md:grid-cols-4">
            {meta.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[12px] font-semibold uppercase tracking-wide text-ink-52">{f.label}</dt>
                <dd className="mt-1 text-[15px] leading-snug text-ink-80">{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* Impact */}
          {meta.metrics.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {meta.metrics.map((m) => (
                <li key={m.label} className="rounded-card border border-black/10 bg-surface-50 p-5">
                  <p className="font-numeric text-[30px] font-bold leading-none">{m.value}</p>
                  <p className="mt-2 text-sm leading-snug text-ink-60">{m.label}</p>
                </li>
              ))}
            </ul>
          )}

          {/* TL;DR */}
          <section aria-label="Summary" className="mt-6 grid gap-4 md:grid-cols-3">
            {(
              [
                ["The problem", meta.tldr.problem],
                ["What I did", meta.tldr.did],
                ["The result", meta.tldr.result],
              ] as const
            ).map(([label, text]) => (
              <div key={label} className="rounded-card bg-lavender/70 p-5">
                <p className="text-[13px] font-semibold uppercase tracking-wide text-purple-600">{label}</p>
                <p className="mt-2 text-base leading-relaxed text-ink-80">{text}</p>
              </div>
            ))}
          </section>

          {/* On this page */}
          <nav aria-label="On this page" className="mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[12px] font-semibold uppercase tracking-wide text-ink-52">Jump to</span>
            {meta.sections.map((s) => (
              <a
                key={s}
                href={`#${anchor(s)}`}
                className="rounded-pill border border-black/10 px-3 py-1 text-sm text-ink-70 transition-colors hover:border-purple-600 hover:text-purple-600"
              >
                {s}
              </a>
            ))}
          </nav>

          {/* The story: text stays at reading width, visuals use the full width */}
          <div className="[&>aside]:max-w-3xl [&>h2]:max-w-3xl [&>h3]:max-w-3xl [&>ol.list-decimal]:max-w-3xl [&>p]:max-w-3xl [&>ul.list-disc]:max-w-3xl">
            <Story />
          </div>

          <p className="mt-16 text-sm uppercase tracking-wide text-ink-52">{meta.signoff}</p>

          {/* Next */}
          <nav aria-label="More work" className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-8">
            <Link href="/work" className="font-semibold transition-colors hover:text-purple-600">
              ← All work
            </Link>
            {next && next.slug !== slug && (
              <Link href={`/work/${next.slug}`} className="group text-right">
                <span className="block text-[13px] uppercase tracking-wide text-ink-52">Next case study</span>
                <span className="font-display text-xl font-bold transition-colors group-hover:text-purple-600">
                  {next.title} <span className="inline-block transition-transform group-hover:translate-x-1">➙</span>
                </span>
              </Link>
            )}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
