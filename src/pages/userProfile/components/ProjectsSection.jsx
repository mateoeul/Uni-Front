import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const ProjectsSection = ({ projects, edit, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="section">
      <div className="section__header">
        <h3 className="section__title">Proyectos</h3>
        {edit && (
          <button className="btn btn-light" onClick={onAdd}>Agregar</button>
        )}
      </div>
      {projects.map((p, idx) => (
        <div className="project-item" key={p.id}>
          <FaBriefcase />
          <div className="project-item__content">
            {!edit ? (
              <>
                <strong>{p.name}</strong>
                <div><small>{p.period}</small></div>
                <p>{p.summary}</p>
                <p>{p.details}</p>
              </>
            ) : (
              <div className="form-grid">
                <input className="input" value={p.name} onChange={(e) => onUpdate(idx, 'name', e.target.value)} placeholder="Nombre del proyecto" />
                <input className="input" value={p.period} onChange={(e) => onUpdate(idx, 'period', e.target.value)} placeholder="Período" />
                <textarea className="textarea" rows={3} value={p.summary} onChange={(e) => onUpdate(idx, 'summary', e.target.value)} placeholder="Resumen" />
                <textarea className="textarea" rows={3} value={p.details} onChange={(e) => onUpdate(idx, 'details', e.target.value)} placeholder="Detalles" />
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

export default ProjectsSection;
