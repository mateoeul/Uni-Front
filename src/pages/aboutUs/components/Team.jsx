import React from 'react';

const TEAM = [
  { name: 'Ciro Ben Dav', role: 'PM & Producto', img: '/src/assets/images/uni.png' },
  { name: 'Mateo Eurnekian', role: 'Frontend', img: '/src/assets/images/uni.png' },
  { name: 'Ezequiel Kalik', role: 'UX/UI', img: '/src/assets/images/uni.png' },
  { name: 'Nicolás Widniewol', role: 'Backend', img: '/src/assets/images/uni.png' },
];

const Team = () => {
  return (
    <section className="about-team-strip">
      <div className="container team-strip">
        {TEAM.map((m) => (
          <div key={m.name} className="team-pill">
            <img className="team-pill__avatar" src={m.img} alt={m.name} />
            <div className="team-pill__meta">
              <div className="team-pill__name">{m.name}</div>
              <div className="team-pill__role">{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;


