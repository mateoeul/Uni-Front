import React from 'react';

const Hero = () => {
  return (
    <section className="about-hero">
      <div className="container about-hero__grid">
        <div className="about-hero__text">
          <h1 className="about-hero__title">ABOUT US</h1>
          <p className="about-hero__lead">
           Somos un equipo de jóvenes comprometidos con transformar la manera en que los estudiantes eligen su futuro universitario.
          </p>

          <div className="about-hero__block">
            <h3>Nuestra misión</h3>
            <p>
            Uni nació para ayudar a estudiantes de toda Argentina a encontrar la carrera y universidad ideal, con información clara, herramientas útiles y una experiencia amigable.
            </p>
          </div>
          <div className="about-hero__block">
            <h3>Nuestra visión</h3>
            <p>
             Queremos inspirar a estudiantes a tomar decisiones informadas, acompañándolos con tecnología educativa, innovación y empatía.
            </p>
          </div>
        </div>

        <div className="about-hero__media">
          <div className="stack stack--top">
            <img src="/src/assets/images/universitarios1.jpg" alt="Estudiantes 1" />
          </div>
          <div className="stack stack--middle">
            <img src="/src/assets/images/universitarios2.jpg" alt="Estudiantes 2" />
          </div>
          <div className="stack stack--bottom">
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


