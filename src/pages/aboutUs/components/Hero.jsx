import React from 'react';

const Hero = () => {
  return (
    <section className="about-hero about-hero--simple">
      <div className="container about-hero__grid">
        <div className="about-hero__text">
          <span className="kicker reveal reveal--fade-up">Conocé Uni</span>
          <h1 className="display-title reveal reveal--fade-up" style={{ '--delay': '40ms' }}>
            Elegí tu futuro <span className="display-accent">con confianza</span>
          </h1>
          <p className="about-hero__lead reveal reveal--fade-up" style={{ '--delay': '100ms' }}>
            Te ayudamos a descubrir carreras y universidades con datos claros, comparación sencilla y recomendaciones pensadas para vos.
          </p>
          <div className="hero-actions reveal reveal--fade-up" style={{ '--delay': '160ms' }}>
            <a href="#explorar" className="btn btn-primary">Explorar carreras</a>
            <a href="#contacto" className="btn btn-ghost">Quiero saber más</a>
          </div>
          <div className="hero-metrics reveal reveal--fade-up" style={{ '--delay': '200ms' }}>
            <span className="metric"><strong>+100</strong> universidades</span>
            <span className="dot" />
            <span className="metric"><strong>Recomendaciones</strong> personalizadas</span>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default Hero;


