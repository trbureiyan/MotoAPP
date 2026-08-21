import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SoftCursor() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    if (!cursorRef.current) return;
    
    // Using gsap.quickTo for high performance cursor tracking
    const setX = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const setY = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    const handleMouseHover = () => {
      gsap.to(cursorRef.current, { scale: 1.5, duration: 0.3, ease: 'power2.out', backgroundColor: 'rgba(255, 98, 0, 0.4)' });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out', backgroundColor: 'rgba(255, 98, 0, 0.8)' });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add interactive state
    const interactiveElements = document.querySelectorAll('button, a, input, .hs-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseHover);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseHover);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 98, 0, 0.8)',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference'
      }}
    />
  );
}
