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
      className="relative bg-paper px-6 py-28 md:px-[8vw]"
      aria-label="Experience and education"
    >
      <Eyebrow data-reveal>Experience</Eyebrow>
      <Heading data-reveal className="mb-16 text-ink">
        Where I've been.
      </Heading>

      <ol className="border-t border-ink/10">
        {timeline.map((item) => (
          <li
            key={item.role}
            data-reveal
            className="grid gap-2 border-b border-ink/10 py-8 md:grid-cols-[14rem_1fr] md:gap-12"
          >
            <span className={`font-display text-sm text-ink/50`}>
              {item.period}
              {item.isActive && (
                <Badge className="mt-1 flex w-fit bg-cyan-600/10 font-bold text-cyan-600">
                  In progress
                </Badge>
              )}
            </span>
            <div>
              <h3 className="font-display text-2xl font-medium text-ink">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-ink/60">{item.place}</p>
              {item.detail && (
                <p className="mt-4 max-w-2xl text-sm text-ink/70 md:text-base">
                  {item.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
