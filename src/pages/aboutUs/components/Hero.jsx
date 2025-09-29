import React from 'react';

const Hero = () => {
  return (
    <section className="about-hero">
      <div className="container about-hero__grid">
        <div className="about-hero__text">
          <h1 className="about-hero__title reveal reveal--fade-up" style={{ color: '#0b4fb3' }}>ABOUT US</h1>
          <p className="about-hero__lead reveal reveal--fade-up" style={{ '--delay': '80ms', color: '#1f2937' }}>
           Somos un equipo de jóvenes comprometidos con transformar la manera en que los estudiantes eligen su futuro universitario.
          </p>

          
        </div>

        <div className="about-hero__media">
          <div className="stack stack--top reveal reveal--scale-in" style={{ '--delay': '0ms' }}>
            <img src="/src/assets/images/universitarios1.jpg" alt="Estudiantes 1" />
          </div>
          <div className="stack stack--middle reveal reveal--scale-in" style={{ '--delay': '100ms' }}>
            <img src="/src/assets/images/universitarios2.jpg" alt="Estudiantes 2" />
          </div>
          <div className="stack stack--bottom reveal reveal--scale-in" style={{ '--delay': '180ms' }}>
            <img src="/src/assets/images/universitarios3.jpg" alt="Estudiantes 3" />
          </div>

          <span className="blob blob--lg" />
          <span className="blob blob--sm" />
          <span className="blob blob--md" />
          <span className="blob blob--left" />
        </div>
      </div>
    </section>
  );
};

export default Hero;


