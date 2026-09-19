"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CompanySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("company");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="company"
      className="relative min-h-screen flex items-center justify-center bg-background"
      aria-labelledby="company-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8 tech-panel">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              SAN-D TECHNOLOGIES
            </span>
          </div>

          <h2
            id="company-title"
            className="font-display font-bold tracking-tight text-foreground mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            WHERE PHYSICS MEETS
            <br />
            <span className="text-primary">COMPUTATION</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                label: "MISSION",
                value: "Advance semiconductor technology through fundamental physics innovation",
                icon: "▸",
              },
              {
                label: "FOCUS",
                value: "Atomic-scale engineering for next-generation computing",
                icon: "▸",
              },
              {
                label: "APPROACH",
                value: "First-principles design. Precision manufacturing. Measurable results.",
                icon: "▸",
              },
            ].map((item, i) => (
              <div key={i} className="tech-panel-elevated p-8 rounded-xl animate-fade-in animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-start gap-4">
                  <span className="font-mono text-lg text-primary shrink-0 mt-1">{item.icon}</span>
                  <div>
                    <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">{item.label}</div>
                    <p className="text-foreground/90 leading-relaxed">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="tech-panel-elevated p-8 rounded-xl">
              <h3 className="font-display font-bold text-foreground mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                TECHNOLOGY AREAS
              </h3>
              <div className="space-y-4">
                {[
                  "Advanced Logic & Compute Architectures",
                  "High-Density Memory Systems (SRAM, DRAM, MRAM)",
                  "Heterogeneous Integration & Chiplet Technology",
                  "Low-Power / Energy-Efficient Design",
                  "Interconnect & Signaling Innovation",
                  "Process Technology Co-Optimization (DTCO)",
                ].map((area, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border/50 transition-colors hover:border-primary/30">
                    <div className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                    <span className="font-sans text-base text-foreground/90">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-panel-elevated p-8 rounded-xl">
              <h3 className="font-display font-bold text-foreground mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                KEY METRICS
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "PROCESS NODES", value: "3nm → 1.4nm", unit: "R&D" },
                  { label: "TRANSISTOR DENSITY", value: "> 200M", unit: "Tr/mm²" },
                  { label: "POWER EFFICIENCY", value: "40%+", unit: "Improvement" },
                  { label: "INTERCONNECT LAYERS", value: "15+", unit: "Metal Layers" },
                ].map((metric, i) => (
                  <div key={i} className="p-6 rounded-lg bg-background/50 border border-border/50">
                    <div className="font-display font-bold text-primary mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                      {metric.value}
                    </div>
                    <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-1">{metric.label}</div>
                    <div className="font-sans text-sm text-muted-foreground/70">{metric.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-6">
            <Link
              href="#technology"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              EXPLORE TECHNOLOGY
              <span className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:border-primary/50 hover:bg-accent"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}