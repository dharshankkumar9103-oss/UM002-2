import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

const PHASES = [
  {
    n: "01",
    title: "THE 2 GB DEMONSTRATION",
    subtitle: "The un-fakeable proof",
    timeline: "Now → Dec 2026",
    status: "IN PROGRESS · FOUNDER-FUNDED",
    points: [
      "Protect the IP first: provisional patents filed before any deep technical disclosure — the cell architecture, the power-loss SAVE/RESTORE method, and the negative-rail scheme.",
      "Lock the open decisions: prototype array size, host interface for bring-up, and the honest demo script.",
      "Build the demonstrator: FPGA smart controller, two memory tiers (fast + non-volatile), Linux host driver, and a power-yank rig for a clean, repeatable live power cut.",
      "Film it in one continuous take — no cuts. Rehearsed until it is boring; boring means reliable.",
      "Close the verification gaps: triage the testbenches, fix the firmware timeouts, run the firmware on real hardware for the first time.",
      "Finish the module PCB: design review, fabrication, assembly, power-on bring-up.",
      "Found the company: incorporated before any investment.",
    ],
    exit: "Provisionals filed · company incorporated · live demo filmed · verification clean · PCB alive",
    derisks:
      "Can the architecture's core promise — power loss is a pause button, not data loss — be shown live, on real hardware, with no tricks? This phase is the investor grab: the demo the pre-seed is raised on.",
    funding:
      "Founder-funded: demo hardware, the module PCB, patent filings, and incorporation. The leanest phase — and the one that unlocks everything after it.",
  },
  {
    n: "02",
    title: "FIRST SILICON",
    subtitle: "It works in atoms, not just simulation",
    timeline: "Pre-seed → May 2027",
    status: "NEXT · PRE-SEED",
    points: [
      "Raise the pre-seed on the Phase 1 demo and diligence package.",
      "Book the MPW shuttle: slot reserved, tapeout Dec 2026, packaged chips May 2027.",
      "Complete the chip layout — the critical path: first layout hire, row/column decoders, sense amps, wordline/bitline drivers, pad ring, full DRC + LVS clean, GDSII sign-off.",
      "Silicon bring-up and proof: bench bring-up, host communication, characterization — retention at 85 °C, SAVE/SET, SAVE/RESET, RESTORE margins.",
      "Publish the silicon proof: the single most valuable diligence asset in the company.",
    ],
    exit: "Packaged chips in hand · SAVE/RESTORE proven on silicon · characterization report",
    derisks:
      "Does SAVE/RESTORE survive contact with the physical world? Packaged chips in hand turn every simulation claim into a measurement.",
    funding:
      "Pre-seed: the MPW shuttle slot, the first layout hire, and runway to bring the silicon up.",
  },
  {
    n: "03",
    title: "THE PRODUCT CELL",
    subtitle: "The cell that scales to gigabytes per die",
    timeline: "2027–2028",
    status: "SEED",
    points: [
      "Convert provisionals to full patents with a semiconductor patent attorney — before the 12-month clock expires.",
      "JDA with SkyWater: co-develop the custom hafnium-oxide module — a qualified device, not a behavioral model. Device targets: cold RESET within 30 ns, disturb-free at 85 °C.",
      "Port the 2T1C1M cell to an advanced node: dense capacitor for area, 64 ms retention at 85 °C (target), shrink toward a ~6 F²-class product cell (target).",
      "Single-die integration: fold the smart controller onto the memory die, on-chip power for the special rails, harden the FPGA-proven RTL into an ASIC, productize the firmware.",
      "Software and drivers: Linux driver toward mainline, Windows driver, host tools — memory explorer, diagnostics, firmware updates.",
    ],
    exit: "Qualified hafnium-oxide device · product cell on advanced node · single-die prototype · full patents filed",
    derisks:
      "Density and manufacturability — can one cell be both fast and small enough for gigabytes per die? The JDA device is the one thing clever circuit design cannot substitute.",
    funding:
      "Seed: JDA device development, the advanced-node product cell, single-die integration, and the driver track.",
  },
  {
    n: "04",
    title: "THE 400 GB PRODUCT",
    subtitle: "A product the market can buy",
    timeline: "2028+",
    status: "SERIES A AND BEYOND",
    points: [
      "Qualification — the unglamorous gate to revenue: high-temp operating life, retention bake, endurance cycling, ESD/latch-up per JEDEC, power-loss testing at scale.",
      "Manufacturing: volume foundry agreement, production test program, supply chain.",
      "Team: analog/mixed-signal, digital/DFT, firmware and drivers, layout, QA and reliability — the company grows with the silicon.",
      "Market: customer sampling program, then production ramp to revenue.",
    ],
    exit: "SAN-D 400 GB module shipping · revenue",
    derisks:
      "Everything at scale — can thousands of power-yank cycles, OS torture tests, and a real supply chain turn a proven chip into a shippable product?",
    funding:
      "Series A and beyond: qualification, volume manufacturing, and the team that ships it.",
    capacity: [
      { milestone: "Prototype chip", capacity: "2 KB", form: "SKY130 MPW", evidence: "In progress" },
      { milestone: "Gen-1 product die", capacity: "1–16 GB", form: "Advanced node, product cell", evidence: "Target — needs Phase 3" },
      { milestone: "SAN-D module", capacity: "64–128 GB", form: "Multi-die module", evidence: "Target" },
      { milestone: "SAN-D flagship", capacity: "400 GB", form: "Multi-die module, SSD-style", evidence: "Milestone goal" },
    ],
  },
];

const OPEN_ISSUES = [
  {
    title: "COLD-CORNER RESET MISSES ITS TARGET",
    what: "RESET means breaking the conductive filament inside the memristor. At −40 °C atoms barely move, so the filament breaks slowly. Our requirement is RESET within 30 ns with margin; the modeled design misses it in the cold.",
    how: "Real ngspice simulation with a physics-based Verilog-A model — it genuinely ran and genuinely failed, even at maximum 3.3 V drive. Honest label: real simulation, assumed device parameters.",
    unlocks: "Two knobs: higher program voltage (needs an on-chip charge pump — a real area and power cost), or a JDA-tuned device with higher temperature sensitivity (a target).",
  },
  {
    title: "SHARED-BITLINE DISTURB FAILS AT 85 °C",
    what: "Cells share wires. Writing one cell shouts electrically down the shared wire; heat makes filaments easier to nudge, so at 85 °C a neighbor can hear the muffled shout enough to disturb its stored state.",
    how: "Analytical stress analysis: passes cold, marginal at room temperature, fails hot. Honest label: modeled finding, assumption-driven — the threshold-vs-temperature slide is the key analytical assumption.",
    unlocks: "Design half: disturb-aware biasing schemes and bitline segmentation (PDK work). Device half: a more temperature-stable stack — JDA wafers again.",
  },
  {
    title: "FAR-ROW IR DROP EATS THE MARGIN",
    what: "Wires resist current, so voltage fades along the wire — like water pressure at the far end of a long hose. Our budget allows 75 mV of loss; far rows compute at 80–98 mV. The chip still functions, but the safety cushion is gone.",
    how: "Straight V=IR arithmetic: current from simulation, wire resistance from assumed metal data. Honest label: exact math, assumed material inputs — the metal's true resistance arrives only with a PDK.",
    unlocks: "Pure PDK design work: wider power straps and finalized pitch against real metal data. No device change needed.",
  },
];

const QUESTIONS = [
  "How much reserve energy is needed for the intended capacity at the worst temperature and voltage?",
  "What is the exact durability rule for an application Save, not just for power failure?",
  "How does the design recover when backup stops halfway through?",
  "How long do measured resistance states remain readable after years without power?",
  "What software changes are required to expose one safe pool for both files and working memory?",
];

const EVIDENCE_LABELS = [
  { label: "MEASURED", desc: "Taken from real silicon or real hardware in our lab. Nothing in this program carries this label yet." },
  { label: "MODELED", desc: "Produced by real simulation or analysis that genuinely ran, using physics-based models." },
  { label: "ASSUMED", desc: "An analytical parameter chosen by engineering judgment, not measured. Models are only as true as their assumptions." },
  { label: "TARGET", desc: "A requirement the design must hit (e.g. RESET within 30 ns). A promise about the future, not a fact about the present." },
  { label: "REQUIRES-FAB", desc: "Can only be resolved with foundry access, wafers, or silicon." },
];

export default function RoadmapPage() {
  return (
    <SecondaryLayout>
      <div className="space-y-20">
        {/* Hero */}
        <section className="text-center py-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              FORWARD-LOOKING PLAN — NOT A STATUS REPORT
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-6">
            FROM 2 GB DEMO<br />TO 400 GB PRODUCT
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            The complete build plan — every step from the lab bench to a 400 GB
            universal-memory product. Each phase funds the next.
          </p>
        </section>

        {/* What the funding builds */}
        <section className="p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">
            WHAT THE FUNDING BUILDS
          </p>
          <p className="text-foreground/90 text-lg leading-relaxed max-w-3xl">
            The 2 GB demo earns the pre-seed, the pre-seed buys first silicon, the
            seed buys the product cell, and Series A buys the 400 GB product. Phase
            by phase, capital converts directly into de-risked milestones. We are a
            fabless company: our capital goes into design, device development, and
            proof — never into concrete and cleanrooms.
          </p>
        </section>

        {/* Phases */}
        <section className="space-y-8">
          <h2 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            THE FOUR PHASES
          </h2>
          {PHASES.map((phase) => (
            <article key={phase.n} className="tech-panel-elevated p-8 rounded-xl">
              <div className="flex items-start gap-6 mb-6">
                <div className="font-display font-bold text-primary shrink-0" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  {phase.n}
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                    {phase.title}
                  </h3>
                  <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    {phase.subtitle}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground/70 mt-2">
                    {phase.timeline}
                  </p>
                  <p className="mt-3">
                    <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 font-mono text-[10px] tracking-widest uppercase text-primary">
                      {phase.status}
                    </span>
                  </p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {phase.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/85 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              {"capacity" in phase && phase.capacity && (
                <div className="mb-6 overflow-x-auto">
                  <p className="font-mono text-xs tracking-wider uppercase text-primary mb-3">
                    HONEST SCALING — 400 GB IS A MULTI-DIE MODULE, NOT A SINGLE CHIP
                  </p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="font-mono text-xs tracking-wider uppercase text-muted-foreground text-left">
                        <th className="py-2 pr-4 font-medium">Milestone</th>
                        <th className="py-2 pr-4 font-medium">Capacity</th>
                        <th className="py-2 pr-4 font-medium">Form</th>
                        <th className="py-2 font-medium">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase.capacity.map((row, i) => (
                        <tr key={i} className="border-t border-border/50 text-foreground/85">
                          <td className="py-3 pr-4">{row.milestone}</td>
                          <td className="py-3 pr-4 font-mono">{row.capacity}</td>
                          <td className="py-3 pr-4">{row.form}</td>
                          <td className="py-3 text-muted-foreground">{row.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="font-mono text-xs tracking-wider uppercase text-accent mb-6">
                EXIT&nbsp;&nbsp;<span className="text-foreground/80 normal-case tracking-normal font-sans text-sm">{phase.exit}</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">WHAT IT DE-RISKS</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{phase.derisks}</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">WHAT THE FUNDING BUILDS</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{phase.funding}</p>
                </div>
              </div>
            </article>
          ))}

          {/* Software track */}
          <article className="p-8 rounded-xl border border-primary/20 bg-primary/5">
            <h3 className="font-display font-bold text-foreground mb-2" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
              THE PARALLEL TRACK — SOFTWARE
            </h3>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
              RUNS THROUGHOUT · NEEDS NO SILICON
            </p>
            <p className="text-foreground/85 leading-relaxed max-w-3xl">
              The hardware proves the bits survive; the software proves the experience:
              OS support for persistent memory and the smart shutdown/resume layer that
              turns “the data is intact” into “the machine picks up exactly where it
              left off.” Built on emulators and FPGA prototypes in parallel with the
              hardware phases — ready to exercise real silicon the week it arrives,
              not starting when it arrives.
            </p>
          </article>
        </section>

        {/* What we want you to know */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            WHAT WE WANT YOU TO KNOW
          </h2>
          <div className="space-y-4">
            {[
              "Each phase funds the next. The 2 GB demo is what the pre-seed is raised on; first silicon is what the seed is raised on — an investor can see exactly what their capital unlocks.",
              "A JDA is R&D, not a purchase order. Multiple wafer spins are normal; success is earned across iterations, not bought in one.",
              "First silicon almost always needs a re-spin. We budget for it; the industry expects it.",
              "No foundry JDA exists yet — it comes after investment, and after the provisional patents are filed. This page is the plan, not a status report.",
              "All timelines are typical industry ranges, not commitments. They move with team size, foundry queues, and what the silicon tells us.",
              "No performance, retention, or temperature claims are made here as achieved facts. This roadmap exists precisely so that every future claim is earned — on measured silicon, or not at all.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-lg bg-background/50 border border-border/50">
                <span className="font-mono text-sm text-primary shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-foreground/85 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open device issues */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            OPEN DEVICE ISSUES
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-10">
            Our own simulation and analysis program surfaced three device-level issues —
            found by simulation, not by silicon, which is the cheapest possible place to
            find them. Each is stated with an honest account of how we know it.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {OPEN_ISSUES.map((issue, i) => (
              <article key={i} className="tech-panel-elevated p-8 rounded-xl">
                <h3 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}>
                  {issue.title}
                </h3>
                <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">WHAT IT IS</p>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5">{issue.what}</p>
                <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">HOW WE KNOW</p>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5">{issue.how}</p>
                <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">WHAT UNLOCKS IT</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{issue.unlocks}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Five questions */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            FIVE QUESTIONS A CAREFUL READER SHOULD ASK
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-10">
            We answer the diligence questions before they are asked.
          </p>
          <div className="space-y-3">
            {QUESTIONS.map((q, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-lg bg-background/50 border border-border/50">
                <span className="font-mono text-sm text-primary shrink-0 mt-0.5">Q{i + 1}</span>
                <p className="text-foreground/85 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence labels */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            HOW WE LABEL EVERY CLAIM
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-10">
            Honesty needs a vocabulary. Every technical statement we make carries one
            of five labels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVIDENCE_LABELS.map((e, i) => (
              <div key={i} className="p-6 rounded-xl bg-background/50 border border-border/50">
                <p className="font-mono text-sm tracking-widest uppercase text-primary mb-2">{e.label}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
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
