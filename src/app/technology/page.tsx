import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

const MODES = [
  {
    name: "NORMAL",
    tag: "EVERYDAY OPERATION",
    desc: "The chip is simply a DRAM. Host reads and writes flow through T_DRAM to the capacitor at DRAM speed (~2.8 ns access, modeled). Refresh runs in the background exactly as in conventional DRAM. The memristor in each cell sits idle — programmed once during the last RESTORE, untouched since.",
  },
  {
    name: "SAVE",
    tag: "POWER-FAIL BACKUP",
    desc: "When the controller detects main power failing, it switches the array into SAVE. Row by row, each cell's capacitor charge is sensed and translated into the matching resistance state in its memristor. Powered not by the dying main supply but by on-board reserve capacitors — no host involvement, no software, no bus traffic.",
  },
  {
    name: "OFF",
    tag: "ZERO-STANDBY RETENTION",
    desc: "With SAVE complete and main power gone, the chip is OFF. No refresh, no clocks — the capacitors' charge decays irrelevantly. The array's state persists purely as the physical resistance of millions of HfO filaments. Standby energy consumption is zero.",
  },
  {
    name: "RESTORE",
    tag: "POWER-UP RECOVERY",
    desc: "When main power returns, the controller enters RESTORE before the host may touch the array. Each memristor's resistance is sensed with a small, non-disturbing voltage and the corresponding charge is written back into its capacitor. ECC verifies the recovered data. The array returns to full-speed DRAM operation.",
  },
];

const GLOSSARY = [
  { term: "2T1C1M", def: "The UM002B cell structure: two transistors, one capacitor, one memristor per bit." },
  { term: "T_DRAM", def: "Thin-oxide access transistor serving the capacitor on the volatile (DRAM) path. Small, fast, core-voltage operation." },
  { term: "T_NVM", def: "Thick-oxide access transistor (~7 nm modeled oxide) serving the memristor. Tolerates the higher voltages of memristor programming." },
  { term: "HFO MEMRISTOR", def: "A metal–insulator–metal device whose hafnium-oxide film holds data as the resistance of a conductive filament of oxygen vacancies." },
  { term: "SET / RESET", def: "The two memristor programming operations: driving the filament into the low-resistance and high-resistance states." },
  { term: "RESERVE CAPACITORS", def: "On-board energy storage that powers the SAVE sequence after main power fails." },
  { term: "NVDIMM-N", def: "An industry module category combining DRAM with a nonvolatile shadow and power-fail backup — the closest established reference for the UM002B's system behavior." },
];

export default function TechnologyPage() {
  return (
    <SecondaryLayout>
      <div className="space-y-20">
        {/* Hero */}
        <section className="text-center py-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              PRE-SILICON ARCHITECTURE · SEPTEMBER 2026
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-6">
            TECHNOLOGY
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            The UM002B universal-memory chip: a single pool of memory that acts as
            both the computer&apos;s fast working space and its permanent keeper of files.
          </p>
        </section>

        {/* The cell */}
        <section>
          <h2 className="font-display font-bold text-foreground mb-8" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            THE 2T1C1M CELL
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-10">
            Every bit in the array lives in one cell: two transistors, one capacitor,
            one hafnium-oxide memristor. The cell carries both sides of the
            universal-memory duality — the two paths are electrically isolated, and
            only one is active at a time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                tag: "2T · T_DRAM",
                title: "THIN-OXIDE TRANSISTOR",
                desc: "Gatekeeper of the volatile path. Thin gate oxide means a smaller, faster device at the low core voltage — everything about it is optimized for speed.",
              },
              {
                tag: "1C",
                title: "CAPACITOR",
                desc: "The working storage element. Holds data as electrical charge — the “working copy” of the bit. Fast (~2.8 ns access, modeled), but charge leaks: it needs refresh and dies with power.",
              },
              {
                tag: "2T · T_NVM",
                title: "THICK-OXIDE TRANSISTOR",
                desc: "Gatekeeper of the nonvolatile path. Thick oxide (~7 nm modeled) tolerates the substantially higher voltages needed to program the memristor, repeatedly.",
              },
              {
                tag: "1M",
                title: "HFO MEMRISTOR",
                desc: "The shadow storage element. Holds data as resistance — a filament of oxygen vacancies formed or ruptured in the oxide. Needs no power, but is slower to write, so it stays off the daily critical path.",
              },
            ].map((el, i) => (
              <article key={i} className="tech-panel-elevated p-8 rounded-xl">
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">{el.tag}</p>
                <h3 className="font-display font-bold text-foreground mb-3">{el.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{el.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
            <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">
              THE DIVISION OF LABOR
            </p>
            <p className="text-foreground/85 text-lg leading-relaxed max-w-3xl">
              The capacitor does all normal operation; the memristor wakes only on power
              events. Charge is the sprinter — blazingly fast, with no endurance.
              Resistance is the marathoner — slower to change, but it holds its state
              indefinitely with zero energy. The UM002B never asks either to do the
              other&apos;s job.
            </p>
          </div>
        </section>

        {/* Four modes */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            FOUR MODES
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-10">
            Transitions are driven by the power state and managed entirely by the
            on-die controller — invisible to the host.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MODES.map((mode, i) => (
              <article key={i} className="tech-panel-elevated p-8 rounded-xl">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h3 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                    {mode.name}
                  </h3>
                  <span className="font-mono text-xs tracking-wider uppercase text-primary/70 bg-primary/10 px-3 py-1 rounded-full shrink-0">
                    {mode.tag}
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed">{mode.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-xl bg-background/50 border border-border/50">
            <p className="font-mono text-xs tracking-wider uppercase text-primary mb-2">THE SAVE SEQUENCE</p>
            <p className="text-foreground/85 leading-relaxed">
              Freeze → Translate → Verify → Commit → Power down. The controller stops
              normal traffic, reads each capacitor&apos;s 0 or 1, programs the matching
              memristor, checks rows and error-correction information, commits protected
              metadata — and only then lets the machine go dark.
            </p>
          </div>
        </section>

        {/* Controller */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            THE ON-DIE CONTROLLER
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed mb-10">
            SAVE and RESTORE are orchestrated by a dedicated controller in the on-die
            array periphery — the logic surrounding the memory array on the same
            silicon die. Each die is self-sufficient: its own power-fail detection,
            its own sequencing, its own reserve-energy budget. Its firmware lives in
            on-chip ROM/OTP programmed at manufacture.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "POWER-FAIL DETECTION", d: "Continuously monitors the supply rails, distinguishes genuine power-fail events from voltage noise, quiesces host traffic, and launches SAVE." },
              { t: "SAVE / RESTORE SEQUENCING", d: "Row-by-row timing: which wordlines fire, in what order, at what voltages — protecting the DRAM side while programming voltages reach the memristors." },
              { t: "ERROR CORRECTION", d: "Encodes data with redundancy on SAVE and verifies/corrects it on RESTORE, so the recovered array matches the pre-power-fail state." },
              { t: "RETAINED METADATA", d: "Array status, SAVE/RESTORE progress markers, and configuration in an on-die NVM register file — the controller resumes coherently across the power event it manages." },
              { t: "TEST ACCESS", d: "Independent manufacturing and bring-up access to the DRAM and NVM paths, so each can be exercised, characterized, and validated on its own." },
              { t: "HOST INTERFACE", d: "A standard DDR-style, NVDIMM-N-like interface. No CPU or GPU changes required — the processor issues ordinary memory reads and writes." },
            ].map((c, i) => (
              <div key={i} className="p-6 rounded-xl bg-background/50 border border-border/50">
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">{c.t}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What it feels like */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            WHAT IT FEELS LIKE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "POWER ON", d: "Nothing to copy from slow storage — the working set is already in the array. Startup converges toward simply re-establishing processor and device state." },
              { t: "POWER LOSS", d: "The machine does not crash in the conventional sense. From the user's perspective, power loss behaves like a pause: SAVE captures the complete working state, and everything stops." },
              { t: "POWER RETURNS", d: "RESTORE reconstitutes the working state and the system continues. Open documents, running processes, in-memory data — everything that was in the pool is in the pool again. The machine resumes rather than reboots." },
            ].map((f, i) => (
              <div key={i} className="tech-panel-elevated p-8 rounded-xl">
                <h3 className="font-mono text-sm tracking-widest uppercase text-primary mb-3">{f.t}</h3>
                <p className="text-foreground/80 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence note */}
        <section className="border-t border-border/50 pt-16">
          <div className="p-8 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
            <p className="font-mono text-xs tracking-widest uppercase text-primary mb-3">
              EVIDENCE STATUS
            </p>
            <p className="text-foreground/85 leading-relaxed max-w-3xl">
              The UM002B is a pre-silicon architecture supported by analytical models,
              simulation work, controller design, and prototype-scale planning. Performance
              figures cited here (e.g. ~2.8 ns DRAM-path access) describe the modeled
              design point. Statements about retention and operating conditions describe
              architectural intent — not measured or qualified specifications.
            </p>
          </div>
        </section>

        {/* Glossary */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            GLOSSARY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GLOSSARY.map((g, i) => (
              <div key={i} className="p-5 rounded-lg bg-background/50 border border-border/50">
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">{g.term}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{g.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              HOW WE GET TO SILICON
              <span className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:border-primary/50 hover:bg-accent"
            >
              ABOUT SAN-D
            </Link>
          </div>
        </section>
      </div>
    </SecondaryLayout>
  );
}
