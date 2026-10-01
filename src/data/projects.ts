import type { StaticImageData } from "next/image";
import type { TechId } from "./techs";
import hnbHubBg from "../assets/images/projects/hnb-hub-bg.png";
import misBg from "../assets/images/projects/mis-bg.png";
import shareholderBg from "../assets/images/projects/shportal.png";
import ekycBg from "../assets/images/projects/ekyc.png";

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
};

export const projects: Project[] = [
  {
    title: "Shareholder Meeting Portal",
    year: "2025 - 2026",
    description:
      "Rebuilt from scratch for OCBS annual general meetings: check-in, eligibility lists, ballot counting and live results. It worked without issues on its first live use, for a meeting of 60+ shareholders.",
    stacks: ["react", "typescript", "antd"],
    bg: shareholderBg,
    isDemoIncluded: true,
  },
  {
    title: "eKYC",
    year: "2026",
    description:
      "A public landing page that guides customers to open a securities account in the mobile app, plus the account-opening form with identity data validation that meets onboarding rules.",
    stacks: ["html", "css", "javascript"],
    bg: ekycBg,
    theme: "dark",
    href: "https://taikhoan.ocbs.com.vn",
    isDemoIncluded: false,
  },
  {
    title: "Internal MIS & Admin",
    year: "2025 – 2026",
    description:
      "Frontend and backend APIs for the internal MIS used by the Project Management, Accounting, Risk Management and HR teams. I was the main day-to-day maintainer in production.",
    stacks: ["react", "typescript", "aspnet", "sqlserver"],
    bg: misBg,
    isDemoIncluded: true,
  },
  {
    title: "HNB Hub",
    year: "Oct 2025 – Jul 2026",
    description:
      "Solo full-stack community app with 10+ active members. It has events with sign-up and fair cost splitting (only people who attend pay), a newsfeed, group chat, a photo and video library, seasonal minigames and daily check-in streaks.",
    stacks: ["nextjs", "supabase", "zustand", "tailwind", "awsS3", "vercel"],
    bg: hnbHubBg,
    theme: "dark",
    href: "https://github.com/letrongdao1/hnb-inc",
    isDemoIncluded: true,
  },
];
