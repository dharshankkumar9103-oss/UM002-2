"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LevelEyebrow } from "@/components/ui/LevelEyebrow";

const ELEMENTS = [
  {
    tag: "T_DRAM + 1C",
    title: "THE VOLATILE PATH",
    description:
      "Thin-oxide transistor + capacitor: the working memory. DRAM-class speed (~2.8 ns access, modeled); stored as charge, so it needs refresh and dies with power.",
  },
  {
    tag: "T_NVM + 1M",
    title: "THE NONVOLATILE SHADOW",
    description:
      "Thick-oxide transistor + hafnium-oxide memristor: the shadow. Stores data as resistance — a filament formed or broken in the oxide. Needs no power, but stays off the daily critical path.",
  },
  {
    tag: "ON-DIE",
    title: "THE CONTROLLER",
    description:
      "Power-fail detection, SAVE/RESTORE sequencing, and ECC — in the array periphery of the same die. Each die is self-sufficient; no host involvement, no software, no bus traffic.",
  },
  {
    tag: "DDR-STYLE",
    title: "THE HOST VIEW",
    description:
      "A standard NVDIMM-N-like memory interface. No CPU or GPU changes required — the processor issues ordinary memory reads and writes to one unified pool.",
  },
];

export function TechnologySection() {
  return (
    <section id="technology" className="relative" aria-labelledby="technology-title">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <Reveal>
          <LevelEyebrow level="Level 01" label="The chip" />

          <h2
            id="technology-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            TWO TRANSISTORS.
            <br />
            <span className="text-primary">ONE UNIVERSAL BIT.</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14">
            Two transistors, one capacitor, one memristor per cell. The capacitor does
            all normal operation at DRAM speed; the memristor wakes only on power
            events. Four modes — NORMAL, SAVE, OFF, RESTORE — managed entirely by the
            on-die controller.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {ELEMENTS.map((el, i) => (
            <Reveal key={el.tag} delay={i * 80}>
              <article className="dream-card p-8 rounded-xl h-full">
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">
                  {el.tag}
                </p>
                <h3
                  className="font-display font-bold text-foreground mb-3"
                  style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)" }}
                >
                  {el.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{el.description}</p>
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
                  Evidence status
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-transform hover:scale-[1.03]"
          >
            The full architecture
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
