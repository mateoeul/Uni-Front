import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

const ProfileHeader = ({ logoText, name, type, photo, description, website, linkedin }) => {
  return (
    <div className="profile-hero">
      <div className="profile-identity">
        <div className="profile-logo">
          {photo ? (
            <img src={photo} alt={`Logo de ${name}`} className="profile-logo-img" />
          ) : (
            logoText
          )}
        </div>
        <div className="profile-title">
          <h2>{name}</h2>
          <span className={`badge ${type === 'Pública' ? 'is-public' : 'is-private'}`}>{type}</span>
          <div className="profile-links">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="profile-link">
                <FiExternalLink size={16} />
                Sitio Web
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
                <FiExternalLink size={16} />
                LinkedIn
              </a>
            )}
          </div>
          {description && <p className="profile-description">{description}</p>}
        </div>
      </div>
      <div className="profile-actions">
        <a href="#contact" className="cta">Contactar</a>
      </div>
    </div>
  );
};

export default ProfileHeader;


