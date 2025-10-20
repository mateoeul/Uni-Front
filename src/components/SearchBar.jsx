import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ variant = 'default', onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Función simple para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = query.trim();
    if (searchTerm) {
      // Navegar directamente a la página de carreras con la búsqueda
      navigate(`/careers?search=${encodeURIComponent(searchTerm)}`);
      
      // Si hay un callback, llamarlo
      if (onSearch) onSearch(searchTerm);
    }
  };

  // Solo para el foco en el hero
  useEffect(() => {
    if (variant === 'hero' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [variant]);

  const baseClasses = 'flex items-center bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200';
  const sizeClasses = variant === 'hero' 
    ? 'h-16 text-lg' 
    : 'h-10 text-sm';
  
  return (
    <form 
      onSubmit={handleSearch}
      className={`${baseClasses} ${sizeClasses} ${className} ${isFocused ? 'ring-2 ring-blue-500' : ''}`}
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={variant === 'hero' ? 'Buscar carreras, universidades...' : 'Buscar...'}
        className={`flex-1 px-4 py-2 outline-none bg-transparent ${variant === 'hero' ? 'text-gray-800 text-lg' : 'text-gray-700'}`}
      />
      <button 
        type="submit"
        className={`px-4 h-full flex items-center justify-center ${variant === 'hero' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
      >
        <FiSearch className={variant === 'hero' ? 'text-white text-xl' : 'text-gray-600'} />
      </button>
    </form>
  );
};

export default SearchBar;
