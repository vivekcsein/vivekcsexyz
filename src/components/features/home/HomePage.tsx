import MarqueePanel from "@/app/dev/panels/MarqueePanel";
import CtaSection from "./sections/CtaSection";
import { Hero } from "./sections/Hero";
import Journey from "./sections/Journey";
import Metrics from "./sections/Metrics";
import Showcase from "./sections/Showcase";
import TechStack from "./sections/TechStack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueePanel />
      <TechStack />
      <Metrics />
      <Journey />
      <Showcase />
      <CtaSection />
    </>
  );
}
