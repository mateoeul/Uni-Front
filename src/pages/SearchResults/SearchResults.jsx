import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiClock, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import './SearchResults.css';
import CareerCard from '../../components/career/CareerCard.jsx';
import careerService from '../../services/career-service';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCareers, setAllCareers] = useState([]);

  // Cargar carreras basadas en la búsqueda
  useEffect(() => {
    const loadCareers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Obtener el término de búsqueda de la URL
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get('search') || '';
        
        if (!search) {
          setFilteredResults([]);
          setIsLoading(false);
          return;
        }
        
        // Cargar todas las carreras y filtrar localmente
        const response = await careerService.getAll();
        
        if (response.success) {
          const searchTerm = search.toLowerCase().trim();
          const results = (response.data || []).filter(career => {
            const name = (career.nombre || career.name || '').toLowerCase();
            const university = (career.universidad?.nombre || career.university || '').toLowerCase();
            const description = (career.descripcion || career.description || '').toLowerCase();
            
            return (
              name.includes(searchTerm) ||
              university.includes(searchTerm) ||
              description.includes(searchTerm)
            );
          }).map(career => ({
            id: career.id,
            name: career.nombre || career.name,
            description: career.descripcion || career.description || 'Sin descripción disponible',
            durationYears: career.duracion_en_anios || career.duracionAnios || career.duracion || career.duration || null,
            university: career.universidad?.nombre || career.university || '—',
            price: career.precio || career.price || '—',
            studyPlan: career.plan_estudio || career.studyPlan || '—'
          }));
          
          setFilteredResults(results);
        } else {
          setError('No se pudieron cargar las carreras');
        }
      } catch (err) {
        setError('Error al cargar las carreras');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCareers();
  }, [location.search]);

  // Actualizar el término de búsqueda cuando cambia la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
  }, [location.search]);

  // Manejar la búsqueda desde el formulario
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Manejar cambio en el input de búsqueda
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Manejar navegación hacia atrás
  const handleBack = () => {
    navigate(-1);
  };

  // Renderizar resultados de búsqueda
  const renderResults = () => {
    if (isLoading) {
      return <div className="text-center py-12">Buscando carreras...</div>;
    }

    if (error) {
      return <div className="text-center py-12 text-red-600">{error}</div>;
    }

    const searchTerm = new URLSearchParams(location.search).get('search') || '';
    
    if (!searchTerm) {
      return (
        <div className="text-center py-12">
          <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Busca carreras por nombre, universidad o descripción</h3>
          <p className="mt-1 text-gray-500">
            Ingresa un término de búsqueda para comenzar
          </p>
        </div>
      );
    }

    if (filteredResults.length === 0) {
      return (
        <div className="text-center py-12">
          <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron resultados para "{searchTerm}"</h3>
          <p className="mt-1 text-gray-500">
            Intenta con otras palabras clave o explora nuestras carreras populares.
          </p>
          <button
            onClick={() => navigate('/careers')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Ver todas las carreras
          </button>
        </div>
      );
    }

    return (
      <div className="career-grid">
        {filteredResults.map((career) => (
          <CareerCard
            key={career.id}
            id={career.id}
            name={career.name}
            description={career.description}
            durationYears={career.durationYears}
            university={career.university}
            price={career.price}
            onViewMore={() => navigate(`/career/${career.id}`)}
          />
        ))}
      </div>
    );
  };

  const searchTerm = new URLSearchParams(location.search).get('search') || '';
  
  return (
    <div className="career-details-container">
      <div className="career-details-header">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft /> Volver
        </button>
        <h1 className="category-title">
          {searchTerm ? `Resultados para "${searchTerm}"` : 'Buscar carreras'}
        </h1>
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Buscar carreras..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FiSearch />
          </button>
        </form>
      </div>
      
      {searchTerm && (
        <div className="results-count">
          {filteredResults.length} {filteredResults.length === 1 ? 'resultado' : 'resultados'} encontrados
        </div>
      )}
      
      {renderResults()}
    </div>
  );
};

export default SearchResults;
