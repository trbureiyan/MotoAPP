import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { T } from '../styles/tokens';

export function Preloader() {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animate text first
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      delay: 0.5,
      ease: 'power3.in'
    })
    // Slide up wrapper
    .to(wrapperRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut'
    }, '+=0.1')
    // Hide totally
    .set(wrapperRef.current, { display: 'none' });

  }, { scope: wrapperRef });

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: T.bg0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div 
        ref={textRef}
        style={{
          fontFamily: T.head,
          fontSize: '2rem',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        MOTO<span style={{ color: T.orange }}>.</span>TALLER
      </div>
      <div style={{ marginTop: '1rem', width: '150px', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%', width: '40%', background: T.orange,
          animation: 'preloaderBar 1.5s infinite ease-in-out'
        }} />
      </div>
      <style>{`
        @keyframes preloaderBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
