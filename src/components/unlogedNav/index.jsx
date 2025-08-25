import NavButtonText from '../navButtonText';
import NavButton from '../navButton/NavButton';
import './style.css'

const UnlogedNav = ({ navClass }) => {
  const isTransparent = navClass === "nav-transparent";
  const textClass = isTransparent ? "text-white" : "";

  return (
    <nav className={`nav-container ${navClass}`}>
      <div className="nav-content">
        <div className="nav-left">
          <span className={`logo ${textClass}`}>
            Uni
          </span>
          <NavButtonText name="/" texto="Inicio" className={textClass} />
          <NavButtonText name="/" texto="Universidades" className={textClass} />
          <NavButtonText name="/" texto="Carreras" className={textClass} />
          <NavButtonText name="/" texto="Sobre nosotros" className={textClass} />
          <NavButtonText name="/" texto="Test" className={textClass} />
          <NavButtonText name="/" texto="Uni" className={textClass}/>
        </div>

        <div className="nav-right">
          <NavButtonText name="/login" texto="Iniciar sesión" className={textClass} />
          <NavButton name="/register" texto="Registrase" />
        </div>
      </div>
    </nav>
  );
};


export default UnlogedNav;
