import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Placeholder from "@/components/layout/Placeholder";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader index="03 — About" title="About" />
      <Placeholder label="Bio" note="Waiting on your content." />
      <Placeholder label="Stack" note="Grouped skills from profile data." />
    </>
  );
}
