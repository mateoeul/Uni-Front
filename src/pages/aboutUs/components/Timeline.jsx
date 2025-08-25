import React from 'react';

const MILESTONES = [
  { year: '2023', text: 'Idea inicial: simplificar la elección universitaria.' },
  { year: '2024', text: 'Lanzamiento de la primera versión pública.' },
  { year: '2025', text: 'Expansión de universidades y recomendaciones personalizadas.' },
];

const Timeline = () => {
  return (
    <section className="about-timeline">
      <div className="container">
        <h2>Nuestro camino</h2>
        <ol className="timeline-list">
          {MILESTONES.map((m) => (
            <li key={m.year} className="timeline-item">
              <div className="timeline-year">{m.year}</div>
              <p className="timeline-text">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;


