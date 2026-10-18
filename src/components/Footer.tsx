import { RESUME } from "@/content/site";

const LINKS = [
  { label: "Email", href: "mailto:snagpal1997@gmail.com" },
  { label: "Resume", href: RESUME.href, download: RESUME.filename },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/snigdhan97/", external: true },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-surface-50 pt-20 pb-10 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[36px] font-bold leading-tight tracking-tight text-purple-600 md:text-[46px]">
          Let&rsquo;s build something together.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-70 md:text-xl">
          Always happy to talk product, strategy, or anything in between.
          Let&rsquo;s connect.
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-xl font-semibold">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external && { target: "_blank", rel: "noopener" })}
                {...(l.download && { download: l.download })}
                className="group transition-colors hover:text-purple-600"
              >
                {l.label}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  ➙
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-16 border-t border-black/10 pt-6 text-sm text-ink-52">
          © 2026 Snigdha Nagpal
        </p>
      </div>
    </footer>
  );
}
