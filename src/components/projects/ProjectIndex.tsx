"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { techs } from "@/data/techs";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Editorial index of projects. On devices with a fine pointer, hovering a
 * row shows a floating preview of its cover that trails the cursor.
 */
export default function ProjectIndex() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.set(preview.current, { xPercent: -50, yPercent: -50 });
    },
    { scope: root },
  );

  const follow = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    gsap.to(preview.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div ref={root} onPointerMove={follow}>
      <ol
        className="shell pb-(--section-y)"
        onPointerLeave={() => setActive(null)}
      >
        {projects.map((project, i) => (
          <li key={project.slug} className="border-t border-line last:border-b">
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="Open"
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className={cn(
                "grid-editorial items-baseline gap-y-3 py-[clamp(1.5rem,3vw,2.75rem)] transition-opacity duration-500",
                active !== null && active !== i && "opacity-30",
              )}
            >
              <span className="col-span-1 label text-ink-soft">
                {pad(i + 1)}
              </span>
              <span className="col-span-3 text-title font-medium md:col-span-6">
                {project.title}
              </span>
              <span className="col-span-full label text-ink-faint md:col-span-3 md:col-start-8">
                {project.stacks
                  .slice(0, 3)
                  .map((id) => techs[id].name)
                  .join(" / ")}
              </span>
              <span className="col-span-full label text-ink-soft md:col-span-2 md:col-start-11 md:text-right">
                {project.year}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* floating cover preview (desktop, mouse only) */}
      <div
        ref={preview}
        aria-hidden
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-30 aspect-16/10 w-[clamp(16rem,26vw,28rem)] overflow-hidden rounded-2xl transition-[opacity,scale] duration-500 ease-out-expo motion-reduce:hidden max-md:hidden",
          active === null ? "scale-90 opacity-0" : "scale-100 opacity-100",
        )}
      >
        {projects.map(
          (project, i) =>
            project.bg && (
              <Image
                key={project.slug}
                src={project.bg}
                alt=""
                fill
                sizes="28vw"
                className={cn(
                  "object-cover transition-opacity duration-300",
                  active === i ? "opacity-100" : "opacity-0",
                )}
              />
            ),
        )}
      </div>
    </div>
  );
}
