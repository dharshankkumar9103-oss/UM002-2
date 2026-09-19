import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

export default function AboutPage() {
  return (
    <SecondaryLayout>
      <div className="space-y-20">
        {/* Hero */}
        <section className="text-center py-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              SAN-D · FABLESS SEMICONDUCTOR
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-6">
            ABOUT
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            SAN-D is a fabless semiconductor company: we design memory chips;
            foundries manufacture them. We are merging RAM and storage into one
            pool that is both fast and permanent.
          </p>
        </section>

        {/* The fabless model */}
        <section className="grid gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <article className="tech-panel-elevated p-8 rounded-xl">
              <h2 className="font-display font-bold text-foreground mb-6">
                THE FABLESS MODEL
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We design the chip: the architecture, the cell, the controller, the
                firmware. A foundry — a company whose entire business is manufacturing
                chips — fabricates the silicon from our design files. We own no
                factory, because a single modern fab costs tens of billions of dollars.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nearly every successful chip startup in history has been fabless. It is
                the NVIDIA model, and it is the only capital-efficient way to build a
                chip company.
              </p>
            </article>

            <article className="tech-panel-elevated p-8 rounded-xl">
              <h2 className="font-display font-bold text-foreground mb-6">
                THE BUSINESS
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Dual model: we sell UM002B chips, and we license the cell IP to others.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">
                    FIRST MARKET
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Consumer PCs — where one unified pool of universal memory replaces
                    the DRAM + SSD hierarchy. Not “8 GB RAM + 512 GB storage,” just one
                    memory number.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">
                    OUR SCOPE
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Chip, firmware, host interface, BIOS/UEFI enablement, and OS drivers —
                    “it just works in a PC.”
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Status, honestly */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8">
            WHERE THINGS STAND, HONESTLY
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-background/50 border border-border/50">
              <p className="font-mono text-xs tracking-wider uppercase text-primary mb-4">
                COMPLETE — PRE-SILICON
              </p>
              <ul className="space-y-3">
                {[
                  "Full circuit simulation of the 2T1C1M cell and array",
                  "Device-physics analysis of the hafnium-oxide memristor",
                  "GDSII layout of the cell",
                  "Manufacturing-readiness review (coherence audit, gap analysis, validation matrix)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/85 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-xl bg-background/50 border border-border/50">
              <p className="font-mono text-xs tracking-wider uppercase text-primary mb-4">
                NEXT — GATED BY FUNDING &amp; PARTNERSHIP
              </p>
              <ul className="space-y-3">
                {[
                  "Foundry engagement under NDA",
                  "PDK access — the foundry's design toolbox",
                  "Signed JDA to co-develop the custom HfOx device on real wafers",
                  "First silicon on an MPW shuttle",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/85 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground/80 mt-6 leading-relaxed">
                Stated as plan, not status. The chip is fully designed on computers —
                but not yet manufactured.
              </p>
            </div>
          </div>
        </section>

        {/* Aim */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8">
            THE AIM
          </h2>
          <div className="p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
            <p className="text-foreground/90 text-lg leading-relaxed max-w-3xl mb-6">
              Every computer has two memories: the desk (RAM) — fast, where you work,
              wiped out by a power cut; and the filing cabinet (storage) — permanent
              but slow. For fifty years we have shuttled work between the two and
              pressed Save to survive power cuts.
            </p>
            <p className="text-foreground/90 text-lg leading-relaxed max-w-3xl mb-6">
              SAN-D merges them into one desk that never gets cleared — a single pool
              of memory that is both fast and permanent.
            </p>
            <p className="font-mono text-sm tracking-widest uppercase text-primary">
              Power loss becomes a pause button, not a catastrophe.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8">
            HOW WE WORK
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "EVIDENCE LABELS",
                desc: "Every claim carries its provenance: measured, modeled, assumed, target, or requires-fab. Nothing is labeled “measured” until it is.",
              },
              {
                title: "FIND IT BEFORE SILICON",
                desc: "Our analysis program surfaced its own device issues in simulation — the cheapest possible place to find them. A program that finds its problems before wafers is a program working correctly.",
              },
              {
                title: "PLAN, NOT STATUS",
                desc: "The roadmap is a gated sequence with owners and unlock steps — not a victory lap. No partnership, no silicon, no measured data is claimed before it exists.",
              },
            ].map((v, i) => (
              <div key={i} className="tech-panel-elevated p-8 rounded-xl">
                <h3 className="font-mono text-sm tracking-widest uppercase text-primary mb-3">
                  {v.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              THE TECHNOLOGY
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
        </section>
      </div>
    </SecondaryLayout>
  );
}
