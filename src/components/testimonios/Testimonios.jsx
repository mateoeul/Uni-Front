import React from "react";
import './testimonios.css';

const testimonials = [
  {
    name: "Alexia Putellas",
    rating: 3,
    text: "Me recibí hace un año de la carrera de Bioingeniería en UDESA y actualmente trabajo en una empresa mundial. ¡Recomendadísimo!",
    image: "https://i.pravatar.cc/100?img=1"
  },
  {
    name: "Radamel Falcao",
    rating: 5,
    text: "Periodismo deportivo en UP definitivamente me cambió la vida. Una experiencia que combina la práctica con la teoría con podcasts.",
    image: "https://i.pravatar.cc/100?img=2"
  },
  {
    name: "Emilio Butragueño",
    rating: 4,
    text: "Marketing Digital en UCEMA ha sido una de mis mejores decisiones. Lástima las instalaciones, que son terribles si sufrís de claustrofobia.",
    image: "https://i.pravatar.cc/100?img=3"
  }
];

const Testimonios = () => {
  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">Opiniones de Estudiantes</h2>
      <div className="testimonials-slider">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-header">
              <img src={t.image} alt={t.name} className="testimonial-avatar" />
              <div>
                <h4>{t.name}</h4>
                <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              </div>
            </div>
            <p className="testimonial-text">{t.text}</p>
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {testimonials.map((_, i) => (
          <span key={i} className={`dot ${i === 1 ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonios;