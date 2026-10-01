import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function useScrollReveal<T extends HTMLElement>(
  options: { y?: number; delay?: number; stagger?: number } = {},
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.hasAttribute('data-reveal-group')
      ? el.querySelectorAll('[data-reveal]')
      : [el]

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: options.y ?? 40,
        duration: 0.9,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.trigger === el && t.kill())
    }
  }, [options.delay, options.stagger, options.y])

  return ref
}
