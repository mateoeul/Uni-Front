// src/components/LogedNav.jsx
import NavButtonText from '../navButtonText';
import './style.css';

const LogedNav = () => {
    return (
        <nav className="nav-container">
            <div className="nav-left">
                <span name="/" className="logo">Uni<span className="dot">.</span></span>    
                <NavButtonText name="/" texto="Home" />
                <NavButtonText name="/universities" texto="Universities" />
                <NavButtonText name="/careers" texto="Careers" />
                <NavButtonText name="/about" texto="About Us" />
                <NavButtonText name="/test" texto="Test" />
                <NavButtonText name="/uni-ai" texto="Uni🧠" />
            </div>
            <div className="nav-right">

            </div>
        </nav>
    );
};

export default LogedNav;