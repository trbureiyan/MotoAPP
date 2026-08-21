export const heroStyles = (T) => `
    /* HERO */
    .hero {
      position: relative;
      min-height: 92vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 6rem 2rem 4rem;
    }
    .hero-video-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.4;
      pointer-events: none;
      z-index: 0;
    }
    .hero-grid-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,98,0,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,98,0,0.08) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 1;
    }
    .hero-glow {
      position: absolute;
      top: -20%;
      right: -10%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(255,98,0,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-inner { position: relative; max-width: 900px; }
    .hero-label {
      font-family: ${T.body};
      font-size: 0.85rem;
      color: ${T.text};
      letter-spacing: 0.02em;
      margin-bottom: 1.5rem;
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
    }
    .hero-location { font-weight: 600; }
    .hero-sep { color: ${T.orange}; opacity: 0.9; }
    .hero-tag {
      font-family: ${T.mono};
      font-size: 0.72rem;
      color: ${T.muted};
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .hero-h1 {
      font-family: ${T.head};
      font-size: clamp(3.5rem, 10vw, 8.5rem);
      font-weight: 900;
      line-height: 0.9;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
    }
    .hero-h1 span { color: ${T.orange}; }
    .hero-sub {
      font-size: 1.05rem;
      color: ${T.muted};
      max-width: 540px;
      line-height: 1.8;
      margin-bottom: 2.5rem;
      font-weight: 400;
    }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
    .hero-stat-row {
      position: absolute;
      bottom: 3rem;
      right: 2rem;
      display: flex;
      gap: 3rem;
    }
    .hero-stat-item { text-align: right; }
    .hero-stat-value {
      font-family: ${T.mono};
      font-size: 1.8rem;
      font-weight: 700;
      color: ${T.orange};
    }
    .hero-stat-label {
      font-size: 0.68rem;
      color: ${T.muted};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 0.15rem;
    }
  `;
