import React, { useEffect, useRef } from 'react';

const BackgroundDecor = () => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = Math.round(window.scrollY * 0.5);
      if (ref.current) ref.current.style.setProperty('--bg-offset', `${offset}px`);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className="bg-decor" aria-hidden="true">
      {/* Estrellas fugaces desde la izquierda hacia la derecha */}
      <span className="shooting-star" style={{ top: '12%', left: '-120px', animationDelay: '0s' }} />
      <span className="shooting-star" style={{ top: '28%', left: '-120px', animationDelay: '2.5s' }} />
      <span className="shooting-star" style={{ top: '46%', left: '-120px', animationDelay: '5s' }} />
      <span className="shooting-star" style={{ top: '70%', left: '-120px', animationDelay: '7.5s' }} />
      {/* Estrellas fugaces desde la derecha hacia la izquierda */}
      <span className="shooting-star from-right" style={{ top: '20%', right: '-120px', animationDelay: '1.5s' }} />
      <span className="shooting-star from-right" style={{ top: '40%', right: '-120px', animationDelay: '4s' }} />
      <span className="shooting-star from-right" style={{ top: '62%', right: '-120px', animationDelay: '6.5s' }} />
      <span className="shooting-star from-right" style={{ top: '82%', right: '-120px', animationDelay: '9s' }} />
    </div>
  );
};

export default BackgroundDecor;


