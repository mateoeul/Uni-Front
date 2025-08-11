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

function AnimatedUniLogo() {
    // Parámetros del texto y animación
    const width = 340;
    const height = 110;
    const duration = 4;
    // Trayectoria diagonal para el lápiz: arranca arriba a la izquierda, termina abajo a la derecha sobre el texto
    const pencilPath = [
        { x: 30, y: 0 }, // Arriba a la izquierda, sobre la U
        { x: 80, y: 30 },
        { x: 160, y: 55 },
        { x: 240, y: 70 },
        { x: width - 30, y: 80 }, // Final sobre la i
    ];
    const pencilX = pencilPath.map(p => p.x);
    const pencilY = pencilPath.map(p => p.y);
    return (
        <svg
            width={width} height={height} viewBox={`0 0 ${width} ${height}`}
            style={{ display: 'block', margin: '0 auto', maxWidth: '90vw', position: 'relative' }}
        >
            <defs>
                <clipPath id="uni-roller-clip">
                    <motion.rect
                        x="0" y="0" height={height} width="0"
                        animate={{ width }}
                        transition={{ duration, ease: 'easeInOut' }}
                        fill="#3b82f6"
                    />
                </clipPath>
            </defs>
            {/* Texto negro base */}
            <text
                x="50%" y="70%" textAnchor="middle"
                fontFamily="'Montserrat', 'Arial', sans-serif"
                fontWeight="900"
                fontSize="90"
                fill="#111"
            >
                Uni
            </text>
            {/* Texto azul que se revela con el "rodillo" */}
            <text
                x="50%" y="70%" textAnchor="middle"
                fontFamily="'Montserrat', 'Arial', sans-serif"
                fontWeight="900"
                fontSize="90"
                fill="#3b82f6"
                clipPath="url(#uni-roller-clip)"
            >
                Uni
            </text>
            {/* Lápiz animado con trayectoria diagonal */}
            <motion.g
                initial={{ x: pencilX[0], y: pencilY[0], opacity: 1, rotate: -25 }}
                animate={{
                    x: pencilX,
                    y: pencilY,
                    opacity: [1, 1, 1, 1, 1],
                    rotate: -25,
                }}
                transition={{ duration, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.8, 1] }}
            >
                {/* Cuerpo del lápiz */}
                <rect x="-8" y={height - 38} width="36" height="14" rx="6" fill="#3b82f6" stroke="#222" strokeWidth="1.5" />
                {/* Punta */}
                <polygon points="28,99 38,104 28,109" fill="#fbbf24" stroke="#222" strokeWidth="1" />
                {/* Borrador */}
                <rect x="-16" y={height - 36} width="8" height="10" rx="2" fill="#fca5a5" stroke="#222" strokeWidth="1" />
            </motion.g>
        </svg>
    );
}

function AppParallaxMockup() {
    const ref = useRef(null);
    const x = useMotionValue(0);
    // Parallax: -30px a +30px según el mouse
    const parallaxX = useTransform(x, [0, 1], [-30, 30]);

    function handleMouseMove(e) {
        const bounds = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const percent = Math.max(0, Math.min(1, mouseX / bounds.width));
        x.set(percent);
    }

    return (
        <div
            className="app-mockup-parallax-wrapper"
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => x.set(0.5)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
            <motion.img
                src={phoneMockup}
                alt="App Mockup"
                className="app-mockup-img"
                style={{ x: parallaxX }}
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                drag={false}
            />
        </div>
    );
}

export default Landing;
