import React from 'react';
import { FiBookOpen, FiUsers, FiGlobe, FiMapPin } from 'react-icons/fi';

const AboutSection = ({ name, faculties }) => (
  <section className="card about-card">
    <div className="about-header">
      <FiBookOpen className="about-icon" />
      <h3>Sobre la universidad</h3>
    </div>
    <p>
      {name} es reconocida por su modelo académico innovador y su oferta en {faculties.join(', ')}. Ofrece modalidades presenciales, online y combinadas.
    </p>
    <div className="stats-grid">
      <div className="stat-card">
        <FiUsers className="stat-icon" />
        <div className="stat-text">
          <span className="stat-label">Cantidad de</span>
          <span className="stat-label">alumnos:</span>
          <span className="stat-value">+15.000</span>
        </div>
      </div>
      <div className="stat-card">
        <FiGlobe className="stat-icon" />
        <div className="stat-text">
          <span className="stat-label">Convenios</span>
          <span className="stat-label">internacionales:</span>
          <span className="stat-value">35</span>
        </div>
      </div>
      <div className="stat-card">
        <FiMapPin className="stat-icon" />
        <div className="stat-text">
          <span className="stat-label">Ubicación:</span>
          <span className="stat-value">Recoleta, CABA</span>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;


