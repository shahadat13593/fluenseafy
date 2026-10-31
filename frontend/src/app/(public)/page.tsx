import { Hero } from "@/components/landing/hero";
import { Pathway } from "@/components/landing/pathway";
import { Progression } from "@/components/landing/progression";
import { Framework } from "@/components/landing/framework";
import { Pricing } from "@/components/landing/pricing";
import { Cta } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Pathway />
      <Progression />
      <Framework />
      <Pricing />
      <Cta />
    </main>
  );
}
