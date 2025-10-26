import React, { useState } from 'react';

const ProjectsForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    proyectos: [
      {
        id: Date.now(),
        name: '',
        period: '',
        summary: '',
        details: ''
      }
    ]
  });

  const handleChange = (index, field, value) => {
    const updatedProyectos = [...formData.proyectos];
    updatedProyectos[index] = {
      ...updatedProyectos[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      proyectos: updatedProyectos
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      proyectos: [
        ...prev.proyectos,
        {
          id: Date.now(),
          name: '',
          period: '',
          summary: '',
          details: ''
        }
      ]
    }));
  };

  const removeProject = (index) => {
    if (formData.proyectos.length > 1) {
      setFormData(prev => ({
        ...prev,
        proyectos: prev.proyectos.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="section-form">
      <h3>Agregar Sección Proyectos</h3>
      <form onSubmit={handleSubmit}>
        {formData.proyectos.map((project, index) => (
          <div key={project.id} className="project-item">
            <div className="form-group">
              <label>Nombre del Proyecto</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="Nombre del proyecto"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Período</label>
              <input
                type="text"
                value={project.period}
                onChange={(e) => handleChange(index, 'period', e.target.value)}
                placeholder="Ej: 2023-2024"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Resumen</label>
              <textarea
                value={project.summary}
                onChange={(e) => handleChange(index, 'summary', e.target.value)}
                placeholder="Breve descripción del proyecto"
                rows={3}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Detalles</label>
              <textarea
                value={project.details}
                onChange={(e) => handleChange(index, 'details', e.target.value)}
                placeholder="Detalles adicionales del proyecto"
                rows={3}
              />
            </div>
            
            {formData.proyectos.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addProject}
          className="btn btn-light"
        >
          + Agregar otro proyecto
        </button>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Agregar Sección
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectsForm;
