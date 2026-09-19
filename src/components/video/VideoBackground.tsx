"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { VIDEO_SEGMENTS, VideoSegment, getChapterTime } from "@/lib/video-sequence";

interface VideoBackgroundProps {
  scrollHeight: number;
  viewportHeight: number;
  globalProgress: number;
  currentSegment: VideoSegment;
  currentIndex: number;
  localProgress: number;
  reducedMotion?: boolean;
  velocity?: number;
}

export function VideoBackground({
  scrollHeight,
  viewportHeight,
  globalProgress,
  currentSegment,
  currentIndex,
  localProgress,
  reducedMotion = false,
  velocity = 0,
}: VideoBackgroundProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const pendingVideoRef = useRef<HTMLVideoElement | null>(null);
  const isInitializedRef = useRef(false);
  const lastGlobalProgressRef = useRef(globalProgress);
  const lastSegmentIndexRef = useRef(currentIndex);

  const [isLoaded, setIsLoaded] = useState(false);
  const [readySegments, setReadySegments] = useState<Set<string>>(new Set());

  const getVideoElement = useCallback((segment: VideoSegment): HTMLVideoElement => {
    // All segments share one source file, so a single element is reused
    // and seeking stays seamless across segment boundaries.
    let video = videoRefs.current.get(segment.src);
    if (!video) {
      video = document.createElement("video");
      video.src = segment.src;
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.loop = false;
      video.crossOrigin = "anonymous";
      video.style.display = "none";
      video.playsInline = true;
      videoRefs.current.set(segment.src, video);

      video.onloadeddata = () => {
        setReadySegments((prev) => new Set(prev).add(segment.src));
        if (!isLoaded && segment.src === VIDEO_SEGMENTS[0].src) {
          setIsLoaded(true);
        }
      };

      video.onerror = () => {
        console.warn(`Failed to load video: ${segment.src}`);
      };
    }
    return video;
  }, []);

  const ensureVideoReady = useCallback((segment: VideoSegment) => {
    const video = getVideoElement(segment);
    if (video.readyState >= 2) return video;
    video.load();
    return video;
  }, [getVideoElement]);

  const switchVideo = useCallback((segment: VideoSegment, immediate = false) => {
    const video = ensureVideoReady(segment);

    if (activeVideoRef.current && activeVideoRef.current !== video) {
      if (immediate) {
        activeVideoRef.current.pause();
        activeVideoRef.current.currentTime = 0;
        activeVideoRef.current.style.display = "none";
      } else {
        pendingVideoRef.current = activeVideoRef.current;
      }
    }

    activeVideoRef.current = video;
    video.style.display = "block";

    if (immediate || video.readyState >= 3) {
      video.currentTime = getChapterTime(segment, localProgress);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked - will retry on interaction
        });
      }
    } else {
      video.oncanplay = () => {
        video.currentTime = getChapterTime(segment, localProgress);
        video.play().catch(() => {});
        video.oncanplay = null;
      };
    }

    lastSegmentIndexRef.current = VIDEO_SEGMENTS.findIndex((s) => s.id === segment.id);
  }, [ensureVideoReady, localProgress]);

  const updateVideoTime = useCallback((segment: VideoSegment, progress: number, isSeeking = false) => {
    const video = videoRefs.current.get(segment.src);
    if (!video || video !== activeVideoRef.current) return;

    const targetTime = getChapterTime(segment, progress);
    const diff = Math.abs(video.currentTime - targetTime);

    if (isSeeking || diff > 0.1 || (velocity > 50 && diff > 0.05)) {
      video.currentTime = targetTime;
    }

    if (video.paused && !reducedMotion) {
      video.play().catch(() => {});
    }
  }, [velocity, reducedMotion]);

  const renderFrame = useCallback(() => {
    const video = activeVideoRef.current;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (video && canvas && ctx && !video.paused && !video.ended && video.readyState >= 2) {
      const { videoWidth, videoHeight } = video;
      if (videoWidth && videoHeight) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        ctx.scale(dpr, dpr);

        const scale = Math.max(canvas.width / dpr / videoWidth, canvas.height / dpr / videoHeight);
        const drawWidth = videoWidth * scale;
        const drawHeight = videoHeight * scale;
        const x = (canvas.width / dpr - drawWidth) / 2;
        const y = (canvas.height / dpr - drawHeight) / 2;

        ctx.drawImage(video, x, y, drawWidth, drawHeight);
      }
    }

    if (pendingVideoRef.current) {
      pendingVideoRef.current.style.display = "none";
      pendingVideoRef.current = null;
    }

    rafRef.current = requestAnimationFrame(renderFrame);
  }, []);

  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.zIndex = "-1";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvasRef.current = canvas;
    ctxRef.current = canvas.getContext("2d", { willReadFrequently: false, alpha: false });
    container.appendChild(canvas);

    VIDEO_SEGMENTS.forEach((seg) => getVideoElement(seg));
    isInitializedRef.current = true;

    rafRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      videoRefs.current.forEach((v) => {
        v.pause();
        v.src = "";
        v.load();
        v.removeEventListener("canplay", () => {});
      });
      videoRefs.current.clear();
      canvas.remove();
    };
  }, [getVideoElement, renderFrame]);

  useEffect(() => {
    if (reducedMotion) {
      if (activeVideoRef.current) {
        activeVideoRef.current.pause();
      }
      return;
    }

    if (!activeVideoRef.current) {
      // First activation: no segment change has fired yet (e.g. the page
      // loaded inside the first segment), so start the video immediately.
      switchVideo(currentSegment, true);
    } else if (currentIndex !== lastSegmentIndexRef.current) {
      switchVideo(currentSegment, false);
    } else if (activeVideoRef.current === videoRefs.current.get(currentSegment.src)) {
      const progressDiff = Math.abs(globalProgress - lastGlobalProgressRef.current);
      const isSeeking = progressDiff > 0.02 || velocity > 100;
      updateVideoTime(currentSegment, localProgress, isSeeking);
    }

    lastGlobalProgressRef.current = globalProgress;
  }, [globalProgress, currentIndex, currentSegment, localProgress, velocity, reducedMotion, switchVideo, updateVideoTime]);

  const overlayStyle = useMemo(() => ({
    background: `linear-gradient(180deg, rgba(3,3,3,0.7) 0%, rgba(3,3,3,0.3) 40%, rgba(3,3,3,0.5) 60%, rgba(3,3,3,0.8) 100%)`,
  }), []);

  return (
    <div
      ref={videoContainerRef}
      className="video-container"
      aria-hidden="true"
      role="presentation"
    >
      <div className="absolute inset-0 pointer-events-none" style={overlayStyle} aria-hidden="true" />
      {reducedMotion && (
        <div className="absolute inset-0 bg-black/95 pointer-events-none" aria-hidden="true" />
      )}
      {!isLoaded && !reducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10 pointer-events-none" aria-hidden="true">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              LOADING VISUALIZATION
            </p>
          </div>
        </div>
      )}
    </div>
  );
}