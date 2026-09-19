"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface WebGLOverlayProps {
  currentSegment: { id: string; label: string; scaleLabel: string };
  localProgress: number;
  globalProgress: number;
  reducedMotion: boolean;
  velocity: number;
  viewportWidth: number;
  viewportHeight: number;
  mousePosition: { x: number; y: number };
}

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;

  uniform float uTime;
  uniform float uProgress;
  uniform float uVelocity;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScale;

  varying vec3 vColor;
  varying float vAlpha;
  varying vec2 vPos;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 pos = aPosition;
    vPos = pos;

    float time = uTime * 0.5;
    float scale = uScale;

    // Base drift based on segment progress
    float drift = uProgress * 10.0;

    // Noise-based organic movement
    float n = fbm(pos * 0.5 + vec2(time * 0.1, time * 0.05));
    float n2 = fbm(pos * 1.0 + vec2(time * 0.2, -time * 0.1));

    // Mouse influence
    vec2 mouseNorm = uMouse / uResolution;
    float mouseDist = length(pos - mouseNorm);
    float mouseInfluence = smoothstep(0.3, 0.0, mouseDist) * 0.02 * (1.0 - uVelocity * 0.01);

    // Segment-specific behavior
    float segmentBehavior = 0.0;
    if (uScale < 1e-7) {
      // Atomic/transistor scale - lattice vibration
      segmentBehavior = sin(pos.x * 50.0 + time * 5.0) * sin(pos.y * 50.0 + time * 3.0) * 0.005;
    } else if (uScale < 1e-5) {
      // Cell/array scale - grid flow
      segmentBehavior = sin(pos.x * 20.0 + time * 2.0) * 0.003;
    } else {
      // Chip scale - slow breathing
      segmentBehavior = sin(time * 0.5) * 0.002;
    }

    pos.x += (n - 0.5) * 0.01 * scale + mouseInfluence + segmentBehavior;
    pos.y += (n2 - 0.5) * 0.01 * scale - mouseInfluence * 0.5 + segmentBehavior;

    // Pulse with progress
    float pulse = sin(uProgress * 6.28 + aPhase) * 0.3 + 0.7;
    float size = aSize * pulse * (1.0 + uVelocity * 0.005);

    gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
    gl_PointSize = size * uResolution.y * 0.01;

    vColor = aColor;
    vAlpha = pulse * (1.0 - mouseDist * 2.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;
  varying vec2 vPos;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center) * 2.0;

    // Soft circular particle with glow
    float alpha = smoothstep(1.0, 0.0, dist) * vAlpha;

    // Add subtle ring for technical feel
    float ring = smoothstep(0.85, 0.95, dist) * 0.3 * vAlpha;

    vec3 color = vColor * (1.0 + ring * 2.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

interface Particle {
  x: number;
  y: number;
  size: number;
  color: readonly [number, number, number];
  phase: number;
}

function createParticles(count: number, scale: number): Particle[] {
  const particles: Particle[] = [];
  const colors: [number, number, number][] = [
    [0.6, 0.8, 1.0], // Cool blue-white
    [0.4, 0.7, 1.0], // Deeper blue
    [0.8, 0.9, 1.0], // Bright
    [0.3, 0.6, 0.9], // Muted
    [1.0, 0.95, 0.8], // Warm accent
  ];

  for (let i = 0; i < count; i++) {
    // Bias distribution based on scale
    let x, y;
    if (scale < 1e-7) {
      // Grid-like for atomic
      x = (i % 30) / 30 + (Math.random() - 0.5) * 0.02;
      y = Math.floor(i / 30) / 30 + (Math.random() - 0.5) * 0.02;
    } else if (scale < 1e-5) {
      // Rows for cells
      x = Math.random();
      y = (Math.floor(i / 20) % 20) / 20 + (Math.random() - 0.5) * 0.03;
    } else {
      // Organic for chip
      x = Math.random();
      y = Math.random();
    }

    particles.push({
      x: Math.max(0.02, Math.min(0.98, x)),
      y: Math.max(0.02, Math.min(0.98, y)),
      size: 0.5 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * 6.28,
    });
  }
  return particles;
}

export function WebGLOverlay({
  currentSegment,
  localProgress,
  globalProgress,
  reducedMotion,
  velocity,
  viewportWidth,
  viewportHeight,
  mousePosition,
}: WebGLOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const buffersRef = useRef<{
    position: WebGLBuffer | null;
    size: WebGLBuffer | null;
    color: WebGLBuffer | null;
    phase: WebGLBuffer | null;
  }>({ position: null, size: null, color: null, phase: null });
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef(performance.now());
  const particleCountRef = useRef(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const scaleValue = useMemo(() => {
    const scales: Record<string, number> = {
      "atomic-scale": 1e-9,
      "transistor": 1e-8,
      "transistor-group": 1e-7,
      "logic-cell": 1e-6,
      "cell-array": 1e-5,
      "functional-blocks": 1e-4,
      "complete-die": 1e-3,
      "macro-chip": 1e-2,
    };
    return scales[currentSegment.id] || 1e-9;
  }, [currentSegment.id]);

  const particleCount = useMemo(() => {
    if (reducedMotion) return 0;
    if (scaleValue < 1e-7) return 300;
    if (scaleValue < 1e-5) return 200;
    return 150;
  }, [scaleValue, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    glRef.current = gl;
    canvas.width = viewportWidth * Math.min(window.devicePixelRatio, 2);
    canvas.height = viewportHeight * Math.min(window.devicePixelRatio, 2);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Compile shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;

    // Create buffers
    const createBuffer = () => gl.createBuffer()!;
    buffersRef.current = {
      position: createBuffer(),
      size: createBuffer(),
      color: createBuffer(),
      phase: createBuffer(),
    };

    // Initialize particles
    const particles = createParticles(particleCount, scaleValue);
    particleCountRef.current = particles.length;

    const positions = new Float32Array(particles.length * 2);
    const sizes = new Float32Array(particles.length);
    const colors = new Float32Array(particles.length * 3);
    const phases = new Float32Array(particles.length);

    particles.forEach((p, i) => {
      positions[i * 2] = p.x;
      positions[i * 2 + 1] = p.y;
      sizes[i] = p.size;
      colors[i * 3] = p.color[0];
      colors[i * 3 + 1] = p.color[1];
      colors[i * 3 + 2] = p.color[2];
      phases[i] = p.phase;
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.position);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.size);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.color);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.phase);
    gl.bufferData(gl.ARRAY_BUFFER, phases, gl.STATIC_DRAW);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);

    setIsInitialized(true);
    startTimeRef.current = performance.now();

    const render = () => {
      if (!glRef.current || !programRef.current) return;
      const gl = glRef.current;
      const program = programRef.current;

      gl.useProgram(program);

      const time = (performance.now() - startTimeRef.current) * 0.001;

      // Uniforms
      const uTime = gl.getUniformLocation(program, "uTime");
      const uProgress = gl.getUniformLocation(program, "uProgress");
      const uVelocity = gl.getUniformLocation(program, "uVelocity");
      const uResolution = gl.getUniformLocation(program, "uResolution");
      const uMouse = gl.getUniformLocation(program, "uMouse");
      const uScale = gl.getUniformLocation(program, "uScale");

      gl.uniform1f(uTime, time);
      gl.uniform1f(uProgress, globalProgress);
      gl.uniform1f(uVelocity, Math.min(velocity, 500));
      gl.uniform2f(uResolution, viewportWidth, viewportHeight);
      gl.uniform2f(uMouse, mousePosition.x, viewportHeight - mousePosition.y);
      gl.uniform1f(uScale, Math.log10(scaleValue) + 9); // Normalize: 0 = atomic, 8 = macro

      // Attributes
      const attrs = {
        aPosition: gl.getAttribLocation(program, "aPosition"),
        aSize: gl.getAttribLocation(program, "aSize"),
        aColor: gl.getAttribLocation(program, "aColor"),
        aPhase: gl.getAttribLocation(program, "aPhase"),
      };

      Object.entries(attrs).forEach(([name, loc]) => {
        if (loc >= 0) {
          gl.enableVertexAttribArray(loc);
          gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current[name as keyof typeof buffersRef.current]!);
          gl.vertexAttribPointer(loc, name === "aPosition" || name === "aColor" ? 3 : 1, gl.FLOAT, false, 0, 0);
        }
      });

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, particleCountRef.current);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        Object.values(buffersRef.current).forEach((b) => b && gl.deleteBuffer(b));
      }
    };
  }, [reducedMotion, viewportWidth, viewportHeight, globalProgress, velocity, scaleValue, particleCount, currentSegment.id, mousePosition.x, mousePosition.y]);

  if (reducedMotion || !isInitialized) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}