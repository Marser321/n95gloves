import Hero from "@/components/hero";
import BentoGrid from "@/components/bento-grid";
import TrustStrip from "@/components/trust-strip";
import TechSection from "@/components/tech-section";
import Reviews from "@/components/reviews";
import About from "@/components/about";
import StorySection from "@/components/story-section";
import Lookbook from "@/components/lookbook";
import FAQ from "@/components/faq";
import FinalCTA from "@/components/final-cta";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <StorySection />
      <Lookbook />
      <BentoGrid products={products} />
      <TechSection />
      <Reviews />
      <FAQ />
      <About />
      <FinalCTA />
    </>
  );
}
