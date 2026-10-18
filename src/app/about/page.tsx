import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About · Snigdha Nagpal",
  description: "Founder, then analyst, then PM. MBA candidate at UNC Kenan-Flagler.",
};

// Copy from the current About page, with dates and certifications matched to
// the resume (see reference/plan.md).
const ABRIDGED = [
  {
    label: "Now",
    emoji: "🎓",
    text: "MBA candidate at UNC Kenan-Flagler, Class of 2028. Thinking about what I want to build next.",
  },
  {
    label: "Before that",
    emoji: "🏗️",
    text: "Blinkit and Noon, building growth systems at scale. Pricing engines, liquidation models, growth frameworks, forecasting tools.",
  },
  {
    label: "Even before that",
    emoji: "🎂",
    text: "Founded Purple Pixie Cakes from scratch and grew it to 10K+ lifetime orders across two cloud kitchens. Learned more about unit economics and operating under pressure than any classroom could teach.",
  },
  {
    label: "Always",
    emoji: "🐱",
    text: "Cats, swimming, diving, art, strategy board games that go on too long, and problems that look messy until you find the structure inside them.",
  },
];

const EXPERIENCE = [
  { org: "Noon", role: "Product Manager", dates: "Feb 2025 to Mar 2026" },
  { org: "Blinkit", role: "Senior Data Analyst", dates: "Oct 2023 to Aug 2024" },
  { org: "Blinkit", role: "Data Analyst", dates: "May 2022 to Oct 2023" },
  { org: "Purple Pixie Cakes", role: "Founder", dates: "Dec 2018 to Feb 2022" },
  { org: "IHCL (Taj Hotels)", role: "Management Trainee", dates: "Aug 2018 to Dec 2018", quiet: true },
];

const EDUCATION = [
  {
    org: "UNC Kenan-Flagler Business School",
    role: "Master of Business Administration",
    dates: "May 2028",
    notes: [
      "Muthoot M. George MBA Fellowship and Kenan-Flagler Fellowship recipient",
      "First-Year Liaison, Business Technology Club",
      "First-Year Liaison, Social Activities, MBA Student Association",
      "Tutor, BUSI 411 Business Analytics and BUSI 403 Operations Management",
    ],
  },
  {
    org: "Institute of Hotel Management, Delhi",
    role: "Bachelor of Science, Hospitality and Hotel Administration (Hons)",
    dates: "2015 to 2018",
    notes: [],
  },
];

const CERTIFICATIONS = [
  "AI PM Fellowship (Top Fellow), NextLeap",
  "Post Graduate Certificate in Business Analytics, Symbiosis",
];

const COMMUNITY = [
  {
    title: "National Association of Disabled Enterprises",
    body: "CSR work with NADE during my IHCL traineeship, alongside 200+ artisans.",
  },
  {
    title: "Fans of Cats Delhi",
    body: "Fostered and rescued 35 cats.",
  },
];

const OUTSIDE = [
  { src: "dogs.png", w: 1184, h: 1494, caption: "petting cute dogs" },
  { src: "watercolour.png", w: 1212, h: 1494, caption: "watercolour painting" },
  { src: "mountains.png", w: 824, h: 1414, caption: "…and mountains" },
  { src: "sunsets.png", w: 536, h: 714, caption: "chasing sunsets" },
  { src: "cats.png", w: 1182, h: 1496, caption: "fostering cats" },
  { src: "boardgames.jpg", w: 1200, h: 1600, caption: "playing board games" },
  { src: "food.png", w: 814, h: 996, caption: "exploring good food" },
  { src: "baking.png", w: 1200, h: 1498, caption: "baking yummy baked goods" },
  { src: "desserts.png", w: 1492, h: 1502, caption: "creating plated desserts" },
];

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-[28px] font-bold leading-tight tracking-tight md:text-[34px]">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        {/* Intro */}
        <section aria-labelledby="about-title" className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-12 md:items-center md:gap-12 md:pt-16 md:pb-24 lg:px-8">
          <Reveal className="md:col-span-5">
            <Image
              src="/images/about/portrait.png"
              alt="Illustrated portrait of Snigdha"
              width={1122}
              height={1402}
              preload
              sizes="(min-width: 768px) 40vw, 100vw"
              className="mx-auto h-auto w-full max-w-sm rounded-panel"
            />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <h1 id="about-title" className="font-display text-[38px] font-bold leading-tight tracking-tight md:text-[52px]">
              Hey there, I&rsquo;m Snigdha!{" "}
              <span aria-hidden>👋🏻</span>
            </h1>
            <p className="mt-3 text-lg text-ink-60">Who am I? Here&rsquo;s the abridged version:</p>
            <dl className="mt-8 space-y-5">
              {ABRIDGED.map((a) => (
                <div key={a.label} className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="font-display text-lg font-bold">
                    <span aria-hidden className="mr-2">{a.emoji}</span>
                    {a.label}
                  </dt>
                  <dd className="text-lg leading-relaxed text-ink-70">{a.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Experience */}
        <section aria-labelledby="experience" className="border-y border-black/10 bg-surface-50 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle id="experience">Experience</SectionTitle>
            </Reveal>
            <ol className="mt-10 space-y-2">
              {EXPERIENCE.map((e, i) => (
                <li key={e.role + e.org}>
                  <Reveal delay={i * 0.05}>
                    <div className="grid gap-1 rounded-card py-5 md:grid-cols-[200px_28px_1fr] md:gap-6 md:py-6">
                      <p className={`font-numeric text-[15px] font-bold md:pt-1.5 md:text-right ${e.quiet ? "text-ink-52" : "text-ink-70"}`}>
                        {e.dates}
                      </p>
                      {/* rail with a dot per role */}
                      <span aria-hidden className="relative hidden md:block">
                        <span className="absolute inset-y-[-24px] left-1/2 w-0.5 -translate-x-1/2 bg-black/10" />
                        <span
                          className={`absolute top-2.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-surface-50 ${
                            e.quiet ? "bg-black/25" : "bg-purple-600"
                          }`}
                        />
                      </span>
                      <div>
                        <h3 className={`font-display text-2xl font-bold leading-snug md:text-[28px] ${e.quiet ? "text-ink-60" : ""}`}>
                          {e.org} <span className="font-medium text-ink-60">· {e.role}</span>
                        </h3>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Education + certifications */}
        <section aria-labelledby="education" className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 md:py-24 lg:px-8">
          <Reveal className="md:col-span-8">
            <SectionTitle id="education">Education</SectionTitle>
            <ul className="mt-8 space-y-8">
              {EDUCATION.map((e) => (
                <li key={e.org}>
                  <p className="font-display text-xl font-bold md:text-2xl">{e.org}</p>
                  <p className="mt-0.5 text-base text-ink-70 md:text-lg">{e.role}</p>
                  <p className="mt-0.5 text-sm text-ink-52">{e.dates}</p>
                  {e.notes.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-ink-60 marker:text-purple-600">
                      {e.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4">
            <SectionTitle id="certifications">Certifications</SectionTitle>
            <ul className="mt-8 space-y-3 text-base text-ink-70 md:text-lg">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="rounded-card border border-black/10 bg-white px-4 py-3">{c}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Community */}
        <section aria-labelledby="community" className="border-t border-black/10 bg-surface-50"><div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <Reveal>
            <SectionTitle id="community">Community</SectionTitle>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {COMMUNITY.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-card border border-black/10 bg-white p-6">
                    <p className="font-display text-xl font-bold">{c.title}</p>
                    <p className="mt-2 text-base leading-relaxed text-ink-70">{c.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div></section>

        {/* Outside of work */}
        <section aria-labelledby="outside" className="bg-surface-100 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle id="outside">Outside of work I am…</SectionTitle>
            </Reveal>
            <ul className="mt-8 columns-2 gap-4 md:columns-3">
              {OUTSIDE.map((o, i) => (
                <li key={o.src} className="mb-4 break-inside-avoid">
                  <Reveal delay={(i % 3) * 0.06}>
                    <figure className="group">
                      <div className="overflow-hidden rounded-card bg-white">
                        <Image
                          src={`/images/about/${o.src}`}
                          alt={o.caption.replace("…", "")}
                          width={o.w}
                          height={o.h}
                          sizes="(min-width: 768px) 33vw, 50vw"
                          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                      <figcaption className="mt-2 text-[15px] text-ink-70">{o.caption}</figcaption>
                    </figure>
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
