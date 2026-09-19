"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PHASES = [
  {
    n: "01",
    title: "PDK HARDENING",
    desc: "Re-baseline the design against the foundry's real models, rules, and metal stack. Every circuit number anchored to measured data.",
  },
  {
    n: "02",
    title: "JDA DEVICE DEVELOPMENT",
    desc: "Co-develop the custom hafnium-oxide memristor on real wafers: test chips, measurement, iteration, stack freeze.",
  },
  {
    n: "03",
    title: "FULL-CHIP BUILD",
    desc: "Integrate array, on-die controller, and frozen device model into a signed-off chip. Tapeout on an MPW shuttle.",
  },
  {
    n: "04",
    title: "SILICON VALIDATION",
    desc: "Lab bring-up and characterization mapped to the open issues, then qualification. Claims become measurements.",
  },
];

export function RoadmapSection() {
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
    const el = document.getElementById("roadmap");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="roadmap"
      className="relative min-h-screen bg-background"
      aria-labelledby="roadmap-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8 tech-panel">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              FROM PDK &amp; JDA TO SILICON
            </span>
          </div>

          <h2
            id="roadmap-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            WHAT THE FUNDING
            <br />
            <span className="text-primary">BUILDS</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            A forward-looking plan, not a status report. The PDK makes the design
            fab-real, the JDA makes the device fab-real, the MPW makes it silicon,
            and testing makes the claims proof. Phase by phase, capital converts
            directly into de-risked milestones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {PHASES.map((phase, i) => (
              <article
                key={i}
                className="tech-panel-elevated p-8 rounded-xl animate-fade-in animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="font-display font-bold text-primary mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                  {phase.n}
                </div>
                <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-3">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
            <div className="flex items-center gap-4">
              <div className="w-px h-12 bg-primary/30" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
                  HONEST BY DESIGN
                </p>
                <p className="text-foreground/80 max-w-3xl">
                  No foundry partnership exists yet — PDK access and the JDA are milestones
                  this funding enables. Every claim we make carries an evidence label:
                  measured, modeled, assumed, target, or requires-fab. Nothing is labeled
                  “measured” until it is.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              READ THE FULL ROADMAP
              <span className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
