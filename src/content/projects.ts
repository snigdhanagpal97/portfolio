// One list of projects for the home page, the Work page and the case study
// pages. Titles, subtitles and tags come from the current site; headline
// numbers come from the resume only.

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  context: string;
  metric: { value: string; label: string } | null;
  tags: string[];
  draft?: boolean; // hidden from the site until it's ready
  featured?: boolean; // shown in the home page stack
};

export const PROJECTS: Project[] = [
  {
    slug: "npr",
    featured: true,
    title: "NPR Engine for AOV Growth & Waste Reduction",
    subtitle: "Using recommendation logic to grow baskets without creating excess inventory",
    context: "Blinkit · 2023",
    metric: { value: "16% → 25%", label: "impression to add-to-cart" },
    tags: ["Pricing & Monetization", "Growth & Activation"],
  },
  {
    slug: "markdown-engine",
    featured: true,
    title: "Automated Fresh Pricing & Markdown Engine",
    subtitle: "Reducing waste while protecting sell-through and margin recovery",
    context: "Noon · 2025",
    metric: { value: "$13K/day", label: "write-offs eliminated" },
    tags: ["Pricing & Monetization", "Platform & Operations"],
  },
  {
    slug: "flash",
    featured: true,
    title: "Blinkit Flash: AI Shopping Assistant",
    subtitle: "A situation-first AI layer that turns a one-line need into a ready basket",
    context: "NextLeap AI PM Fellowship (Top Fellow) capstone",
    metric: { value: "3,776", label: "customer reviews mined" },
    tags: ["Product Strategy", "0 → 1 Building"],
  },
  {
    slug: "spotify-journeys",
    featured: true,
    title: "Spotify Journeys: From Streaming to Skill-Building",
    subtitle: "Turning passive listening into a daily learning habit",
    context: "NextLeap AI PM Fellowship case study",
    metric: null,
    tags: ["Product Strategy", "AI & No-Code MVP"],
  },
  {
    slug: "delisting",
    title: "Assortment Rationalisation Framework for Dark Stores",
    subtitle: "Balancing efficiency, profitability, and customer choice",
    context: "Noon · 2025",
    metric: null,
    tags: ["Analytics & Experimentation", "Platform & Operations"],
  },
  {
    slug: "freshflow",
    title: "FreshFlow Control Tower",
    subtitle: "Unifying forecasting, ordering, allocation, and delivery tracking in one place",
    context: "Noon",
    metric: { value: "10%", label: "of daily orders left for manual review" },
    tags: ["Platform & Operations", "0 → 1 Building"],
    draft: true,
  },
];

// What visitors see: everything except drafts.
export const PUBLISHED = PROJECTS.filter((p) => !p.draft);

// The home page stack.
export const FEATURED = PUBLISHED.filter((p) => p.featured);

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
