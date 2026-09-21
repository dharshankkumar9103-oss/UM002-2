"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LevelEyebrow } from "@/components/ui/LevelEyebrow";

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
  return (
    <section id="roadmap" className="relative" aria-labelledby="roadmap-title">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <Reveal>
          <LevelEyebrow level="Level 03" label="The path" />

          <h2
            id="roadmap-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            WHAT THE FUNDING
            <br />
            <span className="text-primary">BUILDS</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14">
            A forward-looking plan, not a status report. The PDK makes the design
            fab-real, the JDA makes the device fab-real, the MPW makes it silicon,
            and testing makes the claims proof. Phase by phase, capital converts
            directly into de-risked milestones.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {PHASES.map((phase, i) => (
            <Reveal key={phase.n} delay={i * 80}>
              <article className="dream-card p-8 rounded-xl h-full">
                <div
                  className="font-display font-bold text-primary mb-4"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                >
                  {phase.n}
                </div>
                <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-3">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="dream-card p-8 rounded-xl mb-12">
            <div className="flex items-center gap-5">
              <span className="w-1 self-stretch bg-accent/60 rounded-full" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-1">
                  Honest by design
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

          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-transform hover:scale-[1.03]"
          >
            Read the full roadmap
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
