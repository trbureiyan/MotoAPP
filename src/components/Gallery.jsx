import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { animateGalleryPage } from '../animations/galleryAnimations';
import { IconZoomIn } from './Icons';

export const GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', label: 'BMW S1000RR - Tuning ECU' },
  { src: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80', label: 'Yamaha R1 - Suspensión' },
  { src: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80', label: 'Kawasaki ZX-10R - Frenos Brembo' },
  { src: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=80', label: 'Ducati V4 - Mapeo Dyno' },
  { src: 'https://www.motofichas.com/images/cache/10-honda-cb1000-hornet-sp-2025-estudio-negro-01-739-a.jpg', label: 'Honda CBR - Mantenimiento' },
  { src: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=900&q=80', label: 'Suzuki GSX-R - Full Service' },
  { src: 'https://www.moto.ch/wp-content/uploads/2024/12/Honda-CB1000-Hornet_01-1300x867.jpg', label: 'Honda CB1000 Hornet SP' },
  { src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=80', label: 'Aprilia RSV4 - Puesta a punto' },
  { src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900&q=80', label: 'Ducati Panigale - Detalle final' },
  { src: 'https://images.unsplash.com/photo-1517846693594-1567da72af75?w=900&q=80', label: 'Triumph Street Triple - Revisión general' },
  { src: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=900&q=80', label: 'KTM Duke - Diagnóstico ECU' },
  { src: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=900&q=80', label: 'BMW R nineT - Servicio premium' },
];

function GalleryLightbox({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>× CERRAR</button>
        <img src={item.src} alt={item.label} />
        <div className="lightbox-caption">{item.label}</div>
      </div>
    </div>
  );
}

function GalleryGrid({ items, variant = 'masonry', onSelect, animated = true, className = '' }) {
  return (
    <div className={`gallery-${variant}${animated ? ' reveal-stagger' : ''}${className ? ` ${className}` : ''}`}>
      {items.map((item, i) => (
        <button key={`${item.label}-${i}`} className="gallery-item" onClick={() => onSelect(item)}>
          <img src={item.src} alt={item.label} loading="lazy" />
          <span className="gallery-item-overlay">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconZoomIn />
              <span className="gallery-item-label">{item.label}</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

export function Gallery({ onViewMore }) {
  const [lightbox, setLightbox] = useState(null);
  const featuredItems = GALLERY_ITEMS.slice(0, 3);

  return (
    <section className="section gallery-section" id="taller">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label reveal">// Proyectos recientes</div>
        <h2 className="section-title reveal">EL <em>TALLER</em></h2>
        <div className="divider-line reveal" />
        <p className="section-sub reveal">Cada moto que entra al paddock recibe atención de nivel competitivo.</p>
        <GalleryGrid items={featuredItems} variant="featured" onSelect={setLightbox} />
        <div className="gallery-actions reveal">
          <button className="btn-orange" onClick={onViewMore}>VER MÁS</button>
        </div>
      </div>
      <GalleryLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}

export function GalleryPage({ onBack }) {
  const pageRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useGSAP(() => animateGalleryPage(pageRef.current), { scope: pageRef });

  return (
    <main className="gallery-page" ref={pageRef}>
      <section className="section gallery-section">
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <button className="btn-outline gallery-back-btn gallery-page-back" onClick={onBack}>VOLVER AL INICIO</button>
          <div className="section-label gallery-page-kicker">// Archivo completo</div>
          <h1 className="section-title gallery-page-title">GALERÍA <em>DEL TALLER</em></h1>
          <div className="divider-line gallery-page-divider" />
          <p className="section-sub gallery-page-copy">Todos los trabajos destacados del paddock, desde diagnóstico hasta preparaciones de alto rendimiento.</p>
          <GalleryGrid items={GALLERY_ITEMS} onSelect={setLightbox} animated={false} className="gallery-page-grid" />
        </div>
      </section>
      <GalleryLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </main>
  );
}
