import React from "react";
import "./register.css";
import Logo from "../../assets/images/LogoUni.png";
import Illustration from "../../assets/images/Ilustracion.png";
import FormRegister from "./FormRegister";

const Register = () => {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Columna izquierda */}
        <div className="login-left">
          <img src={Logo} alt="Logo Uni" className="logo-img" />
          <h1 className="login-title-left">
            El comienzo de tu <br /> <span>futuro académico</span>
          </h1>
          <img src={Illustration} alt="Ilustración" className="login-illustration" />
        </div>
        {/* Columna derecha */}
        <div className="login-right">
          <div className="login-box-final">
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
