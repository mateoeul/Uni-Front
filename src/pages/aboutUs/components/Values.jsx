import React from 'react';

const VALUES = [
  { title: 'Transparencia', desc: 'Datos claros, fuentes verificadas y criterios abiertos.' },
  { title: 'Empatía', desc: 'Diseñamos pensando en las dudas reales de estudiantes.' },
  { title: 'Impacto', desc: 'Medimos y mejoramos decisiones académicas todos los días.' },
];

const Values = () => {
  return (
    <section className="about-values">
      <div className="container">
        <h2>Nuestros valores</h2>
        <div className="values-grid">
          {VALUES.map((v) => (
            <div key={v.title} className="value-card">
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;


