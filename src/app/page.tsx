import { JsonLd } from "@/components/seo/JsonLd";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { HeroWithAnimations } from "@/components/sections/HeroWithAnimations";
import { HeroSection } from "@/components/sections/HeroSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { StackSection } from "@/components/sections/StackSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { GsapCleanup } from "@/components/ui/GsapCleanup";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <GsapCleanup />
      <Navigation />
      <main className="relative">
        <HeroWithAnimations>
          <HeroSection />
        </HeroWithAnimations>
        <CasesSection />
        <StackSection />
        <AboutSection />
        <CalculatorSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
