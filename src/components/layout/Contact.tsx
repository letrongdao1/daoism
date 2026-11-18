"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { home } from "@/data/home";
import { contactLinks, profile } from "@/data/profile";
import Lottie from "@/components/motion/Lottie";
import RevealLines from "@/components/motion/RevealLines";
import ContactForm from "@/components/layout/ContactForm";

const links = [
  { ...contactLinks.email, value: profile.contacts.email },
  { ...contactLinks.linkedin, value: "in/dao-le-trong" },
  { ...contactLinks.github, value: "@letrongdao1" },
  { label: "CV", href: profile.cv, value: "Download PDF" },
];

/** Dark closing section shared by every page: a self-drawing line + links. */
export default function Contact() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-draw]",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top 75%",
              end: "bottom bottom",
              scrub: 0.8,
            },
          },
        );
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="contact"
      data-theme="dark"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <svg
        aria-hidden
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[12%] h-[60%] w-full text-night-line"
      >
        <path
          data-draw
          pathLength={1}
          strokeDasharray="1"
          d="M-20 420 C 260 520, 380 140, 560 260 S 700 560, 540 520 S 420 300, 760 220 S 1180 120, 1460 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative shell grid-editorial flex-1 grid-rows-[auto_auto_auto_1fr_auto] gap-y-10 pt-[calc(var(--nav-h)+2rem)] pb-6 lg:grid-rows-[auto_auto_1fr_auto]">
        <p className="col-span-full label text-accent">04 — Contact</p>

        <div className="col-span-full lg:col-span-9">
          <h2 id="contact-title">
            <RevealLines as="span" className="block text-title font-medium">
              {home.contact.line}
            </RevealLines>
          </h2>
          <p className="mt-6 label leading-relaxed text-night-ink/60">
            <span className="text-accent">Open to — </span>
            {profile.openTo.join(" · ")}
          </p>
        </div>

        <Lottie
          src="/lottie/scribble-on-dark.json"
          className="col-span-3 hidden size-[clamp(9rem,15vw,15rem)] self-center justify-self-end opacity-80 lg:block"
        />

        <ContactForm />

        <ul className="col-span-full self-start lg:col-span-6 lg:col-start-7">
          {links.map((link) => (
            <li key={link.label} className="border-t border-line">
              <a
                href={link.href}
                target={
                  link.href.startsWith("http") || link.label === "CV"
                    ? "_blank"
                    : undefined
                }
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-x-6 gap-y-1 py-4 max-sm:flex-col"
              >
                <span className="label text-night-ink/60">{link.label}</span>
                <span className="flex min-w-0 items-baseline gap-3 text-lead font-medium break-all transition-colors group-hover:text-accent">
                  {link.value}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="col-span-full flex flex-wrap justify-between gap-4 border-t border-line pt-6 label text-night-ink/50">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Ho Chi Minh City · Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
