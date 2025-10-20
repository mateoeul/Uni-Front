import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './careerList.css';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import categoryService from '../../services/category-service';
import careerService from '../../services/career-service';
import CareerCard from '../../components/career/CareerCard.jsx';

const CareerList = ({ selectedCategory, onBack }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar carreras
  useEffect(() => {
    const loadCareers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener término de búsqueda de la URL
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get('search') || '';
        setSearchQuery(search);
        
        // Cargar todas las carreras
        const response = await careerService.getAll();
          
        if (response.success) {
          const mapped = (response.data || []).map((c) => ({
            id: c.id,
            name: c.nombre || c.name,
            description: c.descripcion || c.description || c.descripcion_carrera || 'Sin descripción',
            durationYears: c.duracion_en_anios || c.duracionAnios || c.duracion || c.duration || null,
            university: c.universidad?.nombre || c.university || c.universidad || '—',
            price: c.precio || c.price || '—',
            studyPlan: c.plan_estudio || c.studyPlan || '—'
          }));
          
          setCareers(mapped);
        } else {
          setError('No se pudieron cargar las carreras');
        }
      } catch (e) {
        setError('Error al cargar las carreras');
        console.error('Error:', e);
      } finally {
        setLoading(false);
      }
    };
    
    loadCareers();
  }, [location.search]); // Solo recargar cuando cambie la búsqueda
  
  // Título de la categoría o resultados de búsqueda
  const getTitle = () => {
    if (searchQuery) {
      return `Resultados para "${searchQuery}"`;
    }
    return selectedCategory?.name || 'Todas las carreras';
  };

  // Filtrar carreras según el término de búsqueda
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCareers(careers);
      return;
    }
    
    const searchLower = searchQuery.toLowerCase();
    const filtered = careers.filter(career => 
      (career.name && career.name.toLowerCase().includes(searchLower)) ||
      (career.description && career.description.toLowerCase().includes(searchLower)) ||
      (career.university && career.university.toLowerCase().includes(searchLower))
    );
    
    setFilteredCareers(filtered);
  }, [searchQuery, careers]);

  const [selected, setSelected] = useState([]); // array of career ids
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  // Manejar búsqueda desde el input
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search?.value || '';
    if (searchValue.trim()) {
      navigate(`/careers?search=${encodeURIComponent(searchValue.trim())}`, { replace: true });
      // No limpiar el input aquí para que se mantenga en la barra de búsqueda
    } else {
      navigate('/careers');
    }
  };
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
          <h1 className="category-title">{getTitle()}</h1>
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
          <h1 className="category-title">{getTitle()}</h1>
        </div>
        <div style={{ padding: 16, color: 'red' }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="career-list-container">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Buscar carreras..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
      </div>
      
      <h1 className="category-title">{getTitle()}</h1>
      
      {loading ? (
        <div className="loading">Cargando carreras...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : filteredCareers.length === 0 ? (
        <div className="no-results">
          {searchQuery ? (
            <p>No se encontraron carreras que coincidan con "{searchQuery}"</p>
          ) : (
            <p>No hay carreras disponibles en esta categoría</p>
          )}
        </div>
      ) : (
        <div className="career-grid">
          {filteredCareers.map((career) => (
            <CareerCard
              key={career.id}
              id={career.id}
              name={career.name}
              description={career.description}
              durationYears={career.durationYears}
              university={career.university}
              price={career.price}
              onViewMore={() => setDetailCareer(career)}
              selectable
              selected={selected.includes(career.id)}
              onToggleSelect={() => toggleSelect(career.id)}
              footerSlot={<span className="compare-hint">{selected.length}/3</span>}
            />
          ))}
        </div>
      )}

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

export default CareerList;
