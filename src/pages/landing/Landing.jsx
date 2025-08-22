import { useEffect, useState, useRef } from 'react';
import UnlogedNav from "../../components/unlogedNav";
import './Landing.css';

import LandingFeatures from '../../components/landingFeatures/LandingFeatures';
import Testimonios from '../../components/testimonios/Testimonios';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import phoneMockup from '../../assets/images/uni.png'; // Usa tu mockup real si lo tienes
import { FaUniversity, FaComments, FaSearch, FaBalanceScale } from 'react-icons/fa';
import Universitarios1 from '../../assets/images/universitarios1.jpg';
import Universitarios2 from '../../assets/images/universitarios2.jpg';
import Universitarios3 from '../../assets/images/universitarios3.jpg';

const Landing = () => {
    const navClass = "nav-white";

    return (
        <>
            <UnlogedNav navClass={navClass} />
            <section className="landing-hero">
                <div className="hero-bg-blob blob-1" />
                <div className="hero-bg-blob blob-2" />
                <div className="hero-bg-line line-1" />
                <div className="hero-bg-line line-2" />
                <div className="hero-diamond diamond-1" />
                <div className="hero-diamond diamond-2" />
                <div className="hero-diamond diamond-3" />
                <div className="hero-diamond diamond-4" />
                <div className="landing-hero-content">
                    <h1 className="landing-hero-title">Uni</h1>
                    <h4 className="landing-hero-subtitle">Tu futuro en un click</h4>
                    <button className="landing-hero-button">Empezá ahora</button>
                </div>
            </section>
            <div className="info-section info-hero-modern">
                <div className="info-hero-center">
                    <h2 className="info-hero-title">Buscá y Encontrá qué hacer en tu futuro profesional</h2>
                    <p className="info-hero-desc">Somos una aplicación que busca hacer más eficiente la búsqueda de universidades y carreras, centralizando toda la información que necesitás para decidir tu futuro.</p>
                    <button className="info-hero-btn">Explorá universidades</button>
                </div>
                {/* Tarjetas/íconos flotantes animadas */}
                <motion.div className="info-hero-float card-uni" initial={{ opacity: 0, y: -40, scale: 0.7 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.3 }} transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}>
                    <FaUniversity size={38} color="#3b82f6" />
                    <div className="info-hero-float-title">+100 Universidades</div>
                </motion.div>
                <motion.div className="info-hero-float card-careers" initial={{ opacity: 0, x: -40, scale: 0.7 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: false, amount: 0.3 }} transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}>
                    <FaSearch size={38} color="#3b82f6" />
                    <div className="info-hero-float-title">+2000 Carreras</div>
                </motion.div>
                <motion.div className="info-hero-float card-chat" initial={{ opacity: 0, y: 40, scale: 0.7 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.3 }} transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}>
                    <FaComments size={38} color="#3b82f6" />
                    <div className="info-hero-float-title">Chat de orientación</div>
                </motion.div>
                <motion.div className="info-hero-float card-compare" initial={{ opacity: 0, x: 40, scale: 0.7 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: false, amount: 0.3 }} transition={{ delay: 0.9, duration: 0.7, type: 'spring' }}>
                    <FaBalanceScale size={38} color="#3b82f6" />
                    <div className="info-hero-float-title">Compará universidades</div>
                </motion.div>
            </div>
            
            <div className="info-section">
                <div className="info-images">
                    <img src={Universitarios3} alt="Estudiantes en biblioteca" className="img-large" />
                    <img src={Universitarios1} alt="Estudiante 1" className="img-small" />
                    <img src={Universitarios2} alt="Estudiantes en escalera" className="img-small" /> 
                </div>

                <div className="info-text">
                    <h2>
                        <span className="text-blue">Buscá</span> y <span className="text-blue">Encontrá</span> qué hacer en tu futuro profesional
                    </h2>
                    <p>
                        Uni es una plataforma web que centraliza toda la información de las distintas carreras y universidades.
                    </p>
                    <div className="info-columns">
                        <div className="info-block">
                            <h4>NUESTRA MISIÓN:</h4>
                            <p>
                                Generar un impacto positivo en la juventud ayudando a todos los estudiantes a encontrar la carrera y universidad de sus sueños.
                            </p>
                        </div>
                        <div className="info-block">
                            <h4>NUESTRA VISIÓN:</h4>
                            <p>
                                Queremos inspirar a estudiantes a tomar decisiones informadas, acompañándolos con tecnología educativa, innovación y empatía.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='features'>
                <LandingFeatures/>
                <Testimonios />
            </div>
        </>
    );
};


export default Landing;
