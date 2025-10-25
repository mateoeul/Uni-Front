// src/components/profileSections/ActivitySection.jsx
import React from 'react';

const ActivitySection = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Convertir datos del backend al formato esperado
  const activity = datos || [];
  
  return (
    <div className="activity-section">
      <div className="section-content">
        {activity.length > 0 ? (
          activity.map((item, idx) => (
            <div key={item.id || idx} className="activity-item">
              <small className="muted">{item.date || item.fecha}</small> — {item.text || item.texto}
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>No hay actividad reciente.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
