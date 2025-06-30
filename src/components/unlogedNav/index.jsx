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
            Uni<span className="dot">.</span>
          </span>
          <NavButtonText name="/" texto="Home" className={textClass} />
          <NavButtonText name="/" texto="Universities" className={textClass} />
          <NavButtonText name="/" texto="Careers" className={textClass} />
          <NavButtonText name="/" texto="About Us" className={textClass} />
          <NavButtonText name="/" texto="Test" className={textClass} />
          <NavButtonText name="/" texto="Uni" className={textClass}/>
        </div>

        <div className="nav-right">
          <NavButtonText name="/login" texto="Log in" className={textClass} />
          <NavButton name="/register" texto="Register" />
        </div>
      </div>
    </nav>
  );
};


export default UnlogedNav;
