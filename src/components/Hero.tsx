"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { techs } from "@/data/techs";
import { contactLinks, heroStack, profile } from "@/data/profile";
import mailIcon from "../assets/icons/mail.png";
import phoneIcon from "../assets/icons/phone.png";
import githubIcon from "../assets/icons/github.png";
import linkedinIcon from "../assets/icons/linkedin.png";
import portrait from "../assets/images/portrait.png";

const links = [
  { ...contactLinks.email, icon: mailIcon },
  { ...contactLinks.phone, icon: phoneIcon },
  { ...contactLinks.github, icon: githubIcon },
  { ...contactLinks.linkedin, icon: linkedinIcon },
];

const adjectives = [
  "clean",
  "reliable",
  "fast",
  "accessible",
  "responsive",
  "intuitive",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blobARef = useRef<HTMLDivElement | null>(null);
  const blobBRef = useRef<HTMLDivElement | null>(null);
  const heroIconsRef = useRef<HTMLDivElement | null>(null);
  const cornerIconsRef = useRef<HTMLDivElement | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % adjectives.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.1,
      });

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      ScrollTrigger.create({
        trigger: heroIconsRef.current,
        start: "top 10%",
        end: "max",
        onToggle: ({ isActive }) => {
          const fade = {
            duration: reduceMotion ? 0 : 0.4,
            ease: "power2.out",
            overwrite: true,
          };
          gsap.to(heroIconsRef.current, {
            ...fade,
            autoAlpha: isActive ? 0 : 1,
          });
          gsap.to(cornerIconsRef.current, {
            ...fade,
            autoAlpha: isActive ? 1 : 0,
            y: isActive ? 0 : 24,
          });
        },
      });

      if (!reduceMotion) {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const iconLinks = links.map((link) => (
    <Button
      key={link.label}
      asChild
      variant="ghost"
      className="size-11 text-paper/60 hover:bg-transparent hover:text-accent"
    >
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={link.label}
        title={link.label}
      >
        <span
          className="h-7 w-7 bg-current"
          style={{
            mask: `url(${link.icon.src}) center / contain no-repeat`,
            WebkitMask: `url(${link.icon.src}) center / contain no-repeat`,
          }}
          aria-hidden="true"
        />
      </a>
    </Button>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink py-28"
      aria-label="Introduction"
    >
      <div className="layer" aria-hidden="true">
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
        className="layer opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-4 px-6 md:grid-cols-[1.25fr_1fr] md:gap-12 md:px-10">
        <div className="flex flex-col items-center text-center md:order-last">
          <div data-hero-fade className="relative w-64 sm:w-80 lg:w-96">
            <div
              className="absolute top-[8%] left-1/2 aspect-square w-[85%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.28)_0%,rgba(201,162,75,0.08)_45%,transparent_70%)]"
              aria-hidden="true"
            />
            <img
              src={portrait.src}
              alt={`Portrait of ${profile.name}`}
              className="relative w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] select-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 60%, transparent 95%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 60%, transparent 95%)",
              }}
              draggable={false}
            />
          </div>
          <h1
            data-hero-fade
            className="relative -mt-20 bg-linear-to-br from-paper via-paper to-accent bg-clip-text font-display text-4xl font-bold tracking-tight text-transparent uppercase drop-shadow-[0_0_30px_rgba(201,162,75,0.25)] sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </h1>
          <span
            data-hero-fade
            className="mt-3 text-sm font-medium tracking-[0.3em] text-accent uppercase sm:text-base"
          >
            {profile.roles.map((role) => (
              <p key={role}>{role}</p>
            ))}
          </span>
        </div>

        <div className="flex flex-col items-start text-left">
          <Badge
            data-hero-fade
            variant="outline"
            className="mb-8 h-auto gap-2 self-center border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-normal whitespace-normal text-emerald-300 transition-none sm:text-sm md:self-baseline"
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            {profile.availability}
          </Badge>

          <p
            data-hero-fade
            className="font-display text-3xl leading-tight font-medium text-paper lg:text-4xl"
          >
            I build <span className="sr-only">clean, reliable</span>
            <span className="inline-grid" aria-hidden="true">
              {adjectives.map((word, i) => (
                <span
                  key={`${word}-${i === wordIndex}`}
                  className={`col-start-1 row-start-1 ${
                    i === wordIndex
                      ? "word-rise font-semibold text-accent"
                      : "invisible"
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
            <br />
            web interfaces.
          </p>

          <p
            data-hero-fade
            className="mt-6 max-w-xl text-base text-paper/70 sm:text-lg"
          >
            Products that real people use every day. I care about the details
            that make them easy to use, and when a feature needs it, I work on
            the backend too.
          </p>

          <p data-hero-fade className="mt-6 text-sm text-paper/50">
            {heroStack.map((id) => techs[id].name).join(" · ")}
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap gap-3">
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
              <a href="#work">View work →</a>
            </Button>
          </div>

          <div data-hero-fade className="mt-8 -ml-2.5">
            <div ref={heroIconsRef} className="flex items-center gap-5">
              {iconLinks}
            </div>
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <div
            ref={cornerIconsRef}
            className="invisible fixed right-6 bottom-6 z-50 flex items-center gap-2 opacity-0 mix-blend-difference"
            style={{ transform: "translateY(24px)" }}
          >
            {iconLinks}
          </div>,
          document.body,
        )}
    </section>
  );
}
