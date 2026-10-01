import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dao Trong Le — Software Engineer",
  description:
    "Portfolio of Dao Trong Le, software engineer with full-stack experience in React, Next.js, Node.js.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400..700&family=Inter:wght@400;500;600&family=Montserrat:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
