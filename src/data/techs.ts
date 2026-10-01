import type { StaticImageData } from "next/image";
import antd from "../assets/icons/techs/antd.svg";
import aws from "../assets/icons/techs/aws.webp";
import claude from "../assets/icons/techs/claude.webp";
import cloudflare from "../assets/icons/techs/cloudflare.webp";
import css from "../assets/icons/techs/csspng.png";
import html from "../assets/icons/techs/htmlpng.png";
import js from "../assets/icons/techs/js.png";
import motion from "../assets/icons/techs/motion.svg";
import nestjs from "../assets/icons/techs/nestjs.webp";
import nextjs from "../assets/icons/techs/nextjs.webp";
import nodejs from "../assets/icons/techs/nodejswebp.webp";
import reactQuery from "../assets/icons/techs/react-query.svg";
import react from "../assets/icons/techs/react.webp";
import redux from "../assets/icons/techs/redux.webp";
import shadcn from "../assets/icons/techs/shadcn.png";
import supabase from "../assets/icons/techs/supabase.webp";
import tailwind from "../assets/icons/techs/tailwindsvg.svg";
import ts from "../assets/icons/techs/ts.png";
import vercel from "../assets/icons/techs/vercel.webp";
import zustand from "../assets/icons/techs/zustand.svg";
import sqlServer from "../assets/icons/techs/sql-server.png";
import dotnet from "../assets/icons/techs/dotnet.png";
import postgre from "../assets/icons/techs/postgre.webp";

export type Tech = {
  name: string;
  icon?: StaticImageData;
  /** single-color icon: drawn in the surrounding text color instead of as-is */
  mono?: boolean;
};

// The one place a tech is defined. Projects, the toolbox and the hero refer to these ids,
// so a new tech (or a new icon) only needs adding here.
export const techs = {
  typescript: { name: "TypeScript", icon: ts },
  javascript: { name: "JavaScript", icon: js },
  csharp: { name: "C#" },
  html: { name: "HTML5", icon: html },
  css: { name: "CSS3", icon: css },
  react: { name: "React", icon: react },
  nextjs: { name: "Next.js", icon: nextjs },
  redux: { name: "Redux Toolkit", icon: redux },
  zustand: { name: "Zustand", icon: zustand, mono: true },
  reactQuery: { name: "React Query", icon: reactQuery },
  tailwind: { name: "Tailwind CSS", icon: tailwind },
  shadcn: { name: "shadcn/ui", icon: shadcn },
  antd: { name: "Ant Design", icon: antd },
  motion: { name: "Framer Motion", icon: motion },
  nodejs: { name: "Node.js", icon: nodejs },
  nestjs: { name: "NestJS", icon: nestjs },
  aspnet: { name: "ASP.NET", icon: dotnet },
  sqlserver: { name: "SQL Server", icon: sqlServer },
  postgresql: { name: "PostgreSQL", icon: postgre },
  supabase: { name: "Supabase", icon: supabase },
  redis: { name: "Redis" },
  docker: { name: "Docker" },
  awsS3: { name: "AWS S3", icon: aws },
  vercel: { name: "Vercel", icon: vercel },
  cloudflare: { name: "Cloudflare", icon: cloudflare },
  githubActions: { name: "GitHub Actions" },
  claudeCode: { name: "Claude Code", icon: claude },
} satisfies Record<string, Tech>;

export type TechId = keyof typeof techs;
