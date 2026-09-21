"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Folding-city line motif: nested rotated squares fading into depth. */
function FoldLines() {
  const rings = [560, 460, 368, 284, 208, 142, 88];
  return (
    <svg
      className="absolute inset-0 m-auto h-full w-full opacity-60"
      viewBox="0 0 800 800"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="foldGlow" cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor="#9fd0ff" stopOpacity="0.10" />
          <stop offset="60%" stopColor="#9fd0ff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#9fd0ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="800" height="800" fill="url(#foldGlow)" />
      {rings.map((s, i) => (
        <g key={s} transform={`rotate(${i % 2 === 0 ? 45 : 0} 400 400)`}>
          <rect
            x={400 - s / 2}
            y={400 - s / 2}
            width={s}
            height={s}
            stroke="#9fd0ff"
            strokeOpacity={0.16 - i * 0.018}
            strokeWidth="1"
          />
        </g>
      ))}
      {/* totem point */}
      <rect
        x="396"
        y="396"
        width="8"
        height="8"
        transform="rotate(45 400 400)"
        fill="#d2a24c"
        fillOpacity="0.9"
      />
    </svg>
  );
}

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <FoldLines />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 max-w-5xl mx-auto w-full text-center">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8">
            SAN-D · Fabless Semiconductor
          </p>

          <h1
            id="hero-title"
            className="font-display font-bold tracking-tight text-foreground mb-8"
            style={{
              fontSize: "clamp(2.75rem, 9vw, 7rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            MEMORY THAT
            <br />
            <span className="text-primary">NEVER FORGETS</span>
          </h1>

          <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground leading-relaxed mb-12">
            We are building universal memory — a single pool that is both fast and
            permanent. No boot wait. No lost work. Not “RAM plus storage.” Just one
            memory number.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="#technology"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-transform hover:scale-[1.03]"
            >
              Explore the chip
            </Link>
            <Link
              href="#roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-colors hover:border-primary/60"
            >
              The path to silicon
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
          Descend
        </span>
        <span className="w-px h-12 bg-gradient-to-b from-primary/70 to-transparent" />
      </div>
    </section>
  );
}
