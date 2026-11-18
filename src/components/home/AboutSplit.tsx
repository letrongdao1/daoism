"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { home } from "@/data/home";
import { techs } from "@/data/techs";
import portrait from "@/assets/images/portrait.png";
import RevealLines from "@/components/motion/RevealLines";

/**
 * The claim line splits apart as it scrolls into view, opening a pill that
 * holds the portrait. The open state is the default, so reduced motion and
 * no-JS visitors see the finished layout.
 */
export default function AboutSplit() {
  const section = useRef<HTMLElement>(null);
  const { before, after, second, bio, stack } = home.about;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-claim]",
            start: "top 80%",
            end: "top 30%",
            scrub: 0.6,
          },
        });
        tl.from("[data-gap]", { width: 0, ease: "power2.inOut" }).from(
          "[data-gap] img",
          { scale: 1.4, yPercent: 20, ease: "power2.out" },
          0,
        );

        gsap.from("[data-chip]", {
          y: 16,
          opacity: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-chips]",
            start: "top 90%",
            once: true,
          },
        });
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      aria-labelledby="about-title"
      className="shell grid-editorial gap-y-16 py-(--section-y)"
    >
      <p className="col-span-full label text-ink-soft">03 — About</p>

      <h2
        id="about-title"
        data-claim
        className="col-span-full text-display font-medium"
      >
        <span className="flex items-center">
          {before}
          <span
            data-gap
            aria-hidden
            className="relative mx-[0.12em] inline-block h-[0.82em] w-[clamp(5rem,24vw,24rem)] shrink-0 overflow-hidden rounded-full bg-accent-soft"
          >
            <Image
              src={portrait}
              alt=""
              fill
              sizes="24vw"
              className="object-cover object-[50%_18%]"
            />
          </span>
          {after}
        </span>
        <span className="block">
          {second}
          <span className="text-accent">.</span>
        </span>
      </h2>

      <div className="col-span-full flex flex-col gap-10 md:col-span-6 md:col-start-7">
        <RevealLines className="text-lead">{bio}</RevealLines>

        <ul data-chips className="flex flex-wrap gap-2">
          {stack.map((id) => {
            const tech = techs[id];
            return (
              <li
                key={id}
                data-chip
                className="flex items-center gap-2 rounded-full border border-line py-1.5 pr-3.5 pl-2 text-sm"
              >
                {"icon" in tech && tech.icon && (
                  <Image
                    src={tech.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="size-4.5 object-contain"
                  />
                )}
                {tech.name}
              </li>
            );
          })}
        </ul>

        <Link
          href="/about"
          className="label underline decoration-line underline-offset-4 transition-colors hover:text-accent"
        >
          More about me →
        </Link>
      </div>
    </section>
  );
}
