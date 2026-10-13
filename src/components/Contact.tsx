"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { contactLinks, profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";

const links = [contactLinks.github, contactLinks.linkedin];
const PHRASE = "Let's build something";

const localTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

function LocalTime() {
  const [time, setTime] = useState(localTime);
  useEffect(() => {
    const id = setInterval(() => setTime(localTime()), 10_000);
    return () => clearInterval(id);
  }, []);
  // server and client clocks can straddle a minute
  return <time suppressHydrationWarning>{time} GMT+7</time>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const { email } = profile.contacts;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      location.href = contactLinks.email.href;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex max-w-full cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-white/3 px-5 py-3 font-display text-base text-paper transition-colors hover:border-accent/50 md:px-7 md:py-4 md:text-2xl"
    >
      <span className="truncate">{email}</span>
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent transition-transform group-hover:scale-110 md:size-10">
        {copied ? (
          <CheckIcon className="size-4 md:size-5" />
        ) : (
          <CopyIcon className="size-4 md:size-5" />
        )}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}

export default function Contact() {
  const ref = useScrollReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // two identical halves, so sliding by -50% loops seamlessly
    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
    // start far in so scrolling up can run it backwards
    loop.totalTime(loop.duration() * 100);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const boost = Math.min(6, 1 + Math.abs(self.getVelocity()) / 300);
        gsap.to(loop, {
          timeScale: self.direction * boost,
          duration: 0.2,
          overwrite: true,
          onComplete: () => {
            gsap.to(loop, { timeScale: self.direction, duration: 1 });
          },
        });
      },
    });

    return () => {
      trigger.kill();
      loop.kill();
    };
  }, []);

  const half = (
    <span className="flex shrink-0 items-center">
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className="flex items-center">
          <span
            className={
              i % 2
                ? "text-transparent [-webkit-text-stroke:1px_var(--color-paper)]"
                : ""
            }
          >
            {PHRASE}
          </span>
          <span className="mx-[0.35em] text-accent">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ink py-24 text-center"
      aria-label="Contact"
    >
      <div
        className="pulse-glow absolute top-1/2 left-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.25)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full flex-col items-center">
        <Eyebrow className="mb-6">Get in touch</Eyebrow>
        <h2 className="sr-only">{PHRASE}.</h2>

        <div aria-hidden="true" className="w-full overflow-hidden py-2">
          <div
            ref={trackRef}
            className="flex w-max font-display text-[16vw] leading-none font-medium whitespace-nowrap text-paper md:text-[11vw]"
          >
            {half}
            {half}
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col items-center gap-6 px-6 md:mt-14">
          <p className="flex flex-col items-center gap-x-3 gap-y-1.5 text-xs tracking-[0.1em] text-paper/60 uppercase md:flex-row md:text-sm md:tracking-[0.2em]">
            <span className="inline-flex items-center gap-3">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </span>
            <span aria-hidden="true" className="hidden md:inline">
              ·
            </span>
            <LocalTime />
          </p>

          <CopyEmail />

          <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <Button
                key={link.label}
                asChild
                variant="link"
                className="h-auto p-0 text-sm tracking-[0.3em] text-paper/70 uppercase hover:text-accent hover:no-underline"
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>

          <p className="mt-10 text-xs text-paper/30">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
