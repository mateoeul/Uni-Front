// src/components/profileSections/ProjectsSection.jsx
import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const ProjectsSection = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Convertir datos del backend al formato esperado
  const projects = Array.isArray(datos) ? datos : (datos ? [datos] : []);
  
  const handleAdd = () => {
    if (onUpdate) {
      const newProject = {
        id: Date.now(),
        name: '',
        period: '',
        summary: '',
        details: ''
      };
      onUpdate(section, [...projects, newProject]);
    }
  };
  
  const handleUpdate = (idx, key, value) => {
    if (onUpdate) {
      const updatedProjects = [...projects];
      updatedProjects[idx] = { ...updatedProjects[idx], [key]: value };
      onUpdate(section, updatedProjects);
    }
  };
  
  const handleRemove = (idx) => {
    if (onUpdate) {
      const updatedProjects = projects.filter((_, i) => i !== idx);
      onUpdate(section, updatedProjects);
    }
  };
  
  return (
    <div className="projects-section">
      {edit && (
        <button className="btn btn-light" onClick={handleAdd}>
          Agregar proyecto
        </button>
      )}
      
      <div className="section-content">
        {projects.length > 0 ? (
          projects.map((project, idx) => (
            <div
              className="project-item"
              key={project.id || idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                padding: 16,
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <FaBriefcase style={{ color: '#2563eb', flexShrink: 0, marginTop: 2 }} />
              <div className="project-item__content" style={{ width: '100%' }}>
                {!edit ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      {(() => {
                        const title = project.titulo || project.name || project.nombre || '';
                        const href = project.link;
                        if (title && href) {
                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#1d4ed8', textDecoration: 'none' }}
                            >
                              <strong style={{ fontSize: 16 }}>{title}</strong>
                            </a>
                          );
                        }
                        return <strong style={{ fontSize: 16, color: '#111827' }}>{title}</strong>;
                      })()}
                      {(project.periodo || project.period) && (
                        <span
                          style={{
                            background: '#eef2ff',
                            color: '#3730a3',
                            padding: '2px 10px',
                            borderRadius: 999,
                            fontSize: 12,
                          }}
                        >
                          {project.periodo || project.period}
                        </span>
                      )}
                    </div>
                    {(project.descripcion || project.summary || project.resumen) && (
                      <p style={{ marginTop: 6, color: '#111827' }}>
                        {project.descripcion || project.summary || project.resumen}
                      </p>
                    )}
                    {(project.details || project.detalles) && (
                      <p style={{ marginTop: 2, color: '#475569' }}>
                        {project.details || project.detalles}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="form-grid">
                    <input 
                      className="input" 
                      value={project.name || project.nombre || ''} 
                      onChange={(e) => handleUpdate(idx, 'name', e.target.value)} 
                      placeholder="Nombre del proyecto" 
                    />
                    <input 
                      className="input" 
                      value={project.period || project.periodo || ''} 
                      onChange={(e) => handleUpdate(idx, 'period', e.target.value)} 
                      placeholder="Período" 
                    />
                    <textarea 
                      className="textarea" 
                      rows={3} 
                      value={project.summary || project.resumen || ''} 
                      onChange={(e) => handleUpdate(idx, 'summary', e.target.value)} 
                      placeholder="Resumen" 
                    />
                    <textarea 
                      className="textarea" 
                      rows={3} 
                      value={project.details || project.detalles || ''} 
                      onChange={(e) => handleUpdate(idx, 'details', e.target.value)} 
                      placeholder="Detalles" 
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
            <p>No hay proyectos disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
