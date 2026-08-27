'use client';

import { useEffect, useRef } from 'react';

export function HeroLiquid({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    
    // We need an offscreen canvas to hold the painted mask
    const brushCanvas = document.createElement('canvas');
    const brushCtx = brushCanvas.getContext('2d');
    
    const coverCtx = canvas.getContext('2d');
    if (!coverCtx || !brushCtx) return;

    const brushRadius = 143;
    const decay = 0.016;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: { x: number; y: number }[] = [];
    let lastPoint: { x: number; y: number } | null = null;
    let idle = 0;
    let rafId: number;

    let isCrossOriginError = false;
    const afterImg = new Image();
    afterImg.crossOrigin = "anonymous";
    afterImg.src = "/hero-after-cutout.png";

    function resizeCanvas() {
      if (!canvas || !container || !coverCtx || !brushCtx) return;
      const rect = container.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      brushCanvas.width = canvas.width;
      brushCanvas.height = canvas.height;
      
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    afterImg.onload = () => {
      resizeCanvas();
    };

    function loop() {
      rafId = requestAnimationFrame(loop);
      if (!canvas || !coverCtx || !brushCtx) return;

      // Decay the mask
      brushCtx.globalCompositeOperation = 'destination-out';
      brushCtx.fillStyle = `rgba(0,0,0,${decay})`;
      brushCtx.fillRect(0, 0, brushCanvas.width, brushCanvas.height);

      // Draw new brush strokes
      brushCtx.globalCompositeOperation = 'source-over';
      if (points.length > 0) {
        idle = 0;
        const current = points.shift()!;
        if (!lastPoint) lastPoint = current;

        // Draw interpolated path
        const dist = Math.hypot(current.x - lastPoint.x, current.y - lastPoint.y);
        const steps = Math.max(1, Math.floor(dist / 5));

        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const cx = lastPoint.x + (current.x - lastPoint.x) * t;
          const cy = lastPoint.y + (current.y - lastPoint.y) * t;

          const grad = brushCtx.createRadialGradient(cx, cy, 0, cx, cy, brushRadius * dpr);
          grad.addColorStop(0, 'rgba(255,255,255,1)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          brushCtx.fillStyle = grad;
          
          brushCtx.beginPath();
          brushCtx.arc(cx, cy, brushRadius * dpr, 0, Math.PI * 2);
          brushCtx.fill();
        }
        lastPoint = current;
      } else {
        idle++;
        lastPoint = null;
        if (idle > 120) {
          brushCtx.clearRect(0, 0, brushCanvas.width, brushCanvas.height);
        }
      }

      coverCtx.clearRect(0, 0, canvas.width, canvas.height);

      if (afterImg.complete && !isCrossOriginError && afterImg.naturalWidth > 0) {
        // Draw the mask
        coverCtx.globalCompositeOperation = 'source-over';
        coverCtx.drawImage(brushCanvas, 0, 0);

        // Draw the image onto the mask (source-in)
        coverCtx.globalCompositeOperation = 'source-in';
        
        // Match Next.js Image with object-contain object-right
        const scale = Math.min(canvas.width / afterImg.width, canvas.height / afterImg.height);
        const dw = afterImg.width * scale;
        const dh = afterImg.height * scale;
        
        // Right Center
        const dx = canvas.width - dw;
        const dy = (canvas.height - dh) / 2;

        try {
          coverCtx.drawImage(afterImg, dx, dy, dw, dh);
        } catch {
          isCrossOriginError = true;
        }
      }
    }

    window.addEventListener('resize', resizeCanvas);

    const handlePointerMove = (e: PointerEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      points.push({ x, y });
    };

    const handlePointerLeave = () => {
      points = [];
      lastPoint = null;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    
    resizeCanvas();
    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', pointerEvents: 'none', display: 'block' }} aria-hidden="true" />
    </div>
  );
}
