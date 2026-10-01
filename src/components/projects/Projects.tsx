"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { projects, type Project } from "../../data/projects";
import ProjectModal from "./ProjectModal";
import TechChip from "../TechChip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (pointer: fine)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const distance = track.scrollWidth - section.clientWidth;

      const cards = [
        ...track.querySelectorAll<HTMLElement>("[data-slot=card]"),
      ];
      const points = [
        0,
        ...cards.map((card) =>
          gsap.utils.clamp(
            0,
            1,
            (card.offsetLeft - (section.clientWidth - card.offsetWidth) / 2) /
              distance,
          ),
        ),
        1,
      ];

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.3,
          pin: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: points,
            directional: true,
            inertia: false,
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: "power2.inOut",
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(
        (t) => t.trigger === sectionRef.current && t.kill(),
      );
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative overflow-hidden bg-paper py-24 md:py-0 md:min-h-screen"
        aria-label="Selected work"
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-24 bg-linear-to-r from-paper to-transparent md:block" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-24 bg-linear-to-l from-paper to-transparent md:block" />

        <div
          ref={trackRef}
          className="flex flex-col gap-10 px-6 md:h-screen md:w-max md:flex-row md:items-center md:gap-6 md:px-[8vw]"
        >
          <div className="shrink-0 md:w-[28vw]">
            <p className="mb-3 font-display text-xs uppercase tracking-[0.4em] text-accent">
              Selected Work
            </p>
            <h2 className="font-display text-4xl font-medium leading-tight text-ink md:text-5xl">
              A few things
              <br />
              worth showing.
            </h2>
          </div>

          {projects.map((project) => {
            const dark = project.theme === "dark";
            return (
              <Card
                key={project.title}
                role="article"
                onClick={() => setOpen(project)}
                className={cn(
                  "group relative shrink-0 cursor-pointer rounded-2xl border p-8 ring-0 backdrop-blur-sm transition-colors hover:border-accent/50 md:h-[60vh] md:w-[62vw]",
                  dark
                    ? "border-ink bg-ink text-paper"
                    : cn(
                        "border-ink/10 text-ink",
                        project.bg ? "bg-paper" : "bg-ink/3",
                      ),
                )}
              >
                {project.bg && (
                  // Card drops top padding when an <img> is its first child
                  <div className="absolute inset-0" aria-hidden="true">
                    <Image
                      src={project.bg}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 62vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-linear-to-t from-35% via-55% to-80%",
                        dark
                          ? "from-ink via-ink/85 to-ink/0"
                          : "from-paper via-paper/85 to-paper/0",
                      )}
                    />
                  </div>
                )}
                <div className="relative flex h-full flex-col justify-end">
                  <CardContent className="p-0">
                    <span
                      className={cn(
                        "mb-1 block font-display text-sm",
                        dark ? "text-paper/60" : "text-ink/50",
                      )}
                    >
                      {project.year}
                    </span>
                    <h3
                      className={cn(
                        "font-display text-3xl font-medium transition-colors group-hover:text-accent md:text-5xl",
                        dark ? "text-paper" : "text-ink",
                      )}
                    >
                      {project.title}
                    </h3>
                    <CardDescription
                      className={cn(
                        "mt-4 max-w-lg text-sm md:text-base",
                        dark ? "text-paper/80" : "text-ink/60",
                      )}
                    >
                      {project.description}
                    </CardDescription>
                    <div
                      className={cn(
                        "mt-5 flex flex-wrap items-center gap-3 text-xl",
                        dark ? "text-paper/80" : "text-ink/70",
                      )}
                    >
                      {project.stacks.map((tag) => (
                        <TechChip key={tag} id={tag} iconOnly />
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-6">
                      {project.isDemoIncluded && (
                        <Button
                          variant="link"
                          onClick={() => setOpen(project)}
                          className="h-auto p-0 text-xs uppercase tracking-[0.3em] text-accent"
                        >
                          See how it works <span aria-hidden="true">+</span>
                        </Button>
                      )}
                      {project.href && (
                        <Button
                          asChild
                          variant="link"
                          className={cn(
                            "h-auto p-0 text-xs tracking-[0.3em] underline group-hover:text-accent",
                            dark ? "text-paper/80" : "text-ink/80",
                          )}
                        >
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.href}
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </>
  );
}
