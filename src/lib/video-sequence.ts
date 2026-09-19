export interface VideoSegment {
  id: string;
  src: string;
  poster: string;
  /** Length of this segment's scroll window, in seconds of scroll-mapped time. */
  duration: number;
  /** Start/end offsets (seconds) into the shared video file for this segment's chapter. */
  clipStart: number;
  clipEnd: number;
  startScale: number;
  endScale: number;
  label: string;
  scaleLabel: string;
}

/**
 * The scroll journey is a single continuous video (`/scale-journey.mp4`,
 * ~10.05s, 1080p30). Each of the 8 scale segments maps to an equal chapter
 * window inside it. Scrolling seeks the video within the active chapter, so
 * forward and reverse scrubbing are seamless with no clip boundaries.
 */
const CLIP_SRC = "/scale-journey.mp4";
const CLIP_DURATION = 10.054; // seconds (measured with ffprobe)

interface SegmentDef {
  id: string;
  label: string;
  scaleLabel: string;
  startScale: number;
  endScale: number;
}

const SEGMENT_DEFS: SegmentDef[] = [
  { id: "atomic-scale",     label: "ATOMIC SCALE",     scaleLabel: "10⁻⁹ m", startScale: 1e-9, endScale: 1e-8 },
  { id: "transistor",       label: "TRANSISTOR",       scaleLabel: "10⁻⁸ m", startScale: 1e-8, endScale: 1e-7 },
  { id: "transistor-group", label: "TRANSISTOR GROUP", scaleLabel: "10⁻⁷ m", startScale: 1e-7, endScale: 1e-6 },
  { id: "logic-cell",       label: "LOGIC CELL",       scaleLabel: "10⁻⁶ m", startScale: 1e-6, endScale: 1e-5 },
  { id: "cell-array",       label: "CELL ARRAY",       scaleLabel: "10⁻⁵ m", startScale: 1e-5, endScale: 1e-4 },
  { id: "functional-blocks",label: "FUNCTIONAL BLOCKS",scaleLabel: "10⁻⁴ m", startScale: 1e-4, endScale: 1e-3 },
  { id: "complete-die",     label: "COMPLETE DIE",     scaleLabel: "10⁻³ m", startScale: 1e-3, endScale: 1e-2 },
  { id: "macro-chip",       label: "MACRO CHIP",       scaleLabel: "10⁻² m", startScale: 1e-2, endScale: 1e-1 },
];

const CHAPTER = CLIP_DURATION / SEGMENT_DEFS.length;

export const VIDEO_SEGMENTS: VideoSegment[] = SEGMENT_DEFS.map((def, i) => ({
  ...def,
  src: CLIP_SRC,
  poster: `/posters/${def.id}.jpg`,
  duration: CHAPTER,
  clipStart: CHAPTER * i,
  clipEnd: CHAPTER * (i + 1),
}));

export const TOTAL_DURATION = VIDEO_SEGMENTS.reduce((sum, seg) => sum + seg.duration, 0);

/** Map a segment-local progress (0..1) to an absolute time in the video file. */
export function getChapterTime(segment: VideoSegment, progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  return segment.clipStart + p * (segment.clipEnd - segment.clipStart);
}

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
