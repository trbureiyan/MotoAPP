import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import bannerVideo from '../public/assets/vid/VideoBanner.mp4';

export function Hero({ onBooking }) {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-grid-bg', 
        { backgroundPositionY: '0px' },
        { backgroundPositionY: '100px', duration: 3, ease: 'none', repeat: -1 }
      )
    tl.from('.hero-video-bg', { opacity: 0, duration: 2, ease: 'power2.inOut' }, 0)
      .from('.hero-glow', { opacity: 0, scale: 0.8, duration: 1.5, ease: 'power2.out' }, "-=1.5")
      .from('.hero-inner', { 
        clipPath: 'inset(0 0 100% 0)', 
        opacity: 0,
        y: 40,
        duration: 1.5, 
        ease: 'expo.out' 
      }, "-=1")
      .from('.hero-stat-item', { 
        opacity: 0, 
        y: 20, 
        stagger: 0.15, 
        duration: 1, 
        ease: 'power4.out' 
      }, "-=1");
  }, { scope: container });

  return (
    <section className="hero" ref={container}>
      <video
        className="hero-video-bg"
        src={bannerVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-grid-bg" />
      <div className="hero-glow" />

      <div className="hero-inner">
        <div className="hero-label">Neiva, Huila - Colombia</div>
        <h1 className="hero-h1">
          Moto.<span>Taller</span>
        </h1>
        <p className="hero-sub">
          Ingeniería de alto cilindraje para verdaderos entusiastas. Telemetría avanzada y tuning de élite en el corazón del sur de Colombia.
        </p>
        <div className="hero-actions">
          <button className="btn-orange" onClick={onBooking}>AGENDAR SERVICIO</button>
          <a href="#taller"><button className="btn-outline">VER ESPECIFICACIONES</button></a>
        </div>
      </div>
      <div className="hero-stat-row">
        <div className="hero-stat-item">
          <div className="hero-stat-value">+500</div>
          <div className="hero-stat-label">Mapeos</div>
        </div>
        <div className="hero-stat-item">
          <div className="hero-stat-value">15</div>
          <div className="hero-stat-label">Años</div>
        </div>
        <div className="hero-stat-item">
          <div className="hero-stat-value">300+</div>
          <div className="hero-stat-label">km/h</div>
        </div>
      </div>
    </section>
  );
}
