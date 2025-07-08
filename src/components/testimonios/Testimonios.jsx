import React, { useState, useEffect } from "react";
import './testimonios.css';
import { motion } from 'framer-motion';

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
  const [active, setActive] = useState(1);

  // Avance automático
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">Opiniones de Estudiantes</h2>
      <div className="testimonials-slider">
        {testimonials.map((t, index) => {
          // Calcular posición relativa al activo
          let pos = index - active;
          if (pos < -1) pos += testimonials.length;
          if (pos > 1) pos -= testimonials.length;
          // Animar escala y opacidad
          const scale = pos === 0 ? 1.15 : 0.85;
          const opacity = pos === 0 ? 1 : 0.5;
          const zIndex = pos === 0 ? 2 : 1;
          return (
            <motion.div
              className="testimonial-card"
              key={index}
              style={{ zIndex }}
              animate={{ scale, opacity }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="testimonial-header">
                <img src={t.image} alt={t.name} className="testimonial-avatar" />
                <div>
                  <h4>{t.name}</h4>
                  <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                </div>
              </div>
              <p className="testimonial-text">{t.text}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="slider-dots">
        {testimonials.map((_, i) => (
          <span key={i} className={`dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonios;