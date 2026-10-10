"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useScrollReveal } from "../hooks/useScrollReveal";
import TechChip from "./TechChip";
import { profile, skills } from "@/data/profile";
import type { TechId } from "@/data/techs";
import { Em } from "./ui/typography";

const techsOf = (...labels: string[]): TechId[] =>
  skills.filter((g) => labels.includes(g.label)).flatMap((g) => g.techs);

const slides = [
  { label: "Frontend", techs: techsOf("Frontend") },
  { label: "Backend", techs: techsOf("Backend", "Databases") },
  { label: "Others", techs: techsOf("Languages", "DevOps & tools") },
];
const STEP = 360 / slides.length;

export default function About() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.08 });
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // pin for one viewport per extra slide; step the ring as progress crosses each third
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * (slides.length - 1)}`,
      pin: true,
      onUpdate: ({ progress }) => {
        const i = Math.min(
          slides.length - 1,
          Math.floor(progress * slides.length),
        );
        setActive(i);
        gsap.to(ringRef.current, {
          rotationY: -i * STEP,
          duration: reduceMotion ? 0 : 0.9,
          ease: "power3.out",
          overwrite: true,
        });
      },
    });
    return () => trigger.kill();
  }, [ref]);

  return (
    <section
      ref={ref}
      id="about"
      data-reveal-group
      className="relative flex h-dvh flex-col justify-center overflow-hidden bg-ink px-6 py-20 md:px-[8vw]"
      aria-label="About"
    >
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div data-reveal>
          <p className="mb-3 font-display text-xs tracking-[0.4em] text-accent uppercase">
            About me
          </p>
          <h2 className="font-display text-3xl leading-tight font-medium text-paper md:text-5xl">
            Frontend engineer,
            <br />
            full-stack oriented.
          </h2>
          <div className="mt-6 max-w-lg space-y-3 text-sm text-paper/65 md:mt-8 md:space-y-4 md:text-lg">
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

        <div data-reveal className="flex flex-col items-center gap-6">
          <div className="relative h-64 w-full max-w-sm perspective-distant md:h-80">
            {/* pushed back so the front face renders at true size */}
            <div className="size-full transform-[translateZ(-14rem)] transform-3d">
              <div ref={ringRef} className="relative size-full transform-3d">
                {slides.map((slide, i) => (
                  <div
                    key={slide.label}
                    aria-hidden={i !== active}
                    className="absolute inset-0 flex flex-col rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm backface-hidden md:p-8"
                    style={{
                      transform: `rotateY(${i * STEP}deg) translateZ(14rem)`,
                    }}
                  >
                    <p className="mb-5 font-display text-xs tracking-[0.3em] text-accent uppercase">
                      {String(i + 1).padStart(2, "0")} — {slide.label}
                    </p>
                    <ul className="flex flex-wrap gap-2.5">
                      {slide.techs.map((id) => (
                        <li key={id}>
                          <TechChip
                            id={id}
                            className="rounded-full border-white/10 bg-white/3 px-4 py-2 text-sm text-paper/80"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2" aria-hidden="true">
            {slides.map((slide, i) => (
              <span
                key={slide.label}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? "w-8 bg-accent" : "w-3 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="corner-light pointer-events-none absolute inset-0"
      />
    </section>
  );
}
