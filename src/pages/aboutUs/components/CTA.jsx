import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="about-cta">
      <div className="container cta-card">
        <p className="cta-title">¿Querés colaborar con nosotros?</p>
        <p className="cta-sub">Escribinos o sumate al equipo. Siempre estamos abiertos a ideas nuevas.</p>
        <div className="cta-actions">
          <Link to="/contacto" className="btn btn-primary btn-contact">Contáctanos</Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;


