"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { projects, type Project } from "../../data/projects";
import ProjectModal from "./ProjectModal";
import TechChip from "../TechChip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eyebrow, Heading } from "@/components/ui/typography";

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const goTo = useRef<(i: number) => void>(() => {});

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
      const cardPoints = points.slice(1, -1);
      const nearest = (p: number) =>
        cardPoints.reduce(
          (best, q, i) => (Math.abs(q - p) < Math.abs(cardPoints[best] - p) ? i : best),
          0,
        );

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
          onUpdate: (self) => setActive(nearest(self.progress)),
        },
      });

      goTo.current = (i) => {
        const st = tween.scrollTrigger;
        if (!st) return;
        window.scrollTo({
          top: st.start + cardPoints[i] * (st.end - st.start),
          behavior: "smooth",
        });
      };
      setPinned(true);

      return () => {
        setPinned(false);
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

        {pinned && (
          <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
            {projects.map((project, i) => (
              <button
                key={project.title}
                type="button"
                aria-label={`Show ${project.title}`}
                aria-current={i === active}
                onClick={() => goTo.current(i)}
                className="group/dot cursor-pointer p-1.5"
              >
                <span
                  className={cn(
                    "block h-2 rounded-xl transition-all duration-500 ease-spring",
                    i === active ? "w-10 bg-accent" : "w-3 bg-ink group-hover/dot:bg-ink/60",
                  )}
                />
              </button>
            ))}
          </div>
        )}

        <div
          ref={trackRef}
          className="flex flex-col gap-10 px-6 md:h-screen md:w-max md:flex-row md:items-center md:gap-6 md:px-[8vw]"
        >
          <div className="shrink-0 md:w-[28vw]">
            <Eyebrow>Selected Work</Eyebrow>
            <Heading className="text-ink">
              A few things
              <br />
              worth showing.
            </Heading>
          </div>

          {projects.map((project) => {
            const dark = project.theme === "dark";
            return (
              <Card
                key={project.title}
                role="article"
                onClick={() => setOpen(project)}
                className={cn(
                  "group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border p-6 ring-0 md:p-8 backdrop-blur-sm transition-colors hover:border-accent/50 md:h-[60vh] md:w-[62vw]",
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
                  <div className="absolute inset-x-0 top-0 aspect-[16/10] md:inset-0 md:aspect-auto" aria-hidden="true">
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
                <div className="relative flex h-full flex-col justify-end max-md:pt-[40vw]">
                  <CardContent className="p-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "mr-1 font-display text-sm",
                          dark ? "text-paper/60" : "text-ink/50",
                        )}
                      >
                        {project.year}
                      </span>
                      {project.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className={cn(
                            "text-[0.7rem] uppercase tracking-wider max-md:hidden",
                            dark
                              ? "border-paper/25 text-paper/80"
                              : "border-ink/20 text-ink/70",
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3
                      className={cn(
                        "font-display text-2xl font-medium transition-colors group-hover:text-accent md:text-5xl",
                        dark ? "text-paper" : "text-ink",
                      )}
                    >
                      {project.title}
                    </h3>
                    <CardDescription
                      className={cn(
                        "mt-4 hidden max-w-lg text-base md:block",
                        dark ? "text-paper/80" : "text-ink/60",
                      )}
                    >
                      {project.description}
                    </CardDescription>
                    <div
                      className={cn(
                        "mt-4 flex flex-wrap items-center gap-3 text-lg md:mt-5 md:text-xl",
                        dark ? "text-paper/80" : "text-ink/70",
                      )}
                    >
                      {project.stacks.map((tag) => (
                        <TechChip key={tag} id={tag} iconOnly />
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-6 md:mt-6">
                      {project.isDemoIncluded && (
                        <Button
                          variant="link"
                          onClick={() => setOpen(project)}
                          className="h-auto p-0 text-xs uppercase tracking-[0.2em] text-accent md:tracking-[0.3em]"
                        >
                          See how it works <span aria-hidden="true">+</span>
                        </Button>
                      )}
                      {project.href && (
                        <Button
                          asChild
                          variant="link"
                          className={cn(
                            "h-auto p-0 text-[0.65rem] underline group-hover:text-accent md:text-xs md:tracking-[0.3em]",
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
