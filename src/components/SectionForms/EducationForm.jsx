import React, { useState } from 'react';

const EducationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    educaciones: [
      {
        id: Date.now(),
        institucion: '',
        carrera: '',
        ano_inicio: '',
        ano_fin: '',
        descripcion: ''
      }
    ]
  });

  const handleChange = (index, field, value) => {
    const updatedEducaciones = [...formData.educaciones];
    updatedEducaciones[index] = {
      ...updatedEducaciones[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      educaciones: updatedEducaciones
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      educaciones: [
        ...prev.educaciones,
        {
          id: Date.now(),
          institucion: '',
          carrera: '',
          ano_inicio: '',
          ano_fin: '',
          descripcion: ''
        }
      ]
    }));
  };

  const removeEducation = (index) => {
    if (formData.educaciones.length > 1) {
      setFormData(prev => ({
        ...prev,
        educaciones: prev.educaciones.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="section-form">
      <h3>Agregar Sección Educación</h3>
      <form onSubmit={handleSubmit}>
        {formData.educaciones.map((edu, index) => (
          <div key={edu.id} className="education-item">
            <div className="form-group">
              <label>Institución</label>
              <input
                type="text"
                value={edu.institucion}
                onChange={(e) => handleChange(index, 'institucion', e.target.value)}
                placeholder="Nombre de la institución"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Carrera</label>
              <input
                type="text"
                value={edu.carrera}
                onChange={(e) => handleChange(index, 'carrera', e.target.value)}
                placeholder="Carrera"
              />
            </div>
            
            <div className="form-group">
              <label>Año de inicio</label>
              <input
                type="number"
                value={edu.ano_inicio}
                onChange={(e) => handleChange(index, 'ano_inicio', e.target.value)}
                placeholder="Ej: 2021"
                required
              />
            </div>

            <div className="form-group">
              <label>Año de fin</label>
              <input
                type="number"
                value={edu.ano_fin}
                onChange={(e) => handleChange(index, 'ano_fin', e.target.value)}
                placeholder="Ej: 2025"
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={edu.descripcion}
                onChange={(e) => handleChange(index, 'descripcion', e.target.value)}
                placeholder="educacion secundaria"
                rows={3}
              />
            </div>
            
            {formData.educaciones.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addEducation}
          className="btn btn-light"
        >
          + Agregar otra educación
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

export default EducationForm;
