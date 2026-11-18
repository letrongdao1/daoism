import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import Nav from "@/components/layout/Nav";
import SmoothScroll from "@/components/providers/SmoothScroll";
import IntroCurtain from "@/components/layout/IntroCurtain";
import Contact from "@/components/layout/Contact";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.description,
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-60 bg-ink px-4 py-3 label text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <IntroCurtain />
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Contact />
      </body>
    </html>
  );
}
