import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './style.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Cierra el input si clickeás afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    } else if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      performSearch(query);
    }
  };

  const performSearch = (searchTerm) => {
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      navigate(`/careers?search=${encodeURIComponent(searchTerm.trim())}`);
    }
    setIsExpanded(false);
  };

  return (
    <div className="search-wrapper">
      <div
        className={`search-container ${isExpanded ? 'expanded' : ''}`}
        ref={containerRef}
      >
        {isExpanded ? (
          <div className="search-form">
            <input
              type="text"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar carreras, universidades..."
              className="search-input"
              aria-label="Buscar carreras y universidades"
              autoComplete="off"
            />
          </div>
        ) : null}
        <button 
          type="button"
          className="search-button"
          aria-label="Buscar"
          onClick={handleSearchClick}
        >
          <FaSearch className="search-icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
