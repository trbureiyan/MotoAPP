import { useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { IconZoomIn } from "./Icons";
import { GridDistortion } from "./GridDistortion";
import { GradientBlinds } from "./GradientBlinds";
import { GradualBlur } from "./GradualBlur";

gsap.registerPlugin(ScrollTrigger, Flip);

const GALLERY_ITEMS = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', label: 'BMW S1000RR - Tuning ECU', stats: 'HP: 205 | TRQ: 83ft-lb' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80', label: 'Yamaha R1 - Suspensión', stats: 'SAG: 35mm | REB: 12 clicks' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80', label: 'Kawasaki ZX-10R - Frenos Brembo', stats: 'ROTOR: 330mm | FLUID: DOT 5.1' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=80', label: 'Ducati V4 - Mapeo Dyno', stats: 'MAP: Race Evo | A/F: 13.2' },
  { id: 'g5', src: 'https://www.motofichas.com/images/cache/10-honda-cb1000-hornet-sp-2025-estudio-negro-01-739-a.jpg', label: 'Honda CBR - Mantenimiento', stats: 'OIL: Motul 300V | FLTR: K&N' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=900&q=80', label: 'Suzuki GSX-R - Full Service', stats: 'CH: DID 520 | SPRK: 16/45' },
  { id: 'g7', src: 'https://www.moto.ch/wp-content/uploads/2024/12/Honda-CB1000-Hornet_01-1300x867.jpg', label: 'Honda CB1000 Hornet SP', stats: 'SYS: HESD | TRQ: 104Nm' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=80', label: 'Aprilia RSV4 - Puesta a punto', stats: 'MAP: Track | APRC: Active' },
  { id: 'g9', src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900&q=80', label: 'Ducati Panigale - Detalle final', stats: 'AERO: Winglets | DESMO: OK' },
  { id: 'g10', src: 'https://images.unsplash.com/photo-1517846693594-1567da72af75?w=900&q=80', label: 'Triumph Street Triple - Revisión general', stats: 'QUICK: Up/Down | TFT: 5in' },
  { id: 'g11', src: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=900&q=80', label: 'KTM Duke - Diagnóstico ECU', stats: 'MTC: Spin Adjust | ABS: Supermoto' },
  { id: 'g12', src: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=900&q=80', label: 'BMW R nineT - Servicio premium', stats: 'SHAFT: Lube | BOXER: Sync' },
];

function GalleryGrid({
  items,
  variant = "masonry",
  onSelect,
  animated = true,
  className = "",
}) {
  return (
    <div
      className={`gallery-${variant}${animated ? " reveal-stagger" : ""}${className ? ` ${className}` : ""}`}
    >
      {items.map((item, i) => (
        <button
          key={`${item.id}-${i}`}
          className="gallery-item"
          onClick={() => onSelect(item)}
        >
          <img src={item.src} alt={item.label} loading="lazy" />
          <span className="gallery-item-overlay">
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
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
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label reveal">Trabajos recientes del taller</div>
        <h2 className="section-title reveal">
          EL <em>TALLER</em>
        </h2>
        <div className="divider-line reveal" />
        <p className="section-sub reveal">
          Cada moto que entra al paddock recibe atencion de nivel competitivo y un reporte claro del trabajo.
        </p>
        <GalleryGrid
          items={featuredItems}
          variant="featured"
          onSelect={setLightbox}
        />
        <div className="gallery-actions reveal">
          <button className="btn-orange" onClick={onViewMore}>
            VER MÁS
          </button>
        </div>
      </div>
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setLightbox(null)}
            >
              × CERRAR
            </button>
            <div
              style={{ position: "relative", width: "90vw", height: "80vh" }}
            >
              <GridDistortion
                imageSrc={lightbox.src}
                grid={20}
                mouse={0.15}
                strength={0.25}
              />
            </div>
            <div className="lightbox-caption">
              {lightbox.label} - {lightbox.stats}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function GalleryPage({ onBack }) {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  useGSAP(
    () => {
      // Horizontal scroll pinning
      const content = scrollContentRef.current;

      // Calculate total scroll distance
      const totalScroll = content.scrollWidth - window.innerWidth;

      if (totalScroll > 0) {
        gsap.to(content, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Entrance animation
      gsap.from(".hs-item", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "top 50%",
        },
      });
    },
    { scope: containerRef },
  );

  const openItem = (item, e) => {
    const cardImg = e.currentTarget.querySelector(".hs-item-img");
    const state = Flip.getState(cardImg);
    setActiveItem({ item, state, element: cardImg });
  };

  const closeItem = () => {
    setActiveItem(null);
  };

  useLayoutEffect(() => {
    if (!activeItem) return;

    // We wait for the DOM to update with the lightbox active, then animate
    const lightboxImg = document.querySelector(".lightbox-hero-img");
    if (lightboxImg && activeItem.state) {
      Flip.from(activeItem.state, {
        targets: [lightboxImg],
        duration: 0.8,
        ease: "power4.inOut",
        absolute: true,
        onComplete: () => {
          // Animation complete, could fade in grid distortion if needed
        },
      });

      gsap.fromTo(
        ".lightbox-telemetry",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
        },
      );
    }
  }, [activeItem]);

  return (
    <main className="gallery-page-hs" ref={containerRef}>
      <div className="hs-background">
        <GradientBlinds
          gradientColors={["#050505", "#1a0d00", "#2a0a00", "#000000"]}
          blindCount={24}
          spotlightRadius={0.7}
        />
      </div>

      <div className="hs-ui-layer">
        <button className="btn-outline gallery-back-btn" onClick={onBack}>
          VOLVER AL INICIO
        </button>
        <div className="hs-header">
          <div className="section-label">Archivo completo del taller</div>
        </div>
      </div>

      <div className="hs-wrapper" ref={scrollWrapperRef}>
        <div className="hs-content" ref={scrollContentRef}>
          {/* Spacer for initial title */}
          <div className="hs-spacer" />

          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="hs-item"
              onClick={(e) => openItem(item, e)}
            >
              <div className="hs-item-inner">
                <div className="hs-item-img-wrap">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="hs-item-img"
                    data-flip-id={`img-${item.id}`}
                  />
                  <div className="hs-item-overlay">
                    <IconZoomIn />
                  </div>
                </div>
                <div className="hs-item-meta">
                  <h3>{item.label}</h3>
                  <p className="hs-stats">{item.stats}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="hs-spacer" />
        </div>
      </div>

      {activeItem && (
        <div className="lightbox-fs" onClick={closeItem}>
          <button className="lightbox-fs-close" onClick={closeItem}>
            ×
          </button>

          <div
            className="lightbox-fs-img-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The element we flip TO */}
            <div
              className="lightbox-hero-img"
              data-flip-id={`img-${activeItem.item.id}`}
            >
              <GridDistortion
                imageSrc={activeItem.item.src}
                grid={20}
                mouse={0.1}
                strength={0.2}
                relaxation={0.92}
              />
            </div>

            <GradualBlur
              position="bottom"
              strength={4}
              divCount={8}
              height="30vh"
              zIndex={10}
              exponential={true}
            />
            <GradualBlur
              position="top"
              strength={2}
              divCount={5}
              height="15vh"
              zIndex={10}
              exponential={true}
            />

            <div className="lightbox-telemetry">
              <h2>{activeItem.item.label}</h2>
              <div className="telemetry-grid">
                <div className="t-box">
                  <span>STATUS</span>
                  <strong>OPTIMIZED</strong>
                </div>
                <div className="t-box">
                  <span>SPECS</span>
                  <strong>{activeItem.item.stats}</strong>
                </div>
                <div className="t-box">
                  <span>SYSTEM</span>
                  <strong>ONLINE</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
