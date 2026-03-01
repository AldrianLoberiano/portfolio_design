import { Hero } from "../components/home/Hero";
import { FeaturedWork } from "../components/home/FeaturedWork";
import { MarqueeText } from "../components/home/MarqueeText";
import { ServicesSection } from "../components/home/ServicesSection";
import { StatsBar } from "../components/home/StatsBar";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { CTASection } from "../components/home/CTASection";

export function Home() {
  return (
    <>
      <Hero />
      <MarqueeText />
      <FeaturedWork />
      <StatsBar />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
