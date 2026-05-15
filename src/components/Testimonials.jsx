import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { animateMetricValue, animateTestimonialsSection } from '../animations/testimonialsAnimations';

function MetricCell({ prefix = '', value, suffix = '', label }) {
  const valueRef = useRef(null);

  useGSAP(() => {
    animateMetricValue(valueRef.current, value);
  }, { dependencies: [value] });

  return (
    <div className="metric-cell">
      <div className="metric-value">
        {prefix}<span ref={valueRef}>0</span>{suffix}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  );
}

const STATIC_TESTIMONIALS = [
  {
    quote: 'El mejor tuning que le han hecho a mi moto. La respuesta en bajas revoluciones es increíble y la entrega de potencia lineal me quitó 2 segundos en el circuito.',
    bike: 'Kawasaki ZX-10R',
  },
  {
    quote: 'Mantenimiento impecable. Salen de aquí sin que nada quede al aire. Confíen en el taller para moto.',
    bike: 'Yamaha R6',
  },
  {
    quote: 'No le dejo mi moto a nadie más. El dyno muestra exactamente lo que le hacen a tu moto, pura transparencia y resultados reales en cada marcha.',
    bike: 'BMW S1000RR',
  },
];

export function Testimonials() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    if (loading || testimonials.length === 0) return;
    animateTestimonialsSection(sectionRef.current);

    const wrap = carouselRef.current;
    if (wrap) {
      const scrollDist = wrap.scrollWidth - window.innerWidth;
      if (scrollDist > 0) {
        gsap.to(wrap, {
          x: () => -scrollDist,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center center',
            end: () => `+=${scrollDist}`,
            scrub: true,
            pin: true,
            anticipatePin: 1
          }
        });
      }
    }
  }, { scope: sectionRef, dependencies: [loading, testimonials.length] });

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=3&inc=name,picture')
      .then(res => res.json())
      .then(data => {
        const dynamicTestimonials = data.results.map((user, i) => ({
          quote: STATIC_TESTIMONIALS[i].quote,
          name: `${user.name.first} ${user.name.last}`,
          bike: STATIC_TESTIMONIALS[i].bike,
          picture: user.picture.medium,
          initial: user.name.first.charAt(0),
        }));
        setTestimonials(dynamicTestimonials);
      })
      .catch(() => {
        setTestimonials(STATIC_TESTIMONIALS.map((t, i) => ({
          ...t,
          name: `Piloto ${i + 1}`,
          initial: `P${i + 1}`,
        })));
      })
      .finally(() => setLoading(false));
  }, []);

  // Drag logic removed in favor of GSAP ScrollTrigger horizontal scroll

  return (
    <section className="section testimonials-section" ref={sectionRef}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label testimonials-kicker">Opiniones reales de clientes</div>
        <h2 className="section-title testimonials-title"><em>TESTIMONIOS DEL PADDOCK</em></h2>
        <div className="divider-line testimonials-divider" />
        <div
          className="carousel-container pin-wrap"
          ref={carouselRef}
          style={{ overflow: 'visible', display: 'flex', flexWrap: 'nowrap', width: 'max-content' }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', width: '100%', padding: '2rem 0' }} uk-spinner="ratio: 1.5"></div>
          ) : (
            testimonials.map((t, i) => (
              <div key={i} className="carousel-item">
                <div className="bento-card">
                  <p className="bento-quote">"{t.quote}"</p>
                  <div className="bento-rider">
                    {t.picture ? (
                      <img src={t.picture} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div className="bento-avatar">{t.initial}</div>
                    )}
                    <div>
                      <div className="bento-name">{t.name}</div>
                      <div className="bento-sub">{t.bike}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <MetricsRow />
      </div>
    </section>
  );
}

function MetricsRow() {
  const [f1Races, setF1Races] = useState(500);

  useEffect(() => {
    fetch('http://ergast.com/api/f1/current.json')
      .then(res => res.json())
      .then(data => {
        const total = data.MRData.total || data.MRData.RaceTable.Races.length;
        setF1Races(parseInt(total, 10));
      })
      .catch(e => console.error('F1 API Error:', e));
  }, []);

  return (
    <div className="metrics-row">
      <MetricCell prefix="+" value={f1Races} label="Mapeos completados" />
      <MetricCell value={15} suffix=" Años" label="De experiencia técnica" />
      <MetricCell prefix="+" value={300} label="Velocidad Max km/h" />
    </div>
  );
}
