import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

export const metadata = {
  title: "Engram — A Different Kind of Mind | SAN-D",
  description:
    "Engram: the mind that remembers. A software mind designed around memory first — seven specialized regions, one thinking hub, and a build log kept in the open.",
};

const REGIONS = [
  {
    name: "THINKING",
    analog: "central executive · prefrontal cortex",
    desc: "The hub. Every region reports to thinking; thinking dispatches to every region. Always active, slowest to change — the leader, not a peer.",
  },
  {
    name: "MEMORY",
    analog: "episodic · hippocampus",
    desc: "The fastest learner — the learn-anything-faster engine. Stores experiences and retrieves them when thinking needs them.",
  },
  {
    name: "PERCEPTION",
    analog: "sensory cortices",
    desc: "Turns raw input — text, image, audio, sensors — into representations thinking can actually use.",
  },
  {
    name: "ACTION",
    analog: "motor cortex",
    desc: "Acts in the world: tools, code, computer operation. Low plasticity, gated by thinking — nothing executes without the hub.",
  },
  {
    name: "SKILL",
    analog: "procedural · cerebellum",
    desc: "Compiles repeated experiences into automatic procedures. Consolidates from the memory region, slowly.",
  },
  {
    name: "DRIVE",
    analog: "value · amygdala / striatum",
    desc: "Sets the goals thinking pursues — curiosity and value, learned, not hardcoded.",
  },
  {
    name: "MONITOR",
    analog: "critic · anterior cingulate",
    desc: "Error detection: plans and outcomes checked against expectations, continuously.",
  },
];

const BUILD_LOG = [
  {
    date: "Oct 15, 2026",
    tag: "RUNNING",
    title: "Distillation training completes 20,000 steps",
    desc: "Knowledge-distillation training finishes 20,000 steps with zero divergence — loss falls from 71.6 to 5.3. The next stage is now running: 50,000 steps on a custom 32,000-token vocabulary. The fluency gate decides what comes next.",
  },
  {
    date: "Oct 9, 2026",
    tag: "TESTED",
    title: "Named Engram — computer operation proven live",
    desc: "The project is named Engram, the neuroscience term for a memory trace. The same week, computer operation is proven live: the mind reads a real desktop screen, clicks, and types through a text-UI protocol — 18/18 mock tests, then the real thing.",
  },
  {
    date: "Oct 6, 2026",
    tag: "RUNNING",
    title: "Training begins",
    desc: "Training starts on an 18.3M-parameter brain built from a custom transformer block — functional specialization, in-use plasticity, and persistent memory designed in, not bolted on.",
  },
  {
    date: "Oct 1, 2026",
    tag: "DECIDED",
    title: "The 7-region architecture is set",
    desc: "Hub-and-spoke: thinking as the central hub, memory as the fastest-learning region. v1 is the 4-region core — thinking, memory, perception, action — with skill, drive, and monitor joining once hub-and-spoke coordination is proven.",
  },
  {
    date: "Sep 30, 2026",
    tag: "DECIDED",
    title: "The pivot: the mind is the product",
    desc: "The mind becomes a software product — designed and proven in simulation first, with silicon as a later step. The chip project continues as its own track.",
  },
  {
    date: "Sep 2026",
    tag: "DECIDED",
    title: "The thesis",
    desc: "Electrical signals do the job; storing electrical signals is memory — close to a brain, the first step toward a mind. No subconscious: just a strong memory, which may eventually lead further.",
  },
];

export default function EngramPage() {
  return (
    <SecondaryLayout>
      <div className="space-y-20">
        {/* Hero */}
        <section className="text-center py-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              A DIFFERENT KIND OF MIND — EXPLICITLY NOT AN AGI CLAIM
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-6">
            ENGRAM
          </h1>
          <p className="font-display text-2xl md:text-3xl text-primary mb-8">
            The mind that remembers.
          </p>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Today&apos;s AI can read the whole internet and still remember nothing
            about you the next day. Engram starts from the opposite end: a mind
            whose first job is to remember.
          </p>
        </section>

        {/* The idea */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="tech-panel-elevated p-8 rounded-xl">
            <p className="font-mono text-xs tracking-widest uppercase text-primary mb-4">
              IN SIMPLE TERMS
            </p>
            <p className="text-foreground/85 leading-relaxed">
              Every conversation leaves a trace — an <em>engram</em>, the
              neuroscience word for a memory trace. The trace changes what the
              mind does next. Remember everything, learn anything faster: that
              is the whole bet.
            </p>
          </article>
          <article className="tech-panel-elevated p-8 rounded-xl">
            <p className="font-mono text-xs tracking-widest uppercase text-primary mb-4">
              IN SCIENTIFIC TERMS
            </p>
            <p className="text-foreground/85 leading-relaxed">
              A better-transformer-block architecture: stacks of a custom block
              with functional specialization across regions, in-use plasticity
              via fast weights, and persistent memory. The mind is trained
              deliberately toward its designed capabilities — efficient thinking
              and faster learning — rather than hoping they emerge.
            </p>
          </article>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            HUB-AND-SPOKE, SEVEN REGIONS
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-10">
            Thinking is the hub and the leader — every region reports to it, it
            dispatches to every region. The regions are neural networks; the
            wiring, learning speeds, and objectives are the scaffolding. Language
            is not a region: it lives in the outer interface layer, alongside tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((r) => (
              <article key={r.name} className="tech-panel-elevated p-8 rounded-xl">
                <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-1">
                  {r.name}
                </h3>
                <p className="font-mono text-[11px] tracking-wider uppercase text-primary/80 mb-4">
                  {r.analog}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">{r.desc}</p>
              </article>
            ))}
          </div>
          <p className="text-muted-foreground mt-8 max-w-3xl leading-relaxed">
            v1 is the 4-region core — thinking, memory, perception, action. Skill,
            drive, and monitor join once hub-and-spoke coordination is proven.
          </p>
        </section>

        {/* Build log */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            BUILD LOG
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-10">
            Everything done so far, newest first. This page grows with the project —
            every milestone lands here.
          </p>
          <div className="space-y-6">
            {BUILD_LOG.map((entry) => (
              <article key={entry.date + entry.title} className="tech-panel-elevated p-8 rounded-xl">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    {entry.date}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 font-mono text-[10px] tracking-widest uppercase text-primary">
                    {entry.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-3" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}>
                  {entry.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">{entry.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* What's next */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            WHAT&apos;S NEXT
          </h2>
          <div className="space-y-4">
            {[
              "Right now: stage-3 language training is running — 50,000 steps on a custom 32,000-token vocabulary.",
              "The fluency gate decides what comes next: the model must write coherent English before brain-structure training begins. No chaining past a gate that hasn't been met.",
              "Then: hub-and-spoke coordination between the four core regions, proven in simulation.",
              "Then: skill, drive, and monitor join the architecture — the full seven regions.",
              "In parallel: the mind learns to use screenshots alongside the text UI — seeing the desktop, not just reading it.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-lg bg-background/50 border border-border/50">
                <span className="font-mono text-sm text-primary shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-foreground/85 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Honesty note */}
        <section className="p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">
            HONEST BY DESIGN
          </p>
          <p className="text-foreground/90 text-lg leading-relaxed max-w-3xl">
            We make no claim of AGI and no claim of frontier superiority. Every
            milestone on this page carries an honest label — decided, built,
            tested, or still to prove. Nothing is labeled “tested” until it is.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center py-16">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            TALK TO US
            <span className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </section>
      </div>
    </SecondaryLayout>
  );
}
