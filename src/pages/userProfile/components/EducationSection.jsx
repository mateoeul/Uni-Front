import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const EducationSection = ({ education, edit, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="section">
      <div className="section__header">
        <h3 className="section__title">Educación</h3>
        {edit && (
          <button className="btn btn-light" onClick={onAdd}>Agregar</button>
        )}
      </div>
      {education.map((edu, idx) => (
        <div className="edu-item" key={edu.id}>
          {edu.icon === 'ort' ? (
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/ORT_Argentina.svg/2560px-ORT_Argentina.svg.png" alt="ORT" style={{ height: 24 }} />
          ) : (
            <FaGraduationCap />
          )}
          <div className="edu-item__content">
            {!edit ? (
              <>
                <strong>{edu.school}</strong>
                <div>{edu.title}</div>
                <small>{edu.period}</small>
              </>
            ) : (
              <div className="form-grid">
                <input className="input" value={edu.school} onChange={(e) => onUpdate(idx, 'school', e.target.value)} placeholder="Institución" />
                <input className="input" value={edu.title} onChange={(e) => onUpdate(idx, 'title', e.target.value)} placeholder="Título / Descripción" />
                <input className="input" value={edu.period} onChange={(e) => onUpdate(idx, 'period', e.target.value)} placeholder="Período" />
              </div>
            )}
          </div>
          {edit && (
            <button className="icon-button" onClick={() => onRemove(idx)} title="Eliminar">×</button>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationSection;
