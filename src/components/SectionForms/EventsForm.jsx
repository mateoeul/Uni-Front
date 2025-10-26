import React, { useState } from 'react';

const EventsForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    eventos: [
      {
        id: Date.now(),
        evento: '',
        fecha: '',
        modalidad: ''
      }
    ]
  });

  const handleChange = (index, field, value) => {
    const updatedEventos = [...formData.eventos];
    updatedEventos[index] = {
      ...updatedEventos[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      eventos: updatedEventos
    }));
  };

  const addEvent = () => {
    setFormData(prev => ({
      ...prev,
      eventos: [
        ...prev.eventos,
        {
          id: Date.now(),
          evento: '',
          fecha: '',
          modalidad: ''
        }
      ]
    }));
  };

  const removeEvent = (index) => {
    if (formData.eventos.length > 1) {
      setFormData(prev => ({
        ...prev,
        eventos: prev.eventos.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="section-form">
      <h3>Agregar Sección Eventos</h3>
      <form onSubmit={handleSubmit}>
        {formData.eventos.map((event, index) => (
          <div key={event.id} className="event-item">
            <div className="form-group">
              <label>Nombre del Evento</label>
              <input
                type="text"
                value={event.evento}
                onChange={(e) => handleChange(index, 'evento', e.target.value)}
                placeholder="Nombre del evento"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Fecha</label>
              <input
                type="text"
                value={event.fecha}
                onChange={(e) => handleChange(index, 'fecha', e.target.value)}
                placeholder="Ej: 15 Sep 2025, 10:00"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Modalidad</label>
              <select
                value={event.modalidad}
                onChange={(e) => handleChange(index, 'modalidad', e.target.value)}
                required
              >
                <option value="">Seleccionar modalidad</option>
                <option value="Presencial">Presencial</option>
                <option value="Online">Online</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>
            
            {formData.eventos.length > 1 && (
              <button
                type="button"
                onClick={() => removeEvent(index)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addEvent}
          className="btn btn-light"
        >
          + Agregar otro evento
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

export default EventsForm;
