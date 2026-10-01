"use client";

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function Nav() {
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const nav = navRef.current
    let hidden = false

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > 80
        if (hide === hidden) return
        hidden = hide
        gsap.to(nav, {
          yPercent: hide ? -100 : 0,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: true,
        })
      },
    })

    return () => {
      trigger.kill()
      gsap.set(nav, { clearProps: 'transform' })
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference md:px-[8vw]"
    >
      <a href="#" className="font-display text-sm uppercase tracking-[0.3em] text-white">
        daoism
      </a>
      <div className="flex gap-3 text-[10px] uppercase tracking-[0.2em] sm:gap-6 sm:text-xs sm:tracking-[0.3em] text-white/80">
        <a href="#work" className="transition hover:text-white">
          Work
        </a>
        <a href="#about" className="transition hover:text-white">
          About
        </a>
        <a href="#experience" className="transition hover:text-white">
          Experience
        </a>
        <a href="#contact" className="transition hover:text-white">
          Contact
        </a>
      </div>
    </nav>
  )
}
