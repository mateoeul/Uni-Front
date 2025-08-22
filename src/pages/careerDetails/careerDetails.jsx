import React from 'react';
import './careerDetails.css';
import { FaArrowLeft, FaMapMarkerAlt, FaClock, FaDollarSign, FaBook } from 'react-icons/fa';

const CareerDetails = ({ selectedCategory, onBack }) => {
  // Datos de carreras por categoría
  const careersData = {
    "Tecnología": [
      {
        id: 1,
        name: "Ingeniería en Sistemas",
        university: "Universidad de Buenos Aires",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Programación, Base de Datos, Redes, IA"
      },
      {
        id: 2,
        name: "Licenciatura en Informática",
        university: "Universidad Nacional de La Plata",
        duration: "4 años",
        price: "$0 (Pública)",
        studyPlan: "Algoritmos, Software, Hardware, Sistemas"
      },
      {
        id: 3,
        name: "Tecnicatura en Desarrollo Web",
        university: "Instituto Tecnológico",
        duration: "3 años",
        price: "$15,000/mes",
        studyPlan: "HTML, CSS, JavaScript, React, Node.js"
      }
    ],
    "Salud": [
      {
        id: 4,
        name: "Medicina",
        university: "Universidad de Buenos Aires",
        duration: "6 años",
        price: "$0 (Pública)",
        studyPlan: "Anatomía, Fisiología, Patología, Clínica"
      },
      {
        id: 5,
        name: "Enfermería",
        university: "Universidad Nacional de Córdoba",
        duration: "4 años",
        price: "$0 (Pública)",
        studyPlan: "Cuidados, Farmacología, Práctica Clínica"
      }
    ],
    "Ciencias exactas": [
      {
        id: 6,
        name: "Ingeniería Civil",
        university: "Universidad Nacional de Rosario",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Estructuras, Hidráulica, Construcción"
      },
      {
        id: 7,
        name: "Matemática",
        university: "Universidad de Buenos Aires",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Cálculo, Álgebra, Análisis, Geometría"
      }
    ],
    "Ciencias sociales": [
      {
        id: 8,
        name: "Psicología",
        university: "Universidad Nacional de La Plata",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Psicología Clínica, Social, Educacional"
      },
      {
        id: 9,
        name: "Sociología",
        university: "Universidad de Buenos Aires",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Teoría Social, Investigación, Política"
      }
    ],
    "Artes y humanidades": [
      {
        id: 10,
        name: "Letras",
        university: "Universidad Nacional de Córdoba",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Literatura, Lingüística, Historia"
      },
      {
        id: 11,
        name: "Arte",
        university: "Universidad Nacional de las Artes",
        duration: "4 años",
        price: "$0 (Pública)",
        studyPlan: "Historia del Arte, Técnicas, Teoría"
      }
    ],
    "Negocios y administración": [
      {
        id: 12,
        name: "Administración de Empresas",
        university: "Universidad de Buenos Aires",
        duration: "4 años",
        price: "$0 (Pública)",
        studyPlan: "Contabilidad, Marketing, Finanzas, RRHH"
      },
      {
        id: 13,
        name: "Contador Público",
        university: "Universidad Nacional de Rosario",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Contabilidad, Auditoría, Impuestos"
      }
    ],
    "Ciencias naturales": [
      {
        id: 14,
        name: "Biología",
        university: "Universidad Nacional de La Plata",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Biología Celular, Genética, Ecología"
      },
      {
        id: 15,
        name: "Química",
        university: "Universidad de Buenos Aires",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Química Orgánica, Inorgánica, Analítica"
      }
    ],
    "Educación y docencia": [
      {
        id: 16,
        name: "Profesorado en Matemática",
        university: "Instituto Superior del Profesorado",
        duration: "4 años",
        price: "$0 (Pública)",
        studyPlan: "Matemática, Didáctica, Pedagogía"
      },
      {
        id: 17,
        name: "Profesorado en Historia",
        university: "Universidad Nacional de Córdoba",
        duration: "4 años",
        price: "$0 (Pública)",
        studyPlan: "Historia, Geografía, Didáctica"
      }
    ],
    "Comunicación y medios": [
      {
        id: 18,
        name: "Comunicación Social",
        university: "Universidad Nacional de La Plata",
        duration: "5 años",
        price: "$0 (Pública)",
        studyPlan: "Periodismo, Publicidad, Relaciones Públicas"
      },
      {
        id: 19,
        name: "Diseño Gráfico",
        university: "Universidad de Buenos Aires",
        duration: "4 años",
        price: "$0 (Pública)",
        studyPlan: "Diseño, Tipografía, Multimedia"
      }
    ]
  };

  const careers = careersData[selectedCategory] || [];

  return (
    <div className="career-details-container">
      <div className="career-details-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Volver
        </button>
        <h1 className="category-title">{selectedCategory}</h1>
      </div>
      
      <div className="careers-grid">
        {careers.map((career) => (
          <div key={career.id} className="career-card">
            <h3 className="career-name">{career.name}</h3>
            
            <div className="career-info">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span className="info-label">Dónde se estudia:</span>
                <span className="info-value">{career.university}</span>
              </div>
              
              <div className="info-item">
                <FaClock className="info-icon" />
                <span className="info-label">Duración:</span>
                <span className="info-value">{career.duration}</span>
              </div>
              
              <div className="info-item">
                <FaDollarSign className="info-icon" />
                <span className="info-label">Precio:</span>
                <span className="info-value">{career.price}</span>
              </div>
              
              <div className="info-item">
                <FaBook className="info-icon" />
                <span className="info-label">Plan de estudio:</span>
                <span className="info-value">{career.studyPlan}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerDetails;
