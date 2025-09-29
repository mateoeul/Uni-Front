import React from 'react';

const logos = [
  'https://images.unsplash.com/photo-1520052205864-92d242b3a76b?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520975922284-0f3a5d4c0f5b?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=400&auto=format&fit=crop',
];

const TrustedBy = () => {
  return (
    <section className="trusted-by">
      <div className="container">
        <p className="trusted-title">Trusted by</p>
        <div className="trusted-logos">
          {logos.map((src, i) => (
            <div className="trusted-logo" key={i}>
              <img src={src} alt="Logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;


