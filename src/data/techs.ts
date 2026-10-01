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
import csharp from "../assets/icons/techs/csharp.webp";
import java from "../assets/icons/techs/java.webp";
import spring from "../assets/icons/techs/springboot.png";
import postgre from "../assets/icons/techs/postgre.webp";
import docker from "../assets/icons/techs/docker.png";
import redis from "../assets/icons/techs/redis.svg";

export type Tech = {
  name: string;
  icon?: StaticImageData;
  mono?: boolean;
};

export const techs = {
  typescript: { name: "TypeScript", icon: ts },
  javascript: { name: "JavaScript", icon: js },
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
  csharp: { name: "C#", icon: csharp },
  java: { name: "Java", icon: java },
  spring: { name: "Spring Boot", icon: spring },
  sqlserver: { name: "SQL Server", icon: sqlServer },
  postgresql: { name: "PostgreSQL", icon: postgre },
  supabase: { name: "Supabase", icon: supabase },
  redis: { name: "Redis", icon: redis },
  docker: { name: "Docker", icon: docker },
  aws: { name: "AWS", icon: aws },
  awsS3: { name: "AWS S3", icon: aws },
  vercel: { name: "Vercel", icon: vercel },
  cloudflare: { name: "Cloudflare", icon: cloudflare },
  githubActions: { name: "GitHub Actions" },
  claudeCode: { name: "Claude Code", icon: claude },
} satisfies Record<string, Tech>;

export type TechId = keyof typeof techs;
