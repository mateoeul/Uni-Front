import React from 'react';

const ProfileHeader = ({ logoText, name, type }) => {
  return (
    <div className="profile-hero">
      <div className="profile-identity">
        <div className="profile-logo">{logoText}</div>
        <div className="profile-title">
          <h2>{name}</h2>
          <span className={`badge ${type === 'Pública' ? 'is-public' : 'is-private'}`}>{type}</span>
        </div>
      </div>
      <a href="#contact" className="cta">Contactar</a>
    </div>
  );
};

export default ProfileHeader;


