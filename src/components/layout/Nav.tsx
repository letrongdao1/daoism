"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  // the menu remembers the path it was opened on, so any navigation closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    !href.includes("#") && pathname.startsWith(href);

  // The bar uses mix-blend-difference so it reads on light and dark sections.
  // The blend only works on the element that forms the stacking context, so
  // the mobile overlay is rendered as a sibling rather than inside the header.
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-[#f3f2ee] mix-blend-difference">
        <div className="shell flex h-(--nav-h) items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
            aria-label="daoism, home"
          >
            daoism
          </Link>

          <nav aria-label="Primary" className="max-md:hidden">
            <ul className="flex items-center gap-1 rounded-full border border-current/25 px-1.5 py-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
                      isActive(link.href)
                        ? "bg-current/15"
                        : "hover:bg-current/10",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-current/25 px-4 py-2 label transition-colors duration-300 hover:bg-current/10 max-md:hidden"
          >
            CV ↓
          </a>

          <button
            type="button"
            className="label md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        data-theme="dark"
        className="fixed inset-0 z-40 pt-(--nav-h) md:hidden"
      >
        <ul className="shell flex flex-col gap-2 pt-10">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-title font-medium tracking-tight"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-8">
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="label"
            >
              Download CV ↓
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
