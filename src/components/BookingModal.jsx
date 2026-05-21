import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IconX } from './Icons';
import { T } from '../styles/tokens';

const FALLBACK_BRANDS = ['DUCATI', 'BMW', 'KTM', 'YAMAHA', 'TRIUMPH', 'SUZUKI', 'HONDA', 'KAWASAKI', 'OTRO'];
const MOTIVOS = ['MANTENIMIENTO PREVENTIVO', 'TUNING ECU / MAPEO', 'FRENOS', 'DIAGNÓSTICO', 'PREPARACIÓN CIRCUITO', 'OTRO'];

export function BookingModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ brand: '', motivo: '', fecha: '', nombre: '', telefono: '', modelo: '' });
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const modalRef = useRef();

  useGSAP(() => {
    gsap.from('.modal-overlay', { opacity: 0, duration: 0.4, ease: 'power2.out' });
    gsap.from('.modal-box', { 
      y: 50, 
      opacity: 0, 
      duration: 0.6, 
      ease: 'back.out(1.5)',
      delay: 0.1
    });
  }, { scope: modalRef });

  useEffect(() => {
    setLoadingBrands(true);
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/motorcycle?format=json')
      .then(r => r.json())
      .then(d => {
        const results = d.Results;
        if (results && results.length > 0) {
          // Tomar unas 12 marcas de la API para no saturar la UI
          setBrands(results.map(r => r.MakeName).slice(0, 12));
        } else {
          setBrands(FALLBACK_BRANDS);
        }
      })
      .catch(() => setBrands(FALLBACK_BRANDS))
      .finally(() => setLoadingBrands(false));
  }, []);

  const update = (key, val) => {
    let sanitizedVal = val;
    if (key === 'nombre') {
      sanitizedVal = val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    } else if (key === 'telefono') {
      sanitizedVal = val.replace(/\D/g, '').slice(0, 10);
    }
    setData(d => ({ ...d, [key]: sanitizedVal }));
  };

  const steps = [
    { label: 'PASO 01', title: 'SELECCIONA LA MARCA', sub: 'Elige la marca de tu moto' },
    { label: 'PASO 02', title: 'MOTIVO DE INGRESO', sub: 'Define el tipo de servicio requerido' },
    { label: 'PASO 03', title: 'FECHA Y MODELO', sub: 'Agenda tu cita con nosotros' },
    { label: 'PASO 04', title: 'DATOS DEL PILOTO', sub: 'Información para confirmar tu reserva' },
  ];

  const canNext = () => {
    if (step === 0) return !!data.brand;
    if (step === 1) return !!data.motivo;
    if (step === 2) return data.fecha && data.modelo.trim().length > 2;
    if (step === 3) {
      return data.nombre.trim().length > 2 && data.telefono.length === 10;
    }
    return false;
  };

  const [done, setDone] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Cerrar modal"
      ref={modalRef}
    >
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Reserva de cita"
        tabIndex={-1}
      >
        <button className="modal-close" onClick={onClose}><IconX /></button>

        {done ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ color: T.orange, fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
            <div className="modal-title">CITA CONFIRMADA</div>
            <p style={{ color: T.muted, fontSize: '0.85rem', marginTop: '0.75rem', fontFamily: T.mono }}>
              Recibirás confirmación en breve, {data.nombre}. ¡Nos vemos en el paddock!
            </p>
            <button className="btn-orange" style={{ marginTop: '1.5rem' }} onClick={onClose}>CERRAR</button>
          </div>
        ) : (
          <>
            <div className="modal-stepper">
              {steps.map((stepItem, i) => (
                <div key={stepItem.label} className={`modal-step-dot${i <= step ? ' active' : ''}`} />
              ))}
            </div>
            <div className="modal-step-label">{steps[step].label} / {steps.length}</div>
            <div className="modal-title">{steps[step].title}</div>
            <p className="modal-sub">{steps[step].sub}</p>

            {step === 0 && (
              <div className="brand-grid">
                {loadingBrands ? (
                  <div
                    style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem 0' }}
                    data-uk-spinner="ratio: 1.5"
                    role="status"
                    aria-live="polite"
                    aria-busy="true"
                  ></div>
                ) : (
                  brands.map(b => (
                    <button
                      key={b}
                      type="button"
                      className={`brand-btn${data.brand === b ? ' selected' : ''}`}
                      onClick={() => update('brand', b)}
                    >{b}</button>
                  ))
                )}
              </div>
            )}

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {MOTIVOS.map(m => (
                  <button
                    key={m}
                    type="button"
                    className={`brand-btn${data.motivo === m ? ' selected' : ''}`}
                    style={{ textAlign: 'left', padding: '0.85rem 1rem' }}
                    onClick={() => update('motivo', m)}
                  >{m}</button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div>
                <input
                  className="modal-input"
                  placeholder="Modelo y cilindraje (ej: BMW S1000RR 2022)"
                  value={data.modelo}
                  onChange={e => update('modelo', e.target.value)}
                />
                <input
                  className="modal-input"
                  type="date"
                  min={today}
                  value={data.fecha}
                  onChange={e => update('fecha', e.target.value)}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <input
                  className="modal-input"
                  placeholder="Nombre completo"
                  value={data.nombre}
                  onChange={e => update('nombre', e.target.value)}
                />
                <input
                  className="modal-input"
                  placeholder="Teléfono o WhatsApp (10 dígitos)"
                  value={data.telefono}
                  maxLength={10}
                  onChange={e => update('telefono', e.target.value)}
                />
              </div>
            )}

            <div className="modal-actions">
              {step > 0
                ? <button className="btn-back" onClick={() => setStep(s => s - 1)}>← ATRÁS</button>
                : <div />
              }
              {step < steps.length - 1
                ? <button className="btn-orange" disabled={!canNext()} onClick={() => setStep(s => s + 1)} style={{ opacity: canNext() ? 1 : 0.4 }}>SIGUIENTE →</button>
                : <button className="btn-orange" disabled={!canNext()} onClick={() => setDone(true)} style={{ opacity: canNext() ? 1 : 0.4 }}>CONFIRMAR CITA</button>
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}
