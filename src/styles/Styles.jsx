import { T } from './tokens';

export const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: ${T.bg0};
      color: ${T.text};
      font-family: ${T.body};
      overflow-x: hidden;
    }

    ::selection { background: ${T.orange}; color: #000; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${T.bg1}; }
    ::-webkit-scrollbar-thumb { background: ${T.orange}; }

    /* NAVBAR */
    .nav-root {
      position: sticky;
      top: 0;
      z-index: 999;
      background: rgba(14,14,14,0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding: 0 2rem;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-logo {
      font-family: ${T.head};
      font-weight: 900;
      font-size: 1.35rem;
      letter-spacing: 0.12em;
      color: ${T.orange};
      text-decoration: none;
      text-transform: uppercase;
    }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a {
      font-family: ${T.head};
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${T.muted};
      text-decoration: none;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: ${T.text}; }
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

    /* MOBILE NAV */
    .nav-mobile-toggle {
      display: none;
      background: none;
      border: none;
      color: ${T.text};
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem;
    }
    .nav-mobile-menu {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      background: rgba(14,14,14,0.95);
      backdrop-filter: blur(16px);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 1rem 2rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 998;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .nav-mobile-menu.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    .nav-mobile-links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
      width: 100%;
      align-items: center;
    }
    .nav-mobile-links a {
      font-family: ${T.head};
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${T.muted};
      text-decoration: none;
      padding: 0.75rem 0;
      transition: color 0.2s;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      width: fit-content;
      text-align: center;
    }
    .nav-mobile-links a:hover { color: ${T.text}; }
    .nav-mobile-cta {
      margin-top: 1.5rem;
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      width: 100%;
    }
    .nav-mobile-cta .btn-orange {
      width: 100%;
      max-width: 260px;
    }

    /* RESPONSIVE BREAKPOINTS */
    @media (max-width: 768px) {
      .nav-root { padding: 0 1rem; }
      .nav-links { display: none; }
      .nav-mobile-toggle { display: block; }
      .nav-desktop-cta { display: none; }
      
      .hero { min-height: 85vh; padding: 4rem 1rem 3rem; }
      .hero-inner { max-width: 100%; text-align: center; }
      .hero-label { font-size: 0.65rem; }
      .hero-h1 { font-size: clamp(2.5rem, 12vw, 6rem); }
      .hero-sub { font-size: 1rem; max-width: 100%; }
      .hero-actions { flex-direction: column; align-items: center; }
      .hero-stat-row { 
        position: static; 
        margin-top: 2rem;
        display: flex; 
        justify-content: center;
        gap: 2rem; 
      }
      .hero-stat-item { text-align: center; }
      
      .section { padding: 4rem 1rem; }
      .section-title { font-size: clamp(1.8rem, 6vw, 2.8rem); }
      
      .flip-grid { grid-template-columns: 1fr; gap: 1rem; }
      .flip-card { height: 320px; }
      
      .carousel-container { gap: 1rem; padding: 0.5rem 0 2rem; }
      .carousel-item { min-width: 280px; max-width: 320px; }
      
      .bento-card { padding: 2rem 1.5rem; }
      .bento-quote { font-size: 0.95rem; margin-bottom: 1.5rem; }
      .bento-avatar { width: 44px; height: 44px; }
      .bento-name { font-size: 0.85rem; }
      .bento-sub { font-size: 0.65rem; }
      
      .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
      
      .footer-grid { grid-template-columns: 1fr; gap: 1.5rem; }
      .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
    }

    @media (max-width: 480px) {
      .nav-root { height: 56px; padding: 0 0.75rem; }
      .nav-logo { font-size: 1.1rem; }
      .nav-mobile-menu { top: 56px; padding: 0.75rem 1rem; }
      
      .hero { min-height: 80vh; padding: 3rem 1rem 2rem; }
      .hero-h1 { font-size: clamp(2rem, 14vw, 5rem); }
      .hero-stat-row { gap: 1.5rem; }
      
      .section { padding: 3rem 1rem; }
      
      .flip-card { height: 280px; }
      
      .carousel-item { min-width: 260px; max-width: 300px; }
      
      .modal-box { padding: 1.5rem; max-width: 95vw; }
      .brand-grid { grid-template-columns: 1fr; }
    }

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
      font-family: ${T.mono};
      font-size: 0.72rem;
      color: ${T.orange};
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .hero-label::before {
      content: '';
      display: block;
      width: 32px;
      height: 1px;
      background: ${T.orange};
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
      font-size: 1.15rem;
      color: ${T.muted};
      max-width: 520px;
      line-height: 1.7;
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

    /* SECTION COMMON */
    .section { padding: 6rem 2rem; }
    .section-label {
      font-family: ${T.mono};
      font-size: 0.68rem;
      color: ${T.orange};
      letter-spacing: 0.25em;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }
    .section-title {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      margin-bottom: 0.5rem;
    }
    .section-title em { color: ${T.orange}; font-style: normal; }
    .section-sub {
      color: ${T.muted};
      font-size: 0.9rem;
      margin-bottom: 3rem;
      max-width: 500px;
    }
    .divider-line {
      width: 48px;
      height: 2px;
      background: ${T.orange};
      margin: 1rem 0 2rem;
    }

    /* FLIP CARDS */
    .flip-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .flip-card {
      height: 380px;
      perspective: 1200px;
      cursor: pointer;
    }
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      /* Animación ahora controlada por GSAP */
    }
    .flip-front, .flip-back {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border: 1px solid ${T.border};
      width: 100%;
      height: 100%;
    }
    .flip-front {
      background: ${T.bg2};
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 1.25rem;
      color: #fff;
      position: relative;
      overflow: hidden;
      background-color: transparent;
    }
    .flip-front-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      filter: brightness(0.92) saturate(1.05);
      z-index: 0;
    }
    .flip-front::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(14,14,14,0.05), rgba(14,14,14,0.7));
      pointer-events: none;
      z-index: 1;
    }
    .flip-front-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      width: 100%;
      padding: 1.5rem;
      min-height: 100%;
      text-align: center;
    }
    .flip-front-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(0,0,0,0.45);
      border: 1px solid rgba(255,98,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${T.orange};
    }
    .flip-front-title {
      font-size: 1.2rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #fff;
    }
    .flip-front-hint {
      font-family: ${T.mono};
      font-size: 0.65rem;
      color: rgba(255,255,255,0.75);
      letter-spacing: 0.1em;
    }
    .flip-back {
      background: ${T.bg3};
      transform: rotateY(180deg);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-top: 2px solid ${T.orange};
    }
    .flip-back-title {
      font-family: ${T.mono};
      font-size: 0.7rem;
      color: ${T.orange};
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 1.25rem;
    }
    .flip-back-specs {
      font-family: ${T.mono};
      font-size: 0.78rem;
      color: ${T.muted};
      line-height: 2;
    }
    .flip-back-specs span { color: ${T.text}; }
    .flip-back-price {
      font-family: ${T.mono};
      font-size: 1.1rem;
      font-weight: 700;
      color: ${T.orange};
      border-top: 1px solid ${T.border};
      padding-top: 1rem;
      margin-top: 1rem;
    }

    /* GLOBAL ANIMATIONS (Alternative to GSAP) */
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

    /* TESTIMONIALS CAROUSEL */
    .carousel-container {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scrollbar-width: none; /* Firefox */
      display: flex;
      gap: 1.5rem;
      padding: 1rem 0 3rem;
      scroll-behavior: smooth;
      cursor: grab;
      position: relative;
    }
    .carousel-container::-webkit-scrollbar { display: none; }
    .carousel-container:active { cursor: grabbing; }
    
    .carousel-indicators {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      padding: 1rem 0;
    }
    .carousel-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      border: none;
      cursor: pointer;
      transition: all 0.3s;
    }
    .carousel-dot.active {
      background: ${T.orange};
      transform: scale(1.2);
    }
    .carousel-dot:hover {
      background: rgba(255,98,0,0.7);
    }
    
    .carousel-item {
      min-width: 360px;
      max-width: 420px;
      flex: 0 0 auto;
      scroll-snap-align: start;
    }
    
    .bento-card {
      background: rgba(26,26,26, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,98,0,0.08);
      border-radius: 16px;
      padding: 2.5rem 2rem;
      position: relative;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }
    .bento-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 60px rgba(255,98,0,0.15);
      border-color: rgba(255,98,0,0.2);
    }
    .bento-card::before {
      content: '"';
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      font-size: 4rem;
      color: ${T.orange};
      opacity: 0.08;
      font-family: Georgia, serif;
      line-height: 1;
      transform: rotate(180deg);
    }
    .bento-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, ${T.orange}, ${T.orangeDim});
      opacity: 0;
      transition: opacity 0.3s;
    }
    .bento-card:hover::after {
      opacity: 1;
    }
    .bento-quote {
      font-size: 1rem;
      line-height: 1.8;
      color: ${T.text};
      margin-bottom: 2rem;
      font-style: italic;
      position: relative;
      z-index: 1;
    }
    .bento-rider {
      display: flex;
      align-items: center;
      gap: 1rem;
      position: relative;
      z-index: 1;
    }
    .bento-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${T.orange}, ${T.orangeDim});
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      color: #000;
      border: 2px solid rgba(255,98,0,0.2);
      box-shadow: 0 4px 12px rgba(255,98,0,0.3);
    }
    .bento-name {
      font-weight: 700;
      font-size: 0.9rem;
      color: ${T.text};
      margin-bottom: 0.25rem;
    }
    .bento-sub {
      font-family: ${T.mono};
      font-size: 0.7rem;
      color: ${T.muted};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* METRICS */
    .metrics-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      background: ${T.border};
      border: 1px solid ${T.border};
      margin-top: 3rem;
    }
    .metric-cell {
      background: ${T.bg2};
      padding: 2.5rem 2rem;
      text-align: center;
    }
    .metric-value {
      font-family: ${T.mono};
      font-size: 3rem;
      font-weight: 700;
      color: ${T.orange};
      line-height: 1;
      margin-bottom: 0.5rem;
    }
    .metric-label {
      font-size: 0.72rem;
      color: ${T.muted};
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    /* GALLERY */
    .gallery-featured {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .gallery-masonry {
      columns: 3;
      column-gap: 1rem;
    }
    @media (max-width: 768px) {
      .gallery-featured { grid-template-columns: 1fr; }
      .gallery-masonry { columns: 2; }
    }
    @media (max-width: 480px) { .gallery-masonry { columns: 1; } }
    .gallery-item {
      break-inside: avoid;
      margin-bottom: 1rem;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      display: block;
      width: 100%;
      border: 0;
      background: transparent;
      padding: 0;
      color: inherit;
      text-align: left;
    }
    .gallery-item img {
      width: 100%;
      aspect-ratio: 4 / 5;
      display: block;
      object-fit: cover;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      filter: grayscale(20%);
    }
    .gallery-featured .gallery-item {
      margin-bottom: 0;
      min-height: 360px;
    }
    .gallery-featured .gallery-item img {
      height: 100%;
      min-height: 360px;
    }
    .gallery-item:hover img { transform: scale(1.06); filter: grayscale(0%); }
    .gallery-item-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.3s;
      display: flex;
      align-items: flex-end;
      padding: 1rem;
    }
    .gallery-item:hover .gallery-item-overlay { opacity: 1; }
    .gallery-item-label {
      font-family: ${T.mono};
      font-size: 0.7rem;
      color: ${T.orange};
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .gallery-actions {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }
    .gallery-page {
      min-height: 70vh;
      background: ${T.bg2};
    }
    .gallery-page .gallery-item {
      transform-style: preserve-3d;
      will-change: transform, opacity;
      box-shadow: 0 12px 30px rgba(0,0,0,0.22);
    }
    .gallery-page .gallery-item img {
      will-change: transform, filter;
    }
    .gallery-page .gallery-item:hover img {
      transform: none;
    }
    .gallery-back-btn {
      margin-bottom: 2rem;
    }

    /* LIGHTBOX */
    .lightbox-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.95);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    .lightbox-content { position: relative; max-width: 90vw; max-height: 90vh; }
    .lightbox-content img { max-width: 90vw; max-height: 85vh; object-fit: contain; display: block; }
    .lightbox-close {
      position: absolute;
      top: -2rem;
      right: 0;
      background: none;
      border: none;
      color: ${T.orange};
      font-size: 1.5rem;
      cursor: pointer;
      font-family: ${T.mono};
    }
    .lightbox-caption {
      font-family: ${T.mono};
      font-size: 0.72rem;
      color: ${T.muted};
      text-align: center;
      margin-top: 0.75rem;
      letter-spacing: 0.1em;
    }

    /* TERMINAL CHAT */
    .contact-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3rem;
      align-items: start;
    }
    @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
    .terminal-wrap {
      background: #0a0a0a;
      border: 1px solid ${T.border};
      border-top: 2px solid ${T.orange};
      overflow: hidden;
    }
    .terminal-header {
      background: ${T.bg2};
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-bottom: 1px solid ${T.border};
    }
    .terminal-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
    }
    .terminal-title {
      font-family: ${T.mono};
      font-size: 0.68rem;
      color: ${T.muted};
      margin-left: 0.5rem;
      letter-spacing: 0.1em;
    }
    .terminal-progress-bar {
      height: 2px;
      background: ${T.border};
      position: relative;
    }
    .terminal-progress-fill {
      height: 100%;
      background: ${T.orange};
      transition: width 0.4s ease;
      box-shadow: 0 0 8px ${T.orange};
    }
    .terminal-messages {
      padding: 1.25rem;
      min-height: 300px;
      max-height: 350px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      font-family: ${T.mono};
    }
    .terminal-messages::-webkit-scrollbar { width: 2px; }
    .terminal-messages::-webkit-scrollbar-thumb { background: ${T.orange}; }
    .msg-system {
      font-size: 0.72rem;
      color: ${T.orange};
    }
    .msg-system::before { content: '> '; }
    .msg-user {
      font-size: 0.75rem;
      color: #00e5ff;
      align-self: flex-end;
    }
    .msg-user::before { content: '$ '; }
    .msg-data {
      font-size: 0.7rem;
      color: #4caf50;
    }
    .msg-data::before { content: '// '; }
    .terminal-input-row {
      border-top: 1px solid ${T.border};
      padding: 1rem 1.25rem;
      display: flex;
      gap: 0.75rem;
    }
    .terminal-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-family: ${T.mono};
      font-size: 0.8rem;
      color: ${T.text};
      caret-color: ${T.orange};
    }
    .terminal-input::placeholder { color: ${T.muted}; }
    .terminal-send {
      background: ${T.orange};
      border: none;
      color: #000;
      padding: 0.4rem 0.9rem;
      font-family: ${T.mono};
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.08em;
      transition: background 0.2s;
    }
    .terminal-send:hover { background: #ff8a00; }
    .terminal-options {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      padding: 0 1.25rem 1.25rem;
    }
    .terminal-option {
      font-family: ${T.mono};
      font-size: 0.68rem;
      background: transparent;
      border: 1px solid ${T.border};
      color: ${T.muted};
      padding: 0.35rem 0.75rem;
      cursor: pointer;
      transition: all 0.15s;
      letter-spacing: 0.06em;
    }
    .terminal-option:hover {
      border-color: ${T.orange};
      color: ${T.orange};
    }

    /* WORKSHOP INFO */
    .info-block {
      background: ${T.bg2};
      border: 1px solid ${T.border};
      padding: 2rem;
    }
    .info-row {
      display: flex;
      gap: 2rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .info-item { flex: 1; min-width: 130px; }
    .info-item-label {
      font-family: ${T.mono};
      font-size: 0.62rem;
      color: ${T.orange};
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .info-item-value {
      font-size: 0.85rem;
      color: ${T.text};
      line-height: 1.6;
    }
    .info-item-value span {
      font-family: ${T.mono};
      font-size: 0.78rem;
      color: ${T.muted};
    }
    .map-placeholder {
      background: ${T.bg3};
      border: 1px dashed ${T.border};
      height: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: border-color 0.2s;
      margin-top: 1.5rem;
    }
    .map-placeholder:hover { border-color: ${T.orange}; }
    .map-placeholder-label {
      font-family: ${T.mono};
      font-size: 0.7rem;
      color: ${T.muted};
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .contact-btns {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.25rem;
    }
    .contact-btn {
      flex: 1;
      padding: 0.7rem;
      text-align: center;
      font-family: ${T.mono};
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }
    .contact-btn.whatsapp { background: #25d366; color: #000; }
    .contact-btn.email { background: ${T.bg3}; color: ${T.text}; border: 1px solid ${T.border}; }
    .contact-btn.email:hover { border-color: ${T.orange}; color: ${T.orange}; }

    /* MODAL */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.88);
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.2s ease;
    }
    .modal-box {
      background: ${T.bg1};
      border: 1px solid ${T.border};
      border-top: 2px solid ${T.orange};
      width: 100%;
      max-width: 520px;
      padding: 2rem;
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: ${T.muted};
      cursor: pointer;
      font-size: 1.2rem;
      transition: color 0.2s;
    }
    .modal-close:hover { color: ${T.orange}; }
    .modal-step-label {
      font-family: ${T.mono};
      font-size: 0.65rem;
      color: ${T.orange};
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .modal-title {
      font-size: 1.3rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 0.5rem;
    }
    .modal-sub {
      font-size: 0.8rem;
      color: ${T.muted};
      margin-bottom: 2rem;
    }
    .modal-stepper {
      display: flex;
      gap: 4px;
      margin-bottom: 2rem;
    }
    .modal-step-dot {
      flex: 1;
      height: 3px;
      background: ${T.border};
      transition: background 0.3s;
    }
    .modal-step-dot.active { background: ${T.orange}; }
    .brand-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .brand-btn {
      background: ${T.bg2};
      border: 1px solid ${T.border};
      color: ${T.text};
      padding: 0.9rem;
      text-align: center;
      font-family: ${T.head};
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: all 0.15s;
      text-transform: uppercase;
    }
    .brand-btn:hover, .brand-btn.selected {
      border-color: ${T.orange};
      color: ${T.orange};
      background: ${T.orangeGlow};
    }
    .modal-input {
      width: 100%;
      background: ${T.bg2};
      border: 1px solid ${T.border};
      color: ${T.text};
      padding: 0.85rem 1rem;
      font-family: ${T.mono};
      font-size: 0.82rem;
      outline: none;
      transition: border-color 0.2s;
      margin-bottom: 0.75rem;
    }
    .modal-input:focus { border-color: ${T.orange}; }
    .modal-input::placeholder { color: ${T.muted}; }
    .modal-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
    }
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

    /* FOOTER */
    .footer {
      background: linear-gradient(180deg, rgba(18,18,18,0.7) 0%, rgba(14,14,14,0.95) 100%);
      backdrop-filter: blur(10px);
      position: relative;
      border-top: 1px solid rgba(255, 255, 255, 0.03);
      padding: 4rem 2rem 2rem;
      box-shadow: 0 -10px 40px rgba(0,0,0,0.4);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
    }
    @media (max-width: 768px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
    .footer-col-title {
      font-family: ${T.mono};
      font-size: 0.65rem;
      color: ${T.orange};
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
    .footer-links a {
      font-size: 0.82rem;
      color: ${T.muted};
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: ${T.orange}; }
    .footer-social { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .social-btn {
      width: 36px; height: 36px;
      border: 1px solid ${T.border};
      background: ${T.bg2};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${T.muted};
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .social-btn:hover { border-color: ${T.orange}; color: ${T.orange}; }
    .newsletter-input-row {
      display: flex;
      margin-top: 0.5rem;
    }
    .newsletter-input {
      flex: 1;
      background: ${T.bg3};
      border: 1px solid ${T.border};
      border-right: none;
      color: ${T.text};
      padding: 0.65rem 0.9rem;
      font-family: ${T.mono};
      font-size: 0.75rem;
      outline: none;
    }
    .newsletter-input::placeholder { color: ${T.muted}; }
    .newsletter-btn {
      background: ${T.orange};
      border: none;
      color: #000;
      padding: 0.65rem 1rem;
      font-family: ${T.mono};
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.06em;
      transition: background 0.2s;
    }
    .newsletter-btn:hover { background: #ff8a00; }
    .footer-bottom {
      border-top: 1px solid ${T.border};
      padding-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .footer-copy {
      font-family: ${T.mono};
      font-size: 0.68rem;
      color: ${T.muted};
      letter-spacing: 0.08em;
    }
    .footer-logo-mark {
      font-family: ${T.head};
      font-weight: 900;
      font-size: 0.9rem;
      color: ${T.orange};
      letter-spacing: 0.12em;
    }

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

    .services-section { background: ${T.bg1}; }
    .testimonials-section { background: ${T.bg0}; }
    .gallery-section { background: ${T.bg2}; }
    .contact-section { background: ${T.bg1}; }

    /* HORIZONTAL SCROLL GALLERY (TELEMETRY SHOWCASE) */
    .gallery-page-hs {
      position: relative;
      background: #000;
      color: #fff;
    }
    .hs-background {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .hs-ui-layer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      pointer-events: none;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .hs-ui-layer .gallery-back-btn {
      pointer-events: auto;
      position: fixed;
      top: 1.5rem;
      left: 1.5rem;
      z-index: 100;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
      border-color: rgba(255,255,255,0.2);
    }
    .hs-header {
      margin-top: auto;
      margin-bottom: 2rem;
    }
    .hs-title {
      font-family: ${T.head};
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      line-height: 1;
    }
    .hs-title em { color: ${T.orange}; font-style: normal; }
    .hs-wrapper {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      z-index: 5;
    }
    .hs-content {
      display: flex;
      height: 100%;
      align-items: center;
      width: max-content;
      padding: 0;
    }
    .hs-spacer {
      width: 30vw;
      flex-shrink: 0;
    }
    .hs-item {
      width: 400px;
      height: 60vh;
      margin-right: 4vw;
      flex-shrink: 0;
      cursor: pointer;
      position: relative;
    }
    .hs-item-inner {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .hs-item-img-wrap {
      flex: 1;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.1);
      background: #111;
    }
    .hs-item-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(80%) contrast(1.2);
      transition: filter 0.4s ease, transform 0.4s ease;
      display: block;
    }
    .hs-item:hover .hs-item-img {
      filter: grayscale(0%) contrast(1.1);
      transform: scale(1.05);
    }
    .hs-item-overlay {
      position: absolute;
      inset: 0;
      background: rgba(255,98,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
      color: #fff;
    }
    .hs-item:hover .hs-item-overlay {
      opacity: 1;
    }
    .hs-item-meta {
      font-family: ${T.mono};
    }
    .hs-item-meta h3 {
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    .hs-stats {
      font-size: 0.75rem;
      color: ${T.orange};
      letter-spacing: 0.05em;
    }

    /* LIGHTBOX FS (TELEMETRY VIEW) */
    .lightbox-fs {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .lightbox-fs-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      z-index: 100;
      background: none;
      border: none;
      color: #fff;
      font-size: 3rem;
      line-height: 1;
      cursor: pointer;
      font-family: ${T.mono};
      mix-blend-mode: difference;
    }
    .lightbox-fs-img-container {
      position: relative;
      width: 100vw;
      height: 100vh;
    }
    .lightbox-hero-img {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .lightbox-hero-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .lightbox-telemetry {
      position: absolute;
      bottom: 4rem;
      left: 4rem;
      z-index: 20;
      pointer-events: none;
    }
    .lightbox-telemetry h2 {
      font-family: ${T.head};
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-bottom: 2rem;
      color: #fff;
    }
    .telemetry-grid {
      display: flex;
      gap: 2rem;
    }
    .t-box {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: ${T.mono};
    }
    .t-box span {
      font-size: 0.65rem;
      color: ${T.muted};
      letter-spacing: 0.2em;
    }
    .t-box strong {
      font-size: 1.1rem;
      color: ${T.orange};
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    @media (max-width: 768px) {
      .hs-item { width: 300px; height: 50vh; }
      .lightbox-telemetry { bottom: 2rem; left: 2rem; right: 2rem; }
      .telemetry-grid { flex-direction: column; gap: 1rem; }
    }

    .orange-text { color: ${T.orange}; }
    .mono-text { font-family: ${T.mono}; }
  `}</style>
);
