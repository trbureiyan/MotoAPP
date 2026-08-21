import React, { useMemo, useState, useRef, useEffect } from 'react';

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const getGradientDirection = (position) => {
  const directions = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  };
  return directions[position] || 'to bottom';
};

export function GradualBlur({
  position = 'bottom',
  strength = 2,
  height = '6rem',
  divCount = 5,
  exponential = false,
  zIndex = 10,
  opacity = 1,
  curve = 'linear',
  className = '',
  style = {},
  children
}) {
  const [isHovered, setIsHovered] = useState(false);

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / divCount;
    const currentStrength = strength;
    const curveFunc = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= divCount; i++) {
      let progress = i / divCount;
      progress = curveFunc(progress);
      
      let blurValue;
      if (exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;
      
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      
      const direction = getGradientDirection(position);
      
      const divStyle = {
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: opacity,
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      };
      
      divs.push(<div key={i} className="gradual-blur-layer" style={divStyle} />);
    }
    return divs;
  }, [position, strength, divCount, exponential, opacity, curve]);

  const containerStyle = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(position);
    const isHorizontal = ['left', 'right'].includes(position);
    
    const baseStyle = {
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 1,
      zIndex: zIndex,
      ...style
    };

    if (isVertical) {
      baseStyle.height = height;
      baseStyle.width = '100%';
      baseStyle[position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = height;
      baseStyle.height = '100%';
      baseStyle[position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }
    
    return baseStyle;
  }, [position, height, zIndex, style]);

  return (
    <div
      className={`gradual-blur ${className}`}
      style={containerStyle}
    >
      <div className="relative w-full h-full" style={{ position: 'relative', width: '100%', height: '100%' }}>
        {blurDivs}
      </div>
      {children && <div className="relative">{children}</div>}
    </div>
  );
}
