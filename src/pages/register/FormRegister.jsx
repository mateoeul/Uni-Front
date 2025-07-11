import React, { useState } from "react";

const carreras = [
  "Ingeniería", "Medicina", "Derecho", "Arquitectura", "Psicología"
];

const FormRegister = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    apellido: "",
    carrera: "",
    fechaNacimiento: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    let newErrors = {};
    if (!form.username) newErrors.username = "Requerido";
    if (!form.email) newErrors.email = "Requerido";
    if (!form.password) newErrors.password = "Requerido";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    return newErrors;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!form.nombre) newErrors.nombre = "Requerido";
    if (!form.apellido) newErrors.apellido = "Requerido";
    if (!form.carrera) newErrors.carrera = "Requerido";
    if (!form.fechaNacimiento) newErrors.fechaNacimiento = "Requerido";
    return newErrors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validation = validateStep1();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setStep(2);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const validation = validateStep2();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      // Aquí iría la lógica para enviar los datos al backend
      alert("¡Registro exitoso!");
    }
  };

  return (
    <>
      <h2 className="login-title">Registrarse</h2>
      {step === 1 && (
        <form onSubmit={handleNext} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            className="login-input-final"
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="login-input-final"
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="login-input-final"
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            className="login-input-final"
            required
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          <button type="submit" className="login-button-final">Siguiente</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleRegister} className="login-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="login-input-final"
            required
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="login-input-final"
            required
          />
          {errors.apellido && <span className="error">{errors.apellido}</span>}
          <select
            name="carrera"
            value={form.carrera}
            onChange={handleChange}
            className="login-input-final"
            required
          >
            <option value="">Carrera</option>
            {carreras.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.carrera && <span className="error">{errors.carrera}</span>}
          <input
            type="date"
            name="fechaNacimiento"
            placeholder="Fecha nacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            className="login-input-final"
            required
          />
          {errors.fechaNacimiento && <span className="error">{errors.fechaNacimiento}</span>}
          <button type="submit" className="login-button-final">Registrarse</button>
        </form>
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