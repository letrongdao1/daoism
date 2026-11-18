"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { home } from "@/data/home";

const ROWS = 5;

/**
 * Dark pinned "type moment": diagonal rows of words slide against each other
 * while you scroll, then fall away leaving a single word in the middle.
 */
export default function KineticMarquee() {
  const section = useRef<HTMLElement>(null);
  const { words, finale } = home.marquee;
  const phrase = Array.from({ length: 4 }, () => words).flat();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.8,
          },
        });

        rows.forEach((row, i) => {
          tl.fromTo(
            row,
            { xPercent: i % 2 ? -30 : -5 },
            { xPercent: i % 2 ? -5 : -30, duration: 1 },
            0,
          );
        });

        tl.to("[data-rows]", { rotate: 0, scale: 1.4, duration: 0.5 }, 0.55)
          .to(rows, { opacity: 0, stagger: 0.04, duration: 0.3 }, 0.6)
          .fromTo(
            "[data-finale]",
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
            0.75,
          );
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      data-theme="dark"
      aria-label={words.join(", ")}
      className="relative grid h-svh place-items-center overflow-hidden"
    >
      <div
        data-rows
        aria-hidden
        className="absolute inset-[-20%] flex -rotate-12 flex-col justify-center gap-[0.15em] text-[clamp(4rem,11vw,10rem)] leading-[0.9] font-semibold tracking-[-0.04em] uppercase motion-reduce:hidden"
      >
        {Array.from({ length: ROWS }, (_, i) => (
          <div
            key={i}
            data-row
            className={i % 2 ? "text-night-soft" : "text-accent"}
          >
            <span className="whitespace-nowrap">{phrase.join(" ")}</span>
          </div>
        ))}
      </div>

      <p
        data-finale
        className="relative text-display font-semibold tracking-[-0.05em] uppercase"
      >
        {finale}
        <span className="text-accent">.</span>
      </p>
    </section>
  );
}
