import NavButtonText from '../navButtonText';
import SearchBar from '../searchBar/serachBar';
import './style.css';
import { FaUserCircle } from 'react-icons/fa';

const LogedNav = () => {

  // Función que maneja la búsqueda (podés modificarla)
  const handleSearch = (query) => {
    console.log('Buscando:', query);
    // Aquí tu lógica real de búsqueda o navegación
  };

  return (
    <nav className="loged-nav-container">
      <div className="nav-content">
        <div className="nav-left">
          <span name="/" className="logo">Uni</span>    
          <NavButtonText name="/home" texto="Inicio" />
          <NavButtonText name="/universities" texto="Universidades" />
          <NavButtonText name="/careers" texto="Carreras" />
          <NavButtonText name="/about" texto="Sobre nosotros" />
          <NavButtonText name="/test" texto="Test" />
          <NavButtonText name="/uni-ai" texto="Uni" style={{color: "blue"}}/>
        </div>

        <div className="nav-right">
          <SearchBar onSearch={handleSearch} />
          <FaUserCircle className="profile-icon" />
        </div>
      </div>
    </nav>
  );
};

export default LogedNav;
