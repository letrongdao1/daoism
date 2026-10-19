"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollSmoother } from "../lib/gsap";
import { setStory } from "../lib/story";

// layout effect so the smoother and story exist before children create their ScrollTriggers
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    const smoother = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? null
      : ScrollSmoother.create({ smooth: 0.8 });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = document.querySelector<HTMLElement>("[data-story-track]")!;
      const distance = () =>
        track.scrollWidth - document.documentElement.clientWidth;
      setStory(
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: track,
            pin: true,
            scrub: true,
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        }),
      );
      return () => setStory(null);
    });

    return () => {
      mm.revert();
      smoother?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
