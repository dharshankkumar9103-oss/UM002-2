"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  const elements = [
    {
      tag: "T_DRAM + 1C",
      title: "THE VOLATILE PATH",
      description: "Thin-oxide transistor + capacitor: the working memory. DRAM-class speed (~2.8 ns access, modeled); stored as charge, so it needs refresh and dies with power.",
    },
    {
      tag: "T_NVM + 1M",
      title: "THE NONVOLATILE SHADOW",
      description: "Thick-oxide transistor + hafnium-oxide memristor: the shadow. Stores data as resistance — a filament formed or broken in the oxide. Needs no power, but stays off the daily critical path.",
    },
    {
      tag: "ON-DIE",
      title: "THE CONTROLLER",
      description: "Power-fail detection, SAVE/RESTORE sequencing, and ECC — in the array periphery of the same die. Each die is self-sufficient; no host involvement, no software, no bus traffic.",
    },
    {
      tag: "DDR-STYLE",
      title: "THE HOST VIEW",
      description: "A standard NVDIMM-N-like memory interface. No CPU or GPU changes required — the processor issues ordinary memory reads and writes to one unified pool.",
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
              THE UM002B CELL · 2T1C1M
            </span>
          </div>

          <h2
            id="technology-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            TWO TRANSISTORS.
            <br />
            <span className="text-primary">ONE UNIVERSAL BIT.</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            Two transistors, one capacitor, one memristor per cell. The capacitor does
            all normal operation at DRAM speed; the memristor wakes only on power
            events. Four modes — NORMAL, SAVE, OFF, RESTORE — managed entirely by the
            on-die controller.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {elements.map((el, i) => (
              <article
                key={i}
                className="tech-panel-elevated p-8 rounded-xl animate-fade-in animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">
                  {el.tag}
                </p>
                <h3 className="font-display font-bold text-foreground mb-3" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                  {el.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{el.description}</p>
              </article>
            ))}
          </div>

          <div className="p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-px h-12 bg-primary/30" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
                  EVIDENCE STATUS
                </p>
                <p className="text-foreground/80 max-w-3xl">
                  Pre-silicon architecture: analytical models, simulation, controller
                  design, prototype-scale planning. Performance figures are the modeled
                  design point — not measured or qualified specifications.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/technology"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            THE FULL ARCHITECTURE
            <span className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
