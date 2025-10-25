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

const DynamicSection = ({ section, edit = false, onUpdate }) => {
  const { seccion, config, datos } = section;
  
  // Obtener el componente correspondiente al tipo de sección
  const SectionComponent = SECTION_COMPONENTS[seccion.nombre];
  
  if (!SectionComponent) {
    // Si no hay componente específico, mostrar una sección genérica
    return (
      <div className="profile-section">
        <h3>{seccion.nombre}</h3>
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
    <SectionComponent
      section={section}
      edit={edit}
      onUpdate={onUpdate}
    />
  );
};

export default DynamicSection;
