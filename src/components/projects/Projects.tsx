"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects, type Project } from "../../data/projects";
import ProjectModal from "./ProjectModal";
import TechChip from "../TechChip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eyebrow, Heading } from "@/components/ui/typography";

// scrollLeft that centers each card, clamped to the scrollable range
function cardStops(track: HTMLElement) {
  const max = track.scrollWidth - track.clientWidth;
  return [...track.querySelectorAll<HTMLElement>("[data-slot=card]")].map(
    (card) =>
      Math.min(
        max,
        Math.max(
          0,
          card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
        ),
      ),
  );
}

export default function Projects() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current!;
    let lockedUntil = 0;

    // one card per shift+wheel notch instead of native ~100px steps fighting the snap
    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      if (e.timeStamp < lockedUntil) return;
      const x = track.scrollLeft;
      const stops = [0, ...cardStops(track)];
      const next =
        Math.sign(e.deltaX || e.deltaY) > 0
          ? stops.find((s) => s > x + 1)
          : stops.reverse().find((s) => s < x - 1);
      if (next === undefined) return;
      lockedUntil = e.timeStamp + 450;
      track.scrollTo({ left: next, behavior: "smooth" });
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const onScroll = () => {
    const track = trackRef.current!;
    const offsets = cardStops(track).map((s) => Math.abs(s - track.scrollLeft));
    setActive(offsets.indexOf(Math.min(...offsets)));
  };

  const goTo = (i: number) => {
    const track = trackRef.current!;
    track.scrollTo({ left: cardStops(track)[i], behavior: "smooth" });
  };

  return (
    <>
      <section
        id="work"
        className="relative overflow-hidden bg-paper py-24 md:min-h-screen md:py-0"
        aria-label="Selected work"
      >
        <div className="pointer-events-none absolute top-0 left-0 z-10 hidden h-full w-24 bg-linear-to-r from-paper to-transparent md:block" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 hidden h-full w-24 bg-linear-to-l from-paper to-transparent md:block" />

        <div className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {projects.map((project, i) => (
            <button
              key={project.title}
              type="button"
              aria-label={`Show ${project.title}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className="group/dot cursor-pointer p-1.5"
            >
              <span
                className={cn(
                  "block h-2 rounded-xl transition-all duration-500 ease-spring",
                  i === active
                    ? "w-10 bg-accent"
                    : "w-3 bg-ink group-hover/dot:bg-ink/60",
                )}
              />
            </button>
          ))}
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="relative flex [scrollbar-width:none] flex-col gap-10 px-6 md:h-screen md:snap-x md:snap-mandatory md:flex-row md:items-center md:gap-6 md:overflow-x-auto md:px-[8vw]"
        >
          <div className="shrink-0 md:w-[28vw] md:snap-start">
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
                  "group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border p-6 ring-0 backdrop-blur-sm transition-colors hover:border-accent/50 md:h-[60vh] md:w-[62vw] md:snap-center md:p-8",
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
                  <div
                    className="absolute inset-x-0 top-0 aspect-[16/10] md:inset-0 md:aspect-auto"
                    aria-hidden="true"
                  >
                    <Image
                      src={project.bg}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 62vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-linear-to-t from-15% via-25% to-50% md:from-35% md:via-55% md:to-80%",
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
                            "text-[0.7rem] tracking-wider uppercase max-md:hidden",
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
                          className="h-auto p-0 text-xs tracking-[0.2em] text-accent uppercase md:tracking-[0.3em]"
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
