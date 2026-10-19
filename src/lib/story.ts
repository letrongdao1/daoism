// the desktop horizontal scroll tween, null on mobile
let story: gsap.core.Tween | null = null;

export const setStory = (tween: gsap.core.Tween | null) => {
  story = tween;
};

export const storyTween = () => story ?? undefined;

// ponytail: read once at creation, so triggers made before a breakpoint change keep the old axis until reload
export function enterTrigger(el: Element, at = 80) {
  return story
    ? { trigger: el, containerAnimation: story, start: `left ${at}%` }
    : { trigger: el, start: `top ${at}%` };
}

// panels sit side by side on desktop, so their scroll position comes from their x offset
export function scrollYOf(el: HTMLElement) {
  const st = story?.scrollTrigger;
  const panel = el.closest<HTMLElement>("[data-story-track] > *");
  if (!st || !panel) return el.getBoundingClientRect().top + window.scrollY;
  return st.start + Math.min(panel.offsetLeft, st.end - st.start);
}
