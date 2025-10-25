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

const DynamicSection = ({ section, edit = false, isOwnProfile = false, onUpdate, onEditSection }) => {
  const { seccion, config, datos } = section;
  
  // Obtener el componente correspondiente al tipo de sección
  const SectionComponent = SECTION_COMPONENTS[seccion.nombre];
  
  if (!SectionComponent) {
    // Si no hay componente específico, mostrar una sección genérica
    return (
      <div className="profile-section">
        <div className="section-header">
          <h3>{seccion.nombre}</h3>
          {isOwnProfile && !edit && (
            <button 
              className="edit-section-btn" 
              onClick={() => onEditSection && onEditSection(section.id)}
              title="Editar sección"
            >
              ✏️
            </button>
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
          <button 
            className="edit-section-btn" 
            onClick={() => onEditSection && onEditSection(section.id)}
            title="Editar sección"
          >
            ✏️
          </button>
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
