"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LevelEyebrow } from "@/components/ui/LevelEyebrow";

const PILLARS = [
  {
    title: "REMEMBERS",
    desc: "Every conversation leaves a trace — an engram. Memory is not a feature bolted on; it is the architecture's first job.",
  },
  {
    title: "LEARNS BY DOING",
    desc: "A custom transformer block with in-use plasticity: the mind adapts while it works, not only while it trains.",
  },
  {
    title: "OPERATES THE COMPUTER",
    desc: "A text-UI protocol lets the mind read the screen, click, and type — already proven live on a real desktop.",
  },
];

export function EngramSection() {
  return (
    <section id="engram" className="relative" aria-labelledby="engram-title">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <Reveal>
          <LevelEyebrow level="Level 04" label="The mind" />

          <h2
            id="engram-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            A DIFFERENT KIND
            <br />
            <span className="text-primary">OF MIND</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14">
            SAN-D builds the memory chip. <span className="text-foreground font-semibold">Engram</span> builds
            the mind that remembers — a software mind designed around memory first.
            Explicitly not a claim of AGI: a different kind of mind, built in the
            open, one milestone at a time.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <article className="dream-card p-8 rounded-xl h-full">
                <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            href="/engram"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-transform hover:scale-[1.03]"
          >
            Follow the build log
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
