import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/careers" className="btn btn-primary">Explorar carreras</Link>
            <button onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })} className="btn btn-ghost">Quiero saber más</button>
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


