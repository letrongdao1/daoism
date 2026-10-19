"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { gsap, SplitText } from "../lib/gsap";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { enterTrigger, storyTween } from "../lib/story";
import LocalTime from "./LocalTime";
import { contactLinks, profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Eyebrow, Heading } from "@/components/ui/typography";

const links = [contactLinks.github, contactLinks.linkedin];

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
      className="group inline-flex max-w-full cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-white/3 px-5 py-3 font-title text-base text-paper transition-colors hover:border-accent/50 md:px-7 md:py-4 md:text-2xl"
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
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = SplitText.create(headingRef.current!, {
      type: "lines,words",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap
          .timeline({
            scrollTrigger: {
              ...enterTrigger(self.elements[0], 85),
              end: storyTween() ? "left 30%" : "bottom 40%",
              scrub: 1,
            },
          })
          .from(self.lines, { yPercent: 110, stagger: 0.15, duration: 0.6 })
          .from(
            self.words,
            { opacity: 0.15, stagger: 0.1, ease: "none", duration: 0.3 },
            0.2,
          ),
    });

    return () => split.revert();
  }, []);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative flex min-h-dvh shrink-0 flex-col items-center justify-center overflow-hidden border-paper/10 bg-ink py-24 text-center lg:h-dvh lg:w-screen lg:border-l"
      aria-label="Contact"
    >
      <div
        className="pulse-glow absolute top-1/2 left-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.25)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full flex-col items-center">
        <Eyebrow className="mb-6">Get in touch</Eyebrow>
        <Heading
          ref={headingRef}
          className="max-w-4xl px-6 text-paper md:text-6xl"
        >
          Every opportunity is a hidden treasure.
        </Heading>

        <div className="mt-10 flex w-full flex-col items-center gap-6 px-6 md:mt-14">
          <p className="flex flex-col items-center gap-x-3 gap-y-1.5 text-xs tracking-widest text-paper/60 uppercase md:flex-row md:text-sm md:tracking-[0.2em]">
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
                <a href={link.href} target="_blank">
                  {link.label}
                </a>
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
