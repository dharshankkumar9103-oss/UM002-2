"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface ScanLinesOverlayProps {
  currentSegment: { id: string; label: string; scaleLabel: string };
  localProgress: number;
  globalProgress: number;
  reducedMotion: boolean;
  velocity: number;
}

const SEGMENT_SCAN_CONFIG: Record<string, {
  lineCount: number;
  speed: number;
  thickness: number;
  color: string;
  direction: "horizontal" | "vertical" | "diagonal" | "grid";
  pattern: "solid" | "dashed" | "dotted" | "grid";
}> = {
  "atomic-scale": { lineCount: 60, speed: 0.8, thickness: 0.5, color: "rgba(100,180,255,0.15)", direction: "horizontal", pattern: "grid" },
  "transistor": { lineCount: 40, speed: 1.0, thickness: 1, color: "rgba(120,200,255,0.2)", direction: "horizontal", pattern: "dashed" },
  "transistor-group": { lineCount: 30, speed: 1.2, thickness: 1, color: "rgba(140,210,255,0.18)", direction: "vertical", pattern: "dotted" },
  "logic-cell": { lineCount: 24, speed: 1.5, thickness: 1.5, color: "rgba(160,220,255,0.2)", direction: "horizontal", pattern: "solid" },
  "cell-array": { lineCount: 20, speed: 2.0, thickness: 2, color: "rgba(180,230,255,0.22)", direction: "grid", pattern: "grid" },
  "functional-blocks": { lineCount: 16, speed: 2.5, thickness: 2, color: "rgba(200,240,255,0.2)", direction: "horizontal", pattern: "dashed" },
  "complete-die": { lineCount: 12, speed: 3.0, thickness: 3, color: "rgba(220,245,255,0.25)", direction: "diagonal", pattern: "solid" },
  "macro-chip": { lineCount: 8, speed: 4.0, thickness: 4, color: "rgba(240,250,255,0.3)", direction: "horizontal", pattern: "solid" },
};

export function ScanLinesOverlay({
  currentSegment,
  localProgress,
  globalProgress,
  reducedMotion,
  velocity,
}: ScanLinesOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef(performance.now());
  const [isReady, setIsReady] = useState(false);

  const config = useMemo(() => SEGMENT_SCAN_CONFIG[currentSegment.id] || SEGMENT_SCAN_CONFIG["atomic-scale"], [currentSegment.id]);

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

      const baseAlpha = 0.3 + Math.min(velocity * 0.001, 0.4);
      const progressAlpha = 0.5 + localProgress * 0.5;

      ctx.strokeStyle = config.color;
      ctx.lineWidth = config.thickness;
      ctx.lineCap = "round";

      const spacing = h / config.lineCount;
      const offset = (time * config.speed * 100) % spacing;

      if (config.pattern === "grid" || config.direction === "horizontal") {
        // Horizontal scan lines
        for (let i = -1; i <= config.lineCount; i++) {
          const y = i * spacing + offset;
          if (y < -spacing || y > h + spacing) continue;

          const alpha = baseAlpha * progressAlpha * (0.5 + 0.5 * Math.sin(time * 2 + i * 0.3));
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

          if (config.pattern === "dashed") {
            ctx.setLineDash([20, 40]);
            ctx.lineDashOffset = time * 50;
          } else if (config.pattern === "dotted") {
            ctx.setLineDash([4, 12]);
            ctx.lineDashOffset = time * 30;
          } else {
            ctx.setLineDash([]);
          }

          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      if (config.pattern === "grid" || config.direction === "vertical") {
        // Vertical scan lines
        const vSpacing = w / (config.lineCount * 0.6);
        const vOffset = (time * config.speed * 80) % vSpacing;

        for (let i = -1; i <= config.lineCount * 0.6; i++) {
          const x = i * vSpacing + vOffset;
          if (x < -vSpacing || x > w + vSpacing) continue;

          const alpha = baseAlpha * progressAlpha * 0.6 * (0.5 + 0.5 * Math.sin(time * 1.5 + i * 0.5));
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

          if (config.pattern === "dashed") {
            ctx.setLineDash([15, 30]);
            ctx.lineDashOffset = time * 40;
          } else if (config.pattern === "dotted") {
            ctx.setLineDash([3, 10]);
            ctx.lineDashOffset = time * 25;
          } else {
            ctx.setLineDash([]);
          }

          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
      }

      if (config.direction === "diagonal") {
        // Diagonal scan lines
        const dSpacing = Math.max(w, h) / config.lineCount;
        const dOffset = (time * config.speed * 120) % dSpacing;

        for (let i = -config.lineCount; i <= config.lineCount * 2; i++) {
          const start = i * dSpacing + dOffset;
          const alpha = baseAlpha * progressAlpha * 0.7 * (0.5 + 0.5 * Math.sin(time * 1 + i * 0.4));
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

          ctx.setLineDash(config.pattern === "dashed" ? [30, 60] : []);
          if (config.pattern === "dashed") ctx.lineDashOffset = time * 60;

          ctx.beginPath();
          ctx.moveTo(start, 0);
          ctx.lineTo(start - h, h);
          ctx.stroke();
        }
      }

      // Progress indicator line
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.95);
      ctx.lineTo(w * 0.1 + w * 0.8 * globalProgress, h * 0.95);
      ctx.stroke();

      // Scale marker
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.textAlign = "left";
      ctx.fillText(currentSegment.scaleLabel, w * 0.1, h * 0.93);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, currentSegment.id, localProgress, globalProgress, velocity, config]);

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