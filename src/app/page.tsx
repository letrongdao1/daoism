import Hero from "@/components/home/Hero";
import WorkScroll from "@/components/home/WorkScroll";
import KineticMarquee from "@/components/home/KineticMarquee";
import ExperienceTeaser from "@/components/home/ExperienceTeaser";
import AboutSplit from "@/components/home/AboutSplit";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkScroll />
      <KineticMarquee />
      <ExperienceTeaser />
      <AboutSplit />
    </>
  );
}
