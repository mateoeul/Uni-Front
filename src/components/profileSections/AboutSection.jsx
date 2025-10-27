// src/components/profileSections/AboutSection.jsx
import React, { useEffect, useState } from 'react';

const AboutSection = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Obtener la descripción de los datos
  const descripcion = datos && datos.length > 0 ? datos[0].descripcion : '';
  const [text, setText] = useState(descripcion || '');

  useEffect(() => {
    setText(descripcion || '');
  }, [descripcion, edit]);
  
  const handleChange = (value) => {
    setText(value);
    if (onUpdate) {
      onUpdate(section, { descripcion: value });
    }
  };
  
  return (
    <div className="about-section">
      <div className="section-content">
        {edit ? (
          <textarea
            className="textarea"
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Escribe tu descripción..."
            rows={2}
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
