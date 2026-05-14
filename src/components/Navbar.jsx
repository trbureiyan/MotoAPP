import { useState } from 'react';

export function Navbar({ onBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="nav-root">
      <a className="nav-logo" href="#" onClick={closeMobileMenu}>MOTO.Taller</a>

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
