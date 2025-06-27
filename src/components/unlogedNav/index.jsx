import NavButtonText from '../navButtonText';
import NavButton from '../navButton/NavButton';

const UnlogedNav = () => {

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-left">
          <span name="/" className="logo">Uni<span className="dot">.</span></span>    
          <NavButtonText name="/" texto="Home" />
          <NavButtonText name="/" texto="Universities" />
          <NavButtonText name="/" texto="Careers" />
          <NavButtonText name="/" texto="About Us" />
          <NavButtonText name="/" texto="Test" />
          <NavButtonText name="/" texto="Uni" style={{color: "blue"}}/>
        </div>

        <div className="nav-right">
            <NavButtonText name="/login" texto="Log in" />
            <NavButton name={"/register"} texto={"Register"}/>
        </div>
      </div>
    </nav>
  );
};

export default UnlogedNav;
