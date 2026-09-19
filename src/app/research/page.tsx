import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

export default function ResearchPage() {
  return (
    <SecondaryLayout>
      <div className="space-y-20">
        {/* Hero */}
        <section className="text-center py-16">
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-6">
            RESEARCH
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Everything we study points at one goal: a manufacturable, reliable UM002B chip.
            Four research tracks cover the cell, the controller, durability, and the software
            stack that exposes one unified memory pool to the operating system.
          </p>
        </section>

        {/* Research Tracks */}
        <section className="grid gap-8">
          {/* Track 1 – HfOx Memristor */}
          <article className="tech-panel-elevated p-8 rounded-xl border border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display font-bold text-foreground mb-2">
                  HFOX MEMRISTOR STACK
                </h2>
                <span className="font-mono text-xs tracking-wider uppercase text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                  Non-Volatile Cell Layer
                </span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              The memristor half of each 2T1C1M cell stores a bit as a physical resistance
              state inside a hafnium-oxide layer. Unlike the charge on a capacitor, that
              resistance state stays put after power is removed — the same way a light switch
              stays up or down without any electricity. Our research tunes the oxide to switch
              reliably between high and low resistance, hold its state for years without
              drifting, and survive many thousands of write cycles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  SWITCHING PRECISION
                </p>
                <p className="font-sans text-sm text-foreground/90">
                  Clean, repeatable transitions between high- and low-resistance states
                </p>
              </div>
              <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  RETENTION
                </p>
                <p className="font-sans text-sm text-foreground/90">
                  Measured resistance states that remain readable after years without power
                </p>
              </div>
              <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  ENDURANCE
                </p>
                <p className="font-sans text-sm text-foreground/90">
                  Resistance cycling durability across temperature and voltage corners
                </p>
              </div>
            </div>
          </article>

          {/* Track 2 – On-Die Controller */}
          <article className="tech-panel-elevated p-8 rounded-xl border border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display font-bold text-foreground mb-2">
                  ON-DIE CONTROLLER & RESCUE LOGIC
                </h2>
                <span className="font-mono text-xs tracking-wider uppercase text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                  Power-Loss Sequencing
                </span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              The controller is the night watchman built into the chip. The instant it
              detects falling supply voltage, it draws on a small on-chip energy reserve
              and runs the rescue cycle — photographing every capacitor&apos;s volatile charge
              pattern into its paired memristor before power disappears. On return, it
              develops those photographs back. The controller lives on the same die as the
              memory array so it can react locally, without waiting for any external signal.
            </p>

            <div className="p-4 bg-background/50 border border-border/50 rounded-lg mb-4">
              <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-3">
                RESCUE CYCLE PHASES
              </p>
              <div className="flex flex-wrap gap-2">
                {["Freeze", "Translate", "Verify", "Commit", "Power down"].map((phase, i) => (
                  <div key={phase} className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary/70">{i + 1}</span>
                    <span className="font-sans text-sm text-foreground/90">{phase}</span>
                    {i < 4 && <span className="text-muted-foreground/40">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Research focus: measuring exactly how much reserve energy and time a full-capacity
              backup requires at the worst-case temperature and voltage, and designing the commit
              marker that tells the next boot which snapshot is safe to restore.
            </p>
          </article>

          {/* Track 3 – Error Correction & Yield */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <article className="tech-panel-elevated p-8 rounded-xl border border-border/50">
              <div className="mb-6">
                <h2 className="font-display font-bold text-foreground mb-2">
                  ERROR CORRECTION
                </h2>
                <span className="font-mono text-xs tracking-wider uppercase text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                  Data Integrity
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                The verify phase of the rescue cycle checks rows and error-correction
                information before declaring a snapshot complete. If power disappears
                mid-backup, the design recovers the previous completed snapshot rather
                than presenting a torn, partially written image as valid.
              </p>

              <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  OPEN RESEARCH QUESTIONS
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>How does the design recover when backup stops halfway?</li>
                  <li>What is the exact durability rule for an application Save?</li>
                </ul>
              </div>
            </article>

            <article className="tech-panel-elevated p-8 rounded-xl border border-border/50">
              <div className="mb-6">
                <h2 className="font-display font-bold text-foreground mb-2">
                  SOFTWARE & OS INTEGRATION
                </h2>
                <span className="font-mono text-xs tracking-wider uppercase text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                  Unified Memory Pool
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                A unified memory-and-storage pool is not created by the cell alone.
                The operating system, file system, permissions, crash-recovery rules,
                and durability semantics must all understand the architecture. We are
                studying what software changes expose one safe pool for both files
                and working memory.
              </p>

              <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
                <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  SCOPE
                </p>
                <p className="font-sans text-sm text-foreground/90">
                  OS interface design, durability command semantics, secure-erase policy
                  for deleted bytes, and integrated GPU pool sharing.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Status Note */}
        <section className="border-t border-border/50 pt-12">
          <div className="max-w-3xl mx-auto p-8 bg-background/50 border border-border/50 rounded-xl">
            <h2 className="font-display font-bold text-foreground mb-4">
              WHERE WE STAND
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The UM002B is a pre-silicon architecture. The operating concept — separate
              DRAM and non-volatile access paths, an on-die backup/restore controller,
              protected snapshot metadata, and power-fail sequencing — is designed and
              modeled. Device and circuit models explore programming, leakage, thermal
              effects, and controller operation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Product-level promises — measured retention, endurance, full-capacity backup
              energy and time, restore time, yield, and real software performance — remain
              to be proven on silicon. That is exactly what this research program exists to do.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            VIEW THE TECHNOLOGY
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
