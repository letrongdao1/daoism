"use client";

import { useEffect, useRef, useState } from "react";
import type { COBEOptions } from "cobe";
import { Popover } from "radix-ui";
import { ScrollTrigger } from "../lib/gsap";
import TechChip from "./TechChip";
import { skills } from "@/data/profile";
import { techs, type TechId } from "@/data/techs";
import { Eyebrow, Heading } from "./ui/typography";
import { Globe } from "./ui/globe";
import { OrbitingCircles } from "./ui/orbiting-circles";

const techsOf = (...labels: string[]): TechId[] =>
  skills.filter((g) => labels.includes(g.label)).flatMap((g) => g.techs);

const ORBIT_SIZE = 800;

const rings = [
  { label: "Others", radius: 160, techs: techsOf("DevOps & tools") },
  { label: "Databases", radius: 230, techs: techsOf("Databases") },
  { label: "Backend", radius: 300, techs: techsOf("Backend") },
  { label: "Frontend", radius: 370, techs: techsOf("Frontend") },
];

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [201 / 255, 162 / 255, 75 / 255],
  glowColor: [0.25, 0.2, 0.1],
  markers: [{ location: [10.8231, 106.6297], size: 0.08 }],
};

function OrbitTech({ id }: { id: TechId }) {
  const [open, setOpen] = useState(false);
  const hover = (next: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setOpen(next);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={techs[id].name}
        className="flex size-full cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onPointerEnter={hover(true)}
        onPointerLeave={hover(false)}
        onClick={(e) => {
          // hover already opened it; don't let the click toggle it shut
          if ((e.nativeEvent as PointerEvent).pointerType === "mouse")
            e.preventDefault();
        }}
      >
        <TechChip id={id} iconOnly nativeTitle={false} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={10}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="z-50 flex animate-in flex-col items-center rounded-xl border border-accent/30 bg-ink/90 px-3.5 py-2 text-center shadow-lg shadow-accent/10 backdrop-blur-md fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <span className="text-sm text-paper">{techs[id].name}</span>
          <Popover.Arrow className="fill-accent/40" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default function Stack() {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const scale = Math.min(
        1,
        Math.max(0.45, entry.contentRect.width / ORBIT_SIZE),
      );
      el.style.setProperty("--orbit-scale", String(scale));
      // the orbit changes the page size, so later triggers need new positions
      ScrollTrigger.refresh();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stack"
      className="relative flex shrink-0 flex-col gap-10 overflow-hidden bg-ink px-5 py-20 lg:h-dvh lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:py-0 lg:pr-16 lg:pl-32"
      aria-label="Tech stack"
    >
      <div className="flex flex-col justify-between gap-6 lg:h-full lg:w-[28vw] lg:py-(--vg)">
        <Eyebrow>Stack</Eyebrow>
        <div>
          <Heading className="text-paper">
            Tools I reach for,
            <br />
            front to back.
          </Heading>
          <p className="mt-6 max-w-sm text-sm text-paper/60 md:text-base">
            Frontend on the outer ring, then backend, databases and the tooling
            that ships it. Hover any of them for its name.
          </p>
        </div>
      </div>

      <div
        ref={orbitRef}
        className="group/orbit flex w-full min-w-0 justify-center lg:w-[calc(100dvh-var(--vg))]"
      >
        <div className="relative flex size-[calc(800px*var(--orbit-scale,1))] shrink-0 items-center justify-center">
          <div className="absolute top-1/2 left-1/2 size-[calc(220px*var(--orbit-scale,1))] -translate-1/2">
            <Globe config={GLOBE_CONFIG} />
          </div>
          {rings.map((ring, i) => (
            <OrbitingCircles
              key={ring.label}
              radius={ring.radius}
              duration={30 + i * 10}
              reverse={i % 2 === 1}
              iconSize={56}
              className="border border-white/10 bg-ink/80 text-[calc(1.875rem*max(var(--orbit-scale,1),0.6))] text-paper/80 backdrop-blur-sm group-has-data-[state=open]/orbit:paused motion-reduce:paused"
            >
              {ring.techs.map((id) => (
                <OrbitTech key={id} id={id} />
              ))}
            </OrbitingCircles>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="corner-light pointer-events-none absolute inset-0"
      />
    </section>
  );
}
