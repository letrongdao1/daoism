import Link from "next/link";
import { home } from "@/data/home";
import { timeline } from "@/data/profile";
import RevealLines from "@/components/motion/RevealLines";

export default function ExperienceTeaser() {
  return (
    <section
      aria-labelledby="experience-title"
      className="shell grid-editorial gap-y-16 py-(--section-y)"
    >
      <p className="col-span-full label text-ink-soft md:col-span-3">
        02 — Experience
      </p>

      <div className="col-span-full md:col-span-9">
        <h2 id="experience-title" className="sr-only">
          Experience
        </h2>
        <RevealLines className="text-title font-medium">
          {home.experience.statement}
        </RevealLines>
      </div>

      <ol className="col-span-full md:col-span-9 md:col-start-4">
        {timeline.map((item) => (
          <li
            key={item.period + item.role}
            className="grid grid-cols-1 gap-x-6 gap-y-1 border-t border-line py-6 md:grid-cols-[1fr_auto]"
          >
            <RevealLines as="div" className="text-lead font-medium">
              {item.role}
            </RevealLines>
            <RevealLines
              as="div"
              className="label text-ink-soft md:row-span-2 md:pt-2 md:text-right"
              delay={0.1}
            >
              {item.period}
            </RevealLines>
            <RevealLines as="div" className="text-ink-soft" delay={0.05}>
              {item.place}
            </RevealLines>
          </li>
        ))}
        <li className="border-t border-line pt-6">
          <Link
            href="/experience"
            className="label underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          >
            Full experience →
          </Link>
        </li>
      </ol>
    </section>
  );
}
