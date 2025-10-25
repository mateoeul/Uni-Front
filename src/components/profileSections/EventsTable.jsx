// src/components/profileSections/EventsTable.jsx
import React from 'react';

const EventsTable = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Convertir datos del backend al formato esperado
  const events = datos || [];
  
  const handleAdd = () => {
    if (onUpdate) {
      const newEvent = {
        id: Date.now(),
        evento: '',
        fecha: '',
        modalidad: ''
      };
      onUpdate(section, [...events, newEvent]);
    }
  };
  
  const handleUpdate = (idx, key, value) => {
    if (onUpdate) {
      const updatedEvents = [...events];
      updatedEvents[idx] = { ...updatedEvents[idx], [key]: value };
      onUpdate(section, updatedEvents);
    }
  };
  
  const handleRemove = (idx) => {
    if (onUpdate) {
      const updatedEvents = events.filter((_, i) => i !== idx);
      onUpdate(section, updatedEvents);
    }
  };
  
  return (
    <div className="events-section">
      {edit && (
        <button className="btn btn-light" onClick={handleAdd}>
          Agregar evento
        </button>
      )}
      
      <div className="section-content">
        {events.length > 0 ? (
          <div className="events-table-wrapper">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Fecha</th>
                  <th>Modalidad</th>
                  {edit && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {events.map((event, idx) => (
                  <tr key={event.id || idx}>
                    {!edit ? (
                      <>
                        <td>{event.evento || event.nombre}</td>
                        <td>{event.fecha}</td>
                        <td>{event.modalidad}</td>
                      </>
                    ) : (
                      <>
                        <td>
                          <input 
                            className="input" 
                            value={event.evento || event.nombre || ''} 
                            onChange={(e) => handleUpdate(idx, 'evento', e.target.value)} 
                            placeholder="Nombre del evento" 
                          />
                        </td>
                        <td>
                          <input 
                            className="input" 
                            value={event.fecha || ''} 
                            onChange={(e) => handleUpdate(idx, 'fecha', e.target.value)} 
                            placeholder="Fecha" 
                          />
                        </td>
                        <td>
                          <input 
                            className="input" 
                            value={event.modalidad || ''} 
                            onChange={(e) => handleUpdate(idx, 'modalidad', e.target.value)} 
                            placeholder="Modalidad" 
                          />
                        </td>
                        <td>
                          <button 
                            className="icon-button" 
                            onClick={() => handleRemove(idx)} 
                            title="Eliminar"
                          >
                            ×
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <p>No hay eventos programados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsTable;
