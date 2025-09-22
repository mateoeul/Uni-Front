import React, { useEffect, useMemo, useState } from 'react';
import './careerList.css';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import categoryService from '../../services/category-service';
import careerService from '../../services/career-service';

const CareerDetails = ({ selectedCategory, onBack }) => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        // selectedCategory ahora puede ser "Todas" (string) o isAll (objeto)
        const isAll = selectedCategory === 'Todas' || selectedCategory?.isAll;
        const response = isAll
          ? await careerService.getAll()
          : await categoryService.getCareersByCategory(selectedCategory?.id);
        if (response.success) {
          const mapped = (response.data || []).map((c) => ({
            id: c.id,
            name: c.nombre || c.name,
            description: c.descripcion || c.description || c.descripcion_carrera || 'Sin descripción',
            durationYears: c.duracion_en_anios || c.duracionAnios || c.duracion || c.duration || null,
            // Campos opcionales por si luego los usamos
            university: c.universidad?.nombre || c.university || c.universidad || '—',
            price: c.precio || c.price || '—',
            studyPlan: c.plan_estudio || c.studyPlan || '—'
          }));
          setCareers(mapped);
        } else {
          setError('No se pudieron cargar las carreras');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedCategory && (selectedCategory?.id || selectedCategory === 'Todas' || selectedCategory?.isAll)) {
      load();
    }
  }, [selectedCategory]);

  const [selected, setSelected] = useState([]); // array of career ids
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [detailCareer, setDetailCareer] = useState(null); // para modal "Ver más"

  const selectedCareers = useMemo(() => careers.filter(c => selected.includes(c.id)), [careers, selected]);

  const toggleSelect = (careerId) => {
    setSelected((prev) => {
      const exists = prev.includes(careerId);
      if (exists) {
        return prev.filter(id => id !== careerId);
      }
      if (prev.length >= 3) {
        return prev; // limit to 3 selections
      }
      return [...prev, careerId];
    });
  };

  const removeSelection = (careerId) => setSelected(prev => prev.filter(id => id !== careerId));
  const clearAll = () => setSelected([]);
  const openCompare = () => {
    if (selectedCareers.length >= 2) setIsCompareOpen(true);
  };
  const closeCompare = () => setIsCompareOpen(false);

  const colsStyle = { gridTemplateColumns: `180px repeat(${selectedCareers.length}, 1fr)` };

  if (loading) {
    return (
      <div className="career-details-container">
        <div className="career-details-header">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft /> Volver
          </button>
          <h1 className="category-title">{selectedCategory?.name || (typeof selectedCategory === 'string' ? selectedCategory : 'Categoría')}</h1>
        </div>
        <div style={{ padding: 16 }}>Cargando carreras...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="career-details-container">
        <div className="career-details-header">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft /> Volver
          </button>
          <h1 className="category-title">{selectedCategory?.name || 'Categoría'}</h1>
        </div>
        <div style={{ padding: 16, color: 'red' }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="career-details-container">
      <div className="career-details-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Volver
        </button>
        <h1 className="category-title">{selectedCategory?.name || (typeof selectedCategory === 'string' ? selectedCategory : 'Categoría')}</h1>
      </div>
      
      <div className="careers-grid">
        {careers.map((career) => (
          <div key={career.id} className="career-card">
            <h3 className="career-name">{career.name}</h3>
            <p className="career-description" style={{ marginTop: 8, color: '#444' }}>
              {(career.description || '').length > 140
                ? `${(career.description || '').slice(0, 140)}...`
                : (career.description || '')}
            </p>

            <div className="career-info" style={{ marginTop: 12 }}>
              <div className="info-item">
                <FaClock className="info-icon" />
                <span className="info-label">Duración:</span>
                <span className="info-value">{career.durationYears ? `${career.durationYears} años` : '—'}</span>
              </div>
            </div>

            <div className="card-footer">
              <button className="btn-primary" onClick={() => setDetailCareer(career)}>Ver más</button>
              <label className="compare-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={selected.includes(career.id)}
                  onChange={() => toggleSelect(career.id)}
                />
                <span className="compare-text">Comparar</span>
                <span className="compare-hint">{selected.length}/3</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="compare-bar">
          <div className="compare-chips">
            {selectedCareers.map(c => (
              <span key={c.id} className="chip">
                {c.name}
                <button className="chip-x" onClick={() => removeSelection(c.id)}>×</button>
              </span>
            ))}
          </div>
          <div className="compare-actions">
            <button className="btn-secondary" onClick={clearAll}>Borrar</button>
            <button className="btn-primary" disabled={selectedCareers.length < 2} onClick={openCompare}>Comparar</button>
          </div>
        </div>
      )}

      {isCompareOpen && (
        <div className="compare-modal">
          <div className="compare-dialog">
            <div className="compare-header">
              <h3>Comparación</h3>
              <button className="close-btn" onClick={closeCompare}>×</button>
            </div>
            <div className="compare-selected">
              Carreras seleccionadas: {selectedCareers.map(c => c.name).join(', ')}
            </div>
            <div className="compare-table" style={{ ['--cols']: selectedCareers.length }}>
              <div className="row header">
                <div className="cell"><strong>Comparación</strong></div>
                {selectedCareers.map(c => (<div key={c.id} className="cell title">{c.name}</div>))}
              </div>
              <div className="row">
                <div className="cell label">Categoría</div>
                {selectedCareers.map(c => (<div key={c.id} className="cell">{selectedCategory?.name || 'Categoría'}</div>))}
              </div>
              <div className="row">
                <div className="cell label">Universidad</div>
                {selectedCareers.map(c => (<div key={c.id} className="cell">{c.university}</div>))}
              </div>
              <div className="row">
                <div className="cell label">Duración</div>
                {selectedCareers.map(c => (
                  <div key={c.id} className="cell">{c.durationYears ? `${c.durationYears} años` : '—'}</div>
                ))}
              </div>
              <div className="row">
                <div className="cell label">Precio</div>
                {selectedCareers.map(c => (<div key={c.id} className="cell">{c.price}</div>))}
              </div>
              <div className="row">
                <div className="cell label">Plan</div>
                {selectedCareers.map(c => (<div key={c.id} className="cell">{c.studyPlan}</div>))}
              </div>
            </div>
          </div>
        </div>
      )}

      {detailCareer && (
        <div className="compare-modal" onClick={() => setDetailCareer(null)}>
          <div className="compare-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="compare-header">
              <h3>{detailCareer.name}</h3>
              <button className="close-btn" onClick={() => setDetailCareer(null)}>×</button>
            </div>
            <div style={{ padding: '12px 0' }}>
              <div style={{ marginBottom: 8, color: '#666' }}>
                <strong>Categoría:</strong> {selectedCategory?.name || '—'}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Descripción:</strong>
                <div style={{ marginTop: 4 }}>{detailCareer.description || 'Sin descripción'}</div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Duración:</strong> {detailCareer.durationYears ? `${detailCareer.durationYears} años` : '—'}
              </div>
              {/* Campos opcionales por si luego se desean mostrar */}
              {detailCareer.university && (
                <div style={{ marginBottom: 8 }}>
                  <strong>Universidad:</strong> {detailCareer.university}
                </div>
              )}
              {detailCareer.studyPlan && detailCareer.studyPlan !== '—' && (
                <div style={{ marginBottom: 8 }}>
                  <strong>Plan de estudio:</strong> {detailCareer.studyPlan}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDetails;
