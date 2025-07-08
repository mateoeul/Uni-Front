// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"
import Logo from "../../assets/images/LogoUni.png";
import Img from "../../assets/images/google.png"
import Ilu from "../../assets/images/ilustracion.png"
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", form);
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
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="login-input-final"
                required
              />
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