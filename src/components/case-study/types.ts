// What each case study MDX file exports as `meta`.
export type CaseMeta = {
  demo:
    | { type: "custom"; caption?: string; link?: { href: string; label: string }; portrait?: boolean }
    | { type: "video"; src: string; portrait?: boolean; caption?: string; link?: { href: string; label: string } }
    | { type: "image"; src: string; width: number; height: number; alt: string; portrait?: boolean; caption?: string; link?: { href: string; label: string } };
  facts: { label: string; value: string }[];
  metrics: { value: string; label: string }[];
  tldr: { problem: string; did: string; result: string };
  sections: string[]; // h2 titles, in order, for "On this page"
  signoff: string;
};
