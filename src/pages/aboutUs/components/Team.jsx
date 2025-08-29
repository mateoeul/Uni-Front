import React from 'react';
import ciroImg from '../../../assets/images/ciro ben dov.jpg';
import mateoImg from '../../../assets/images/mateo.jpg';
import ezeImg from '../../../assets/images/ezequiel kalik.jpg';

const TEAM = [
  { name: 'Ciro Ben Dov', role: 'PM & Producto', img: ciroImg },
  { name: 'Mateo Eulmesekian', role: 'Full-Stack', img: mateoImg },
  { name: 'Ezequiel Kalik', role: 'UX/UI', img: ezeImg },
  { name: 'Nicolás Wicnudel', role: 'Backend', img: '/src/assets/images/uni.png' },
];

const Team = () => {
  return (
    <section className="about-team-strip">
      <div className="container team-strip">
        {TEAM.map((m, idx) => {
          const content = (
            <div className="team-pill">
              <img className="team-pill__avatar" src={m.img} alt={m.name} />
              <div className="team-pill__meta">
                <div className="team-pill__name">{m.name}</div>
                <div className="team-pill__role">{m.role}</div>
              </div>
            </div>
          );

          let href;
          if (idx === 0) href = "https://www.linkedin.com/in/ciro-ben-dov/";
          if (idx === 1) href = "https://www.linkedin.com/in/mateo-eulmesekian-b21489359/";
          if (idx === 2) href = "https://www.linkedin.com/in/ezequielkalik";
          if (idx === 3) href = "https://www.linkedin.com/in/nicolas-wicnudel-592ba9269/";

          return href ? (
            <a key={m.name} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              {content}
            </a>
          ) : (
            <div key={m.name}>{content}</div>
          );
        })}
      </div>
    </section>
  );
};

export default Team;


