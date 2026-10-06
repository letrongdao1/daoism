"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Eyebrow, Heading } from "@/components/ui/typography";

const links = [
  { label: "Email", href: "mailto:letrongdaocontact8@gmail.com" },
  { label: "GitHub", href: "https://github.com/letrongdao1" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dao-le-trong-09908b285",
  },
];

export default function Contact() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-paper px-6 text-center"
      aria-label="Contact"
    >
      <div
        className="pulse-glow absolute top-1/2 left-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.25)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Eyebrow className="mb-4">Get in touch</Eyebrow>
        <Heading className="text-5xl leading-tight text-ink md:text-7xl">
          Let's build
          <br />
          something.
        </Heading>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {links.map((link) => (
            <Button
              key={link.label}
              asChild
              variant="link"
              className="h-auto p-0 text-sm tracking-[0.3em] text-ink/70 uppercase hover:text-accent hover:no-underline"
            >
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
        </div>

        <p className="mt-16 text-xs text-ink/30">
          © {new Date().getFullYear()} Dao Trong Le
        </p>
      </div>
    </footer>
  );
}
