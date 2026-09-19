import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

export default function TechnologyPage() {
  return (
    <SecondaryLayout>
      <div className="space-y-20">
        {/* Hero */}
        <section className="text-center py-16">
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-6">
            TECHNOLOGY
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            The UM002B universal-memory chip, a single memory pool that acts as
            both the computer's fast working space and its permanent keeper of files.
          </p>
        </section>

        {/* Technology Areas Grid */}
        <section className="grid gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 2T1C1M Cell */}
            <article className="tech-panel-elevated p-8 rounded-xl border border-border/50">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display font-bold text-foreground mb-2">
                    THE UM002B CELL
                  </h2>
                  <span className="font-mono text-xs tracking-wider uppercase text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                    2T1C1M Architecture
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Every memory cell pairs a tiny capacitor — fast and volatile — with a tiny
                hafnium-oxide memristor that remembers without power.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                    <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
                      CAPACITOR (RAM)
                    </p>
                    <p className="font-sans text-sm text-foreground/90">Fast, volatile charge</p>
                  </div>
                  <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                    <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
                      MEMRISTOR (NVM)
                    </p>
                    <p className="font-sans text-sm text-foreground/90">Permanent resistance</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Rescue Cycle */}
            <article className="tech-panel-elevated p-8 rounded-xl border border-border/50">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display font-bold text-foreground mb-2">
                    THE RESCUE CYCLE
                  </h2>
                  <span className="font-mono text-xs tracking-wider uppercase text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                    Power-Loss Sequence
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                An on-die controller uses a small energy reserve to photograph the
                volatile DRAM state into the non-volatile memristor during power loss.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                  <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    RESCUE PHASES
                  </p>
                  <p className="font-sans text-sm text-foreground/90">Freeze → Translate → Verify → Commit → Power down</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            RETURN TO HOME
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
