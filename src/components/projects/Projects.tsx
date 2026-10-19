"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { projects, type Project } from "../../data/projects";
import ProjectModal from "./ProjectModal";
import TechChip from "../TechChip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/typography";

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <>
      <section
        id="work"
        className="relative flex shrink-0 flex-col gap-10 overflow-hidden bg-ink px-5 py-20 text-paper lg:h-dvh lg:w-screen lg:p-0"
        aria-label="Selected work"
      >
        <Eyebrow className="lg:absolute lg:top-(--vg) lg:left-32 lg:mb-0">
          Selected work
        </Eyebrow>

        <div className="flex flex-col gap-3 lg:absolute lg:top-(--vg) lg:right-16 lg:w-[48vw]">
          <p className="text-xs tracking-[0.3em] text-paper/50 uppercase">
            Projects ({String(projects.length).padStart(2, "0")})
          </p>
          <ul className="group/list border-t border-paper/15">
            {projects.map((project, i) => (
              <li key={project.title} className="border-b border-paper/15">
                <button
                  type="button"
                  onClick={() => setOpen(project)}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "flex w-full cursor-pointer items-baseline justify-between gap-4 py-3 text-left transition-opacity duration-500 group-hover/list:opacity-30 hover:opacity-100! focus-visible:opacity-100!",
                    i === active && "lg:text-accent",
                  )}
                >
                  <span className="font-display text-2xl font-medium lg:text-[min(5.5vh,3.2vw)] lg:leading-tight">
                    {project.title}
                  </span>
                  <span className="shrink-0 font-display text-xs text-paper/50 tabular-nums">
                    {project.year}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden aspect-16/10 w-[min(36vw,calc(52dvh*1.6))] overflow-hidden rounded-xl bg-paper/5 lg:absolute lg:bottom-(--vg) lg:left-32 lg:block"
        >
          {projects.map((project, i) =>
            project.bg ? (
              <Image
                key={project.title}
                src={project.bg}
                alt=""
                fill
                sizes="36vw"
                className={cn(
                  "object-cover object-top transition duration-700",
                  i === active
                    ? "scale-100 opacity-100"
                    : "scale-105 opacity-0",
                )}
              />
            ) : null,
          )}
        </div>

        <div className="hidden flex-col gap-5 lg:absolute lg:right-16 lg:bottom-(--vg) lg:flex lg:w-[48vw]">
          <p key={current.title} className="max-w-xl text-base text-paper/70">
            {current.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xl text-paper/80">
            {current.stacks.map((id) => (
              <TechChip key={id} id={id} iconOnly />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {current.isDemoIncluded && (
              <Button
                variant="link"
                onClick={() => setOpen(current)}
                className="h-auto p-0 text-xs tracking-[0.3em] text-accent uppercase"
              >
                See how it works <span aria-hidden="true">+</span>
              </Button>
            )}
            {current.href && (
              <a
                href={current.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs tracking-[0.2em] text-paper/70 uppercase transition hover:text-accent"
              >
                Visit <ArrowUpRightIcon className="size-4" />
              </a>
            )}
          </div>
        </div>
      </section>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </>
  );
}
