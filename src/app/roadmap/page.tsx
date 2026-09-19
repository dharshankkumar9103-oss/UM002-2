import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

const PHASES = [
  {
    n: "01",
    title: "PDK HARDENING",
    subtitle: "The design becomes fab-real",
    timeline: "Typically 6–12 months · industry range, not a commitment",
    points: [
      "Install the foundry's Process Design Kit under NDA: silicon-calibrated transistor models, real design rules, real metal-stack data.",
      "Re-draw the 2T1C1M cell and array to the real rules — DRC/LVS-clean, a layout the fab would accept.",
      "Re-simulate everything at all corners (−40 / 25 / 85 °C × slow / typical / fast silicon) with calibrated models.",
      "Close what good design can close: stronger cold-corner drivers, disturb-aware biasing, wider power straps, finalized pitch.",
    ],
    derisks: "Does this design hold up on a real factory's process, or only in our own models? After this phase, every circuit number is anchored to measured foundry data.",
    money: "Engineering salaries and compute. PDK access is typically granted under NDA with modest or no license fee — the most capital-efficient phase.",
  },
  {
    n: "02",
    title: "JDA DEVICE DEVELOPMENT",
    subtitle: "The memristor becomes real",
    timeline: "Typically 12–24 months incl. multiple wafer spins · industry range, not a commitment",
    points: [
      "Negotiate a Joint Development Agreement with the foundry: device targets agreed in hard numbers (switching speed in the cold, disturb immunity at heat, retention).",
      "First JDA test chip — small test arrays carrying hafnium-oxide stack variants: oxide thickness, electrode materials, anneals.",
      "Measure real devices, extract the real Verilog-A device model. From here, simulation runs on measured parameters.",
      "Iterate — a second, sometimes third wafer spin — until the stack hits every target, then freeze it as a characterized device.",
    ],
    derisks: "The device physics itself — the one thing no amount of clever circuit design can change. This is also where defensible IP is created: a characterized, foundry-proven custom device.",
    money: "Negotiated JDA development fees and test-chip wafer spins. Each spin is a real manufacturing run — spins are the cost driver of this phase.",
  },
  {
    n: "03",
    title: "FULL-CHIP BUILD",
    subtitle: "Everything becomes one chip",
    timeline: "Typically 9–18 months plus foundry queue time · industry range, not a commitment",
    points: [
      "Full chip design with real models: memory array, on-die controller (power-fail detection, SAVE/RESTORE sequencing, ECC), IO ring, power grid.",
      "Sign-off verification with the foundry's own check decks: timing, power, reliability across all corners.",
      "Tapeout — first silicon on an MPW (multi-project wafer) shuttle, splitting mask costs across many projects.",
    ],
    derisks: "Integration — do all the pieces work together as one chip? Tapeout is the point of no return where the design becomes a physical object.",
    money: "The engineering team at full size, plus the MPW slot. Sharing the wafer keeps first silicon affordable; a full dedicated mask set waits for the volume ramp.",
  },
  {
    n: "04",
    title: "SILICON VALIDATION",
    subtitle: "Claims become measurements",
    timeline: "Typically 6–18 months incl. possible re-spin · industry range, not a commitment",
    points: [
      "Lab bring-up: packaged chips return; SAVE/RESTORE verified on real silicon; cold RESET timing, 85 °C disturb, and retention measured — mapped explicitly to the three open issues.",
      "Fix what the silicon teaches us. Nearly every first chip needs a re-spin; it is budgeted and expected, not a failure.",
      "Formal reliability qualification to industry standards. Only after this step can retention or temperature claims be made honestly.",
    ],
    derisks: "Everything. This is where “it works” stops being a simulation result and becomes a measured fact on real parts — the basis for customer sampling and every future claim.",
    money: "Lab and test time, qualification lab fees, and — if the re-spin is needed — its mask and wafer costs.",
  },
];

const OPEN_ISSUES = [
  {
    title: "COLD-CORNER RESET MISSES ITS TARGET",
    what: "RESET means breaking the conductive filament inside the memristor. At −40 °C atoms barely move, so the filament breaks slowly. Our requirement is RESET within 30 ns with margin; the modeled design misses it in the cold.",
    how: "Real ngspice simulation with a physics-based Verilog-A model — it genuinely ran and genuinely failed, even at maximum 3.3 V drive. Honest label: real simulation, assumed device parameters.",
    unlocks: "Two knobs: higher program voltage (needs an on-chip charge pump — a real area and power cost), or a JDA-tuned device with higher temperature sensitivity (α ≈ 0.40 eV/V, a target).",
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
            FROM PDK &amp; JDA<br />TO SILICON
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            How a fabless memory startup turns a proven-in-simulation design into a
            proven-in-silicon product — and what the funding builds, phase by phase.
          </p>
        </section>

        {/* What the funding builds */}
        <section className="p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">
            WHAT THE FUNDING BUILDS
          </p>
          <p className="text-foreground/90 text-lg leading-relaxed max-w-3xl">
            The PDK makes the design fab-real, the JDA makes the device fab-real, the
            MPW makes it silicon, and testing makes the claims proof. Phase by phase,
            capital converts directly into de-risked milestones: Phase 1 buys a
            manufacturable design; Phase 2 buys a characterized custom device and
            defensible IP; Phase 3 buys first silicon; Phase 4 buys proof. The software
            track buys the product experience in parallel. We are a fabless company:
            our capital goes into design, device development, and proof — never into
            concrete and cleanrooms.
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">WHAT IT DE-RISKS</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{phase.derisks}</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">WHERE THE MONEY GOES</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{phase.money}</p>
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
              "A JDA is R&D, not a purchase order. Multiple wafer spins are normal; success is earned across iterations, not bought in one.",
              "First silicon almost always needs a re-spin. We budget for it; the industry expects it.",
              "No foundry partnership exists yet. This page is the plan, not a status report — PDK access and the JDA are milestones this funding enables.",
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
