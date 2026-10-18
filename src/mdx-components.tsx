import type { MDXComponents } from "mdx/types";
import { Callout, Cards, Compare, Figure, Formula, Gallery, Steps } from "@/components/case-study/blocks";

// Turns a heading's text into an anchor id, so "On this page" links work.
const slugify = (node: React.ReactNode) =>
  String(Array.isArray(node) ? node.join("") : node)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2
      id={slugify(children)}
      className="mt-16 scroll-mt-24 font-display text-[26px] font-bold leading-tight tracking-tight md:text-[30px]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-display text-xl font-bold leading-snug">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-4 text-lg leading-relaxed text-ink-70">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-relaxed text-ink-70 marker:text-purple-600">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-lg leading-relaxed text-ink-70 marker:text-purple-600">
      {children}
    </ol>
  ),
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="font-semibold text-purple-600 underline underline-offset-4">
      {children}
    </a>
  ),
  Callout,
  Cards,
  Compare,
  Figure,
  Formula,
  Gallery,
  Steps,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
