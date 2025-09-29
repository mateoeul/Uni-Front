import React from 'react';

const items = Array.from({ length: 6 }).map((_, i) => ({
  date: 'Sep 25, 2025',
  title: 'Lorem ipsum dolor sit amet',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at velit vitae urna dictum ultrices.',
  img: `https://images.unsplash.com/photo-15${i}745${i}0-0a${i}c${i}b${i}2f?auto=format&fit=crop&w=800&q=60`,
}));

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


