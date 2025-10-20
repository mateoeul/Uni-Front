import React from 'react';
import { FaLightbulb, FaCalendarAlt, FaLaptopCode, FaRocket, FaHandshake, FaGlobeAmericas, FaUniversity } from 'react-icons/fa';

const MILESTONES = [
  { 
    date: 'Abril 2024', 
    title: 'Nacimiento de la Idea',
    description: 'Surgió la visión de crear una plataforma que revolucione la forma en que los estudiantes eligen su futuro académico.',
    icon: <FaLightbulb className="timeline-icon" />,
    color: '#4F46E5'
  },
  { 
    date: 'Mayo 2024', 
    title: 'Planificación Estratégica',
    description: 'Diseñamos la arquitectura de la plataforma y establecimos los objetivos principales del proyecto.',
    icon: <FaCalendarAlt className="timeline-icon" />,
    color: '#10B981'
  },
  { 
    date: 'Junio 2024', 
    title: 'Inicio del Desarrollo',
    description: 'Comenzamos a dar vida a la plataforma con el desarrollo del frontend y backend.',
    icon: <FaLaptopCode className="timeline-icon" />,
    color: '#3B82F6'
  },
  { 
    date: 'Octubre 2024', 
    title: 'Primera Demo',
    description: 'Presentamos nuestra primera versión funcional con las características principales implementadas.',
    icon: <FaRocket className="timeline-icon" />,
    color: '#8B5CF6'
  },
  { 
    date: 'Noviembre 2024', 
    title: 'Segunda Demo',
    description: 'Mejoramos la plataforma con base en el feedback recibido, añadiendo nuevas funcionalidades.',
    icon: <FaRocket className="timeline-icon" />,
    color: '#EC4899'
  },
  { 
    date: 'Junio 2025', 
    title: 'Reunión con UMAI',
    description: 'Tuvimos una importante reunión con representantes de la Universidad Maimónides para explorar colaboraciones.',
    icon: <FaUniversity className="timeline-icon" />,
    color: '#F59E0B'
  },
  { 
    date: 'Agosto 2025', 
    title: 'Presentación en +Sinergia',
    description: 'Participamos en el evento +Sinergia presentando nuestra plataforma en inglés a una audiencia internacional.',
    icon: <FaGlobeAmericas className="timeline-icon" />,
    color: '#10B981'
  },
  { 
    date: 'Septiembre 2025', 
    title: 'Reunión en la Universidad de Palermo',
    description: 'Nos reunimos con directivos de la UP para discutir posibles integraciones y colaboraciones futuras.',
    icon: <FaHandshake className="timeline-icon" />,
    color: '#3B82F6'
  }
];

const Timeline = () => {
  return (
    <section id="timeline" className="about-timeline">
      <div className="container">
        <h2>Nuestra Historia</h2>
        <p className="timeline-subtitle">Un viaje de innovación y crecimiento en la educación superior</p>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {MILESTONES.map((milestone, index) => (
            <div 
              key={`${milestone.date}-${index}`} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div 
                className="timeline-dot" 
                style={{ borderColor: milestone.color }}
              >
                <div className="timeline-icon-container" style={{ backgroundColor: `${milestone.color}15` }}>
                  {milestone.icon}
                </div>
              </div>
              <div className="timeline-content">
                <div className="timeline-date" style={{ color: milestone.color }}>{milestone.date}</div>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-text">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;


