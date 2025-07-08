import './LandingFeatures.css';

import ImgUniversidad from '../../assets/images/universitarios1.jpg';
const LandingFeatures = () => {
    return (
      <div className="features-container">
        <h2 className="features-title">
          <span className="highlight">Elegir</span> nunca fue tan fácil
        </h2>
        <div className="features-line"></div>
  
        <div className="feature-block left">
          <div className="feature-img-wrapper">
            <img src={ImgUniversidad} alt="Perfil universidad" className="feature-img" />
          </div>
          <div className="feature-text">
            <p><span className="highlight">Investigá</span> el perfil de cualquier universidad</p>
          </div>
        </div>
  
        <div className="feature-block middle">
          <div className="feature-text">
            <p><span className="highlight">Compará</span> toda la información de las universidades y carreras</p>
          </div>
          <div className="feature-img-wrapper">
            <img src={ImgUniversidad} alt="Comparar carreras" className="feature-img" />
          </div>
        </div>
  
        <div className="feature-block left">
          <div className="feature-img-wrapper">
            <img src={ImgUniversidad} alt="Chatbot orientación" className="feature-img" />
          </div>
          <div className="feature-text">
            <p><span className="highlight">Hablá</span> con nuestro <span className="highlight">chatbot</span> especializado en orientación <span className="highlight">vocacional</span></p>
          </div>
        </div>
      </div>
    );
  };
  
  export default LandingFeatures;