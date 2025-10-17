import React, { useEffect } from 'react';
import './about.css';
import Hero from './components/Hero';
import Team from './components/Team';
import CTA from './components/CTA';
import Mission from './components/Mission';
import IntroSplit from './components/IntroSplit';
import News from './components/News';

const AboutUs = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    // Scroll fade effect
    const fadeEl = document.createElement('div');
    fadeEl.className = 'scroll-fade';
    document.body.appendChild(fadeEl);
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y > 40) fadeEl.classList.add('is-active'); else fadeEl.classList.remove('is-active');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      fadeEl.remove();
    };
  }, []);
  return (
    <main className="about-page">
      <div className="about-page__wrapper">
        <IntroSplit />
        <Hero />
        <Mission />
        <News />
        <Team />
        <CTA />
      </div>
    </main>
  );
};

export default AboutUs;