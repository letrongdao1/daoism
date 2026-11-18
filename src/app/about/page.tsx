import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/data/about";
import { profile, skills } from "@/data/profile";
import portrait from "@/assets/images/portrait.png";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import Parallax from "@/components/motion/Parallax";
import RevealLines from "@/components/motion/RevealLines";
import TechChip from "@/components/tech/TechChip";

export const metadata: Metadata = { title: "About" };

const pad = (n: number) => String(n).padStart(2, "0");

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader index="03 — About" title={about.title} intro={about.intro} />

      {/* portrait + bio */}
      <section className="shell grid-editorial gap-y-12 pb-(--section-y)">
        <Parallax
          amount={6}
          className="col-span-full aspect-4/5 rounded-[clamp(1rem,1.6vw,1.75rem)] bg-accent-soft md:col-span-5"
        >
          <Image
            src={portrait}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(min-width: 48rem) 40vw, 100vw"
            className="object-cover object-top"
          />
        </Parallax>

        <div className="col-span-full flex flex-col gap-8 md:col-span-5 md:col-start-8 md:self-end">
          {about.bio.map((paragraph) => (
            <RevealLines key={paragraph} className="text-lead">
              {paragraph}
            </RevealLines>
          ))}
        </div>
      </section>

      {/* principles */}
      <section
        aria-labelledby="principles-title"
        className="shell grid-editorial gap-y-10 border-t border-line py-(--section-y)"
      >
        <h2
          id="principles-title"
          className="col-span-full label text-ink-soft md:col-span-3"
        >
          How I work
        </h2>
        <ol className="col-span-full grid gap-12 md:col-span-9 md:grid-cols-3 md:gap-6">
          {about.principles.map((item, i) => (
            <li key={item.title} className="flex flex-col gap-4">
              <span className="label text-accent-ink">{pad(i + 1)}</span>
              <RevealLines as="h3" className="text-title font-medium">
                {item.title}
              </RevealLines>
              <RevealLines className="text-ink-soft" delay={0.1}>
                {item.body}
              </RevealLines>
            </li>
          ))}
        </ol>
      </section>

      {/* stack */}
      <section
        aria-labelledby="stack-title"
        className="shell grid-editorial gap-y-10 border-t border-line py-(--section-y)"
      >
        <h2
          id="stack-title"
          className="col-span-full label text-ink-soft md:col-span-3"
        >
          Stack
        </h2>
        <dl className="col-span-full md:col-span-9">
          {skills.map((group) => (
            <div
              key={group.label}
              className="grid gap-4 border-t border-line py-6 first:border-t-0 first:pt-0 md:grid-cols-[12rem_1fr]"
            >
              <dt className="text-lead font-medium">{group.label}</dt>
              <dd className="flex flex-wrap content-start items-start gap-2">
                {group.techs.map((id) => (
                  <TechChip key={id} id={id} />
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* now */}
      <section
        aria-labelledby="now-title"
        className="shell grid-editorial gap-y-10 border-t border-line py-(--section-y)"
      >
        <h2
          id="now-title"
          className="col-span-full label text-ink-soft md:col-span-3"
        >
          Now
        </h2>
        <dl className="col-span-full grid gap-8 md:col-span-9 md:grid-cols-3 md:gap-6">
          {about.now.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <dt className="label text-ink-soft">{item.label}</dt>
              <dd className="text-lead">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </PageTransition>
  );
}
