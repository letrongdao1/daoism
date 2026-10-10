import type { TechId } from "./techs";

export const profile = {
  name: "Dao Trong Le",
  roles: ["Frontend / Full stack", "Software Engineer"],
  availability: "Open to work · Ho Chi Minh City / Remote",
  experience: "two years",
  description:
    "Portfolio of Dao Trong Le, software engineer with full-stack experience in React, Next.js, Node.js.",
  cv: "/CV_DaoTrongLe.pdf",
  contacts: {
    email: "letrongdaocontact8@gmail.com",
    phone: "+84582124303",
    github: "https://github.com/letrongdao1",
    linkedin: "https://www.linkedin.com/in/dao-le-trong-09908b285",
  },
};

export const contactLinks = {
  email: { label: "Email", href: `mailto:${profile.contacts.email}` },
  phone: { label: "Phone", href: `tel:${profile.contacts.phone}` },
  github: { label: "GitHub", href: profile.contacts.github },
  linkedin: { label: "LinkedIn", href: profile.contacts.linkedin },
};

export const heroStack: TechId[] = [
  "typescript",
  "react",
  "nextjs",
  "nodejs",
  "nestjs",
];

export const skills: { label: string; techs: TechId[] }[] = [
  { label: "Languages", techs: ["typescript", "javascript", "java", "csharp"] },
  {
    label: "Frontend",
    techs: [
      "react",
      "nextjs",
      "vite",
      "redux",
      "zustand",
      "reactQuery",
      "tailwind",
      "motion",
      "gsap",
    ],
  },
  {
    label: "Backend",
    techs: ["nodejs", "express", "nestjs", "aspnet", "spring"],
  },
  {
    label: "Databases",
    techs: ["mysql", "sqlserver", "postgresql", "supabase", "redis"],
  },
  {
    label: "DevOps & tools",
    techs: ["vercel", "cloudflare", "aws", "claudeCode"],
  },
];

export const timeline: {
  period: string;
  role: string;
  place: string;
  detail?: string;
  isActive?: boolean;
}[] = [
  {
    period: "Since 2026",
    role: "Master of Information Technology",
    place: "University of Information Technology, VNU-HCM",
    isActive: true,
  },
  {
    period: "May 2025 – Jul 2026",
    role: "Software Engineer",
    place: "OCBS Securities Joint Stock Company",
    detail:
      "Built and maintained the internal MIS, the eKYC account-opening flow and the shareholder meeting portal, working across React, ASP.NET and SQL Server.",
  },
  {
    period: "2023 – 2025",
    role: "Frontend Developer Intern",
    place:
      "Sunshine Software (Mar – Apr 2025) · Digital Era JSC (Sep – Dec 2023)",
    detail:
      "Worked with senior engineers to ship product updates and fix UI/UX issues, making the products easier to use, more responsive and more visually consistent.",
  },
  {
    period: "2021 – 2025",
    role: "Bachelor of Software Engineering",
    place: "FPT University, Ho Chi Minh City · GPA 3.14 / 4.0",
  },
];
