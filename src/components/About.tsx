"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "@/data/profile";
import { Em, Eyebrow, Heading } from "./ui/typography";
import portrait from "../assets/images/portrait.png";

export default function About() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      ref={ref}
      id="about"
      data-reveal-group
      className="relative flex shrink-0 flex-col gap-10 overflow-hidden bg-paper px-5 py-20 text-ink lg:h-dvh lg:w-screen lg:p-0"
      aria-label="About"
    >
      <Eyebrow
        data-reveal
        className="lg:absolute lg:top-(--vg) lg:left-32 lg:mb-0"
      >
        About me
      </Eyebrow>

      <img
        data-portrait
        data-reveal
        src={portrait.src}
        alt={`Portrait of ${profile.name}`}
        className="w-56 self-center select-none lg:absolute lg:bottom-0 lg:left-32 lg:z-2 lg:h-[72dvh] lg:w-auto"
        style={{
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
        draggable={false}
      />

      <div className="flex flex-col justify-between gap-8 lg:absolute lg:inset-y-(--vg) lg:right-16 lg:w-[46vw]">
        <div data-reveal>
          <Heading className="text-ink">
            Frontend engineer,
            <br />
            full-stack oriented.
          </Heading>
          <div className="mt-6 space-y-3 text-sm text-ink/70 md:text-base xl:space-y-4 xl:text-lg">
            <p>
              I am a frontend engineer with about <Em>{profile.experience}</Em>{" "}
              of experience building web applications. I craft clean, responsive
              interfaces with React using both Vite and Next.js, and I keep
              production systems reliable for the people who depend on them
              every day.
            </p>
            <p>
              I also work on the backend, building APIs with Node.js and ASP.NET
              on SQL databases, and a solid foundation understanding on Java and
              Spring Framework. Therefore, I can solely carry a feature from
              what users see to what make them satisfied using behind the
              scenes.
            </p>
            <p>
              I use AI tools such as Claude Code to work more efficiently, and I
              review every change myself.
            </p>
          </div>
        </div>
        <a
          data-reveal
          href={profile.cv}
          download
          className="self-start font-title text-lg tracking-wide underline underline-offset-8 transition-colors hover:text-accent"
        >
          Download my CV
        </a>
      </div>
    </section>
  );
}
