"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface TechnicalCallout {
  id: string;
  position: { x: number; y: number }; // Normalized 0-1
  label: string;
  detail: string;
  type: "measurement" | "region" | "signal" | "component";
  scaleRange: [number, number]; // globalProgress range where visible
}

const SEGMENT_CALLOUTS: Record<string, TechnicalCallout[]> = {
  "atomic-scale": [
    { id: "lattice", position: { x: 0.3, y: 0.4 }, label: "Si Lattice", detail: "5.431 Å spacing", type: "measurement", scaleRange: [0, 0.15] },
    { id: "doping", position: { x: 0.7, y: 0.6 }, label: "Dopant Atoms", detail: "B / P / As implantation", type: "component", scaleRange: [0.05, 0.15] },
    { id: "bonding", position: { x: 0.5, y: 0.2 }, label: "sp³ Bonds", detail: "Tetrahedral coordination", type: "measurement", scaleRange: [0, 0.12] },
  ],
  "transistor": [
    { id: "gate", position: { x: 0.5, y: 0.35 }, label: "Gate Stack", detail: "HfO₂ / Metal Gate", type: "component", scaleRange: [0.12, 0.28] },
    { id: "channel", position: { x: 0.5, y: 0.55 }, label: "Channel", detail: "Strained Si / SiGe", type: "region", scaleRange: [0.12, 0.28] },
    { id: "source", position: { x: 0.25, y: 0.7 }, label: "Source", detail: "n⁺ / p⁺ doped", type: "component", scaleRange: [0.15, 0.28] },
    { id: "drain", position: { x: 0.75, y: 0.7 }, label: "Drain", detail: "n⁺ / p⁺ doped", type: "component", scaleRange: [0.15, 0.28] },
    { id: "gate-length", position: { x: 0.5, y: 0.2 }, label: "Lg = 14 nm", detail: "Effective gate length", type: "measurement", scaleRange: [0.12, 0.28] },
  ],
  "transistor-group": [
    { id: "shared-sd", position: { x: 0.5, y: 0.5 }, label: "Shared S/D", detail: "Common diffusion", type: "component", scaleRange: [0.25, 0.38] },
    { id: "local-interconnect", position: { x: 0.3, y: 0.3 }, label: "M0 / MD", detail: "Local routing", type: "signal", scaleRange: [0.25, 0.38] },
    { id: "dummy", position: { x: 0.8, y: 0.2 }, label: "Dummy Gates", detail: "Edge uniformity", type: "component", scaleRange: [0.25, 0.38] },
  ],
  "logic-cell": [
    { id: "inverter", position: { x: 0.4, y: 0.4 }, label: "INV Cell", detail: "7.5T height", type: "component", scaleRange: [0.35, 0.48] },
    { id: "nand", position: { x: 0.6, y: 0.55 }, label: "NAND2", detail: "4× drive strength", type: "component", scaleRange: [0.35, 0.48] },
    { id: "power-rails", position: { x: 0.5, y: 0.15 }, label: "VDD / VSS", detail: "M1 / M2 straps", type: "signal", scaleRange: [0.35, 0.48] },
    { id: "cell-boundary", position: { x: 0.2, y: 0.5 }, label: "Cell Boundary", detail: "Abutment box", type: "measurement", scaleRange: [0.35, 0.48] },
  ],
  "cell-array": [
    { id: "clock-spine", position: { x: 0.5, y: 0.25 }, label: "Clock Spine", detail: "H-tree distribution", type: "signal", scaleRange: [0.45, 0.58] },
    { id: "power-mesh", position: { x: 0.7, y: 0.6 }, label: "Power Mesh", detail: "M3/M4 grid", type: "signal", scaleRange: [0.45, 0.58] },
    { id: "array-row", position: { x: 0.2, y: 0.5 }, label: "Row Decoder", detail: "Word line driver", type: "component", scaleRange: [0.45, 0.58] },
    { id: "io-pitch", position: { x: 0.8, y: 0.3 }, label: "I/O Pitch", detail: "0.8 μm", type: "measurement", scaleRange: [0.45, 0.58] },
  ],
  "functional-blocks": [
    { id: "compute-core", position: { x: 0.3, y: 0.35 }, label: "Compute Core", detail: "4-wide OoO", type: "region", scaleRange: [0.55, 0.68] },
    { id: "l2-cache", position: { x: 0.7, y: 0.3 }, label: "L2 Cache", detail: "4 MB SRAM", type: "region", scaleRange: [0.55, 0.68] },
    { id: "noc", position: { x: 0.5, y: 0.6 }, label: "NoC Router", detail: "CHI-E protocol", type: "signal", scaleRange: [0.55, 0.68] },
    { id: "phy", position: { x: 0.2, y: 0.7 }, label: "DDR PHY", detail: "LPDDR5X 8.5 Gbps", type: "component", scaleRange: [0.55, 0.68] },
  ],
  "complete-die": [
    { id: "die-edge", position: { x: 0.1, y: 0.5 }, label: "Die Edge", detail: "Scribe line", type: "measurement", scaleRange: [0.65, 0.8] },
    { id: "tsv-array", position: { x: 0.85, y: 0.5 }, label: "TSV Array", detail: "10μm pitch", type: "component", scaleRange: [0.65, 0.8] },
    { id: "thermal-bump", position: { x: 0.5, y: 0.15 }, label: "Thermal Bumps", detail: "Cu pillar", type: "component", scaleRange: [0.65, 0.8] },
    { id: "io-ring", position: { x: 0.5, y: 0.85 }, label: "I/O Ring", detail: "Pad limited", type: "region", scaleRange: [0.65, 0.8] },
  ],
  "macro-chip": [
    { id: "chiplet", position: { x: 0.3, y: 0.4 }, label: "Compute Chiplet", detail: "5nm GAA", type: "region", scaleRange: [0.78, 0.9] },
    { id: "hbm-stack", position: { x: 0.7, y: 0.35 }, label: "HBM3E Stack", detail: "12-Hi, 1.2 TB/s", type: "region", scaleRange: [0.78, 0.9] },
    { id: "interposer", position: { x: 0.5, y: 0.6 }, label: "Si Interposer", detail: "RDL 2/2/2 μm", type: "component", scaleRange: [0.78, 0.9] },
    { id: "substrate", position: { x: 0.5, y: 0.8 }, label: "Org. Substrate", detail: "FCBGA 100μm", type: "component", scaleRange: [0.78, 0.9] },
  ],
};

const TYPE_STYLES: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  measurement: { color: "rgba(255,255,255,0.9)", bg: "rgba(100,180,255,0.15)", border: "rgba(100,180,255,0.4)", icon: "◢" },
  region: { color: "rgba(255,255,255,0.9)", bg: "rgba(140,210,255,0.12)", border: "rgba(140,210,255,0.3)", icon: "▣" },
  signal: { color: "rgba(255,255,255,0.9)", bg: "rgba(180,240,255,0.1)", border: "rgba(180,240,255,0.3)", icon: "◈" },
  component: { color: "rgba(255,255,255,0.9)", bg: "rgba(200,255,200,0.1)", border: "rgba(160,240,160,0.3)", icon: "◆" },
};

export function TechnicalCallouts({
  currentSegment,
  localProgress,
  globalProgress,
  reducedMotion,
  viewportWidth,
  viewportHeight,
}: {
  currentSegment: { id: string; label: string; scaleLabel: string };
  localProgress: number;
  globalProgress: number;
  reducedMotion: boolean;
  viewportWidth: number;
  viewportHeight: number;
}) {
  const [visibleCallouts, setVisibleCallouts] = useState<TechnicalCallout[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const callouts = useMemo(() => SEGMENT_CALLOUTS[currentSegment.id] || [], [currentSegment.id]);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCallouts([]);
      return;
    }

    const visible = callouts.filter(
      (c) => globalProgress >= c.scaleRange[0] && globalProgress <= c.scaleRange[1]
    );

    // Stagger appearance
    const timers = visible.map((c, i) => {
      const delay = i * 150;
      return setTimeout(() => {
        setVisibleCallouts((prev) => [...prev.filter((vc) => vc.id !== c.id), c]);
      }, delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [currentSegment.id, globalProgress, reducedMotion, callouts]);

  if (reducedMotion || visibleCallouts.length === 0) return null;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {visibleCallouts.map((callout) => {
        const style = TYPE_STYLES[callout.type];
        const x = callout.position.x * viewportWidth;
        const y = callout.position.y * viewportHeight;
        const isHovered = hoveredId === callout.id;

        return (
          <div
            key={callout.id}
            className="absolute pointer-events-auto"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
              opacity: isHovered ? 1 : 0.7,
              zIndex: isHovered ? 10 : 5,
            }}
            onMouseEnter={() => setHoveredId(callout.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Connector line to center */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                width: "1px",
                height: isHovered ? "120px" : "60px",
                background: `linear-gradient(180deg, ${style.border}, transparent)`,
                transform: "translate(-50%, -100%) rotate(0deg)",
                transformOrigin: "bottom center",
              }}
            />

            {/* Callout marker */}
            <div
              className="relative flex items-center gap-2"
              style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: "6px",
                padding: "8px 12px",
                backdropFilter: "blur(8px)",
                minWidth: "160px",
                maxWidth: "220px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset",
              }}
            >
              <span
                className="font-mono text-xs text-primary"
                style={{ color: style.color }}
              >
                {style.icon}
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-xs tracking-wider uppercase" style={{ color: style.color }}>
                  {callout.label}
                </span>
                <span className="font-sans text-[10px] text-muted-foreground/80">
                  {callout.detail}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}