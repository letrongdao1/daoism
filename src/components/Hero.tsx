"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  LoaderCircle,
  Menu,
  Mouse,
  Star,
  Type,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "../lib/gsap";
import { storyTween } from "../lib/story";
import LocalTime from "./LocalTime";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const pronouns = [
  "a software engineer",
  "a teamate",
  "a colleague",
  "a friend",
];

// keyed by letter position in the name, spaces skipped
// crops the icon's 24px box to its drawn bounds and scales the stroke with it,
// so at cap height every glyph has the same stem weight as the letters
const glyph = (Icon: LucideIcon, [x, y, w, h]: number[]) => {
  const s = h * 0.32;
  return {
    Icon,
    strokeWidth: s,
    viewBox: `${x - s / 2} ${y - s / 2} ${w + s} ${h + s}`,
  };
};

const glyphs: Record<number, ReturnType<typeof glyph>> = {
  1: glyph(Star, [2.1, 2, 19.8, 19.1]),
  2: glyph(Mouse, [5, 2, 14, 20]),
  4: glyph(Menu, [4, 5, 16, 14]),
  5: glyph(Type, [4, 4, 16, 16]),
  7: glyph(LoaderCircle, [3, 3, 18, 18]),
};

// each letter flies in from off-screen, one direction per letter
const entrances: gsap.TweenVars[] = [
  { x: "-100vw" },
  { y: "-100vh", rotation: -360 },
  { x: "100vw", y: "-100vh", rotation: 45 },
  { y: "100vh" },
  { x: "-100vw", y: "100vh" },
  { x: "100vw" },
  { x: "-100vw", y: "-100vh", rotation: -45 },
  { y: "100vh", rotation: 720 },
  { x: "100vw", y: "100vh" },
  { y: "-100vh" },
];

const craft = ["Pure", "Motion with purpose", "Details, end to end"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blobARef = useRef<HTMLDivElement | null>(null);
  const blobBRef = useRef<HTMLDivElement | null>(null);
  const nameWrapRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % pronouns.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.documentElement.classList.add("intro-ready");
      const intro = gsap.timeline({ delay: 0.3 });
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.utils.toArray<HTMLElement>("[data-letter]").forEach((el, i) => {
          intro.from(
            el,
            { duration: 1.4, ease: "expo.out", ...entrances[i] },
            i * 0.09,
          );
        });
      }
      intro.from(
        document.querySelectorAll("[data-intro]"),
        { opacity: 0, duration: 1.2, ease: "power1.out" },
        ">-0.2",
      );
      intro.from(
        "[data-hero-fade]",
        { opacity: 0, y: 16, duration: 0.9, ease: "power2.out", stagger: 0.08 },
        "<0.2",
      );

      const story = storyTween();
      if (story) {
        const wrap = nameWrapRef.current!;
        const about = document.getElementById("about")!;
        const portrait = about.querySelector<HTMLElement>("[data-portrait]")!;
        // offsets ignore transforms, so these stay valid while the track is mid-scroll
        gsap.to(nameRef.current, {
          x: () =>
            about.offsetLeft +
            portrait.offsetLeft +
            (portrait.offsetWidth - wrap.offsetWidth) / 2 -
            40 -
            sectionRef.current!.offsetLeft -
            wrap.offsetLeft,
          y: () =>
            portrait.offsetTop +
            portrait.offsetHeight * 0.05 -
            100 -
            wrap.offsetTop,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-ink",
          ),
          ease: "none",
          scrollTrigger: {
            trigger: about,
            containerAnimation: story,
            start: "left right",
            end: "left left",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(blobARef.current, {
        x: 60,
        y: 30,
        duration: 16,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(blobBRef.current, {
        x: -50,
        y: -40,
        duration: 20,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh shrink-0 flex-col justify-between gap-12 bg-ink px-5 pt-28 pb-10 lg:h-dvh lg:w-screen lg:p-0"
      aria-label="Introduction"
    >
      <div data-intro className="layer overflow-hidden" aria-hidden="true">
        <div
          ref={blobARef}
          className="absolute top-[-10%] left-[-10%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.14)_0%,transparent_70%)] blur-3xl"
        />
        <div
          ref={blobBRef}
          className="absolute right-[-10%] bottom-[-15%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(79,184,168,0.1)_0%,transparent_70%)] blur-3xl"
        />
      </div>

      <div
        data-intro
        className="layer opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        ref={nameWrapRef}
        className="relative lg:absolute lg:top-(--vg) lg:right-16 lg:z-1"
      >
        <h1
          ref={nameRef}
          className="font-grotesk text-[17vw] leading-[0.85] font-medium tracking-tight text-paper uppercase lg:text-[min(18vh,11vw)]"
        >
          <span className="sr-only">{profile.name}</span>
          {profile.name.split(" ").map((word, w, words) => {
            const offset = words.slice(0, w).join("").length;
            return (
              <span key={word} className="block" aria-hidden="true">
                {[...word].map((letter, l) => {
                  const g = glyphs[offset + l];
                  return (
                    <span
                      key={l}
                      data-letter
                      className={`inline-block ${g ? "" : "font-lucky"}`}
                    >
                      {g ? (
                        <g.Icon
                          strokeWidth={g.strokeWidth}
                          viewBox={g.viewBox}
                          fill={g.Icon === Star ? "currentColor" : "none"}
                          className="mx-[0.05em] inline-block h-[0.7em] w-auto align-baseline"
                        />
                      ) : (
                        letter
                      )}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h1>
      </div>

      <div className="relative flex flex-col gap-5 lg:absolute lg:top-(--vg) lg:left-32 lg:w-[min(30vw,30rem)]">
        <p
          data-hero-fade
          className="text-xs tracking-[0.3em] text-accent uppercase"
        >
          {profile.roles.join(" · ")}
        </p>
        <p
          data-hero-fade
          className="grid font-display text-[12vw] leading-[0.9] whitespace-nowrap text-accent lg:text-[min(17vh,6vw)]"
        >
          <span className="sr-only">{pronouns.join(", ")}</span>
          {pronouns.map((word, i) => (
            <span
              key={`${word}-${i === wordIndex}`}
              aria-hidden="true"
              className={`col-start-1 row-start-1 ${
                i === wordIndex ? "word-rise" : "invisible"
              }`}
            >
              {word}
            </span>
          ))}
        </p>
        <ol
          data-hero-fade
          className="mt-6 flex flex-col gap-3 text-lg lg:text-2xl"
        >
          {craft.map((line, i) => (
            <li
              key={line}
              className="flex items-baseline gap-4 border-t border-paper/10 pt-3 text-paper/80"
            >
              <span className="font-grotesk text-sm text-paper/40 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div
        data-hero-fade
        className="relative flex flex-col gap-1.5 text-sm text-paper/70 lg:absolute lg:bottom-(--vg) lg:left-32"
      >
        <span className="inline-flex items-center gap-3">
          <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
          {profile.availability}
        </span>
        <LocalTime />
      </div>

      <div
        data-hero-fade
        className="relative flex flex-wrap gap-3 lg:absolute lg:bottom-(--vg) lg:left-1/2 lg:-translate-x-1/2"
      >
        <Button
          asChild
          className="h-auto rounded-full px-6 py-3 font-semibold hover:bg-paper"
        >
          <a href={profile.cv} download>
            Download CV
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-auto rounded-full border-paper/20 bg-transparent px-6 py-3 text-paper hover:border-accent hover:bg-transparent hover:text-accent"
        >
          <a href="#work">View work</a>
        </Button>
      </div>

      <p
        data-hero-fade
        className="absolute right-16 bottom-(--vg) hidden items-center gap-3 font-display text-xs tracking-[0.4em] text-paper/60 uppercase lg:flex"
      >
        Scroll <ArrowRightIcon className="size-4" />
      </p>
    </section>
  );
}
