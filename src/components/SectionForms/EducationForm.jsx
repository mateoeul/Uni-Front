import React, { useState } from 'react';

const EducationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    educaciones: [
      {
        id: Date.now(),
        school: '',
        title: '',
        period: '',
        icon: 'cap'
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
          school: '',
          title: '',
          period: '',
          icon: 'cap'
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
                value={edu.school}
                onChange={(e) => handleChange(index, 'school', e.target.value)}
                placeholder="Nombre de la institución"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Título / Descripción</label>
              <input
                type="text"
                value={edu.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="Título obtenido o descripción"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Período</label>
              <input
                type="text"
                value={edu.period}
                onChange={(e) => handleChange(index, 'period', e.target.value)}
                placeholder="Ej: 2020-2024"
                required
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
