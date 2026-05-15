import { useState } from 'react';

export function Navbar({ onBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const handleLogoClick = () => {
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="nav-root">
      <button
        className="nav-logo"
        type="button"
        onClick={handleLogoClick}
        aria-label="Ir al inicio"
      >
        MOTO.Taller
      </button>

      <ul className="nav-links">
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#taller">El Taller</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>

      <button className="btn-orange nav-desktop-cta" onClick={onBooking}>RESERVAR CITA</button>

      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-mobile-links">
          <li><a href="#servicios" onClick={closeMobileMenu}>Servicios</a></li>
          <li><a href="#taller" onClick={closeMobileMenu}>El Taller</a></li>
          <li><a href="#contacto" onClick={closeMobileMenu}>Contacto</a></li>
        </ul>
        <div className="nav-mobile-cta">
          <button className="btn-orange" onClick={() => { onBooking(); closeMobileMenu(); }}>
            RESERVAR CITA
          </button>
        </div>
      </div>
    </nav>
  );
}
