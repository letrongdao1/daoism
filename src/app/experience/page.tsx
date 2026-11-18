import type { Metadata } from "next";
import { profile, timeline } from "@/data/profile";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import RevealLines from "@/components/motion/RevealLines";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <PageTransition>
      <PageHeader
        index="02 — Experience"
        title={["Work &", "education"]}
        intro={`${profile.experience[0].toUpperCase()}${profile.experience.slice(1)} of professional work across frontend, backend and databases, plus internships and study along the way.`}
      />

      <ol className="shell pb-(--section-y)">
        {timeline.map((item) => (
          <li
            key={item.period + item.role}
            className="grid-editorial gap-y-4 border-t border-line py-[clamp(2rem,4vw,3.5rem)]"
          >
            <div className="col-span-full flex items-center gap-3 md:col-span-3">
              <span className="label text-ink-soft">{item.period}</span>
              {item.isActive && (
                <span className="flex items-center gap-1.5 label text-accent">
                  <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                  Now
                </span>
              )}
            </div>

            <div className="col-span-full flex flex-col gap-3 md:col-span-8 md:col-start-5">
              <RevealLines as="h2" className="text-title font-medium">
                {item.role}
              </RevealLines>
              <RevealLines className="text-lead text-ink-soft" delay={0.05}>
                {item.place}
              </RevealLines>
              {item.detail && (
                <RevealLines className="mt-3 max-w-2xl" delay={0.1}>
                  {item.detail}
                </RevealLines>
              )}
            </div>
          </li>
        ))}

        <li className="grid-editorial border-t border-line pt-10">
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="col-span-full label underline decoration-line underline-offset-4 transition-colors hover:text-accent md:col-start-5"
          >
            Download full CV ↓
          </a>
        </li>
      </ol>
    </PageTransition>
  );
}
