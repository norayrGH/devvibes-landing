import { useEffect, useRef } from 'react';

type Props = {
  density?: number;
  className?: string;
  mouse?: boolean;
};

export default function ParticleField({ density = 90, className = '', mouse = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -9999, y: -9999, active: false });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 14000) + density;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.3 + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
      mousePos.current.active = true;
    };
    const handleLeave = () => {
      mousePos.current.active = false;
    };
    if (mouse) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseleave', handleLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const mactive = mousePos.current.active;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse repel/attract
        if (mactive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const f = (14000 - d2) / 14000;
            p.x += (dx / Math.sqrt(d2 + 0.001)) * f * 0.6;
            p.y += (dy / Math.sqrt(d2 + 0.001)) * f * 0.6;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170, 200, 255, ${p.alpha})`;
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 7200) {
            const alpha = (1 - d2 / 7200) * 0.18;
            ctx.strokeStyle = `rgba(110, 163, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      if (mouse) {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, [density, mouse]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
