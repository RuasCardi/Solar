import React, { useRef, useEffect, useState } from 'react';
import './ElectricBorder.css';

// Adaptado de https://reactbits.dev/ui/ElectricBorder-3d-CSS
function ElectricBorder({ color = '#52f99f', speed = 1, className = '', thickness = 2, children, style = {} }) {
  const borderRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (borderRef.current) {
      setWidth(borderRef.current.offsetWidth);
      setHeight(borderRef.current.offsetHeight);
    }
  }, [children]);

  return (
    <div
      ref={borderRef}
      className={`electric-border ${className}`}
      style={{ position: 'relative', ...style }}
    >
      <svg
        className="eb-svg"
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}
      >
        <filter id="eb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <rect
          x={thickness / 2}
          y={thickness / 2}
          width={width - thickness}
          height={height - thickness}
          rx="18"
          ry="18"
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          filter="url(#eb-glow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values={`0;${width * 2 + height * 2}`}
            dur={`${2 / speed}s`}
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      <div className="eb-content" style={{ position: 'relative', zIndex: 3 }}>{children}</div>
    </div>
  );
}

export default ElectricBorder;
