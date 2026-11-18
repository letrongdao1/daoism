"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { home } from "@/data/home";
import { projects } from "@/data/projects";
import { techs } from "@/data/techs";
import ProjectCover from "@/components/projects/ProjectCover";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Pinned section whose track of project cards scrolls sideways as the page
 * scrolls down. Images drift inside their frames for depth. On small screens
 * and with reduced motion it falls back to a native horizontal swipe.
 */
export default function WorkScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = () =>
            track.current!.scrollWidth - document.documentElement.clientWidth;

          const slide = gsap.to(track.current, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          gsap.utils
            .toArray<HTMLElement>("[data-card-image]")
            .forEach((img) => {
              gsap.fromTo(
                img,
                { xPercent: -8 },
                {
                  xPercent: 8,
                  ease: "none",
                  scrollTrigger: {
                    trigger: img.parentElement,
                    containerAnimation: slide,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                },
              );
            });
        },
      );
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      aria-labelledby="work-title"
      className="overflow-hidden md:flex md:h-svh md:items-center"
    >
      <div
        ref={track}
        className="flex snap-x snap-mandatory [scrollbar-width:none] items-stretch gap-[clamp(1rem,2vw,2rem)] overflow-x-auto px-(--gutter) py-(--section-y) md:w-max md:snap-none md:overflow-visible md:py-0 motion-reduce:md:w-auto motion-reduce:md:overflow-x-auto"
      >
        <header className="flex w-[78vw] shrink-0 snap-start flex-col justify-between md:w-[min(32vw,30rem)]">
          <p className="label text-ink-soft">01 — Work</p>
          <div>
            <h2 id="work-title" className="text-title font-medium">
              {home.work.title}
              <sup className="ml-2 align-super label text-accent">
                {pad(projects.length)}
              </sup>
            </h2>
            <Link
              href="/projects"
              className="mt-6 inline-block label underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              All projects →
            </Link>
          </div>
        </header>

        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex w-[78vw] shrink-0 snap-start flex-col gap-4 md:w-[min(58vw,56rem)]"
          >
            <div className="relative">
              <ProjectCover slug={project.slug}>
                <div className="relative aspect-4/3 overflow-hidden rounded-[clamp(1rem,1.6vw,1.75rem)] bg-paper-dim md:aspect-16/10">
                  {project.bg && (
                    <Image
                      data-card-image
                      src={project.bg}
                      alt=""
                      fill
                      sizes="(min-width: 48rem) 58vw, 78vw"
                      className="scale-[1.18] object-cover transition-[scale] duration-700 ease-out-expo group-hover:scale-[1.24]"
                    />
                  )}
                </div>
              </ProjectCover>
              <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 label backdrop-blur">
                {pad(i + 1)}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lead font-medium transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <span className="shrink-0 label text-ink-soft">
                {project.year}
              </span>
            </div>
            <p className="label text-ink-faint">
              {project.stacks.map((id) => techs[id].name).join(" / ")}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
