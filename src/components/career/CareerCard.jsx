import React from 'react';
import './CareerCard.css';
import { FaClock } from 'react-icons/fa';

const CareerCard = ({
  id,
  name,
  description,
  durationYears,
  university,
  price,
  studyPlan,
  onViewMore,
  selectable = false,
  selected = false,
  onToggleSelect,
  footerSlot,
}) => {
  return (
    <div className="career-card">
      <h3 className="career-name">{name}</h3>
      {description && (
        <p className="career-description" style={{ marginTop: 8, color: '#444' }}>
          {description.length > 140 ? `${description.slice(0, 140)}...` : description}
        </p>
      )}

      <div className="career-info" style={{ marginTop: 12 }}>
        <div className="info-item">
          <FaClock className="info-icon" />
          <span className="info-label">Duración:</span>
          <span className="info-value">{durationYears ? `${durationYears} años` : '—'}</span>
        </div>
        {university && university !== '—' && (
          <div className="info-item">
            <span className="info-label">Universidad:</span>
            <span className="info-value">{university}</span>
          </div>
        )}
        {price && price !== '—' && (
          <div className="info-item">
            <span className="info-label">Precio:</span>
            <span className="info-value">{price}</span>
          </div>
        )}
        {studyPlan && studyPlan !== '—' && (
          <div className="info-item">
            <span className="info-label">Plan:</span>
            <span className="info-value">{studyPlan}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        {onViewMore && (
          <button className="btn-primary" onClick={() => onViewMore({ id, name, description, durationYears, university, price, studyPlan })}>
            Ver más
          </button>
        )}
        {footerSlot}
        {selectable && (
          <label className="compare-label" style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <input type="checkbox" checked={selected} onChange={onToggleSelect} />
            <span className="compare-text">Comparar</span>
          </label>
        )}
      </div>
    </div>
  );
};

export default CareerCard;
