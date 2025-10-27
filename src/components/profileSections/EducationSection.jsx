// src/components/profileSections/EducationSection.jsx
import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const EducationSection = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Convertir datos del backend al formato esperado
  const education = Array.isArray(datos) ? datos : (datos ? [datos] : []);
  
  const handleAdd = () => {
    if (onUpdate) {
      const newEducation = {
        id: Date.now(),
        institucion: '',
        carrera: '',
        ano_inicio: '',
        ano_fin: '',
        descripcion: ''
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
    <div className="education-section">
      {edit && (
        <button className="btn btn-light" onClick={handleAdd}>
          Agregar educación
        </button>
      )}
      
      <div className="section-content">
        {education.length > 0 ? (
          education.map((edu, idx) => (
            <div className="edu-item" key={edu.id || idx}>
              <FaGraduationCap />
              <div className="edu-item__content">
                {!edit ? (
                  <>
                    <strong>{edu.institucion || edu.school}</strong>
                    {(edu.carrera || edu.title) && <div>{edu.carrera || edu.title}</div>}
                    {(edu.ano_inicio || edu.ano_fin || edu.period) && (
                      <small>
                        {edu.ano_inicio || ''}
                        {(edu.ano_inicio || edu.ano_fin) && ' - '}
                        {edu.ano_fin || ''}
                        {!edu.ano_inicio && !edu.ano_fin && (edu.period || '')}
                      </small>
                    )}
                    {edu.descripcion && <p>{edu.descripcion}</p>}
                  </>
                ) : (
                  <div className="form-grid">
                    <input 
                      className="input" 
                      value={edu.institucion || edu.school || ''} 
                      onChange={(e) => handleUpdate(idx, 'institucion', e.target.value)} 
                      placeholder="Institución" 
                    />
                    <input 
                      className="input" 
                      value={edu.carrera || edu.title || ''} 
                      onChange={(e) => handleUpdate(idx, 'carrera', e.target.value)} 
                      placeholder="Carrera" 
                    />
                    <input 
                      className="input" 
                      type="number"
                      value={edu.ano_inicio || ''} 
                      onChange={(e) => handleUpdate(idx, 'ano_inicio', e.target.value)} 
                      placeholder="Año inicio" 
                    />
                    <input 
                      className="input" 
                      type="number"
                      value={edu.ano_fin || ''} 
                      onChange={(e) => handleUpdate(idx, 'ano_fin', e.target.value)} 
                      placeholder="Año fin" 
                    />
                    <textarea 
                      className="textarea" 
                      rows={3}
                      value={edu.descripcion || ''} 
                      onChange={(e) => handleUpdate(idx, 'descripcion', e.target.value)} 
                      placeholder="Descripción" 
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
