"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";
import { Badge } from "@/components/ui/badge";

const timeline = [
  {
    period: "Since 2026",
    role: "Master of Information Technology",
    place: "University of Information Technology, VNU-HCM",
    isActive: true,
  },
  {
    period: "May 2025 – Jul 2026",
    role: "Software Engineer",
    place: "OCBS Securities Joint Stock Company",
    detail:
      "Built and maintained the internal MIS, the eKYC account-opening flow and the shareholder meeting portal, working across React, ASP.NET and SQL Server.",
    isActive: false,
  },
  {
    period: "2023 – 2025",
    role: "Frontend Developer Intern",
    place:
      "Sunshine Software (Mar – Apr 2025) · Digital Era JSC (Sep – Dec 2023)",
    detail:
      "Worked with senior engineers to ship product updates and fix UI/UX issues, making the products easier to use, more responsive and more visually consistent.",
    isActive: false,
  },

  {
    period: "2021 – 2025",
    role: "Bachelor of Software Engineering",
    place: "FPT University, Ho Chi Minh City · GPA 3.14 / 4.0",
    isActive: false,
  },
];

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
      <p
        data-reveal
        className="mb-3 font-display text-xs uppercase tracking-[0.4em] text-accent"
      >
        Experience
      </p>
      <h2
        data-reveal
        className="mb-16 font-display text-4xl font-medium leading-tight text-ink md:text-5xl"
      >
        Where I've been.
      </h2>

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
