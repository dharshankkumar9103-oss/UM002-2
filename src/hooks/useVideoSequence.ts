"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { VIDEO_SEGMENTS, VideoSegment, getSegmentAtProgress, getScrollProgress, TOTAL_DURATION } from "@/lib/video-sequence";

interface UseVideoSequenceOptions {
  scrollHeight: number;
  viewportHeight: number;
  onSegmentChange?: (segment: VideoSegment, index: number, localProgress: number) => void;
  onProgressChange?: (progress: number) => void;
}

export function useVideoSequence({
  scrollHeight,
  viewportHeight,
  onSegmentChange,
  onProgressChange,
}: UseVideoSequenceOptions) {
  const [currentSegment, setCurrentSegment] = useState<VideoSegment>(VIDEO_SEGMENTS[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const isInitializedRef = useRef(false);

  const getVideoElement = useCallback((segment: VideoSegment): HTMLVideoElement | null => {
    let video = videoRefs.current.get(segment.id);
    if (!video) {
      video = document.createElement("video");
      video.src = segment.src;
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.loop = false;
      video.crossOrigin = "anonymous";
      videoRefs.current.set(segment.id, video);
    }
    return video;
  }, []);

  const switchVideo = useCallback((segment: VideoSegment) => {
    const video = getVideoElement(segment);
    if (!video) return;

    if (activeVideoRef.current && activeVideoRef.current !== video) {
      activeVideoRef.current.pause();
      activeVideoRef.current.currentTime = 0;
    }

    activeVideoRef.current = video;
    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay might be blocked, will retry on user interaction
    });

    setCurrentSegment(segment);
  }, [getVideoElement]);

  const updateVideoTime = useCallback((segment: VideoSegment, progress: number) => {
    const video = videoRefs.current.get(segment.id);
    if (!video) return;

    const targetTime = segment.duration * progress;
    const diff = Math.abs(video.currentTime - targetTime);

    if (diff > 0.1) {
      video.currentTime = targetTime;
    }

    if (video.paused && isPlaying) {
      video.play().catch(() => {});
    }
  }, [isPlaying]);

  const handleScroll = useCallback((scrollY: number) => {
    const progress = getScrollProgress(scrollY, scrollHeight, viewportHeight);
    setGlobalProgress(progress);
    onProgressChange?.(progress);

    const { segment, localProgress: local, index } = getSegmentAtProgress(progress);
    setLocalProgress(local);
    setCurrentIndex(index);

    if (index !== currentIndex) {
      setCurrentSegment(segment);
      switchVideo(segment);
      onSegmentChange?.(segment, index, local);
    }

    if (activeVideoRef.current === videoRefs.current.get(segment.id)) {
      updateVideoTime(segment, local);
    }

    lastScrollYRef.current = scrollY;
  }, [scrollHeight, viewportHeight, currentIndex, switchVideo, updateVideoTime, onSegmentChange, onProgressChange]);

  const tick = useCallback(() => {
    if (activeVideoRef.current && !activeVideoRef.current.paused) {
      const segment = currentSegment;
      const video = activeVideoRef.current;
      const videoProgress = video.currentTime / segment.duration;

      if (videoProgress >= 1) {
        video.pause();
        video.currentTime = 0;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [currentSegment]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      VIDEO_SEGMENTS.forEach((seg) => getVideoElement(seg));
      isInitializedRef.current = true;
    }
  }, [getVideoElement]);

  const play = useCallback(() => {
    setIsPlaying(true);
    activeVideoRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    activeVideoRef.current?.pause();
  }, []);

  const seekToProgress = useCallback((progress: number) => {
    const { segment, localProgress: local } = getSegmentAtProgress(progress);
    switchVideo(segment);
    updateVideoTime(segment, local);
    handleScroll(progress * (scrollHeight - viewportHeight));
  }, [scrollHeight, viewportHeight, switchVideo, updateVideoTime, handleScroll]);

  return {
    currentSegment,
    currentIndex,
    localProgress,
    globalProgress,
    isPlaying,
    videoRef: activeVideoRef,
    play,
    pause,
    seekToProgress,
    handleScroll,
    totalDuration: TOTAL_DURATION,
    segments: VIDEO_SEGMENTS,
  };
}