import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Technology } from "@/components/sections/Technology";
import { Capabilities } from "@/components/sections/Capabilities";
import { Impact } from "@/components/sections/Impact";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageEffects } from "@/components/animations/PageEffects";
import { Marquee } from "@/components/animations/Marquee";

export default function Home() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-phosphor focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <PageEffects />
      <Navbar />
      <main id="content">
        <Hero />
        <About />
        <Marquee />
        <Technology />
        <Capabilities />
        <Impact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
