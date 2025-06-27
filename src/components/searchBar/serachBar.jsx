import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './style.css'; // estilos específicos para el buscador

const SearchBar = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Cierra el input si clickeás afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      const value = inputRef.current?.value.trim();
      if (value !== '') {
        onSearch && onSearch(value);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const value = inputRef.current?.value.trim();
      if (value !== '') {
        onSearch && onSearch(value);
      }
    }
  };

  return (
    <div
      className={`search-container ${isExpanded ? 'expanded' : ''}`}
      ref={containerRef}
    >
      <input
        type="text"
        ref={inputRef}
        className="search-input"
        placeholder="Search..."
        onKeyDown={handleKeyDown}
      />
      <FaSearch className="search-icon" onClick={handleSearchClick} />
    </div>
  );
};

export default SearchBar;
