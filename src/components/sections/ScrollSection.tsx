"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { VideoSegment } from "@/lib/video-sequence";
import { useSectionVisibility } from "@/hooks/useScrollSync";

interface ScrollSectionProps {
  segment: VideoSegment;
  index: number;
  isActive: boolean;
  localProgress: number;
  globalProgress: number;
  viewportHeight: number;
  scrollY: number;
  reducedMotion?: boolean;
  direction?: "up" | "down" | "none";
  velocity?: number;
}

const SECTION_CONTENT: Record<string, { title: string; description: string; details: string[]; technicalSpecs: { label: string; value: string }[] }> = {
  "atomic-scale": {
    title: "ATOMIC SCALE",
    description: "At the fundamental level, semiconductor technology begins with the precise arrangement of atoms in a crystal lattice. Silicon atoms form a diamond cubic structure with 5.43 Ångström lattice spacing, creating the foundation for all electronic devices.",
    details: [
      "Crystal lattice: Diamond cubic structure",
      "Lattice constant: 5.431 Å",
      "Atomic density: 5×10²² atoms/cm³",
      "Covalent bonding: sp³ hybridization",
    ],
    technicalSpecs: [
      { label: "MATERIAL", value: "Single-crystal Silicon" },
      { label: "ORIENTATION", value: "<100> / <111>" },
      { label: "PURITY", value: "99.9999999% (9N)" },
      { label: "DEFECT DENSITY", value: "< 0.1 cm⁻³" },
    ],
  },
  transistor: {
    title: "TRANSISTOR",
    description: "The transistor emerges as engineered dopants create source, drain, and channel regions. A gate dielectric separates the gate electrode from the channel, enabling field-effect control of electron flow at nanometer dimensions.",
    details: [
      "Gate length: < 20 nm (advanced nodes)",
      "High-κ dielectric: HfO₂ / Al₂O₃",
      "Metal gate: TiN / TaN work function tuning",
      "Strained channels: SiGe / Si:C stressors",
    ],
    technicalSpecs: [
      { label: "ARCHITECTURE", value: "Gate-All-Around (GAA)" },
      { label: "GATE LENGTH", value: "12–18 nm" },
      { label: "DIELECTRIC", value: "HfO₂ / ZrO₂ stack" },
      { label: "SUBTHRESHOLD SWING", value: "~65 mV/dec" },
    ],
  },
  "transistor-group": {
    title: "TRANSISTOR GROUP",
    description: "Multiple transistors connect through local interconnects to form basic circuit elements. Shared diffusion regions and common gates create dense, matched device pairs essential for analog and digital circuit design.",
    details: [
      "Shared source/drain contacts",
      "Common centroid layout for matching",
      "Dummy devices for edge effects",
      "Local interconnect: M0 / MD layers",
    ],
    technicalSpecs: [
      { label: "MATCHING", value: "σ(ΔVth) < 1 mV" },
      { label: "DEVICE COUNT", value: "2–64 transistors" },
      { label: "LOCAL ROUTING", value: "M0 / M1 / MD" },
      { label: "AREA EFFICIENCY", value: "> 85% utilization" },
    ],
  },
  "logic-cell": {
    title: "LOGIC CELL",
    description: "Transistors organize into functional logic cells — inverters, NAND gates, flip-flops. Standard cell libraries provide characterized timing, power, and area metrics enabling automated place-and-route design flows.",
    details: [
      "Standard cell height: 6-12 tracks",
      "Logic functions: INV, NAND, NOR, XOR, MUX",
      "Sequential: DFF, latch, scan flop",
      "Power rails: VDD / VSS on M1/M2",
    ],
    technicalSpecs: [
      { label: "CELL HEIGHT", value: "7.5T / 6T / 5T" },
      { label: "LIBRARY SIZE", value: "500+ variants" },
      { label: "TIMING MODELS", value: "CCS / ECSM" },
      { label: "PVT CORNERS", value: "100+ corners" },
    ],
  },
  "cell-array": {
    title: "CELL ARRAY",
    description: "Thousands of logic cells tile into regular arrays. Hierarchical routing distributes clocks, power, and signals. The repetitive structure enables density optimization and statistical timing analysis at scale.",
    details: [
      "Array dimensions: 100s × 100s of cells",
      "Hierarchical routing: local → global",
      "Clock spines and distribution mesh",
      "Power grid: mesh + stripe topology",
    ],
    technicalSpecs: [
      { label: "ARRAY SIZE", value: "Up to 1M+ cells" },
      { label: "ROUTING LAYERS", value: "M1–M4 local" },
      { label: "CLOCK SKEW", value: "< 10 ps" },
      { label: "IR DROP", value: "< 5% VDD" },
    ],
  },
  "functional-blocks": {
    title: "FUNCTIONAL BLOCKS",
    description: "Cell arrays compose into macro blocks: compute cores, cache hierarchies, memory controllers, I/O interfaces. Each block optimizes for its function while standard interfaces enable system integration.",
    details: [
      "Compute: ALU, FPU, vector units",
      "Memory: SRAM, register files, caches",
      "Interconnect: NoC, AXI, CHI protocols",
      "I/O: SerDes, GPIO, DDR/PHY",
    ],
    technicalSpecs: [
      { label: "BLOCK TYPES", value: "12+ categories" },
      { label: "INTERFACE WIDTH", value: "128–1024 bit" },
      { label: "FREQUENCY", value: "3–6 GHz target" },
      { label: "POWER DOMAINS", value: "10–50 per block" },
    ],
  },
  "complete-die": {
    title: "COMPLETE DIE",
    description: "Functional blocks integrate into a complete system-on-chip. Floorplanning optimizes block placement, routing congestion, thermal distribution, and signal integrity across the die area.",
    details: [
      "Die area: 100-600 mm² (advanced)",
      "Transistor count: 10B-100B+",
      "Metal layers: 12-20+ routing layers",
      "Thermal: hotspot management, TSVs",
    ],
    technicalSpecs: [
      { label: "DIE AREA", value: "200–600 mm²" },
      { label: "TRANSISTORS", value: "50B–200B" },
      { label: "METAL LAYERS", value: "16–22" },
      { label: "TSV COUNT", value: "100K–1M+" },
    ],
  },
  "macro-chip": {
    title: "MACRO CHIP",
    description: "The completed die mounts in advanced packaging: chiplets, HBM stacks, interposers, and substrate redistribution layers. Heterogeneous integration combines logic, memory, and I/O into a single package.",
    details: [
      "Packaging: 2.5D / 3D hybrid bonding",
      "Chiplet interconnect: UCIe, BoW",
      "HBM: 8-12 Hi stacks, TB/s bandwidth",
      "Substrate: organic / glass core, RDL",
    ],
    technicalSpecs: [
      { label: "PACKAGE TYPE", value: "2.5D / 3D hybrid" },
      { label: "CHIPLETS", value: "4–16 per package" },
      { label: "I/O DENSITY", value: "> 1000/mm²" },
      { label: "BANDWIDTH", value: "TB/s aggregate" },
    ],
  },
};

export function ScrollSection({
  segment,
  index,
  isActive,
  localProgress,
  globalProgress,
  viewportHeight,
  scrollY,
  reducedMotion = false,
  direction = "none",
  velocity = 0,
}: ScrollSectionProps) {
  const { ref, isVisible: inView, intersectionRatio } = useSectionVisibility(segment.id, 0.1);
  const [isAnimating, setIsAnimating] = useState(false);

  const content = SECTION_CONTENT[segment.id] || {
    title: segment.label,
    description: "",
    details: [],
    technicalSpecs: [],
  };

  useEffect(() => {
    if (isActive && inView && !isAnimating) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isActive, inView, isAnimating]);

  const contentOpacity = isActive
    ? Math.min(1, localProgress * 1.5 + intersectionRatio * 0.5)
    : globalProgress > (index + 1) / 8
    ? Math.max(0, 1 - (globalProgress - (index + 1) / 8) * 3)
    : intersectionRatio;

  const titleTransform = reducedMotion ? 0 : (1 - localProgress) * 20 * (direction === "down" ? 1 : -1);
  const detailStagger = useMemo(
    () => content.details.map((_, i) => i * 80),
    [content.details]
  );

  const specsOpacity = isActive ? Math.min(1, (localProgress - 0.3) * 2) : 0;

  return (
    <section
      ref={ref}
      id={segment.id}
      className="relative min-h-screen flex items-center"
      aria-labelledby={`section-${segment.id}`}
      style={{ opacity: isActive ? 1 : 0.25 }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32">
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: contentOpacity,
            transform: reducedMotion ? "none" : `translateY(${titleTransform}px)`,
          }}
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="relative w-12 h-px bg-primary/50 overflow-hidden" aria-hidden="true">
              <div
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${localProgress * 100}%` }}
              />
            </div>
            <span className="scale-indicator">{segment.scaleLabel}</span>
          </div>

          <h2
            id={`section-${segment.id}`}
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {content.title}
          </h2>

          <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed mb-10">
            {content.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-12">
            {content.details.map((detail, i) => (
              <div
                key={i}
                className="tech-panel p-4 rounded-lg border-l-2 border-primary/30 animate-fade-in animate-slide-up"
                style={{
                  animationDelay: `${detailStagger[i]}ms`,
                  opacity: isActive ? Math.min(1, (localProgress - 0.1) * 3) : 0,
                  transform: reducedMotion ? "none" : `translateX(${(1 - localProgress) * 30}px)`,
                }}
              >
                <span className="font-mono text-xs text-primary/70">▸ </span>
                <span className="font-sans text-sm text-foreground/80">{detail}</span>
              </div>
            ))}
          </div>

          {content.technicalSpecs.length > 0 && (
            <div
              className="grid grid-cols-2 gap-3 max-w-2xl"
              style={{
                opacity: specsOpacity,
                transform: reducedMotion ? "none" : `translateY(${(1 - specsOpacity) * 20}px)`,
              }}
            >
              {content.technicalSpecs.map((spec, i) => (
                <div
                  key={i}
                  className="tech-panel p-4 rounded-lg border border-border/50 animate-fade-in animate-slide-up"
                  style={{ animationDelay: `${200 + i * 60}ms` }}
                >
                  <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-1">
                    {spec.label}
                  </div>
                  <div className="font-sans text-sm font-medium text-foreground/90 font-mono">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="absolute bottom-8 left-6 right-6 flex items-end justify-between px-6 pointer-events-none"
          aria-hidden="true"
        >
          <div className={`section-marker ${isActive ? "active" : ""}`} data-scale={segment.scaleLabel}>
            {segment.label}
          </div>
          <div className="hidden md:flex items-end gap-4 pb-2 opacity-50">
            <div className="font-mono text-xs text-muted-foreground/50">
              SCALE
            </div>
            <div className="font-display font-bold text-2xl md:text-4xl text-foreground tabular-nums">
              {segment.scaleLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}