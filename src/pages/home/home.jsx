// src/pages/Home.jsx
import "./home.css";
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBuilding, FaCode, FaHeartbeat, FaShieldAlt, FaGlobe, FaFeather, FaGraduationCap, FaMicrophone, FaLeaf } from 'react-icons/fa';
import universitarios1 from '../../assets/images/universitarios1.jpg';

const Home = () => {
  const categories = [
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

  const navigate = useNavigate();

  const goToCategory = (name) => {
    navigate(`/careers?category=${encodeURIComponent(name)}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-highlight">Empezá</span> tu Camino{" "}
            <span className="title-highlight">Académico</span>
          </h1>
          <p className="hero-subtitle">
            Encontrá toda la información de las carreras y universidades de tu interés
          </p>
          <div className="home-search">
              <input 
                type="text" 
                placeholder="Buscar..." 
              className="home-search__input"
              />
            <button className="home-search__button">
                <FaSearch />
              </button>
            </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Busca Por Categorías</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="category-card"
              style={{ backgroundColor: category.bgColor }}
              onClick={() => goToCategory(category.name)}
            >
              <div className="category-icon">{category.icon}</div>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Vocational Test Section */}
      <section className="test-section">
        <h2 className="section-title">Test Vocacional</h2>
        <p className="test-subtitle">Descubri tus gustos e intereses aqui</p>
        <button className="cta-button">Empezar ahora</button>
      </section>

      {/* Final Section */}
      <section className="final-section">
        <div className="final-content">
          <div className="final-text">
            <h2 className="final-title"><span className="final-highlight">Encontrá</span> tu carrera y universidad ideal</h2>
          </div>
          <div className="final-image">
            <img 
              src={universitarios1} 
              alt="Estudiantes universitarios" 
              className="students-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;