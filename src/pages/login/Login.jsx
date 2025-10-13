import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import authService from "../../services/auth-service";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refresh } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!form.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (validateForm()) {
      try {
        // Use auth service for login
        const response = await authService.login(form.email, form.password);
        console.log('Login successful:', response);
        // Ensure context picks up the stored user and role immediately
        refresh();
        navigate("/home");
      } catch (err) {
        console.error('Login error:', err);
        // Show the actual backend error message
        setError(err.message);
      }
    } else {
      setTimeout(() => {
        setErrors(prev => ({ ...prev }));
      }, 100);
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
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={form.email}
                  onChange={handleChange}
                  className={`login-input-final ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={handleChange}
                  className={`login-input-final ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              {error && <div className="error">{error}</div>}
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