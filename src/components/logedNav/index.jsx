import NavButtonText from '../navButtonText';
import SearchBar from '../searchBar/serachBar';
import './style.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const LogedNav = () => {

  const navigate = useNavigate();

  // Función que maneja la búsqueda
  const handleSearch = (query) => {
    if (query.trim()) {
      // Redirigir a la página de carreras con el filtro de búsqueda
      navigate(`/careers?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="loged-nav-container">
      <div className="nav-content">
        <div className="nav-left">
          <Link to="/home" className="logo">Uni</Link>    
          <NavButtonText name="/home" texto="Inicio" />
          <NavButtonText name="/universities" texto="Universidades" />
          <NavButtonText name="/careers" texto="Carreras" />
          <NavButtonText name="/about" texto="Sobre nosotros" />
          <NavButtonText name="/test" texto="Test" />
          <NavButtonText name="/uni-ai" texto="Uni" style={{color: "blue"}}/>
        </div>

        <div className="nav-right">
          <SearchBar onSearch={handleSearch} />
          <Link to="/user-profile" aria-label="Perfil de usuario">
            <FaUserCircle className="profile-icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LogedNav;
