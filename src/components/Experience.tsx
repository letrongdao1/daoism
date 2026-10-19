"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";
import { timeline } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { Eyebrow, Heading } from "@/components/ui/typography";

export default function Experience() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1 });

  return (
    <section
      ref={ref}
      id="experience"
      data-reveal-group
      className="relative flex shrink-0 flex-col bg-paper text-ink lg:h-dvh lg:w-max lg:flex-row"
      aria-label="Experience and education"
    >
      <div
        data-reveal
        className="flex flex-col justify-between gap-6 px-5 pt-20 pb-12 lg:w-[34vw] lg:py-(--vg) lg:pr-12 lg:pl-32"
      >
        <Eyebrow className="mb-0">Experience</Eyebrow>
        <Heading className="text-ink">Where I&apos;ve been.</Heading>
      </div>

      {timeline.map((item) => (
        <article
          key={item.role}
          data-reveal
          className="flex flex-col justify-between gap-8 border-t border-ink/10 px-5 py-10 lg:w-[26vw] lg:border-t-0 lg:border-l lg:p-(--vg)"
        >
          <div className="flex flex-col gap-2">
            <span className="font-display text-sm text-ink/50">
              {item.period}
            </span>
            {item.isActive && (
              <Badge className="w-fit bg-cyan-600/10 font-bold text-cyan-600">
                In progress
              </Badge>
            )}
          </div>
          <div>
            <h3 className="font-display text-2xl font-medium xl:text-3xl">
              {item.role}
            </h3>
            <p className="mt-2 text-sm text-ink/60">{item.place}</p>
            {item.detail && (
              <p className="mt-4 text-sm text-ink/70 xl:text-base">
                {item.detail}
              </p>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
