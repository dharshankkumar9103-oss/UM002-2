"use client";

import { useEffect, useState } from "react";

export function ResearchSection() {
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
    const el = document.getElementById("research");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const researchAreas = [
    {
      title: "QUANTUM-EFFECT DEVICES",
      description: "Exploring tunneling, quantization, and spin phenomena for beyond-CMOS switching mechanisms.",
      projects: [
        "Negative capacitance FETs (NCFET)",
        "Tunnel FETs (TFET) for sub-60mV/dec",
        "Spin-orbit torque (SOT) logic",
        "Topological insulator channels",
      ],
    },
    {
      title: "2D MATERIALS & CHANNEL ENGINEERING",
      description: "Atomically thin semiconductors enabling ultimate scaling and novel heterostructure devices.",
      projects: [
        "Monolayer TMDs (MoS₂, WS₂, WSe₂)",
        "hBN dielectrics for interface quality",
        "Vertical heterostructure transistors",
        "Strain-engineered band structures",
      ],
    },
    {
      title: "NEUROMORPHIC & IN-MEMORY COMPUTING",
      description: "Brain-inspired architectures and compute-in-memory for AI workloads at the edge and datacenter.",
      projects: [
        "Analog compute-in-SRAM/MRAM",
        "Spiking neural network accelerators",
        "Resistive RAM crossbar arrays",
        "Event-driven sensing interfaces",
      ],
    },
    {
      title: "CRYOGENIC & QUANTUM INTERFACE",
      description: "Control and readout electronics for quantum processors operating at millikelvin temperatures.",
      projects: [
        "Cryo-CMOS at 4K / 20mK",
        "Low-dissipation multiplexing",
        "Spin qubit control ASICs",
        "Superconducting-semiconductor interfaces",
      ],
    },
  ];

  return (
    <section
      id="research"
      className="relative min-h-screen bg-background"
      aria-labelledby="research-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8 tech-panel">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              RESEARCH & INNOVATION
            </span>
          </div>

          <h2
            id="research-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            RESEARCH
            <br />
            <span className="text-primary">FRONTIERS</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            Fundamental research programs targeting the physical limits of computation.
            Collaborative partnerships with leading universities, national labs, and
            industry consortia.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {researchAreas.map((area, i) => (
              <article
                key={i}
                className="tech-panel-elevated p-8 rounded-xl animate-fade-in animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)" }}>
                  {area.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{area.description}</p>
                <div className="space-y-2">
                  {area.projects.map((project, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm text-foreground/70 p-3 rounded-lg bg-background/50 border border-border/50 transition-colors hover:border-primary/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      <span className="font-mono text-xs">{project}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="font-display font-bold text-foreground mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              PUBLICATIONS & COLLABORATIONS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { venue: "IEDM 2024", count: "12 papers", focus: "GAA, CFET, 2D materials" },
                { venue: "ISSCC 2024", count: "8 papers", focus: "Cryo-CMOS, Neuromorphic" },
                { venue: "VLSI 2024", count: "15 papers", focus: "Memory, Interconnect, DTCO" },
              ].map((pub, i) => (
                <div key={i} className="tech-panel-elevated p-6 rounded-xl animate-fade-in animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="font-mono text-xs tracking-widest uppercase text-primary mb-2">{pub.venue}</div>
                  <div className="font-display font-bold text-foreground mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>{pub.count}</div>
                  <div className="text-muted-foreground text-sm">{pub.focus}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}