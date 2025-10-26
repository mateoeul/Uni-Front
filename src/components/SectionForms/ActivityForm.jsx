import React, { useState } from 'react';

const ActivityForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    actividades: [
      {
        id: Date.now(),
        text: '',
        date: new Date().toISOString().slice(0, 10)
      }
    ]
  });

  const handleChange = (index, field, value) => {
    const updatedActividades = [...formData.actividades];
    updatedActividades[index] = {
      ...updatedActividades[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      actividades: updatedActividades
    }));
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      actividades: [
        ...prev.actividades,
        {
          id: Date.now(),
          text: '',
          date: new Date().toISOString().slice(0, 10)
        }
      ]
    }));
  };

  const removeActivity = (index) => {
    if (formData.actividades.length > 1) {
      setFormData(prev => ({
        ...prev,
        actividades: prev.actividades.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="section-form">
      <h3>Agregar Sección Actividad</h3>
      <form onSubmit={handleSubmit}>
        {formData.actividades.map((activity, index) => (
          <div key={activity.id} className="activity-item">
            <div className="form-group">
              <label>Descripción de la Actividad</label>
              <input
                type="text"
                value={activity.text}
                onChange={(e) => handleChange(index, 'text', e.target.value)}
                placeholder="Ej: Seguiste a Universidad de Buenos Aires"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                value={activity.date}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
                required
              />
            </div>
            
            {formData.actividades.length > 1 && (
              <button
                type="button"
                onClick={() => removeActivity(index)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addActivity}
          className="btn btn-light"
        >
          + Agregar otra actividad
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

export default ActivityForm;
