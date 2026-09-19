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
              SAN-D · FABLESS SEMICONDUCTOR
            </span>
          </div>

          <h2
            id="company-title"
            className="font-display font-bold tracking-tight text-foreground mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            ONE MEMORY POOL.
            <br />
            <span className="text-primary">FAST AND PERMANENT.</span>
          </h2>

          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-16">
            Every computer has two memories: the desk (RAM) — fast, where you work,
            wiped out by a power cut; and the filing cabinet (storage) — permanent but
            slow. SAN-D merges them into one desk that never gets cleared: a single
            pool of universal memory that is both fast and permanent.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                label: "MODEL",
                value: "Fabless — we design the chip; foundries manufacture it. The NVIDIA model: architecture, cell, controller, and firmware are ours; wafer fabrication is outsourced.",
              },
              {
                label: "BUSINESS",
                value: "Dual model: sell UM002B chips and license the cell IP. First market: consumer PCs, where one unified pool replaces the DRAM + SSD hierarchy.",
              },
              {
                label: "STATUS",
                value: "Pre-silicon work is complete — simulation, device-physics analysis, GDSII layout, manufacturing-readiness review. Next: PDK access, a signed JDA, foundry engagement, first silicon.",
              },
            ].map((item, i) => (
              <div key={i} className="tech-panel-elevated p-8 rounded-xl animate-fade-in animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="font-mono text-xs tracking-widest uppercase text-primary mb-3">{item.label}</div>
                <p className="text-foreground/90 leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10 mb-16">
            <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">
              THE AIM
            </p>
            <p className="text-foreground/85 text-lg leading-relaxed max-w-3xl">
              No boot wait — the PC wakes instantly, exactly as you left it. Never lose
              unsaved work — a power cut becomes a pause, not a loss. One memory number —
              not “8 GB RAM + 512 GB storage,” just one pool of universal memory.
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              ABOUT SAN-D
              <span className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:border-primary/50 hover:bg-accent"
            >
              THE ROADMAP
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
