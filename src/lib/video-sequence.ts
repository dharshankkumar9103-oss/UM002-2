export interface VideoSegment {
  id: string;
  src: string;
  poster: string;
  duration: number;
  startScale: number;
  endScale: number;
  label: string;
  scaleLabel: string;
}

export const VIDEO_SEGMENTS: VideoSegment[] = [
  {
    id: "atomic-scale",
    src: "/atomic-scale.mp4",
    poster: "/posters/atomic-scale.jpg",
    duration: 5,
    startScale: 1e-9,
    endScale: 1e-8,
    label: "ATOMIC SCALE",
    scaleLabel: "10⁻⁹ m",
  },
  {
    id: "transistor",
    src: "/atomic-scale.mp4",
    poster: "/posters/transistor.jpg",
    duration: 5,
    startScale: 1e-8,
    endScale: 1e-7,
    label: "TRANSISTOR",
    scaleLabel: "10⁻⁸ m",
  },
  {
    id: "transistor-group",
    src: "/atomic-scale.mp4",
    poster: "/posters/transistor-group.jpg",
    duration: 5,
    startScale: 1e-7,
    endScale: 1e-6,
    label: "TRANSISTOR GROUP",
    scaleLabel: "10⁻⁷ m",
  },
  {
    id: "logic-cell",
    src: "/atomic-scale.mp4",
    poster: "/posters/logic-cell.jpg",
    duration: 5,
    startScale: 1e-6,
    endScale: 1e-5,
    label: "LOGIC CELL",
    scaleLabel: "10⁻⁶ m",
  },
  {
    id: "cell-array",
    src: "/atomic-scale.mp4",
    poster: "/posters/cell-array.jpg",
    duration: 5,
    startScale: 1e-5,
    endScale: 1e-4,
    label: "CELL ARRAY",
    scaleLabel: "10⁻⁵ m",
  },
  {
    id: "functional-blocks",
    src: "/atomic-scale.mp4",
    poster: "/posters/functional-blocks.jpg",
    duration: 5,
    startScale: 1e-4,
    endScale: 1e-3,
    label: "FUNCTIONAL BLOCKS",
    scaleLabel: "10⁻⁴ m",
  },
  {
    id: "complete-die",
    src: "/atomic-scale.mp4",
    poster: "/posters/complete-die.jpg",
    duration: 5,
    startScale: 1e-3,
    endScale: 1e-2,
    label: "COMPLETE DIE",
    scaleLabel: "10⁻³ m",
  },
  {
    id: "macro-chip",
    src: "/atomic-scale.mp4",
    poster: "/posters/macro-chip.jpg",
    duration: 5,
    startScale: 1e-2,
    endScale: 1e-1,
    label: "MACRO CHIP",
    scaleLabel: "10⁻² m",
  },
];

export const TOTAL_DURATION = VIDEO_SEGMENTS.reduce((sum, seg) => sum + seg.duration, 0);

export function getSegmentAtProgress(progress: number): { segment: VideoSegment; localProgress: number; index: number } {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  let accumulated = 0;

  for (let i = 0; i < VIDEO_SEGMENTS.length; i++) {
    const segment = VIDEO_SEGMENTS[i];
    const segmentProgress = segment.duration / TOTAL_DURATION;
    const segmentStart = accumulated;
    const segmentEnd = accumulated + segmentProgress;

    if (clampedProgress >= segmentStart && clampedProgress <= segmentEnd) {
      const localProgress = (clampedProgress - segmentStart) / segmentProgress;
      return { segment, localProgress: Math.max(0, Math.min(1, localProgress)), index: i };
    }
    accumulated = segmentEnd;
  }

  const lastSegment = VIDEO_SEGMENTS[VIDEO_SEGMENTS.length - 1];
  return { segment: lastSegment, localProgress: 1, index: VIDEO_SEGMENTS.length - 1 };
}

export function getScrollProgress(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  const maxScroll = scrollHeight - viewportHeight;
  if (maxScroll <= 0) return 0;
  return Math.max(0, Math.min(1, scrollY / maxScroll));
}

export function preloadVideo(src: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = src;
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => resolve(video);
    video.onerror = () => reject(new Error(`Failed to load video: ${src}`));

    video.load();
  });
}

export function preloadAllVideos(): Promise<HTMLVideoElement[]> {
  return Promise.all(VIDEO_SEGMENTS.map((seg) => preloadVideo(seg.src)));
}