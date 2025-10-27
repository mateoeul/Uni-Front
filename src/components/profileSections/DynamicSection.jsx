// src/components/profileSections/DynamicSection.jsx
import React from 'react';
import AboutSection from './AboutSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import EventsTable from './EventsTable';
import ActivitySection from './ActivitySection';
import PostsSection from './PostsSection';

// Registry de componentes de sección
const SECTION_COMPONENTS = {
  'About': AboutSection,
  'Educación': EducationSection,
  'Education': EducationSection,
  'Proyectos': ProjectsSection,
  'Projects': ProjectsSection,
  'Eventos': EventsTable,
  'Events': EventsTable,
  'Actividad': ActivitySection,
  'Activity': ActivitySection,
  'Publicaciones': PostsSection,
  'Posts': PostsSection,
};

const DynamicSection = ({ section, edit = false, isOwnProfile = false, onUpdate, onEditSection, onDelete, onSave, onCancelEdit }) => {
  const { seccion, config, datos } = section;
  
  // Obtener el componente correspondiente al tipo de sección
  const SectionComponent = SECTION_COMPONENTS[seccion.nombre];
  // Buscar id_perfil_x_seccion a nivel de datos de la tabla específica
  const dataLevelId = Array.isArray(datos)
    ? (datos.find(d => d && (d.id_perfil_x_seccion || (d.config && d.config.id_perfil_x_seccion)))?.id_perfil_x_seccion
      || datos.find(d => d && d.config && d.config.id_perfil_x_seccion)?.config?.id_perfil_x_seccion)
    : (datos && (datos.id_perfil_x_seccion || (datos.config && datos.config.id_perfil_x_seccion)));

  const deleteId = section.id_perfil_x_seccion 
    || (section.config && section.config.id_perfil_x_seccion)
    || dataLevelId
    || (section.config && section.config.id)
    || section.id
    || (section.seccion && section.seccion.id_perfil_x_seccion);

  const handleDeleteClick = () => {
    if (!onDelete) return;
    if (!deleteId) {
      console.warn('No se encontró id_perfil_x_seccion para borrar esta sección:', section);
      window.alert('No se pudo identificar la sección a eliminar (id_perfil_x_seccion no encontrado).');
      return;
    }
    onDelete(deleteId);
  };
  
  if (!SectionComponent) {
    // Si no hay componente específico, mostrar una sección genérica
    return (
      <div className="profile-section">
        <div className="section-header">
          <h3>{seccion.nombre}</h3>
          {isOwnProfile && !edit && (
            <div className="section-actions" style={{ display: 'flex', gap: 8 }}>
              <button 
                className="edit-section-btn" 
                onClick={() => onEditSection && onEditSection(section.id)}
                title="Editar sección"
              >
                ✏️
              </button>
              <button
                className="delete-section-btn"
                onClick={handleDeleteClick}
                title="Eliminar sección"
                style={{ color: '#dc2626' }}
              >
                🗑️
              </button>
            </div>
          )}
          {isOwnProfile && edit && (
            <div className="section-actions" style={{ display: 'flex', gap: 8 }}>
              <button 
                className="save-section-btn" 
                onClick={() => onSave && onSave(section, deleteId)}
                title="Guardar cambios"
              >
                💾 Guardar
              </button>
              <button 
                className="cancel-section-btn" 
                onClick={() => onCancelEdit && onCancelEdit()}
                title="Cancelar edición"
              >
                ✖ Cancelar
              </button>
            </div>
          )}
        </div>
        <p>{seccion.descripcion}</p>
        {datos && datos.length > 0 && (
          <div className="section-data">
            {datos.map((data, index) => (
              <div key={index} className="data-item">
                {Object.entries(data).map(([key, value]) => (
                  key !== 'id' && key !== 'id_perfil_x_seccion' && (
                    <div key={key}>
                      <strong>{key}:</strong> {value}
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // Renderizar el componente específico
  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>{seccion.nombre}</h3>
        {isOwnProfile && !edit && (
          <div className="section-actions" style={{ display: 'flex', gap: 8 }}>
            <button 
              className="edit-section-btn" 
              onClick={() => onEditSection && onEditSection(section.id)}
              title="Editar sección"
            >
              ✏️
            </button>
            <button
              className="delete-section-btn"
              onClick={handleDeleteClick}
              title="Eliminar sección"
              style={{ color: '#dc2626' }}
            >
              🗑️
            </button>
          </div>
        )}
        {isOwnProfile && edit && (
          <div className="section-actions" style={{ display: 'flex', gap: 8 }}>
            <button 
              className="save-section-btn" 
              onClick={() => onSave && onSave(section, deleteId)}
              title="Guardar cambios"
            >
              💾 Guardar
            </button>
            <button 
              className="cancel-section-btn" 
              onClick={() => onCancelEdit && onCancelEdit()}
              title="Cancelar edición"
            >
              ✖ Cancelar
            </button>
          </div>
        )}
      </div>
      <SectionComponent
        section={section}
        edit={edit}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default DynamicSection;
