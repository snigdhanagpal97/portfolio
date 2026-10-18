import Image from "next/image";
import { Zoomable } from "@/components/case-study/Zoomable";

// Building blocks for case study MDX files. Kept small and plain so the
// stories stay easy to skim.

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  wide?: boolean;
}) {
  return (
    <figure className={`my-10 ${wide ? "" : ""}`}>
      <Zoomable src={src} alt={alt}>
        <div className="overflow-hidden rounded-card border border-black/10 bg-surface-50">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="mx-auto h-auto max-h-[80vh] w-auto max-w-full"
          />
        </div>
      </Zoomable>
      {caption && <figcaption className="mt-2 text-sm text-ink-52">{caption}</figcaption>}
    </figure>
  );
}

export function Callout({
  label,
  children,
  tone = "note",
}: {
  label?: string;
  children: React.ReactNode;
  tone?: "note" | "question";
}) {
  const styles =
    tone === "question"
      ? "border-purple-600 bg-lavender text-ink"
      : "border-black/15 bg-surface-50 text-ink-80";
  return (
    <aside className={`my-8 rounded-card border-l-4 px-5 py-4 ${styles}`}>
      {label && (
        <p className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-purple-600">{label}</p>
      )}
      <div className="text-lg leading-relaxed [&>p]:m-0">{children}</div>
    </aside>
  );
}

export function Compare({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-card border border-danger/30 bg-danger-bg/60 p-5">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-danger">{beforeLabel}</p>
        <div className="mt-2 text-base leading-relaxed text-ink-80 [&>p]:m-0 [&>p+p]:mt-2">{before}</div>
      </div>
      <div className="rounded-card border border-purple-600/30 bg-lavender/60 p-5">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-purple-600">{afterLabel}</p>
        <div className="mt-2 text-base leading-relaxed text-ink-80 [&>p]:m-0 [&>p+p]:mt-2">{after}</div>
      </div>
    </div>
  );
}

export function Steps({
  items,
  vertical = false,
}: {
  items: { title: string; body?: string; tag?: string }[];
  vertical?: boolean;
}) {
  return (
    <ol className={`my-8 grid gap-3 ${vertical ? "" : "md:grid-flow-col md:auto-cols-fr"}`}>
      {items.map((s, i) => (
        <li
          key={s.title}
          className={`relative rounded-card border border-black/10 bg-white p-4 ${vertical ? "flex gap-4" : ""}`}
        >
          <span className="font-numeric text-sm font-bold text-purple-600">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className={`font-display font-bold leading-snug ${vertical ? "" : "mt-1"}`}>
              {s.title}
              {s.tag && (
                <span className="ml-2 inline-block rounded-pill bg-lavender px-2.5 py-0.5 align-middle text-xs font-semibold text-purple-600">
                  {s.tag}
                </span>
              )}
            </p>
            {s.body && <p className="mt-1 text-sm leading-relaxed text-ink-60">{s.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Cards({ items }: { items: { title: string; body: string; tag?: string }[] }) {
  return (
    <ul className="my-8 grid gap-4 md:grid-cols-3">
      {items.map((c) => (
        <li key={c.title} className="rounded-card border border-black/10 bg-white p-5">
          {c.tag && (
            <span className="inline-block rounded-pill bg-lavender px-2.5 py-0.5 text-xs font-semibold text-purple-600">
              {c.tag}
            </span>
          )}
          <p className="mt-2 font-display text-lg font-bold leading-snug">{c.title}</p>
          <p className="mt-1.5 text-base leading-relaxed text-ink-70">{c.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function Formula({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-6 overflow-x-auto rounded-card bg-surface-100 px-5 py-4 font-mono text-[15px] text-ink-80">
      {children}
    </p>
  );
}

export function Gallery({
  images,
}: {
  images: { src: string; alt: string; width: number; height: number; caption?: string }[];
}) {
  return (
    <div className="my-8 grid max-w-3xl grid-cols-2 gap-4">
      {images.map((im) => (
        <figure key={im.src}>
          <Zoomable src={im.src} alt={im.alt}>
            <div className="overflow-hidden rounded-card border border-black/10 bg-surface-50">
              <Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes="(min-width: 768px) 360px, 50vw" className="h-auto w-full" />
            </div>
          </Zoomable>
          {im.caption && <figcaption className="mt-2 text-sm text-ink-52">{im.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
