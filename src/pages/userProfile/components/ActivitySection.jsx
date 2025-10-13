import React from 'react';

const ActivitySection = ({ activity }) => {
  return (
    <section className="section">
      <div className="section__header">
        <h3 className="section__title">Actividad</h3>
      </div>
      {(!activity || activity.length === 0) && <p>No hay actividad reciente.</p>}
      {activity && activity.map(a => (
        <div key={a.id} className="activity-item">
          <small className="muted">{a.date}</small> — {a.text}
        </div>
      ))}
    </section>
  );
};

export default ActivitySection;
