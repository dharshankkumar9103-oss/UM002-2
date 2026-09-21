"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { CompanySection } from "@/components/sections/CompanySection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { ContactSection } from "@/components/sections/ContactSection";

const SECTION_IDS = ["home", "technology", "company", "roadmap", "contact"];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      <Navigation activeSection={activeSection} />

      <main className="relative">
        <Hero />
        <TechnologySection />
        <CompanySection />
        <RoadmapSection />
        <ContactSection />
      </main>
    </div>
  );
}
