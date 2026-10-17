import { AreasOfFocus } from "@/components/AreasOfFocus";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { NumbersStrip } from "@/components/NumbersStrip";
import { PersonBehind } from "@/components/PersonBehind";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <NumbersStrip />
        <AreasOfFocus />
        <FeaturedProjects />
        <PersonBehind />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
