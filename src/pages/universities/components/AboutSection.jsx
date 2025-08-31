import React from 'react';
import { FiBookOpen, FiUsers, FiGlobe, FiMapPin } from 'react-icons/fi';

const AboutSection = ({ name, description, studentCount, faculties }) => (
  <section className="card about-card">
    <div className="about-header">
      <FiBookOpen className="about-icon" />
      <h3>Sobre la universidad</h3>
    </div>
    {description && <p>{description}</p>}
    <div className="stats-grid">
      <div className="stat-card">
        <FiUsers className="stat-icon" />
        <div className="stat-text">
          <span className="stat-label">Cantidad de alumnos</span>
          <span className="stat-value">{studentCount ? studentCount.toLocaleString() : ''}</span>
        </div>
      </div>
      <div className="stat-card">
        <FiGlobe className="stat-icon" />
        <div className="stat-text">
          <span className="stat-label">Convenios internacionales</span>
          <span className="stat-value"></span>
        </div>
      </div>
      <div className="stat-card">
        <FiBookOpen className="stat-icon" />
        <div className="stat-text">
          <span className="stat-label">Carreras disponibles</span>
          <span className="stat-value">{faculties?.length > 0 ? faculties.length : ''}</span>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;


