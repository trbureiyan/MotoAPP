import { useEffect, useRef, useState } from 'react';
import { IconRadar } from './Icons';
import { T } from '../styles/tokens';

const CHAT_STEPS = [
  {
    key: 'name',
    prompt: 'Bienvenido a MOTO.TALLER. Para agendar tu cita, ¿como te llamas?',
    placeholder: 'Tu nombre...',
    options: null,
  },
  {
    key: 'service',
    prompt: 'Perfecto. ¿Que servicio necesitas hoy?',
    placeholder: 'O escribe tu servicio...',
    options: ['MANTENIMIENTO', 'TUNING ECU', 'SISTEMA DE FRENOS', 'DIAGNÓSTICO'],
  },
  {
    key: 'issue',
    prompt: 'Cuéntanos brevemente lo que necesitas revisar en tu moto:',
    placeholder: 'Detalla el síntoma o trabajo...',
    options: null,
  },
  {
    key: 'contact',
    prompt: 'Ya casi terminamos. ¿Cual es tu numero o email para confirmar?',
    placeholder: 'Teléfono o email...',
    options: null,
  },
];

function TerminalChat() {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { type: 'system', text: 'MOTO.TALLER - Chat de servicio en linea' },
    { type: 'system', text: CHAT_STEPS[0].prompt },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [completed, setCompleted] = useState(false);
  const [userData, setUserData] = useState({});
  const msgRef = useRef(null);

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [messages]);

  const send = (val) => {
    const value = val || inputVal.trim();
    if (!value) return;
    const currentStep = CHAT_STEPS[step];
    const newUserData = { ...userData, [currentStep.key]: value };
    setUserData(newUserData);

    const newMessages = [
      ...messages,
      { type: 'user', text: value },
    ];

    if (step < CHAT_STEPS.length - 1) {
      const nextStep = step + 1;
      newMessages.push({ type: 'data', text: `${currentStep.key.toUpperCase()} registrado: "${value}"` });
      newMessages.push({ type: 'system', text: CHAT_STEPS[nextStep].prompt });
      setStep(nextStep);
      setMessages(newMessages);
      setInputVal('');
    } else {
      newMessages.push({ type: 'system', text: 'Enviando tu solicitud...' });
      setMessages(newMessages);
      setInputVal('');

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          marca: newUserData.name,
          motivo: newUserData.service,
          contacto: newUserData.contact,
          issue: newUserData.issue
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      .then(res => {
        if (res.status === 201) {
          if (window.UIkit) {
            window.UIkit.notification({message: 'Solicitud recibida. Ticket #1024', status: 'success'});
          }
          setMessages([
            { type: 'system', text: 'MOTO.TALLER - Chat de servicio en linea' },
            { type: 'system', text: CHAT_STEPS[0].prompt }
          ]);
          setStep(0);
          setUserData({});
        } else {
          setMessages(prev => [...prev, { type: 'data', text: 'Error en transmisión.' }]);
        }
      })
      .catch(() => {
        setMessages(prev => [...prev, { type: 'data', text: 'Fallo de conexión.' }]);
      });
    }
  };

  const progress = ((step + (completed ? 1 : 0)) / CHAT_STEPS.length) * 100;

  return (
    <div className="terminal-wrap">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <div className="terminal-title">MOTO.TALLER - Atencion en linea</div>
      </div>
      <div className="terminal-progress-bar">
        <div className="terminal-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="terminal-messages" ref={msgRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg-${m.type}`}>{m.text}</div>
        ))}
        {!completed && <div className="cursor-blink" />}
      </div>
      {!completed && CHAT_STEPS[step].options && (
        <div className="terminal-options">
          {CHAT_STEPS[step].options.map(opt => (
            <button key={opt} className="terminal-option" onClick={() => send(opt)}>{opt}</button>
          ))}
        </div>
      )}
      {!completed && (
        <div className="terminal-input-row">
          <input
            className="terminal-input"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={CHAT_STEPS[step].placeholder}
          />
          <button className="terminal-send" onClick={() => send()}>ENVIAR</button>
        </div>
      )}
    </div>
  );
}

function WorkshopInfo() {
  const [showRadar, setShowRadar] = useState(false);

  return (
    <div>
      <div className="info-block">
        <div className="info-row">
          <div className="info-item">
            <div className="info-item-label">
              <span style={{ color: T.orange, marginRight: '0.4rem' }}>◉</span>
              Coordenadas
            </div>
            <div className="info-item-value">
              Zona Industrial Sur<br/>
              <span>Calle 6 Sur #10-46</span><br/>
              Neiva, Huila
            </div>
          </div>
          <div className="info-item">
            <div className="info-item-label">
              <span style={{ color: T.orange, marginRight: '0.4rem' }}>◎</span>
              Horario Operativo
            </div>
            <div className="info-item-value">
              <span>LUN–VIE</span>&nbsp; 08:00 – 18:00<br/>
              <span>SAB</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 08:00 – 14:00<br/>
              <span>DOM</span>&nbsp;&nbsp;&nbsp;&nbsp; Cerrado
            </div>
          </div>
        </div>
        <div className="contact-btns reveal-stagger">
          <button className="contact-btn whatsapp">WhatsApp Directo</button>
          <button className="contact-btn email">Email Soporte</button>
        </div>
        {showRadar ? (
          <div className="map-placeholder reveal" style={{ padding: 0, overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15933.155!2d-75.282!3d2.927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sco!4v1700000000000!5m2!1sen!2sco"
              title="Mapa del taller"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) brightness(0.8)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        ) : (
          <div
            className="map-placeholder reveal"
            role="button"
            tabIndex={0}
            aria-label="Activar radar de ubicacion"
            onClick={() => setShowRadar(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowRadar(true);
              }
            }}
            style={{ cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = T.bg2}
            onMouseOut={e => e.currentTarget.style.background = T.bg3}
          >
            <div style={{ color: T.orange }}><IconRadar /></div>
            <div className="map-placeholder-label">Activar Radar de Ubicación</div>
            <div style={{ fontFamily: T.mono, fontSize: '0.62rem', color: T.muted }}>2.927° N, 75.282° W</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section className="section contact-section" id="contacto">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-label reveal">Canal directo con el taller</div>
        <h2 className="section-title reveal">INICIA EL <em>SEGUIMIENTO</em></h2>
        <div className="divider-line reveal" />
        <p className="section-sub reveal">Ponte en contacto con nuestro equipo de ingenieros para programar tu servicio o consultar sobre preparaciones específicas de alto rendimiento.</p>
        <div className="contact-grid">
          <div className="reveal">
            <TerminalChat />
          </div>
          <div className="reveal">
            <WorkshopInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
