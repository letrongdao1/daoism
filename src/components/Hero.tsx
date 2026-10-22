"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { gsap } from "../lib/gsap";
import { storyTween } from "../lib/story";
import LocalTime from "./LocalTime";
import heroBg from "../assets/images/test-prl.jpg";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const bgTiltRef = useRef<HTMLDivElement | null>(null);
  const blobARef = useRef<HTMLDivElement | null>(null);
  const blobBRef = useRef<HTMLDivElement | null>(null);
  const nameWrapRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const listeners = new AbortController();
    const ctx = gsap.context(() => {
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

      // background trails the page at ~35% speed; its 10% bleed covers the shift
      const section = sectionRef.current!;
      gsap.to(bgRef.current, {
        ...(story
          ? { x: () => section.offsetWidth * 0.65 }
          : { y: () => section.offsetHeight * 0.4 }),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          ...(story
            ? {
                containerAnimation: story,
                start: "left left",
                end: "right left",
              }
            : { start: "top top", end: "bottom top" }),
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (window.matchMedia("(pointer: fine)").matches) {
        const tilt = [
          [bgTiltRef.current, -24],
          [nameWrapRef.current, 10],
        ] as const;
        const movers = tilt.map(([el, range]) => ({
          range,
          x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
        }));
        const move = (nx: number, ny: number) =>
          movers.forEach((m) => {
            m.x(nx * m.range);
            m.y(ny * m.range);
          });
        const { signal } = listeners;
        section.addEventListener(
          "pointermove",
          (e) =>
            move(
              e.clientX / window.innerWidth - 0.5,
              e.clientY / window.innerHeight - 0.5,
            ),
          { signal },
        );
        section.addEventListener("pointerleave", () => move(0, 0), { signal });
      }

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

    return () => {
      listeners.abort();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh shrink-0 flex-col justify-between gap-12 bg-ink px-5 pt-28 pb-10 lg:h-dvh lg:w-screen lg:p-0"
      aria-label="Introduction"
    >
      <div data-intro className="layer overflow-hidden" aria-hidden="true">
        <div ref={bgRef} className="absolute inset-[-10%]">
          <div ref={bgTiltRef} className="absolute inset-0">
            <Image
              src={heroBg}
              alt=""
              fill
              preload
              sizes="120vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-ink/60" />
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
        ref={nameWrapRef}
        className="relative lg:absolute lg:top-(--vg) lg:right-16 lg:z-1"
      >
        <h1
          ref={nameRef}
          className="font-title text-[17vw] leading-[0.85] tracking-tight text-paper uppercase lg:text-[min(18vh,11vw)]"
        >
          <span className="sr-only">{profile.name}</span>
          {profile.name.split(" ").map((word) => (
            <span key={word} className="block" aria-hidden="true">
              {word}
            </span>
          ))}
        </h1>
      </div>

      <div className="relative flex flex-col gap-5 lg:absolute lg:top-(--vg) lg:left-32 lg:w-[min(30vw,30rem)]">
        <p
          data-hero-fade
          className="text-xs tracking-[0.3em] text-accent uppercase"
        >
          {profile.role}
        </p>
        <div data-hero-fade className="flex flex-col gap-5">
          <p className="font-title text-[14vw] leading-[0.95] text-accent lg:text-[min(12vh,4.2vw)]">
            Any layer. Any stack.
          </p>
          <p className="text-lg text-paper/60 lg:text-xl">
            Curious enough to learn it, careful enough to ship it.
          </p>
        </div>
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
        className="absolute right-16 bottom-(--vg) hidden items-center gap-3 font-title text-xs tracking-[0.4em] text-paper/60 uppercase lg:flex"
      >
        Scroll <ArrowRightIcon className="size-4" />
      </p>
    </section>
  );
}
