import React from 'react';

const Mission = () => {
  return (
    <section className="about-section" style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        <div className="about-grid">
          <div className="about-grid__text">
            <h2 className="reveal reveal--fade-up">Misión</h2>
            <p className="reveal reveal--fade-up" style={{ '--delay': '100ms' }}>
              Nuestra misión es conectar a los estudiantes con las mejores oportunidades educativas, 
              ofreciendo una plataforma intuitiva que facilite la búsqueda y comparación de carreras 
              universitarias, fomentando así el desarrollo académico y profesional de las futuras generaciones.
            </p>
          </div>
          <div 
            className="mission-image mission-image--alt reveal reveal--scale-in" 
            aria-hidden="true" 
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop)'
            }}
          />
        </div>
        
        <div className="about-grid">
          <div 
            className="mission-image mission-image--alt2 reveal reveal--scale-in" 
            aria-hidden="true"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3da57cac180?q=80&w=1200&auto=format&fit=crop)'
            }}
          />
          <div className="about-grid__text">
            <h2 className="reveal reveal--fade-up">Visión</h2>
            <p className="reveal reveal--fade-up" style={{ '--delay': '100ms' }}>
              Aspiramos a ser el referente en orientación educativa, transformando la manera en que los estudiantes 
              toman decisiones sobre su futuro académico, mediante herramientas innovadoras y acceso a información 
              confiable y actualizada sobre instituciones y programas de estudio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
