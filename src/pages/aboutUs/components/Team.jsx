import React from 'react';
import ciroImg from '../../../assets/images/ciro ben dov.jpg';
import mateoImg from '../../../assets/images/mateo.jpg';
import ezeImg from '../../../assets/images/ezequiel kalik.jpg';

const TEAM = [
  { name: 'Ciro Ben Dov', role: 'PM & Producto', img: ciroImg, url: 'https://www.linkedin.com/in/ciro-ben-dov/' },
  { name: 'Mateo Eulmesekian', role: 'Full-Stack', img: mateoImg, url: 'https://www.linkedin.com/in/mateo-eulmesekian-b21489359/' },
  { name: 'Ezequiel Kalik', role: 'UX/UI', img: ezeImg, url: 'https://www.linkedin.com/in/ezequielkalik' },
  { name: 'Nicolás Wicnudel', role: 'Backend', img: '/src/assets/images/uni.png', url: 'https://www.linkedin.com/in/nicolas-wicnudel-592ba9269/' },
];

const Team = () => {
  return (
    <section className="about-leadership">
      <div className="container leadership-grid">
        {TEAM.map((m, idx) => (
          <a key={m.name} className="leader-card reveal reveal--fade-up" style={{ '--delay': `${idx * 90}ms` }} href={m.url} target="_blank" rel="noopener noreferrer">
            <div className="leader-media">
              <img src={m.img} alt={m.name} />
              <div className="leader-grad" />
            </div>
            <div className="leader-meta">
              <div className="leader-name">{m.name}</div>
              <div className="leader-role">{m.role}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Team;


