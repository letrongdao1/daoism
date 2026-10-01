"use client";

import { useScrollReveal } from '../hooks/useScrollReveal'
import TechChip from './TechChip'
import type { TechId } from '@/data/techs'

const skills: TechId[] = [
  'typescript',
  'javascript',
  'csharp',
  'react',
  'nextjs',
  'redux',
  'zustand',
  'reactQuery',
  'tailwind',
  'motion',
  'nodejs',
  'nestjs',
  'aspnet',
  'postgresql',
  'sqlserver',
  'supabase',
  'redis',
  'docker',
  'vercel',
  'cloudflare',
  'githubActions',
  'claudeCode',
]

export default function About() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.08 })

  return (
    <section
      ref={ref}
      id="about"
      data-reveal-group
      className="relative bg-ink px-6 py-28 md:px-[8vw]"
      aria-label="About"
    >
      <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
        <div data-reveal>
          <p className="mb-3 font-display text-xs uppercase tracking-[0.4em] text-accent">
            About
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight text-paper md:text-5xl">
            Frontend engineer,
            <br />
            full-stack when needed.
          </h2>
        </div>

        <div data-reveal className="flex flex-col justify-between gap-10">
          <div className="max-w-lg space-y-4 text-base text-paper/65 md:text-lg">
            <p>
              I'm a frontend engineer with about 2 years of experience building
              web apps for a securities company in Ho Chi Minh City. I build
              clean, responsive interfaces in React and Next.js, and I keep
              production systems stable for the business users who rely on
              them every day.
            </p>
            <p>
              I also work on the backend. I've built APIs in ASP.NET and
              Node.js with SQL databases, so I can take a feature from the
              UI all the way to the data. I use AI tools such as Claude Code
              to work faster, and I review every change myself.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-paper/40">
              Toolbox
            </p>
            <ul className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <li key={skill}>
                  <TechChip
                    id={skill}
                    className="rounded-full border-white/10 px-4 py-2 text-sm text-paper/70"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
