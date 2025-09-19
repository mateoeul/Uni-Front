// src/pages/careersCategories/careersCategories.jsx
import React, { useEffect, useState } from 'react';
import "./careers.css";
import { FaList } from 'react-icons/fa';
import CareerDetails from '../careerDetails/careerList';
import categoryService from '../../services/category-service';

const CareersCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getAll();
        if (response.success) {
          // Mapeo básico: { id, name }
          const mapped = (response.data || []).map((cat, idx) => ({
            id: cat.id,
            name: cat.nombre || cat.name || `Categoría ${idx + 1}`,
            bgColor: '#E3F2FD',
            icon: <FaList />
          }));
          setCategories(mapped);
        } else {
          setError('No se pudieron cargar las categorías');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  // Si hay una categoría seleccionada, mostrar los detalles
  if (selectedCategory) {
    return <CareerDetails selectedCategory={selectedCategory} onBack={handleBack} />;
  }

  // Si no hay categoría seleccionada, mostrar la vista de categorías
  return (
    <div className="careers-container">
      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Busca Por Categorías</h2>

        {loading && (
          <div style={{ padding: 16 }}>Cargando categorías...</div>
        )}
        {error && (
          <div style={{ padding: 16, color: 'red' }}>Error: {error}</div>
        )}

        {!loading && !error && (
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                style={{ backgroundColor: category.bgColor }}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="category-icon">{category.icon}</div>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default CareersCategories;