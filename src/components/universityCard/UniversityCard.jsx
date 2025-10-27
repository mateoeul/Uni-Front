import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const UniversityCard = ({ university }) => {
  const { name, id, type, logoText, photo, userId } = university;
  const navigate = useNavigate();

  return (
    <div 
      className="university-card" 
      onClick={() => navigate(`/${userId}/profile`, { state: { profileType: 'Universidad' } })} 
      role="button" 
      tabIndex={0} 
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/${userId}/profile`, { state: { profileType: 'Universidad' } }); }}
    >
      <div className="university-card__logo" aria-hidden="true">
        {photo ? (
          <img src={photo} alt={`Logo de ${name}`} className="university-card__logo-img" />
        ) : (
          <span>{logoText || name.substring(0, 2).toUpperCase()}</span>
        )}
      </div>
      <div className="university-card__content">
        <div className="university-card__header">
          <h4 className="university-card__title">{name}</h4>
          <span className={`university-card__badge ${type === 'Pública' ? 'is-public' : 'is-private'}`}>{type}</span>
        </div>
        <div className="university-card__meta">
          <p><strong>{logoText}</strong> </p>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;


