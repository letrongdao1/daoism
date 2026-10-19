import Nav from "../components/Nav";
import SmoothScroll from "../components/SmoothScroll";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/projects/Projects";
import Experience from "../components/Experience";
import Stack from "../components/Stack";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <SmoothScroll>
        <main
          data-story-track
          className="flex flex-col lg:h-dvh lg:w-max lg:flex-row"
        >
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Stack />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
