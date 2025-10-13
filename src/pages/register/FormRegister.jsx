import React, { useState } from "react";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";


const FormRegister = () => {
  const [step, setStep] = useState(1);
  const [form1, setForm1] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [form2, setForm2] = useState({
    nombre: "",
    apellido: "",
    carrera: "",
    fechaNacimiento: ""
  });
  const [errors1, setErrors1] = useState({});
  const [errors2, setErrors2] = useState({});
  const [error, setError] = useState("");
  const [step1Error, setStep1Error] = useState("");
  const navigate = useNavigate();
  const { refresh } = useUser();


  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setForm1(prev => ({ ...prev, [name]: value }));
    if (errors1[name]) {
      setErrors1(prev => ({ ...prev, [name]: "" }));
    }
    if (step1Error) setStep1Error("");
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setForm2(prev => ({ ...prev, [name]: value }));
    if (errors2[name]) {
      setErrors2(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!form1.username.trim()) newErrors.username = "El nombre de usuario es requerido";
    if (!form1.email.trim()) newErrors.email = "El email es requerido";
    if (!form1.password.trim()) newErrors.password = "La contraseña es requerida";
    if (!form1.confirmPassword.trim()) newErrors.confirmPassword = "Confirma tu contraseña";
    
    if (form1.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form1.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (form1.password && form1.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }
    
    if (form1.password && form1.confirmPassword && form1.password !== form1.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    setErrors1(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!form2.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form2.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!form2.fechaNacimiento.trim()) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    
    setErrors2(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      // First check availability on server without creating user
      (async () => {
        try {
          setStep1Error("");
          await authService.validateExistence(form1.email, form1.username);
          setStep(2);
        } catch (err) {
          // Server returns specific messages for duplicates
          const msg = err.message || "Error de validación";
          if (msg.toLowerCase().includes('mail')) {
            setErrors1(prev => ({ ...prev, email: msg }));
          } else if (msg.toLowerCase().includes('usuario')) {
            setErrors1(prev => ({ ...prev, username: msg }));
          } else {
            setStep1Error(msg);
          }
        }
      })();
    } else {
      setStep1Error("Completa los campos obligatorios");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    if (validateStep2()) {
      try {
        // Create user data for registration
        const userData = {
          nombreusuario: form1.username,
          mail: form1.email,
          contraseña: form1.password
        };

        // Create student data
        const studentData = {
          nombre: form2.nombre,
          apellido: form2.apellido,
          fechanac: form2.fechaNacimiento,
          foto: null
        };

        // Create complete registration data using auth service helper
        const registrationData = authService.createStudentRegistration(userData, studentData);
        
        // Register using auth service
        const response = await authService.register(registrationData);
        console.log('Registration successful:', response);

        // Auto login after successful registration
        const loginResponse = await authService.login(form1.email, form1.password);
        console.log('Auto login successful:', loginResponse);
        // Ensure context picks up the stored user and role immediately
        refresh();

        // Navigate to home page
        navigate("/home");
        
      } catch (err) {
        console.error('Registration error:', err);
        setError(err.message || "Error al registrar usuario");
      }
    }
  };

  return (
    <>
      {step === 1 && (
        <>
          <h2 className="login-title">Registrarse</h2>
          <form onSubmit={handleNext} className="login-form">
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={form1.username}
                onChange={handleChange1}
                className={`login-input-final ${errors1.username ? 'input-error' : ''}`}
              />
              {errors1.username && <span className="error">{errors1.username}</span>}
            </div>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form1.email}
                onChange={handleChange1}
                className={`login-input-final ${errors1.email ? 'input-error' : ''}`}
              />
              {errors1.email && <span className="error">{errors1.email}</span>}
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form1.password}
                onChange={handleChange1}
                className={`login-input-final ${errors1.password ? 'input-error' : ''}`}
              />
              {errors1.password && <span className="error">{errors1.password}</span>}
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={form1.confirmPassword}
                onChange={handleChange1}
                className={`login-input-final ${errors1.confirmPassword ? 'input-error' : ''}`}
              />
              {errors1.confirmPassword && <span className="error">{errors1.confirmPassword}</span>}
            </div>
            {step1Error && <div className="error" style={{ marginBottom: 8 }}>{step1Error}</div>}
            <button type="submit" className="login-button-final">
              Siguiente
            </button>
          </form>
        </>
      )}
      
      {step === 2 && (
        <>
          <h2 className="login-title">Completa tu perfil</h2>
          <form onSubmit={handleRegister} className="login-form">
            <div className="input-wrapper">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form2.nombre}
                onChange={handleChange2}
                className={`login-input-final ${errors2.nombre ? 'input-error' : ''}`}
              />
              {errors2.nombre && <span className="error">{errors2.nombre}</span>}
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={form2.apellido}
                onChange={handleChange2}
                className={`login-input-final ${errors2.apellido ? 'input-error' : ''}`}
              />
              {errors2.apellido && <span className="error">{errors2.apellido}</span>}
            </div>
            <div className="input-wrapper">
              <input
                type="date"
                name="fechaNacimiento"
                value={form2.fechaNacimiento}
                onChange={handleChange2}
                className={`login-input-final ${errors2.fechaNacimiento ? 'input-error' : ''}`}
              />
              {errors2.fechaNacimiento && <span className="error">{errors2.fechaNacimiento}</span>}
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="login-button-final">
              Registrarse
            </button>
          </form>
        </>
      )}
      
      <div className="login-links-final">
        <span style={{ color: "#888" }}>
          {step === 1 ? "● ○" : "○ ●"}
        </span>
      </div>
    </>
  );
};

export default FormRegister; 