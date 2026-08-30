import { useEffect, useRef } from 'react';
import { isTouch, skipHeavyEffects } from '../../lib/device';

type Props = {
  density?: number;
  className?: string;
  mouse?: boolean;
};

const LINK_DIST = 85;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const MAX_PARTICLES = 120;
const MOUSE_RADIUS_SQ = 14000;

// Connection lines are bucketed by opacity so the whole field draws in a few
// stroke() calls instead of one per line. Canvas state changes are the
// bottleneck here, not the geometry.
const TIERS = 3;

// Half the 8-neighbourhood: right, bottom-left, bottom, bottom-right. Walking
// cells in row order and only looking at these four visits every pair once.
const NEIGHBOURS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };

export default function ParticleField({ density = 90, className = '', mouse = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (skipHeavyEffects) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const useMouse = mouse && !isTouch;
    const mousePos = { x: -9999, y: -9999, active: false };

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf: number | null = null;
    let onScreen = true;
    let visible = !document.hidden;

    // Spatial hash — only particles in neighbouring cells can be within
    // LINK_DIST, which turns the O(n²) pair scan into roughly O(n).
    let cols = 0;
    let rows = 0;
    let cells: Particle[][] = [];

    const tierPoints: number[][] = Array.from({ length: TIERS }, () => []);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      width = rect.width;
      height = rect.height;

      // Cap DPR at 1.5: a 2x/3x backing store on a phone quadruples fill cost
      // for a field of blurred dots nobody can resolve at that density anyway.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        MAX_PARTICLES,
        Math.floor((width * height) / 22000) + density,
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.3 + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
      }));

      cols = Math.max(1, Math.ceil(width / LINK_DIST));
      rows = Math.max(1, Math.ceil(height / LINK_DIST));
      cells = Array.from({ length: cols * rows }, () => []);
    };

    const link = (a: Particle, b: Particle) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      if (d2 >= LINK_DIST_SQ) return;
      const t = Math.min(TIERS - 1, ((1 - d2 / LINK_DIST_SQ) * TIERS) | 0);
      tierPoints[t].push(a.x, a.y, b.x, b.y);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < cells.length; i++) cells[i].length = 0;
      for (let t = 0; t < TIERS; t++) tierPoints[t].length = 0;

      const { x: mx, y: my, active: mactive } = mousePos;

      ctx.fillStyle = 'rgba(170, 200, 255, 0.55)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        if (mactive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_RADIUS_SQ) {
            const f = (MOUSE_RADIUS_SQ - d2) / MOUSE_RADIUS_SQ;
            const inv = f * 0.6 / Math.sqrt(d2 + 0.001);
            p.x += dx * inv;
            p.y += dy * inv;
          }
        }

        const cx = Math.min(cols - 1, Math.max(0, (p.x / LINK_DIST) | 0));
        const cy = Math.min(rows - 1, Math.max(0, (p.y / LINK_DIST) | 0));
        cells[cy * cols + cx].push(p);
      }

      // Dots: one path, one fill. Per-particle alpha is dropped in favour of a
      // single fillStyle — the variance is invisible at this size and saves a
      // state change per dot.
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fill();

      // Each cell pairs with itself and four neighbours, which covers every
      // pair exactly once without a visited set.
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cell = cells[cy * cols + cx];
          if (cell.length === 0) continue;

          for (let i = 0; i < cell.length; i++) {
            for (let j = i + 1; j < cell.length; j++) link(cell[i], cell[j]);
          }

          for (let n = 0; n < NEIGHBOURS.length; n++) {
            const nx = cx + NEIGHBOURS[n][0];
            const ny = cy + NEIGHBOURS[n][1];
            if (nx < 0 || nx >= cols || ny >= rows) continue;
            const other = cells[ny * cols + nx];
            for (let i = 0; i < cell.length; i++) {
              for (let j = 0; j < other.length; j++) link(cell[i], other[j]);
            }
          }
        }
      }

      ctx.lineWidth = 0.6;
      for (let t = 0; t < TIERS; t++) {
        const pts = tierPoints[t];
        if (pts.length === 0) continue;
        ctx.strokeStyle = `rgba(110, 163, 255, ${(((t + 1) / TIERS) * 0.18).toFixed(3)})`;
        ctx.beginPath();
        for (let i = 0; i < pts.length; i += 4) {
          ctx.moveTo(pts[i], pts[i + 1]);
          ctx.lineTo(pts[i + 2], pts[i + 3]);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(render);
    };

    const start = () => {
      if (raf === null && onScreen && visible) raf = requestAnimationFrame(render);
    };
    const stop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    resize();

    // The field keeps burning CPU while the hero is scrolled past unless we
    // explicitly stop it.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    window.addEventListener('resize', onResize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
      mousePos.active = true;
    };
    const onLeave = () => {
      mousePos.active = false;
    };
    if (useMouse) {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
    }

    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      if (useMouse) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [density, mouse]);

  // On phones and reduced-motion the canvas is replaced by a static dot grid,
  // which reads almost identically but costs nothing to composite.
  if (skipHeavyEffects) {
    return (
      <div
        aria-hidden
        className={`absolute inset-0 w-full h-full pointer-events-none dot-grid opacity-40 ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
