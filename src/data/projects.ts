import type { StaticImageData } from "next/image";
import type { TechId } from "./techs";
import hnbHubBg from "../assets/images/projects/hnb-hub-bg.png";
import misBg from "../assets/images/projects/mis-bg.png";
import shareholderBg from "../assets/images/projects/shportal.png";
import ekycBg from "../assets/images/projects/ekyc.png";
import portfolioBg from "../assets/images/projects/portfolio.png";

export type Project = {
  title: string;
  year: string;
  description: string;
  stacks: TechId[];
  tags?: string[];
  bg?: StaticImageData;
  theme?: "light" | "dark";
  href?: string;
  isDemoIncluded?: boolean;
  isInternal?: boolean;
};

export const projects: Project[] = [
  {
    title: "Shareholder Meeting Portal",
    year: "2026",
    description:
      "Rebuilt from scratch for OCBS annual general meetings: check-in, eligibility lists, ballot counting and live results. It worked without issues on its first live use, for a meeting of 60+ shareholders.",
    stacks: ["react", "vite", "typescript", "antd"],
    tags: ["Real-time", "Boardroom-grade"],
    bg: shareholderBg,
    isDemoIncluded: true,
    isInternal: true,
  },
  {
    title: "eKYC",
    year: "2026",
    description:
      "A public landing page that guides customers to open a securities account in the mobile app, plus the account-opening form with identity data validation that meets onboarding rules.",
    stacks: ["html", "css", "javascript"],
    tags: ["Lightweight", "Performance-first"],
    bg: ekycBg,
    theme: "dark",
    href: "https://taikhoan.ocbs.com.vn",
    isDemoIncluded: false,
    isInternal: false,
  },
  {
    title: "Internal MIS & Admin",
    year: "2025 - 2026",
    description:
      "Frontend and backend APIs for the internal MIS used by the Project Management, Accounting, Risk Management and HR teams. I was the main day-to-day maintainer in production.",
    stacks: ["react", "vite", "typescript", "aspnet", "sqlserver"],
    tags: ["Accurate", "Production-stable"],
    bg: misBg,
    isDemoIncluded: true,
    isInternal: true,
  },
  {
    title: "HNB Hub",
    year: "Oct 2025 - Jul 2026",
    description:
      "Solo full-stack community app with 10+ active members. It has events with sign-up and fair cost splitting (only people who attend pay), a newsfeed, group chat, a photo and video library, seasonal minigames and daily check-in streaks.",
    stacks: ["nextjs", "supabase", "zustand", "tailwind", "awsS3", "vercel"],
    tags: ["Feature-rich", "Gamified"],
    bg: hnbHubBg,
    theme: "dark",
    href: "https://github.com/letrongdao1/hnb-inc",
    isDemoIncluded: true,
    isInternal: true,
  },
  {
    title: "Portfolio",
    year: "2026",
    description:
      "The site you're on right now. Designed and built from scratch, with GSAP scroll motion, interactive project demos and a dark, grid-based look.",
    stacks: ["nextjs", "typescript", "tailwind", "shadcn", "gsap"],
    bg: portfolioBg,
    theme: "dark",
    href: "https://github.com/letrongdao1/daoism",
    isDemoIncluded: false,
    isInternal: false,
  },
];
