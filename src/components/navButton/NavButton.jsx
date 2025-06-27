import './navButton.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const NavButton = ({ name, texto }) => {
  return (
    <Link to={name} className="nav-button">
      <span className="button-text">{texto}</span>
      <span className="button-icon"><FaArrowRight /></span>
    </Link>
  );
};

export default NavButton;
