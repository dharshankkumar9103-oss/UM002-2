"use client";

import { useEffect, useState } from "react";

export function TechnologySection() {
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
    const el = document.getElementById("technology");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const techAreas = [
    {
      title: "ADVANCED LOGIC",
      description: "Next-generation compute architectures pushing performance-per-watt boundaries through novel device structures and circuit topologies.",
      specs: ["Gate-all-around (GAA) FETs", "CFET stacking", "Sub-10nm gate lengths", "Backside power delivery"],
      status: "R&D / Early Silicon",
    },
    {
      title: "MEMORY SYSTEMS",
      description: "High-density, low-latency memory hierarchies from on-chip SRAM to stacked HBM, enabling data-intensive workloads.",
      specs: ["6T/8T/10T SRAM bitcells", "MRAM / ReRAM integration", "HBM3E / HBM4 stacks", "Compute-in-memory arrays"],
      status: "Volume Production",
    },
    {
      title: "HETEROGENEOUS INTEGRATION",
      description: "Chiplet-based architectures with advanced packaging enabling disaggregated, scalable system designs.",
      specs: ["2.5D / 3D hybrid bonding", "UCIe / BoW interconnects", "Glass / organic substrates", "Known-good-die (KGD) flows"],
      status: "Qualification",
    },
    {
      title: "INTERCONNECT & SIGNALING",
      description: "High-speed, energy-efficient signaling from on-die networks to chip-to-chip and chip-to-optical interfaces.",
      specs: ["112G/224G SerDes", "Co-packaged optics (CPO)", "Low-swing on-die signaling", "Photonic interconnects"],
      status: "Development",
    },
  ];

  return (
    <section
      id="technology"
      className="relative min-h-screen bg-background"
      aria-labelledby="technology-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8 tech-panel">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              CORE TECHNOLOGY
            </span>
          </div>

          <h2
            id="technology-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            TECHNOLOGY
            <br />
            <span className="text-primary">PORTFOLIO</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            Four interconnected technology pillars spanning device physics, circuit design,
            architecture, and advanced packaging — co-optimized for unprecedented
            performance, density, and efficiency.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {techAreas.map((area, i) => (
              <article
                key={i}
                className="tech-panel-elevated p-8 rounded-xl animate-fade-in animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                      {area.title}
                    </h3>
                    <span className="font-mono text-xs tracking-wider uppercase text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                      {area.status}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{area.description}</p>

                <div className="space-y-3">
                  {area.specs.map((spec, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
            <div className="flex items-center gap-4">
              <div className="w-px h-12 bg-primary/30" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
                  CO-DESIGN METHODOLOGY
                </p>
                <p className="text-foreground/80 max-w-3xl">
                  All technology areas are developed through a unified DTCO (Design-Technology
                  Co-Optimization) framework, ensuring device, circuit, architecture, and
                  packaging decisions are made holistically rather than in isolation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}