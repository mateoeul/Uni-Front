import React from 'react';

const avatars = Array.from({ length: 16 }).map((_, i) => ({
  img: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${(i % 70) + 1}.jpg`,
  name: `Nombre Apellido ${i + 1}`,
  role: 'Lorem ipsum dolor',
}));

const GlobalTeam = () => {
  return (
    <section className="global-team">
      <div className="container">
        <h2 className="reveal reveal--fade-up">Nuestro equipo global</h2>
        <div className="team-scroll">
          {avatars.map((m, idx) => (
            <div className="team-mini" key={idx}>
              <img src={m.img} alt={m.name} />
              <div className="mini-name">{m.name}</div>
              <div className="mini-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalTeam;


