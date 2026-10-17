import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

// Copy from the current site. "the last 4+ years" became "the last few
// years" (no year counts, per plan).
export function PersonBehind() {
  return (
    <section aria-labelledby="person-title" className="bg-surface-100 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-12 md:gap-12 lg:px-8">
        <Reveal className="md:col-span-5">
          {/* Portrait photo; on phones it crops to 4:5, centred on her */}
          <Image
            src="/images/person-behind-the-work.jpg"
            alt="Snigdha standing at the Old Well on the UNC Chapel Hill campus"
            width={1125}
            height={1500}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full rounded-panel object-cover object-[45%_72%] md:aspect-[3/4]"
          />
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-purple-600">
            About me
          </p>
          <h2
            id="person-title"
            className="mt-2 font-display text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
          >
            The person behind the work
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-70">
            <p>
              I&rsquo;ve spent the last few years at the intersection of data,
              strategy, and execution. At Blinkit and Noon, building systems
              that directly impact millions of users and millions of dollars.
            </p>
            <p>
              Before analytics, I founded Purple Pixie Cakes, building a brand
              from zero. That entrepreneurial DNA shapes how I approach product
              problems: with urgency, ownership, and a customer-first mindset.
            </p>
          </div>
          <p className="mt-5 text-base leading-relaxed text-ink-60">
            <span className="font-semibold text-purple-600">Off the clock:</span>{" "}
            avid swimmer, board game player, Advanced Open Water diver, and baker.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-10 gap-y-3 text-lg font-semibold">
            <Link href="/about" className="group transition-colors hover:text-purple-600">
              More about me{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">➙</span>
            </Link>
            <a href="#contact" className="group transition-colors hover:text-purple-600">
              Contact{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">➙</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
