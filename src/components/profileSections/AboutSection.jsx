// src/components/profileSections/AboutSection.jsx
import React from 'react';

const AboutSection = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Obtener la descripción de los datos
  const descripcion = datos && datos.length > 0 ? datos[0].descripcion : '';
  
  const handleChange = (value) => {
    if (onUpdate) {
      onUpdate(section, { descripcion: value });
    }
  };
  
  return (
    <div className="profile-section about-section">
      <div className="section-header">
        <h3>{seccion.nombre}</h3>
        <p className="section-description">{seccion.descripcion}</p>
      </div>
      
      <div className="section-content">
        {edit ? (
          <textarea
            className="textarea"
            value={descripcion}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Escribe tu descripción..."
            rows={4}
          />
        ) : (
          <div className="about-text">
            {descripcion || 'No hay descripción disponible.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
