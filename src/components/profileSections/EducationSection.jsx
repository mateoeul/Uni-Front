// src/components/profileSections/EducationSection.jsx
import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const EducationSection = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Convertir datos del backend al formato esperado
  const education = datos || [];
  
  const handleAdd = () => {
    if (onUpdate) {
      const newEducation = {
        id: Date.now(),
        school: '',
        title: '',
        period: '',
        icon: 'cap'
      };
      onUpdate(section, [...education, newEducation]);
    }
  };
  
  const handleUpdate = (idx, key, value) => {
    if (onUpdate) {
      const updatedEducation = [...education];
      updatedEducation[idx] = { ...updatedEducation[idx], [key]: value };
      onUpdate(section, updatedEducation);
    }
  };
  
  const handleRemove = (idx) => {
    if (onUpdate) {
      const updatedEducation = education.filter((_, i) => i !== idx);
      onUpdate(section, updatedEducation);
    }
  };
  
  return (
    <div className="profile-section education-section">
      <div className="section-header">
        <h3>{seccion.nombre}</h3>
        <p className="section-description">{seccion.descripcion}</p>
        {edit && (
          <button className="btn btn-light" onClick={handleAdd}>
            Agregar educación
          </button>
        )}
      </div>
      
      <div className="section-content">
        {education.length > 0 ? (
          education.map((edu, idx) => (
            <div className="edu-item" key={edu.id || idx}>
              {edu.icon === 'ort' ? (
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/ORT_Argentina.svg/2560px-ORT_Argentina.svg.png" 
                  alt="ORT" 
                  style={{ height: 24 }} 
                />
              ) : (
                <FaGraduationCap />
              )}
              <div className="edu-item__content">
                {!edit ? (
                  <>
                    <strong>{edu.school || edu.institucion}</strong>
                    <div>{edu.title || edu.titulo}</div>
                    <small>{edu.period || edu.periodo}</small>
                  </>
                ) : (
                  <div className="form-grid">
                    <input 
                      className="input" 
                      value={edu.school || edu.institucion || ''} 
                      onChange={(e) => handleUpdate(idx, 'school', e.target.value)} 
                      placeholder="Institución" 
                    />
                    <input 
                      className="input" 
                      value={edu.title || edu.titulo || ''} 
                      onChange={(e) => handleUpdate(idx, 'title', e.target.value)} 
                      placeholder="Título / Descripción" 
                    />
                    <input 
                      className="input" 
                      value={edu.period || edu.periodo || ''} 
                      onChange={(e) => handleUpdate(idx, 'period', e.target.value)} 
                      placeholder="Período" 
                    />
                  </div>
                )}
              </div>
              {edit && (
                <button 
                  className="icon-button" 
                  onClick={() => handleRemove(idx)} 
                  title="Eliminar"
                >
                  ×
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>No hay información de educación disponible.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationSection;
