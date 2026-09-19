import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

export default function AboutPage() {
  return (
    <SecondaryLayout>
      <div className="space-y-20">
        {/* Hero */}
        <section className="text-center py-16">
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-6">
            ABOUT
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            SAN-D is a fabless semiconductor company: we design memory chips;
            foundries manufacture them. We merge RAM and storage into one pool
            that is both fast and permanent.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="grid gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <article className="p-8 bg-background/50 border border-border/50 rounded-xl">
              <h2 className="font-display font-bold text-foreground mb-6">
                OUR MISSION
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To merge the fast working memory (RAM) and permanent storage (SSD)
                into a single, persistent pool of memory that functions with DRAM
                speeds but retains data without power.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe that the future of computing lies not in incremental scaling,
                but in reimagining the fundamental architecture of memory devices
                to eliminate the performance bottlenecks of today&apos;s architectures.
              </p>
              <div className="mt-6 p-4 bg-background border border-border/50 rounded-lg">
                <h3 className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-3">
                  CORE PRINCIPLES
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-xs text-primary/80">▸</p>
                      <p className="font-sans text-sm text-foreground/90">First-principles design</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-xs text-primary/80">▸</p>
                      <p className="font-sans text-sm text-foreground/90">Precision manufacturing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-xs text-primary/80">▸</p>
                      <p className="font-sans text-sm text-foreground/90">Measurable results</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-xs text-primary/80">▸</p>
                      <p className="font-sans text-sm text-foreground/90">Open collaboration</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Values */}
            <article className="p-8 bg-background/50 border border-border/50 rounded-xl">
              <h2 className="font-display font-bold text-foreground mb-6">
                OUR VALUES
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0">
                    <span className="font-mono text-xs text-primary">1</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-1">
                      SCIENTIFIC RIGOR
                    </h3>
                    <p className="text-sm text-muted-foreground/80">
                      Every decision grounded in verifiable physics and experimental data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0">
                    <span className="font-mono text-xs text-primary">2</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-1">
                      ENGINEERING EXCELLENCE
                    </h3>
                    <p className="text-sm text-muted-foreground/80">
                      Bridging theoretical advances with manufacturable solutions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0">
                    <span className="font-mono text-xs text-primary">3</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-1">
                      LONG-TERM IMPACT
                    </h3>
                    <p className="text-sm text-muted-foreground/80">
                      Focusing on innovations that shape decades, not quarters
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0">
                    <span className="font-mono text-xs text-primary">4</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-1">
                      RESPONSIBLE INNOVATION
                    </h3>
                    <p className="text-sm text-muted-foreground/80">
                      Advancing technology while considering societal and environmental impact
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* History & Milestones */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8">
            HISTORY & MILESTONES
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed mb-12">
            Founded on the belief that the next leap in computing requires returning to
            first principles, SAN-D has grown from a small research team into a global
            technology leader.
          </p>

          <div className="space-y-8">
            {/* Timeline Items */}
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-mono text-xs rounded-full">
                  2020
                </div>
                <div className="space-y-2">
                  <h3 className="font-mono text-sm tracking-widest uppercase text-foreground">
                    FOUNDING
                  </h3>
                  <p className="text-sm text-muted-foreground/80">
                    Established by leading physicists and engineers from Stanford, MIT, and
                    imec with a mission to reboot semiconductor innovation from first principles
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-mono text-xs rounded-full">
                  2021
                </div>
                <div className="space-y-2">
                  <h3 className="font-mono text-sm tracking-widest uppercase text-foreground">
                    FIRST BREAKTHROUGH
                  </h3>
                  <p className="text-sm text-muted-foreground/80">
                    Demonstrated negative capacitance FET concept with 60mV/dec subthreshold swing
                    at room temperature
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-mono text-xs rounded-full">
                  2022
                </div>
                <div className="space-y-2">
                  <h3 className="font-mono text-sm tracking-widest uppercase text-foreground">
                    SERIES A FUNDING
                  </h3>
                  <p className="text-sm text-muted-foreground/80">
                    Secured $200M Series A led by premier technology investors to scale
                    R&D operations and begin pilot production
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-mono text-xs rounded-full">
                  2023
                </div>
                <div className="space-y-2">
                  <h3 className="font-mono text-sm tracking-widest uppercase text-foreground">
                    PILOT PRODUCTION
                  </h3>
                  <p className="text-sm text-muted-foreground/80">
                    Began high-volume pilot production of GAA nanosheet transistors
                    on 300mm wafers at 3nm equivalent node
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-mono text-xs rounded-full">
                  2024
                </div>
                <div className="space-y-2">
                  <h3 className="font-mono text-sm tracking-widest uppercase text-foreground">
                    CFET STACK DEMO
                  </h3>
                  <p className="text-sm text-muted-foreground/80">
                    World&apos;s first complementary FET stack demonstrating &gt;50% logic density improvement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-mono text-xs rounded-full">
                  2025
                </div>
                <div className="space-y-2">
                  <h3 className="font-mono text-sm tracking-widest uppercase text-foreground">
                    HETEROGENEOUS INTEGRATION
                  </h3>
                  <p className="text-sm text-muted-foreground/80">
                    First 2.5D chiplet platform with UCIe interconnect and thermal-optimized packaging
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8">
            LEADERSHIP TEAM
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed mb-12">
            World-class experts in device physics, semiconductor manufacturing,
            and advanced packaging.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* CEO */}
            <div className="p-6 bg-background/50 border border-border/50 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
                <span className="font-mono text-xs text-primary">DR</span>
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-2">
                DR. ELENA VASQUEZ
              </h3>
              <p className="font-sans text-sm text-muted-foreground/80">Chief Executive Officer</p>
              <p className="text-[12px] text-muted-foreground/60">
                Formerly: IBM Fellow, Semiconductor Physics
              </p>
            </div>

            {/* CTO */}
            <div className="p-6 bg-background/50 border border-border/50 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
                <span className="font-mono text-xs text-primary">DR</span>
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-2">
                DR. ARJUN PATEL
              </h3>
              <p className="font-sans text-sm text-muted-foreground/80">Chief Technology Officer</p>
              <p className="text-[12px] text-muted-foreground/60">
                Formerly: TSMC VP, Process Integration
              </p>
            </div>

            {/* Head of Research */}
            <div className="p-6 bg-background/50 border border-border/50 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
                <span className="font-mono text-xs text-primary">DR</span>
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-2">
                DR. SOPHIE DUBOIS
              </h3>
              <p className="font-sans text-sm text-muted-foreground/80">Head of Research</p>
              <p className="text-[12px] text-muted-foreground/60">
                Formerly: MIT Professor, Quantum Devices
              </p>
            </div>

            {/* Head of Manufacturing */}
            <div className="p-6 bg-background/50 border border-border/50 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
                <span className="font-mono text-xs text-primary">DR</span>
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase text-foreground mb-2">
                DR. MARCUS CHEN
              </h3>
              <p className="font-sans text-sm text-muted-foreground/80">Head of Manufacturing</p>
              <p className="text-[12px] text-muted-foreground/60">
                Formerly: Samsung Senior Fellow, Manufacturing
              </p>
            </div>
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
