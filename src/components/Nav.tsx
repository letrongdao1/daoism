"use client";

import { useEffect, useRef, useState } from 'react'
import { Dialog } from 'radix-ui'
import { MenuIcon, XIcon } from 'lucide-react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

// duration grows with sqrt(distance), so far sections scroll at a higher speed
function scrollToHash(hash: string) {
  const target = hash === '#' ? 0 : document.querySelector<HTMLElement>(hash)
  if (target === null) return false
  const y = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY
  const duration = gsap.utils.clamp(0.4, 1.2, Math.sqrt(Math.abs(y - window.scrollY)) / 80)
  gsap.to(window, { scrollTo: y, duration, ease: 'power2.inOut', overwrite: true })
  return true
}

export default function Nav() {
  const navRef = useRef<HTMLElement | null>(null)
  const [open, setOpen] = useState(false)
  const pendingHash = useRef<string | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')!
      if (!scrollToHash(hash)) return
      e.preventDefault()
      history.pushState(null, '', hash === '#' ? location.pathname : hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

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
      <div className="hidden gap-6 text-xs uppercase tracking-[0.3em] text-white/80 md:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition hover:text-white">
            {link.label}
          </a>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="-m-2 p-2 text-white md:hidden" aria-label="Open menu">
          <MenuIcon className="size-5" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm duration-300 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
          <Dialog.Content
            className="fixed inset-y-0 right-0 z-50 flex w-[80vw] max-w-xs flex-col border-l border-white/10 bg-ink px-8 py-6 outline-none duration-300 ease-out data-open:animate-in data-open:slide-in-from-right data-closed:animate-out data-closed:slide-out-to-right"
            onCloseAutoFocus={(e) => {
              const hash = pendingHash.current
              if (!hash) return
              e.preventDefault()
              pendingHash.current = null
              scrollToHash(hash)
              history.pushState(null, '', hash)
            }}
          >
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-display text-sm uppercase tracking-[0.3em] text-white">
                daoism
              </Dialog.Title>
              <Dialog.Close className="-m-2 p-2 text-white/80 transition hover:text-white" aria-label="Close menu">
                <XIcon className="size-5" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
            <ul className="mt-16 flex flex-col gap-8">
              {links.map((link, i) => (
                <li
                  key={link.href}
                  className="animate-in fade-in-0 slide-in-from-right-8 duration-500 ease-out [animation-fill-mode:both]"
                  style={{ animationDelay: `${150 + i * 70}ms` }}
                >
                  <a
                    href={link.href}
                    className="font-display text-2xl uppercase tracking-[0.2em] text-white/80 transition hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault()
                      pendingHash.current = link.href
                      setOpen(false)
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  )
}
