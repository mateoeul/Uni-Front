import { useEffect, useState } from 'react';
import UnlogedNav from "../../components/unlogedNav";
import './Landing.css';

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
            
            <div style={{ height: "200vh", background: "#f0f0f0" }}>
                
            </div>
        </>
    );
};

export default Landing;
