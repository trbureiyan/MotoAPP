export const baseStyles = (T) => `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    :root { color-scheme: dark; }

    body {
      background: ${T.bg0};
      color: ${T.text};
      font-family: ${T.body};
      font-size: 16px;
      line-height: 1.6;
      overflow-x: hidden;
    }

    h1, h2, h3 {
      font-family: ${T.head};
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    h4, h5, h6 {
      font-family: ${T.head};
      font-weight: 700;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.7;
      color: ${T.text};
    }

    a { color: inherit; }

    ::selection { background: ${T.orange}; color: #000; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${T.bg1}; }
    ::-webkit-scrollbar-thumb { background: ${T.orange}; }

    .btn-orange {
      background: ${T.orange};
      color: #000;
      border: none;
      padding: 0.6rem 1.4rem;
      font-family: ${T.head};
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s;
      clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    }
    .btn-orange:hover {
      background: #ff8a00;
      box-shadow: 0 0 20px ${T.orangeGlow};
    }
    .btn-outline {
      background: transparent;
      color: ${T.orange};
      border: 1px solid ${T.orange};
      padding: 0.6rem 1.4rem;
      font-family: ${T.head};
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-outline:hover { background: ${T.orangeGlow}; }
    .btn-back {
      background: none;
      border: 1px solid ${T.border};
      color: ${T.muted};
      padding: 0.6rem 1.2rem;
      font-family: ${T.head};
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-back:hover { border-color: ${T.muted}; color: ${T.text}; }

    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-stagger > * {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-stagger.active > * {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-stagger.active > *:nth-child(1) { transition-delay: 0.1s; }
    .reveal-stagger.active > *:nth-child(2) { transition-delay: 0.2s; }
    .reveal-stagger.active > *:nth-child(3) { transition-delay: 0.3s; }
    .reveal-stagger.active > *:nth-child(4) { transition-delay: 0.4s; }
    .reveal-stagger.active > *:nth-child(5) { transition-delay: 0.5s; }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .cursor-blink {
      display: inline-block;
      width: 7px;
      height: 13px;
      background: ${T.orange};
      margin-left: 2px;
      animation: blink 1s step-end infinite;
      vertical-align: text-bottom;
    }
    .animate-up { animation: slideUp 0.5s ease both; }

    .orange-text { color: ${T.orange}; }
    .mono-text { font-family: ${T.mono}; }
  `;
