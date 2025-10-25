// src/components/profileSections/ProjectsSection.jsx
import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const ProjectsSection = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Convertir datos del backend al formato esperado
  const projects = datos || [];
  
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
            <div className="project-item" key={project.id || idx}>
              <FaBriefcase />
              <div className="project-item__content">
                {!edit ? (
                  <>
                    <strong>{project.name || project.nombre}</strong>
                    <div><small>{project.period || project.periodo}</small></div>
                    <p>{project.summary || project.resumen}</p>
                    <p>{project.details || project.detalles}</p>
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
