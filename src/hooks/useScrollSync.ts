"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { VIDEO_SEGMENTS, VideoSegment, getSegmentAtProgress, getScrollProgress, TOTAL_DURATION } from "@/lib/video-sequence";

interface ScrollSyncState {
  scrollY: number;
  viewportHeight: number;
  scrollHeight: number;
  globalProgress: number;
  currentSegment: VideoSegment;
  currentIndex: number;
  localProgress: number;
  direction: "up" | "down" | "none";
  velocity: number;
}

interface UseScrollSyncOptions {
  onSegmentChange?: (segment: VideoSegment, index: number, localProgress: number, direction: "up" | "down") => void;
  onProgressChange?: (progress: number, velocity: number) => void;
  reducedMotion?: boolean;
}

export function useScrollSync(options: UseScrollSyncOptions = {}) {
  const { onSegmentChange, onProgressChange, reducedMotion = false } = options;

  const [state, setState] = useState<ScrollSyncState>({
    scrollY: 0,
    viewportHeight: typeof window !== "undefined" ? window.innerHeight : 1080,
    scrollHeight: typeof document !== "undefined" ? document.documentElement.scrollHeight : 16200,
    globalProgress: 0,
    currentSegment: VIDEO_SEGMENTS[0],
    currentIndex: 0,
    localProgress: 0,
    direction: "none",
    velocity: 0,
  });

  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  const updateState = useCallback((scrollY: number) => {
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    const velocity = dt > 0 ? (scrollY - lastScrollYRef.current) / dt : 0;
    const direction = velocity > 0.5 ? "down" : velocity < -0.5 ? "up" : ("none" as const);

    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const globalProgress = getScrollProgress(scrollY, scrollHeight, viewportHeight);

    const { segment, localProgress, index } = getSegmentAtProgress(globalProgress);

    setState((prev) => {
      const newState: ScrollSyncState = {
        scrollY,
        viewportHeight,
        scrollHeight,
        globalProgress,
        currentSegment: segment,
        currentIndex: index,
        localProgress,
        direction,
        velocity: Math.abs(velocity),
      };

      if (prev.currentIndex !== index && direction !== "none") {
        onSegmentChange?.(segment, index, localProgress, direction);
      }
      onProgressChange?.(globalProgress, Math.abs(velocity));

      return newState;
    });

    lastScrollYRef.current = scrollY;
    lastTimeRef.current = now;
  }, [onSegmentChange, onProgressChange]);

  const handleScroll = useCallback(() => {
    if (reducedMotion) return;
    const scrollY = window.scrollY;
    if (Math.abs(scrollY - lastScrollYRef.current) < 0.5) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateState(scrollY));
  }, [reducedMotion, updateState]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      updateState(window.scrollY);
      isInitializedRef.current = true;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => updateState(window.scrollY), { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, updateState, reducedMotion]);

  const scrollToSegment = useCallback((segmentIndex: number) => {
    const segment = VIDEO_SEGMENTS[segmentIndex];
    const targetProgress = (segmentIndex + 0.5) / VIDEO_SEGMENTS.length;
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const targetY = targetProgress * (scrollHeight - viewportHeight);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  const scrollToProgress = useCallback((progress: number) => {
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const targetY = Math.max(0, Math.min(1, progress)) * (scrollHeight - viewportHeight);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  return {
    ...state,
    segments: VIDEO_SEGMENTS,
    totalDuration: TOTAL_DURATION,
    scrollToSegment,
    scrollToProgress,
  };
}

export function useSectionVisibility(sectionId: string, threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20), rootMargin: "0px" }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [sectionId, threshold]);

  return { ref: elementRef, isVisible, intersectionRatio };
}