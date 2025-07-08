import { useEffect, useState } from 'react';
import UnlogedNav from "../../components/unlogedNav";
import './Landing.css';

import Universitarios1 from '../../assets/images/universitarios1.jpg'
import Universitarios2 from '../../assets/images/universitarios2.jpg'
import Universitarios3 from '../../assets/images/universitarios3.jpg'

import LandingFeatures from '../../components/landingFeatures/LandingFeatures';

const Landing = () => {
    const [navClass, setNavClass] = useState("nav-transparent");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight - 80) {
                setNavClass("nav-white");
            } else {
                setNavClass("nav-transparent");
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <UnlogedNav navClass={navClass} />
            <div className="imagenFondo">  
                <div className="textoLanding">
                    <h1>Uni.</h1>
                    <h4>Tu futuro en un click</h4>
                    <button className="landing-button"> Empezá ahora </button>
                </div>
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

            <div>
                <LandingFeatures/>
            </div>


        </div>
                </>
    );
};

export default Landing;
