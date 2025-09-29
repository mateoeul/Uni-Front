import React from 'react';

const IntroSplit = () => {
  return (
    <section className="about-intro">
      <div className="container about-intro__grid">
        <div className="about-intro__title reveal reveal--fade-up">Acerca de Uni</div>
        <div className="about-intro__text reveal reveal--fade-up" style={{ '--delay': '80ms' }}>
          <p>Somos una guía simple para elegir universidad y carrera. Ofrecemos datos claros, comparaciones útiles y recomendaciones para decidir con confianza. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </section>
  );
};

export default IntroSplit;


