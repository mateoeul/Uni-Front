import React from 'react';

const Mission = () => {
  return (
    <section className="about-section about-section--dark">
      <div className="container">
        <div className="about-grid">
          <div className="about-grid__text">
            <h2 className="reveal reveal--fade-up">Misión</h2>
            <p className="reveal reveal--fade-up" style={{ '--delay': '100ms' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at velit vitae urna dictum ultrices.</p>
          </div>
          <div className="mission-image mission-image--alt reveal reveal--scale-in" aria-hidden="true" />
        </div>
        <div className="about-grid" style={{ marginTop: 28 }}>
          <div className="mission-image mission-image--alt2 reveal reveal--scale-in" aria-hidden="true" />
          <div className="about-grid__text">
            <h2 className="reveal reveal--fade-up">Visión</h2>
            <p className="reveal reveal--fade-up" style={{ '--delay': '100ms' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum, nunc id luctus varius, augue odio aliquet quam.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;


