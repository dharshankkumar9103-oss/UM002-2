"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LevelEyebrow } from "@/components/ui/LevelEyebrow";

const PHASES = [
  {
    n: "01",
    title: "THE 2 GB DEMONSTRATION",
    status: "IN PROGRESS",
    desc: "A live, filmed, un-fakeable proof: 2 GB of memory, power cable yanked live, every byte survives. Plus the legal foundation — provisional patents filed and the company incorporated — before investor conversations begin.",
  },
  {
    n: "02",
    title: "FIRST SILICON",
    status: "NEXT · PRE-SEED",
    desc: "The real 2T1C1M chip on an MPW shuttle — packaged parts proving SAVE/RESTORE in the physical world. Tapeout Dec 2026, silicon in hand May 2027.",
  },
  {
    n: "03",
    title: "THE PRODUCT CELL",
    status: "SEED",
    desc: "A manufacturable, dense, fast cell: custom hafnium-oxide device via JDA, advanced-node port, and the controller folded onto the memory die.",
  },
  {
    n: "04",
    title: "THE 400 GB PRODUCT",
    status: "SERIES A+",
    desc: "SAN-D as a product the market can buy — a 400 GB multi-die module, SSD-style. Qualification, volume manufacturing, team, and market ramp.",
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
            The complete build plan, from lab bench to 400 GB universal memory.
            Each phase funds the next: the 2 GB demo earns the pre-seed, the
            pre-seed buys first silicon, the seed buys the product cell, and
            Series A buys the product. Phase by phase, capital converts directly
            into de-risked milestones.
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
                <p className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 font-mono text-[10px] tracking-widest uppercase text-primary">
                    {phase.status}
                  </span>
                </p>
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
                  The demo is being built on founder funding; everything after it
                  is what investment unlocks. Every claim we make carries an
                  evidence label: measured, modeled, assumed, target, or
                  requires-fab. Nothing is labeled “measured” until it is.
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
