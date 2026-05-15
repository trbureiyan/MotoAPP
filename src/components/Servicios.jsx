import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IconDisc, IconGauge, IconWrench } from './Icons';

const SERVICES = [
  {
    icon: <IconWrench />,
    title: 'Mantenimiento',
    hint: 'Preventivo y correctivo',
    image: 'https://images.unsplash.com/photo-1636761358757-0a616eb9e17e?q=80&w=1170&auto=format&fit=crop&w=900&q=80',
    specs: [
      ['Intervalo', '5,000 km'],
      ['Aceite', 'Sintético 10W-40'],
      ['Filtros', 'K&N / OEM'],
      ['Sincronización', 'Carburadores / TBI'],
      ['Diagnóstico', 'ECU Scan'],
    ],
    base: '$180,000 COP',
  },
  {
    icon: <IconGauge />,
    title: 'Tuning',
    hint: 'Mapeo de rendimiento',
    image: 'https://images.unsplash.com/photo-1531327431456-837da4b1d562?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specs: [
      ['ECU', 'Remap avanzado'],
      ['Potencia', '+15–25% torque'],
      ['Mapeo', 'Dyno + telemetría'],
      ['Escape', 'Full system'],
      ['Filtro', 'Aire de alto flujo'],
    ],
    base: '$350,000 COP',
  },
  {
    icon: <IconDisc />,
    title: 'Frenos',
    hint: 'Ingenieria de frenos',
    image: 'https://images.unsplash.com/photo-1769673459571-48f3e3fb5c89?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specs: [
      ['Pastillas', 'Ferodo / Brembo'],
      ['Discos', 'Flotantes / sólidos'],
      ['Líquido', 'DOT 5.1 racing'],
      ['Caliper', 'Overhaul completo'],
      ['ABS', 'Calibración'], 
    ],
    base: '$220,000 COP',
  },
];

function FlipCard({ service }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef();
  const innerRef = useRef();
  
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleFlip = contextSafe(() => {
    const nextFlipped = !flipped;
    setFlipped(nextFlipped);
    
    gsap.to(innerRef.current, {
      rotationY: nextFlipped ? 180 : 0,
      duration: 0.8,
      ease: 'back.out(1.2)'
    });
  });

  const handleMouseEnter = contextSafe(() => {
    if (!flipped) {
      gsap.to(cardRef.current.querySelector('.flip-front-img'), {
        scale: 1.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cardRef.current.querySelector('.flip-front-img'), {
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  return (
    <div 
      className="flip-card" 
      onClick={handleFlip}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleFlip();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      ref={cardRef}
    >
      <div className="flip-card-inner" ref={innerRef}>
        <div className="flip-front">
          {service.image && (
            <img className="flip-front-img" src={service.image} alt={service.title} />
          )}
          <div className="flip-front-content">
            <div className="flip-front-icon">{service.icon}</div>
            <div className="flip-front-title">{service.title}</div>
            <div className="flip-front-hint">{service.hint}</div>
          </div>
        </div>
        <div className="flip-back">
          <div className="flip-back-header">
            <div className="flip-back-title">Especificaciones de servicio</div>
            <div className="flip-back-name">{service.title}</div>
          </div>
          <ul className="flip-back-specs">
            {service.specs.map(([k, v]) => (
              <li key={k}>
                <span className="flip-back-key">{k}</span>
                <span className="flip-back-val">{v}</span>
              </li>
            ))}
          </ul>
          <div className="flip-back-price">Desde {service.base}</div>
        </div>
      </div>
    </div>
  );
}

export function Servicios() {
  return (
    <section className="section services-section" id="servicios">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label reveal">Servicios principales del taller</div>
        <h2 className="section-title reveal">NUESTROS <em>SERVICIOS</em></h2>
        <div className="divider-line reveal" />
        <p className="section-sub reveal">Precision mecanica y telemetria avanzada para cuidar y potenciar tu moto en Neiva.</p>
        <div className="flip-grid reveal-stagger">
          {SERVICES.map(s => <FlipCard key={s.title} service={s} />)}
        </div>
      </div>
    </section>
  );
}
