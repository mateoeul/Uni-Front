import React, { useState } from "react";

const carreras = [
  "Ingeniería", "Medicina", "Derecho", "Arquitectura", "Psicología"
];

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

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setForm1(prev => ({ ...prev, [name]: value }));
    if (errors1[name]) {
      setErrors1(prev => ({ ...prev, [name]: "" }));
    }
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
    if (!form2.carrera.trim()) newErrors.carrera = "Selecciona una carrera";
    if (!form2.fechaNacimiento.trim()) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    
    setErrors2(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      alert("¡Registro exitoso!");
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
                required
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
                required
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
                required
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
                required
              />
              {errors1.confirmPassword && <span className="error">{errors1.confirmPassword}</span>}
            </div>
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
                required
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
                required
              />
              {errors2.apellido && <span className="error">{errors2.apellido}</span>}
            </div>
            <div className="input-wrapper">
              <select
                name="carrera"
                value={form2.carrera}
                onChange={handleChange2}
                className={`login-input-final ${errors2.carrera ? 'input-error' : ''}`}
                required
              >
                <option value="">Carrera</option>
                {carreras.map((carrera, index) => (
                  <option key={index} value={carrera}>
                    {carrera}
                  </option>
                ))}
              </select>
              {errors2.carrera && <span className="error">{errors2.carrera}</span>}
            </div>
            <div className="input-wrapper">
              <input
                type="date"
                name="fechaNacimiento"
                value={form2.fechaNacimiento}
                onChange={handleChange2}
                className={`login-input-final ${errors2.fechaNacimiento ? 'input-error' : ''}`}
                required
              />
              {errors2.fechaNacimiento && <span className="error">{errors2.fechaNacimiento}</span>}
            </div>
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