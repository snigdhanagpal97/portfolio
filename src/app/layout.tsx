import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Playfair_Display, Shantell_Sans } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800"],
});

// Numbers (stats, metric badges)
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700"],
});

// Handwritten notes
const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Snigdha Nagpal",
  description:
    "Founder, then analyst, then PM. MBA candidate at UNC Kenan-Flagler.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${bricolage.variable} ${shantell.variable} h-full antialiased`}
    >
      <head>
        {/* Satoshi is served from Fontshare: its license allows that, but not
            redistributing the font files from a public repository. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <Nav />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
