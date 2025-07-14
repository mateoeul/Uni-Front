import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import Logo from "../../assets/images/LogoUni.png";
import Img from "../../assets/images/google.png"
import Ilu from "../../assets/images/ilustracion.png"
import Input from "../../components/input/Input";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email.trim()) newErrors.email = "El email es requerido";
    if (!form.password.trim()) newErrors.password = "La contraseña es requerida";
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (form.password && form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validateForm()) {
      try {
        const res = await axios.post("http://localhost:3000/api/user/login", {
          mail: form.email,
          contraseña: form.password
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
        navigate("/home");
      } catch (err) {
        setError("Email o contraseña incorrectos");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Columna izquierda */}
        <div className="login-left">
          <img src="src/assets/images/LogoUni.png" alt="Logo Uni" className="logo-img" />
          <h1 className="login-title-left">
            El comienzo de tu <br /> <span>futuro académico</span>  
          </h1>
          <img
            src="src/assets/images/Ilustracion.png"
            alt="Ilustración"
            className="login-illustration"
          />
        </div>

        {/* Columna derecha */}
        <div className="login-right">
          <div className="login-box-final">
            <h2 className="login-title">Iniciar sesión en Uni</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className="login-input-final"
                required
              />
              {errors.email && <span style={{color: 'red', fontSize: '0.8rem'}}>{errors.email}</span>}
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="login-input-final"
                required
              />
              {errors.password && <span style={{color: 'red', fontSize: '0.8rem'}}>{errors.password}</span>}
              {error && <span style={{color: 'red', fontSize: '0.9rem', display: 'block', marginTop: '8px'}}>{error}</span>}
              <button type="submit" className="login-button-final">
                Iniciar sesión
              </button>
            </form>

            <button className="login-google-final">
              <img
                src="src/assets/images/google.png"
                alt="Google"
                className="google-icon"
              />
              Continuar con google
            </button>

            <div className="login-links-final">
              <Link to="#">Olvidé mi contraseña</Link>
              <br />
              <Link to="/register">Crear una cuenta de Uni</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };
  
export default Login;