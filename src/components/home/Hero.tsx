"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { home } from "@/data/home";
import { profile } from "@/data/profile";
import RotatingBadge from "@/components/motion/RotatingBadge";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // as the hero scrolls away, the headline drifts up slower than the page
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-hero-drift]", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative shell flex min-h-svh flex-col justify-between pt-[calc(var(--nav-h)+2rem)] pb-[clamp(1.5rem,4vw,3.5rem)]"
    >
      <div className="intro-fade grid-editorial gap-y-1 text-ink-soft">
        <p className="col-span-2 label md:col-span-3">{profile.name}</p>
        <p className="col-span-2 label md:col-span-3">{profile.role}</p>
        <p className="col-span-full label max-md:mt-2 md:col-span-4 md:col-start-9 md:text-right">
          {profile.availability}
        </p>
      </div>

      <div data-hero-drift className="grid-editorial items-end gap-y-10">
        <h1 className="col-span-full text-display font-medium md:col-span-10">
          {home.hero.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span
                className="intro-line"
                style={{ "--i": i } as React.CSSProperties}
              >
                {line}
                {i === home.hero.lines.length - 1 && (
                  <span className="text-accent">.</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <RotatingBadge
          text={home.hero.badge}
          className="intro-fade col-span-1 w-[clamp(5rem,9vw,8rem)] justify-self-end max-md:hidden md:col-span-2"
        />

        <p className="intro-fade col-span-full flex flex-wrap gap-x-3 label text-ink-soft max-sm:gap-x-1 max-sm:tracking-[0.04em]">
          {home.hero.stack.map((item, i) => (
            <span key={item} className="flex gap-x-3 max-sm:gap-x-1">
              {i > 0 && <span aria-hidden>/</span>}
              {item}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
