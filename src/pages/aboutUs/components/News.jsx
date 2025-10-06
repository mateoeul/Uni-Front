import React from 'react';

const items = [
  {
    date: '2025',
    title: 'Nerdearla: aprendizaje e inspiración',
    text: 'Estuvimos en Nerdearla y aprendimos muchísimo compartiendo con la comunidad tech.',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
  },
  {
    date: '2025',
    title: 'Encuentro en Endeavor',
    text: 'Participamos en Endeavor, conectando con emprendedores y validando nuestra visión.',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    date: '2025',
    title: 'Charla con UMAI',
    text: 'Tuvimos una charla con UMAI y el proyecto recibió halagos y valiosos comentarios.',
    img: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    date: '2025',
    title: 'Presentación en la UP',
    text: 'Compartimos nuestra propuesta en la Universidad de Palermo y obtuvimos gran feedback.',
    img: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    date: '2025',
    title: 'We presented at +SINERGIA',
    text: 'We presented the project in English at +SINERGIA, engaging with an international audience.',
    img: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop',
  },
  {
    date: '2025',
    title: 'Auditorio con jueces y profesionales',
    text: 'Presentamos en un auditorio ante jueces y profesionales, recibiendo devoluciones clave.',
    img: 'https://images.unsplash.com/photo-1515165562835-c3b8c0f1c6c5?q=80&w=1200&auto=format&fit=crop',
  },
];

const News = () => {
  return (
    <section className="about-news">
      <div className="container">
        <h2 className="reveal reveal--fade-up">Noticias</h2>
        <div className="news-grid">
          {items.map((n, idx) => (
            <article key={idx} className="news-card reveal reveal--fade-up" style={{ '--delay': `${idx * 60}ms` }}>
              <div className="news-media">
                <img src={n.img} alt={n.title} />
              </div>
              <div className="news-meta">{n.date}</div>
              <h3 className="news-title">{n.title}</h3>
              <p className="news-text">{n.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;


