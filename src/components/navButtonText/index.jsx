import { Link } from 'react-router-dom';
import './style.css';

const NavButtonText = ({ name, texto, className = "" }) => {
    return (
        <Link to={name} className={`nav-button-text ${className}`}>
            {texto}
        </Link>
    );
};

export default NavButtonText;
