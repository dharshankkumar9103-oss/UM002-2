"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LevelEyebrow } from "@/components/ui/LevelEyebrow";

const FACTS = [
  {
    label: "Model",
    value:
      "Fabless — we design the chip; foundries manufacture it. The NVIDIA model: architecture, cell, controller, and firmware are ours; wafer fabrication is outsourced.",
  },
  {
    label: "Business",
    value:
      "Dual model: sell UM002B chips and license the cell IP. First market: consumer PCs, where one unified pool replaces the DRAM + SSD hierarchy.",
  },
  {
    label: "Status",
    value:
      "Pre-silicon work is complete — simulation, device-physics analysis, GDSII layout, manufacturing-readiness review. Next: PDK access, a signed JDA, foundry engagement, first silicon.",
  },
];

export function CompanySection() {
  return (
    <section id="company" className="relative" aria-labelledby="company-title">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <Reveal>
          <LevelEyebrow level="Level 02" label="The model" />

          <h2
            id="company-title"
            className="font-display font-bold tracking-tight text-foreground mb-8"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            ONE MEMORY POOL.
            <br />
            <span className="text-primary">FAST AND PERMANENT.</span>
          </h2>

          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-14">
            Every computer has two memories: the desk (RAM) — fast, where you work,
            wiped out by a power cut; and the filing cabinet (storage) — permanent but
            slow. SAN-D merges them into one desk that never gets cleared: a single
            pool of universal memory that is both fast and permanent.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {FACTS.map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div className="dream-card p-8 rounded-xl h-full">
                <div className="font-mono text-xs tracking-widest uppercase text-primary mb-3">
                  {item.label}
                </div>
                <p className="text-foreground/90 leading-relaxed">{item.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="dream-card p-8 rounded-xl mb-14">
            <p className="font-mono text-xs tracking-widest uppercase text-accent mb-2">
              The aim
            </p>
            <p className="text-foreground/85 text-lg leading-relaxed max-w-3xl">
              No boot wait — the PC wakes instantly, exactly as you left it. Never lose
              unsaved work — a power cut becomes a pause, not a loss. One memory number —
              not “8 GB RAM + 512 GB storage,” just one pool of universal memory.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-transform hover:scale-[1.03]"
            >
              About SAN-D
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-colors hover:border-primary/60"
            >
              The roadmap
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
