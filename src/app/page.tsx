"use client";

import { useEffect, useState, useCallback } from "react";
import { VIDEO_SEGMENTS } from "@/lib/video-sequence";
import { useScrollSync } from "@/hooks/useScrollSync";
import { useMousePosition } from "@/hooks/useMousePosition";
import { VideoBackground } from "@/components/video/VideoBackground";
import { WebGLOverlay } from "@/components/video/WebGLOverlay";
import { ScanLinesOverlay } from "@/components/video/ScanLinesOverlay";
import { CoordinateGridOverlay } from "@/components/video/CoordinateGridOverlay";
import { TechnicalCallouts } from "@/components/video/TechnicalCallouts";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { CompanySection } from "@/components/sections/CompanySection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showOverlays, setShowOverlays] = useState(true);
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 });

  const {
    scrollY,
    viewportHeight,
    scrollHeight,
    globalProgress,
    currentSegment,
    currentIndex,
    localProgress,
    direction,
    velocity,
    segments,
    scrollToSegment,
  } = useScrollSync({ reducedMotion });

  const mousePosition = useMousePosition();

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSegmentClick = (index: number) => {
    scrollToSegment(index);
  };

  const toggleOverlays = () => setShowOverlays((prev) => !prev);

  return (
    <div className="relative min-h-screen text-foreground">
      {!isLoaded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          role="status"
          aria-label="Loading"
        >
          <div className="text-center">
            <div className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-4">
              SAN-D
            </div>
            <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground animate-pulse">
              INITIALIZING VISUALIZATION
            </div>
            <div className="mt-8 w-48 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>
        </div>
      )}

      <VideoBackground
        scrollHeight={scrollHeight}
        viewportHeight={viewportHeight}
        globalProgress={globalProgress}
        currentSegment={currentSegment}
        currentIndex={currentIndex}
        localProgress={localProgress}
        reducedMotion={reducedMotion}
        velocity={velocity}
      />

      {showOverlays && !reducedMotion && (
        <>
          <WebGLOverlay
            currentSegment={currentSegment}
            localProgress={localProgress}
            globalProgress={globalProgress}
            reducedMotion={reducedMotion}
            velocity={velocity}
            viewportWidth={viewportSize.width}
            viewportHeight={viewportSize.height}
            mousePosition={mousePosition}
          />
          <ScanLinesOverlay
            currentSegment={currentSegment}
            localProgress={localProgress}
            globalProgress={globalProgress}
            reducedMotion={reducedMotion}
            velocity={velocity}
          />
          <CoordinateGridOverlay
            currentSegment={currentSegment}
            localProgress={localProgress}
            globalProgress={globalProgress}
            reducedMotion={reducedMotion}
            viewportWidth={viewportSize.width}
            viewportHeight={viewportSize.height}
          />
          <TechnicalCallouts
            currentSegment={currentSegment}
            localProgress={localProgress}
            globalProgress={globalProgress}
            reducedMotion={reducedMotion}
            viewportWidth={viewportSize.width}
            viewportHeight={viewportSize.height}
          />
        </>
      )}

      <Navigation activeSection={segments[currentIndex]?.id || "home"} />

      <main className="relative" style={{ minHeight: `${scrollHeight}px` }}>
        <Hero
          scrollY={scrollY}
          viewportHeight={viewportHeight}
          globalProgress={globalProgress}
          reducedMotion={reducedMotion}
          velocity={velocity}
        />

        {segments.map((segment, index) => {
          const segmentStart = index / segments.length;
          const segmentEnd = (index + 1) / segments.length;
          const isActive = globalProgress >= segmentStart && globalProgress <= segmentEnd;
          const localProgressValue = isActive
            ? (globalProgress - segmentStart) / (segmentEnd - segmentStart)
            : globalProgress > segmentEnd
            ? 1
            : 0;

          return (
            <ScrollSection
              key={segment.id}
              segment={segment}
              index={index}
              isActive={isActive}
              localProgress={localProgressValue}
              globalProgress={globalProgress}
              viewportHeight={viewportHeight}
              scrollY={scrollY}
              reducedMotion={reducedMotion}
              direction={direction}
              velocity={velocity}
            />
          );
        })}

        <TechnologySection />
        <CompanySection />
        <RoadmapSection />
        <ContactSection />
      </main>

      <div
        className="fixed bottom-6 right-6 z-40 hidden md:block"
        aria-hidden="true"
      >
        <div className="tech-panel-elevated p-4 rounded-xl min-w-[180px]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              PROGRESS
            </span>
            <button
              onClick={toggleOverlays}
              className={`px-2 py-1 text-[9px] font-mono tracking-wider uppercase rounded transition-colors ${
                showOverlays
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
              aria-label={showOverlays ? "Hide overlays" : "Show overlays"}
            >
              {showOverlays ? "ON" : "OFF"}
            </button>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${globalProgress * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-xs text-muted-foreground">
            <span>ATOMIC</span>
            <span>MACRO</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-muted-foreground/50">{segments[currentIndex]?.scaleLabel || "10⁻⁹ m"}</span>
            <span className="font-mono text-primary">{Math.round(velocity)}px/frame</span>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-6 left-6 z-40 hidden lg:flex flex-col gap-2"
        aria-label="Section navigation"
        role="navigation"
      >
        {segments.map((segment, index) => (
          <button
            key={segment.id}
            onClick={() => handleSegmentClick(index)}
            className={`w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center ${
              index === currentIndex
                ? "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "bg-background/50 border-border/50 text-muted-foreground/50 hover:border-primary/30 hover:text-foreground"
            }`}
            aria-label={`Go to ${segment.label}`}
            aria-current={index === currentIndex ? "true" : "false"}
            style={{
              transform: `scale(${index === currentIndex ? 1.1 : 1})`,
            }}
          >
            <span className="font-mono text-[9px] tracking-wider uppercase">
              {index + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}