import { Link } from 'react-router-dom';
import './style.css';

const NavButtonText = ({ name, texto }) => {
    return (
        <Link to={name} className="nav-button-text">
            {texto}
        </Link>
    );
};

export default NavButtonText;