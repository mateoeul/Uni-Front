import React from 'react';

const AboutSection = ({ about, edit, onChange }) => {
  return (
    <section className="section">
      <h3 className="section__title">Acerca de</h3>
      {!edit ? (
        <p>{about}</p>
      ) : (
        <textarea className="textarea" rows={5} value={about} onChange={(e) => onChange(e.target.value)} placeholder="Resumen / Acerca de" />
      )}
    </section>
  );
};

export default AboutSection;
