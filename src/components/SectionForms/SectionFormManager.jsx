import React from 'react';
import AboutForm from './AboutForm';
import EducationForm from './EducationForm';
import ProjectsForm from './ProjectsForm';
import EventsForm from './EventsForm';
import ActivityForm from './ActivityForm';
import PostsForm from './PostsForm';

const SectionFormManager = ({ selectedSection, onSubmit, onCancel }) => {
  // Mapeo de tipos de sección a sus formularios correspondientes
  const formComponents = {
    'About': AboutForm,
    'Educación': EducationForm,
    'Education': EducationForm,
    'Proyectos': ProjectsForm,
    'Projects': ProjectsForm,
    'Eventos': EventsForm,
    'Events': EventsForm,
    'EventSection': EventsForm,
    'ActivitySection': EventsForm,
    'Actividad': ActivityForm,
    'Activity': ActivityForm,
    'Publicaciones': PostsForm,
    'Posts': PostsForm,
  };

  // Obtener el componente de formulario correspondiente
  const FormComponent = formComponents[selectedSection];

  if (!FormComponent) {
    return (
      <div className="section-form">
        <h3>Sección no encontrada</h3>
        <p>No se encontró un formulario para la sección seleccionada.</p>
        <button onClick={onCancel} className="btn btn-secondary">
          Volver
        </button>
      </div>
    );
  }

  return (
    <FormComponent 
      onSubmit={onSubmit} 
      onCancel={onCancel} 
    />
  );
};

export default SectionFormManager;
