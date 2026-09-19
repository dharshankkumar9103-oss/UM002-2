"use client";

import { useEffect, useState, useMemo } from "react";

interface HeroProps {
  scrollY: number;
  viewportHeight: number;
  globalProgress: number;
  reducedMotion?: boolean;
  velocity?: number;
}

export function Hero({
  scrollY,
  viewportHeight,
  globalProgress,
  reducedMotion = false,
  velocity = 0,
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroProgress = Math.max(0, Math.min(1, scrollY / (viewportHeight * 0.6)));
  const titleOpacity = Math.max(0, 1 - heroProgress * 1.8);
  const titleTransform = reducedMotion ? 0 : heroProgress * -60 * (velocity > 10 ? 1.5 : 1);
  const subtitleOpacity = Math.max(0, 1 - heroProgress * 2.2);
  const indicatorOpacity = Math.max(0, 1 - heroProgress * 3);
  const scaleValue = useMemo(() => {
    const scale = 1e-9 * Math.pow(100, heroProgress);
    const exponent = Math.floor(Math.log10(scale));
    const mantissa = scale / Math.pow(10, exponent);
    return { mantissa: mantissa.toFixed(1), exponent };
  }, [heroProgress]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8 animate-fade-in animate-slide-up tech-panel`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
            aria-hidden="true"
          >
            <span
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDuration: "2s" }}
            />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              SEMICONDUCTOR TECHNOLOGY
            </span>
          </div>

          <h1
            id="hero-title"
            className="font-display font-bold tracking-tight text-foreground mb-6 animate-fade-in animate-slide-up"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              opacity: titleOpacity,
              transform: `translateY(${titleTransform}px)`,
            }}
          >
            <span className="block">ENGINEERING THE</span>
            <span className="block">FUTURE AT THE</span>
            <span className="block">SMALLEST SCALE</span>
          </h1>

          <p
            className="font-sans text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground leading-relaxed animate-fade-in animate-slide-up"
            style={{
              opacity: subtitleOpacity,
              animationDelay: "0.2s",
            }}
          >
            A next-generation semiconductor technology company advancing computing
            through atomic-scale engineering and precision manufacturing.
          </p>

          <div
            className="mt-16 flex items-center justify-center gap-8 animate-fade-in animate-slide-up"
            style={{
              opacity: indicatorOpacity,
              animationDelay: "0.4s",
            }}
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-px h-24 bg-gradient-to-b from-primary/60 to-transparent"
                style={{ opacity: indicatorOpacity }}
              />
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                SCROLL
              </span>
            </div>

            <div className="hidden lg:block relative">
              <div className="w-px h-64 bg-gradient-to-b from-primary/40 to-transparent" />
              <div className="absolute left-0 bottom-0 w-full h-px bg-primary/20" />
              <div
                className="absolute left-0 bottom-0 w-full h-1 bg-primary"
                style={{ transform: `scaleY(${1 - heroProgress})`, transformOrigin: "bottom" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-6 right-6 flex items-end justify-between px-6 pointer-events-none"
        aria-hidden="true"
      >
        <div className="section-marker active" data-scale="10⁻⁹ m">
          ATOMIC SCALE
        </div>
        <div className="hidden md:flex items-end gap-4 pb-2">
          <div className="font-mono text-xs text-muted-foreground/50">
            SCALE
          </div>
          <div className="font-display font-bold text-2xl md:text-4xl text-foreground tabular-nums">
            10<span className="text-xs">⁻⁹</span> m
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1 pb-2 text-right">
          <div className="font-mono text-xs text-muted-foreground/50">
            PROGRESS
          </div>
          <div className="font-display font-bold text-2xl md:text-4xl text-primary tabular-nums">
            {Math.round(globalProgress * 100)}%
          </div>
        </div>
      </div>
    </section>
  );
}