import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    qualities: [75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old Framer URLs keep working after the domain moves over.
  async redirects() {
    return [
      { source: "/npr", destination: "/work/npr", permanent: true },
      { source: "/liquidation", destination: "/work/markdown-engine", permanent: true },
      { source: "/delistingframework", destination: "/work/delisting", permanent: true },
      { source: "/spotifycasenextleap", destination: "/work/spotify-journeys", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
