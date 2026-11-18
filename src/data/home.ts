import type { TechId } from "./techs";

/**
 * Copy for the home page. Placeholder wording — edit freely; the layout
 * doesn't depend on exact lengths, only on the line arrays staying short.
 */
export const home = {
  hero: {
    // each entry is one display line
    lines: ["From the idea", "to the interface", "to launch"],
    stack: ["TypeScript", "React", "Next.js", "Node.js", "SQL"],
    badge: "Scroll to explore · Scroll to explore · ",
  },
  work: {
    title: "Selected work",
  },
  marquee: {
    words: ["Build", "Ship", "Iterate"],
    // the word left standing when the rows collapse
    finale: "Ship",
  },
  experience: {
    statement:
      "Two years shipping internal tools, onboarding flows and real-time portals for a securities firm.",
  },
  about: {
    // the claim splits between `before` and `after` to reveal the portrait
    before: "Details",
    after: "matter",
    second: "to me",
    bio: "I'm Dao, a fullstack engineer in Ho Chi Minh City. I like calm interfaces, honest data and code the next person can read.",
    stack: [
      "typescript",
      "react",
      "nextjs",
      "nodejs",
      "aspnet",
      "sqlserver",
      "postgresql",
      "tailwind",
      "gsap",
    ] satisfies TechId[],
  },
  contact: {
    line: "Looking to hire or collaborate? Get in touch.",
  },
};
