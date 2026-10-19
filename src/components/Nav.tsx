"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { MenuIcon, XIcon } from "lucide-react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { scrollYOf } from "../lib/story";
import { contactLinks } from "@/data/profile";

const links = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  contactLinks.github,
  contactLinks.linkedin,
  contactLinks.email,
];

// duration grows with sqrt(distance), so far sections scroll at a higher speed
function scrollToHash(hash: string) {
  const target = hash === "#" ? 0 : document.querySelector<HTMLElement>(hash);
  if (target === null) return false;
  const y = target === 0 ? 0 : scrollYOf(target);
  const duration = gsap.utils.clamp(
    0.4,
    1.6,
    Math.sqrt(Math.abs(y - window.scrollY)) / 60,
  );
  gsap.to(window, {
    scrollTo: y,
    duration,
    ease: "power2.inOut",
    overwrite: true,
  });
  return true;
}

export default function Nav() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      )
        return;
      const link = (e.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!link) return;
      const hash = link.getAttribute("href")!;
      if (!scrollToHash(hash)) return;
      e.preventDefault();
      history.pushState(null, "", hash === "#" ? location.pathname : hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) =>
        progressRef.current!.style.setProperty("--p", String(self.progress)),
    });
    return () => trigger.kill();
  }, []);

  return (
    <header
      data-intro
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-paper/10 bg-ink px-5 py-4 text-paper lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:w-16 lg:flex-col lg:justify-start lg:gap-10 lg:border-r lg:border-b-0 lg:px-0 lg:py-8"
    >
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-(--p,0) bg-accent lg:top-0 lg:right-0 lg:bottom-auto lg:left-auto lg:h-full lg:w-px lg:origin-top lg:scale-x-100 lg:scale-y-(--p,0)"
      />

      <a
        href="#"
        className="font-title text-sm tracking-[0.3em] uppercase lg:rotate-180 lg:[writing-mode:vertical-rl]"
      >
        daoism
      </a>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          className="-m-2 p-2 transition hover:text-accent lg:order-first"
          aria-label="Open menu"
        >
          <MenuIcon className="size-5" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content
            className="fixed inset-0 z-60 flex flex-col bg-ink px-5 pt-20 pb-6 text-paper duration-500 outline-none lg:py-(--vg) lg:pr-16 lg:pl-32 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
            onCloseAutoFocus={(e) => {
              const hash = pendingHash.current;
              if (!hash) return;
              e.preventDefault();
              pendingHash.current = null;
              scrollToHash(hash);
              history.pushState(
                null,
                "",
                hash === "#" ? location.pathname : hash,
              );
            }}
          >
            <Dialog.Title className="sr-only">Menu</Dialog.Title>
            <Dialog.Description className="sr-only">
              Site navigation
            </Dialog.Description>
            <Dialog.Close
              className="absolute top-4 right-5 -m-2 p-2 transition hover:text-accent lg:top-(--vg) lg:right-16"
              aria-label="Close menu"
            >
              <XIcon className="size-6" />
            </Dialog.Close>

            <nav aria-label="Primary" className="flex flex-1 flex-col">
              <ul className="flex flex-col gap-2 lg:gap-[1.5vh]">
                {links.map((link, i) => (
                  <li
                    key={link.href}
                    className="animate-in duration-700 ease-out fade-in-0 [animation-fill-mode:both] slide-in-from-bottom-6"
                    style={{ animationDelay: `${100 + i * 60}ms` }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-baseline gap-4 text-[11vw] leading-[0.95] lg:gap-6 lg:text-[min(11vh,8vw)]"
                      onClick={(e) => {
                        e.preventDefault();
                        pendingHash.current = link.href;
                        setOpen(false);
                      }}
                    >
                      <span className="font-title text-[0.25em] text-paper/40 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-title font-medium tracking-tight uppercase opacity-30 transition group-hover:text-accent group-hover:opacity-100">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-wrap gap-6 border-t border-paper/15 pt-5 text-sm lg:self-end lg:border-0 lg:pt-0">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="tracking-[0.2em] text-paper/70 uppercase underline-offset-4 transition hover:text-accent hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
