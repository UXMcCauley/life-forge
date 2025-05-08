import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </div>
  );
}