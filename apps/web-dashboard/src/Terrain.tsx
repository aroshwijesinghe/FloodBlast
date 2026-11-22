import { useEffect, useRef } from "react";

// Draw a synthetic elevation field as contour lines for the demo station display.
export function Terrain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const draw = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);
      const field = (x: number, y: number) => {
        const u = (x / w) * 6,
          v = (y / h) * 6;
        return (
          Math.sin(u + 0.75 * v + Math.sin(v * 1.7) * 0.65) +
          0.7 * Math.cos(v * 1.9 - u * 0.65) +
          0.25 * Math.sin(u * 2.8 + v * 1.4)
        );
      };
      const step = 7,
        nx = Math.ceil(w / step) + 1,
        ny = Math.ceil(h / step) + 1;
      const values = Array.from({ length: ny }, (_, j) =>
        Array.from({ length: nx }, (_, i) => field(i * step, j * step)),
      );
      for (let level = -2; level < 2; level += 0.075) {
        ctx.beginPath();
        for (let j = 0; j < ny - 1; j++)
          for (let i = 0; i < nx - 1; i++) {
            const corners = [
              [i, j],
              [i + 1, j],
              [i + 1, j + 1],
              [i, j + 1],
            ];
            let count = 0;
            for (let k = 0; k < 4; k++) {
              const [a, b] = corners[k],
                [c, d] = corners[(k + 1) % 4],
                f = values[b][a],
                g = values[d][c];
              if (f < level === g < level) continue;
              const t = (level - f) / (g - f),
                x = (a + (c - a) * t) * step,
                y = (b + (d - b) * t) * step;
              if (count++ % 2 === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
          }
        ctx.strokeStyle = "rgba(98,218,189,.38)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="terrain" />;
}
