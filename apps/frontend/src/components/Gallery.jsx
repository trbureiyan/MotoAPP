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
  { id: 'g1', src: 'https://images.pexels.com/photos/17243626/pexels-photo-17243626.jpeg?auto=compress&cs=tinysrgb&w=1000', label: 'BMW S1000RR 2024 - Tuning ECU', stats: 'HP: 205 | TRQ: 83ft-lb' },
  { id: 'g2', src: 'https://images.pexels.com/photos/8532387/pexels-photo-8532387.png?auto=compress&cs=tinysrgb&w=1000', label: 'Yamaha R1 - Suspensión', stats: 'SAG: 35mm | REB: 12 clicks' },
  { id: 'g3', src: 'https://images.pexels.com/photos/30180721/pexels-photo-30180721.jpeg?auto=compress&cs=tinysrgb&w=1000', label: 'Kawasaki ZX-10R - Frenos Brembo', stats: 'ROTOR: 330mm | FLUID: DOT 5.1' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=1000&q=70&auto=format&fit=crop', label: 'Ducati Panigale V4 - Mapeo Dyno', stats: 'MAP: Race Evo | A/F: 13.2' },
  { id: 'g5', src: 'https://images.pexels.com/photos/33203558/pexels-photo-33203558.jpeg?auto=compress&cs=tinysrgb&w=1000', label: 'Honda CBR 1000RR-R - Mantenimiento', stats: 'OIL: Motul 300V | FLTR: K&N' },
  { id: 'g6', src: 'https://images.pexels.com/photos/17900720/pexels-photo-17900720.jpeg?auto=compress&cs=tinysrgb&w=1000', label: 'Suzuki GSX-R 1000 - Full Service', stats: 'CH: DID 520 | SPRK: 16/45' },
  { id: 'g7', src: 'https://www.moto.ch/wp-content/uploads/2024/12/Honda-CB1000-Hornet_01-1300x867.jpg', label: 'Honda CB1000 Hornet SP 2024', stats: 'SYS: HESD | TRQ: 104Nm' },
  { id: 'g8', src: 'https://images.pexels.com/photos/11605405/pexels-photo-11605405.jpeg?auto=compress&cs=tinysrgb&w=1000', label: 'Aprilia RSV4 - Puesta a punto', stats: 'MAP: Track | APRC: Active' },
  { id: 'g9', src: 'https://images.pexels.com/photos/27184237/pexels-photo-27184237.jpeg?auto=compress&cs=tinysrgb&w=1000', label: 'Ducati Multistrada v4 - Detalle final', stats: 'AERO: Winglets | DESMO: OK' },
  { id: 'g10', src: 'https://images.pexels.com/photos/33522279/pexels-photo-33522279.jpeg?auto=compress&cs=tinysrgb&w=1000', label: 'Triumph Street Triple - Revisión general', stats: 'QUICK: Up/Down | TFT: 5in' },
  { id: 'g11', src: 'https://images.unsplash.com/photo-1656767112164-f9f59766357d?q=70&w=1000&auto=format&fit=crop', label: 'KTM 1290 Super Duke - Diagnóstico ECU', stats: 'MTC: Spin Adjust | ABS: Supermoto' },
  { id: 'g12', src: 'https://images.pexels.com/photos/9064725/pexels-photo-9064725.jpeg?auto=compress&cs=tinysrgb&w=1000', label: 'BMW R nineT - Servicio premium', stats: 'SHAFT: Lube | BOXER: Sync' },
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
      {items.map((item) => (
        <button
          key={item.id}
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
        <div
          className="lightbox-overlay"
          role="button"
          tabIndex={0}
          aria-label="Cerrar imagen"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setLightbox(null);
            }
          }}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
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
              role="button"
              tabIndex={0}
              aria-label={`Abrir detalle de ${item.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openItem(item, e);
                }
              }}
            >
              <div className="hs-item-inner">
                <div className="hs-item-img-wrap">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="hs-item-img"
                    loading="lazy"
                    decoding="async"
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
        <div
          className="lightbox-fs"
          onClick={closeItem}
          role="button"
          tabIndex={0}
          aria-label="Cerrar vista completa"
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              closeItem();
            }
          }}
        >
          <button className="lightbox-fs-close" onClick={closeItem}>
            ×
          </button>

          <div
            className="lightbox-fs-img-container"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
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
