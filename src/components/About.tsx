"use client";

import { useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ScrollTrigger } from "../lib/gsap";
import TechChip from "./TechChip";
import type { TechId } from "@/data/techs";
import { Em } from "./ui/typography";

const stack: { label: string; techs: TechId[] }[] = [
  { label: "Languages", techs: ["typescript", "javascript", "java", "csharp"] },
  {
    label: "Frontend",
    techs: [
      "react",
      "nextjs",
      "vite",
      "redux",
      "zustand",
      "reactQuery",
      "tailwind",
      "motion",
      "gsap",
    ],
  },
  {
    label: "Backend",
    techs: ["nodejs", "express", "nestjs", "aspnet", "spring"],
  },
  {
    label: "Databases",
    techs: ["mysql", "sqlserver", "postgresql", "supabase", "redis"],
  },
  {
    label: "DevOps & tools",
    techs: ["vercel", "cloudflare", "aws", "claudeCode"],
  },
];

export default function About() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.08 });
  const stackRef = useScrollReveal<HTMLDivElement>({
    y: 18,
    stagger: 0.035,
    delay: 0.15,
    once: true,
  });

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    let startY = window.scrollY;
    const onStart = () => (startY = window.scrollY);
    ScrollTrigger.addEventListener("scrollStart", onStart);

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      snap: {
        snapTo: (value) => {
          const max = ScrollTrigger.maxScroll(window);
          const y = value * max;
          const top = section.getBoundingClientRect().top + window.scrollY;
          const vh = window.innerHeight;
          const approaching =
            (startY < y && y < top && y > top - vh) ||
            (startY > y && y > top && y < top + vh);
          return approaching ? top / max : value;
        },
        duration: { min: 0.3, max: 0.6 },
        delay: 0.05,
        inertia: false,
        ease: "power2.inOut",
      },
    });
    return () => {
      ScrollTrigger.removeEventListener("scrollStart", onStart);
      st.kill();
    };
  }, [ref]);

  return (
    <section
      ref={ref}
      id="about"
      data-reveal-group
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-ink px-6 py-28 md:px-[8vw]"
      aria-label="About"
    >
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        <div data-reveal>
          <p className="mb-3 font-display text-xs uppercase tracking-[0.4em] text-accent">
            About
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight text-paper md:text-5xl">
            Frontend engineer,
            <br />
            full-stack when needed.
          </h2>
          <div className="mt-8 max-w-lg space-y-4 text-base text-paper/65 md:text-lg">
            <p>
              I am a frontend engineer with about <Em>two years</Em> of
              experience building web applications. I craft clean, responsive
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

        <div ref={stackRef} data-reveal-group>
          <div className="relative space-y-7">
            {stack.map((group) => (
              <div key={group.label}>
                <p
                  data-reveal
                  className="mb-3 text-xs uppercase tracking-[0.3em] text-paper/40"
                >
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {group.techs.map((id) => (
                    <li key={id} data-reveal>
                      <TechChip
                        id={id}
                        className="rounded-full border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-paper/80"
                      />
                    </li>
                  ))}
                </ul>
              </div>
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
