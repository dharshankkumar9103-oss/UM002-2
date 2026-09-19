"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface CoordinateGridOverlayProps {
  currentSegment: { id: string; label: string; scaleLabel: string };
  localProgress: number;
  globalProgress: number;
  reducedMotion: boolean;
  viewportWidth: number;
  viewportHeight: number;
}

const SEGMENT_GRID_CONFIG: Record<string, {
  majorSpacing: number;
  minorDivisions: number;
  labelInterval: number;
  units: string;
  showLabels: boolean;
  color: string;
  opacity: number;
}> = {
  "atomic-scale": { majorSpacing: 50, minorDivisions: 5, labelInterval: 5, units: "nm", showLabels: true, color: "rgba(100,180,255,0.08)", opacity: 0.6 },
  "transistor": { majorSpacing: 60, minorDivisions: 4, labelInterval: 4, units: "nm", showLabels: true, color: "rgba(120,200,255,0.1)", opacity: 0.5 },
  "transistor-group": { majorSpacing: 80, minorDivisions: 4, labelInterval: 3, units: "nm", showLabels: true, color: "rgba(140,210,255,0.08)", opacity: 0.4 },
  "logic-cell": { majorSpacing: 100, minorDivisions: 5, labelInterval: 2, units: "μm", showLabels: true, color: "rgba(160,220,255,0.08)", opacity: 0.35 },
  "cell-array": { majorSpacing: 120, minorDivisions: 4, labelInterval: 2, units: "μm", showLabels: true, color: "rgba(180,230,255,0.06)", opacity: 0.3 },
  "functional-blocks": { majorSpacing: 150, minorDivisions: 3, labelInterval: 2, units: "μm", showLabels: true, color: "rgba(200,240,255,0.05)", opacity: 0.25 },
  "complete-die": { majorSpacing: 200, minorDivisions: 4, labelInterval: 3, units: "mm", showLabels: true, color: "rgba(220,245,255,0.04)", opacity: 0.2 },
  "macro-chip": { majorSpacing: 250, minorDivisions: 5, labelInterval: 4, units: "mm", showLabels: true, color: "rgba(240,250,255,0.03)", opacity: 0.15 },
};

const SCALE_VALUES: Record<string, number> = {
  "atomic-scale": 1e-9,
  "transistor": 1e-8,
  "transistor-group": 1e-7,
  "logic-cell": 1e-6,
  "cell-array": 1e-5,
  "functional-blocks": 1e-4,
  "complete-die": 1e-3,
  "macro-chip": 1e-2,
};

function formatCoordinate(value: number, units: string): string {
  if (units === "nm") {
    if (value >= 1000) return `${(value / 1000).toFixed(1)} μm`;
    return `${value.toFixed(0)} nm`;
  }
  if (units === "μm") {
    if (value >= 1000) return `${(value / 1000).toFixed(2)} mm`;
    return `${value.toFixed(1)} μm`;
  }
  if (units === "mm") {
    return `${value.toFixed(2)} mm`;
  }
  return `${value.toFixed(2)} ${units}`;
}

export function CoordinateGridOverlay({
  currentSegment,
  localProgress,
  globalProgress,
  reducedMotion,
  viewportWidth,
  viewportHeight,
}: CoordinateGridOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef(performance.now());
  const [isReady, setIsReady] = useState(false);

  const config = useMemo(() => SEGMENT_GRID_CONFIG[currentSegment.id] || SEGMENT_GRID_CONFIG["atomic-scale"], [currentSegment.id]);
  const scaleValue = useMemo(() => SCALE_VALUES[currentSegment.id] || 1e-9, [currentSegment.id]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    setIsReady(true);
    startTimeRef.current = performance.now();

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const time = (performance.now() - startTimeRef.current) * 0.001;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const baseOpacity = config.opacity * (0.5 + localProgress * 0.5);
      const pulseOpacity = baseOpacity * (0.8 + 0.2 * Math.sin(time * 0.5));

      // Major grid lines
      ctx.strokeStyle = config.color;
      ctx.lineWidth = 0.5;
      ctx.lineCap = "round";

      // Vertical major lines
      for (let x = 0; x <= w; x += config.majorSpacing) {
        const alpha = pulseOpacity * (0.7 + 0.3 * Math.sin(time * 0.3 + x * 0.01));
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal major lines
      for (let y = 0; y <= h; y += config.majorSpacing) {
        const alpha = pulseOpacity * (0.7 + 0.3 * Math.sin(time * 0.3 + y * 0.01));
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Minor grid lines (fainter)
      ctx.lineWidth = 0.25;
      const minorSpacing = config.majorSpacing / config.minorDivisions;

      for (let x = 0; x <= w; x += minorSpacing) {
        if (x % config.majorSpacing === 0) continue;
        const alpha = pulseOpacity * 0.3 * (0.5 + 0.5 * Math.sin(time * 0.4 + x * 0.02));
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y <= h; y += minorSpacing) {
        if (y % config.majorSpacing === 0) continue;
        const alpha = pulseOpacity * 0.3 * (0.5 + 0.5 * Math.sin(time * 0.4 + y * 0.02));
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Axis lines (center)
      ctx.lineWidth = 1;
      ctx.globalAlpha = pulseOpacity * 1.5;
      ctx.strokeStyle = config.color.replace(/[\d.]+\)$/, "0.4)");

      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Coordinate labels
      if (config.showLabels) {
        ctx.globalAlpha = pulseOpacity * 0.8;
        ctx.fillStyle = config.color.replace(/[\d.]+\)$/, "0.6)");
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // X-axis labels
        const xLabels = Math.floor(w / config.majorSpacing / config.labelInterval) + 1;
        for (let i = -xLabels; i <= xLabels; i++) {
          const x = w / 2 + i * config.majorSpacing * config.labelInterval;
          if (x < 20 || x > w - 20) continue;

          const coordValue = Math.abs(i) * config.labelInterval * (config.majorSpacing / 100) * (scaleValue * 1e9); // Convert to nm base
          const label = formatCoordinate(coordValue, config.units);

          ctx.fillText(label, x, h / 2 - 16);
          ctx.fillText(label, x, h / 2 + 16);
        }

        // Y-axis labels
        const yLabels = Math.floor(h / config.majorSpacing / config.labelInterval) + 1;
        ctx.textAlign = "right";
        for (let i = -yLabels; i <= yLabels; i++) {
          const y = h / 2 + i * config.majorSpacing * config.labelInterval;
          if (y < 16 || y > h - 16) continue;

          const coordValue = Math.abs(i) * config.labelInterval * (config.majorSpacing / 100) * (scaleValue * 1e9);
          const label = formatCoordinate(coordValue, config.units);

          ctx.fillText(label, w / 2 - 16, y);
          ctx.fillText(label, w / 2 + 16 + ctx.measureText(label).width, y);
        }

        // Origin marker
        ctx.globalAlpha = pulseOpacity;
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 8, 0, Math.PI * 2);
        ctx.stroke();

        // Origin label
        ctx.globalAlpha = pulseOpacity;
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("(0,0)", w / 2 + 10, h / 2 + 10);
      }

      // Corner scale reference
      ctx.globalAlpha = pulseOpacity * 0.7;
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(`GRID: ${config.majorSpacing / 100} ${config.units} / div`, 16, h - 16);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, currentSegment.id, localProgress, globalProgress, viewportWidth, viewportHeight, config, scaleValue]);

  if (reducedMotion || !isReady) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}