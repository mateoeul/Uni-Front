import React from 'react';

const STATS = [
  { label: 'Universidades', value: '120+' },
  { label: 'Carreras', value: '1.5k+' },
  { label: 'Estudiantes', value: '50k+' },
];

const Stats = () => {
  return (
    <section className="about-stats">
      <div className="container stats-grid">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;


