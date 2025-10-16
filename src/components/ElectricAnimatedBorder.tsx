import React, { useRef, useEffect, useState } from 'react';

import './ElectricAnimatedBorder.css';

// Componente de borda elétrica animada estilo "electric card" (efeito irregular e mexendo)

interface ElectricAnimatedBorderProps {
  width: number;
  height: number;
  borderRadius?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const ElectricAnimatedBorder: React.FC<ElectricAnimatedBorderProps> = ({
  width,
  height,
  borderRadius = 24,
  strokeWidth = 3,
  style = {},
  children,
}) => {
  const ref = useRef<SVGPathElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => f + 1), 1000 / 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const path = ref.current;
    const w = width;
    const h = height;
    const r = Math.min(borderRadius, w / 2, h / 2);
    const steps = 96;
    const points = [];
    const amplitude = 8;
    const freq1 = 2.2;
    // Comprimentos
    const lenTop = w - 2 * r;
    const lenRight = h - 2 * r;
    const lenBottom = w - 2 * r;
    const lenCorner = Math.PI * r / 2;
    const perimeter = 2 * (lenTop + lenRight) + 4 * lenCorner;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const d = t * perimeter;
      let x = 0, y = 0, nx = 0, ny = 0;
      if (d < lenTop) { // Top
        x = r + d;
        y = 0;
        nx = 0; ny = -1;
      } else if (d < lenTop + lenCorner) { // Top-right
        const theta = (d - lenTop) / r;
        x = w - r + Math.cos(Math.PI * 1.5 + theta) * r;
        y = r + Math.sin(Math.PI * 1.5 + theta) * r;
        nx = Math.cos(Math.PI * 1.5 + theta);
        ny = Math.sin(Math.PI * 1.5 + theta);
      } else if (d < lenTop + lenCorner + lenRight) { // Right
        x = w;
        y = r + (d - lenTop - lenCorner);
        nx = 1; ny = 0;
      } else if (d < lenTop + 2 * lenCorner + lenRight) { // Bottom-right
        const theta = (d - lenTop - lenCorner - lenRight) / r;
        x = w - r + Math.cos(0 + theta) * r;
        y = h - r + Math.sin(0 + theta) * r;
        nx = Math.cos(0 + theta);
        ny = Math.sin(0 + theta);
      } else if (d < lenTop + 2 * lenCorner + lenRight + lenBottom) { // Bottom
        x = w - r - (d - lenTop - 2 * lenCorner - lenRight);
        y = h;
        nx = 0; ny = 1;
      } else if (d < lenTop + 3 * lenCorner + lenRight + lenBottom) { // Bottom-left
        const theta = (d - lenTop - 2 * lenCorner - lenRight - lenBottom) / r;
        x = r + Math.cos(Math.PI / 2 + theta) * r;
        y = h - r + Math.sin(Math.PI / 2 + theta) * r;
        nx = Math.cos(Math.PI / 2 + theta);
        ny = Math.sin(Math.PI / 2 + theta);
      } else { // Left
        x = 0;
        y = h - r - (d - lenTop - 3 * lenCorner - lenRight - lenBottom);
        nx = -1; ny = 0;
      }
      // Ruído forte e rápido
      const noise = Math.sin(frame * freq1 + i * 0.7) * amplitude + Math.cos(frame * 3.1 + i * 1.3) * (amplitude * 0.5);
      points.push([x + nx * noise, y + ny * noise]);
    }
    let svgPath = `M${points[0][0]},${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      svgPath += ` L${points[i][0]},${points[i][1]}`;
    }
    svgPath += ' Z';
    path.setAttribute('d', svgPath);
  }, [frame, width, height, borderRadius]);

  return (
    <div style={{ position: 'relative', width, height, borderRadius, ...style }}>
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}
      >
        <path
          ref={ref}
          fill="none"
          stroke="#ffe066"
          strokeWidth={strokeWidth}
          style={{ filter: `drop-shadow(0 0 16px #ffe066) drop-shadow(0 0 40px #fff200)` }}
        />
      </svg>
      <div style={{ position: 'relative', zIndex: 3, width: '100%', height: '100%', borderRadius }}>
        {children}
      </div>
    </div>
  );
};

export default ElectricAnimatedBorder;
