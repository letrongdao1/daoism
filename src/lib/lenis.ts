import type Lenis from "lenis";

let lenis: Lenis | null = null;

/** The active Lenis instance, or null when smooth scrolling is off. */
export const getLenis = () => lenis;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
