import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const UniversityCard = ({ university }) => {
  const { name, location, faculties, type, logoText } = university;
  const navigate = useNavigate();

  return (
    <div className="university-card" onClick={() => navigate(`/universities/${encodeURIComponent(name)}`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/universities/${encodeURIComponent(name)}`); }}>
      <div className="university-card__logo" aria-hidden="true">
        <span>{logoText || name.substring(0, 2).toUpperCase()}</span>
      </div>
      <div className="university-card__content">
        <div className="university-card__header">
          <h4 className="university-card__title">{name}</h4>
          <span className={`university-card__badge ${type === 'Pública' ? 'is-public' : 'is-private'}`}>{type}</span>
        </div>
        <div className="university-card__meta">
          <p><strong>Ubicación:</strong> {location}</p>
          <p><strong>Facultades:</strong> {faculties.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;


