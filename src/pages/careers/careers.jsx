// src/pages/careers.jsx
import React, { useEffect, useState } from 'react';
import "./careers.css";
import { FaSearch, FaBuilding, FaCode, FaHeartbeat, FaShieldAlt, FaGlobe, FaFeather, FaGraduationCap, FaMicrophone, FaLeaf, FaList } from 'react-icons/fa';
import CareerDetails from '../careerDetails/careerDetails';

const Careers = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);
  }, []);

  const allCategory = { name: "Todas", icon: <FaList />, bgColor: "#F5F5F5" };
  
  const specificCategories = [
    // Fila 1
    { name: "Ciencias exactas", icon: <FaBuilding />, bgColor: "#E3F2FD" },
    { name: "Tecnología", icon: <FaCode />, bgColor: "#E8F5E8" },
    { name: "Salud", icon: <FaHeartbeat />, bgColor: "#FCE4EC" },
    // Fila 2
    { name: "Ciencias sociales", icon: <FaGlobe />, bgColor: "#FFF3E0" },
    { name: "Artes y humanidades", icon: <FaFeather />, bgColor: "#F3E5F5" },
    { name: "Negocios y administración", icon: <FaShieldAlt />, bgColor: "#E8EAF6" },
    // Fila 3
    { name: "Ciencias naturales", icon: <FaLeaf />, bgColor: "#E8F5E8" },
    { name: "Educación y docencia", icon: <FaGraduationCap />, bgColor: "#FCE4EC" },
    { name: "Comunicación y medios", icon: <FaMicrophone />, bgColor: "#E3F2FD" }
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
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
        
        {/* Specific categories - 3x3 grid */}
        <div className="categories-grid">
          {specificCategories.map((category, index) => (
            <div 
              key={index} 
              className="category-card"
              style={{ backgroundColor: category.bgColor }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-icon">{category.icon}</div>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Todas category - centered */}
        <div className="all-category-container">
          <div 
            className="category-card all-category"
            style={{ backgroundColor: allCategory.bgColor }}
            onClick={() => handleCategoryClick(allCategory.name)}
          >
            <div className="category-icon">{allCategory.icon}</div>
            <span className="category-name">{allCategory.name}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;