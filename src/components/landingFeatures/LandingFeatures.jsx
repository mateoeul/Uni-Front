import './LandingFeatures.css';
import { FaSearch, FaBalanceScale, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaSearch size={38} color="#3b82f6" />,
    title: 'Investigá',
    desc: 'el perfil de cualquier universidad',
  },
  {
    icon: <FaBalanceScale size={38} color="#3b82f6" />,
    title: 'Compará',
    desc: 'toda la información de las universidades y carreras',
  },
  {
    icon: <FaComments size={38} color="#3b82f6" />,
    title: 'Hablá',
    desc: 'con nuestro chatbot especializado en orientación vocacional',
  },
];

const cardVariants = {
  off: { opacity: 0, y: 40, scale: 0.85 },
  on: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 0.7 } },
};

const avatars = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/men/76.jpg',
];

const LandingFeatures = () => {
  return (
    <section className="features-modern-section">
      <h2 className="features-modern-title">
        <span className="highlight">Elegir</span> nunca fue tan fácil
      </h2>
      <div className="features-modern-curve">
        <svg width="100%" height="120" viewBox="0 0 700 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="features-curve-svg">
          <path d="M40 100 Q 350 -40 660 100" stroke="#3b82f6" strokeWidth="3" strokeDasharray="10 10" fill="none" />
        </svg>
        <div className="features-avatars">
          <img src={avatars[0]} className="features-avatar" style={{ left: '5%', top: '60%' }} alt="avatar1" />
          <img src={avatars[1]} className="features-avatar features-avatar-main" style={{ left: '28%', top: '18%' }} alt="avatar2" />
          <img src={avatars[2]} className="features-avatar features-avatar-main" style={{ left: '54%', top: '30%' }} alt="avatar3" />
          <img src={avatars[3]} className="features-avatar" style={{ left: '80%', top: '65%' }} alt="avatar4" />
        </div>
      </div>
      <div className="features-modern-cards">
        {features.map((f, i) => (
          <motion.div
            className="feature-modern-card"
            key={i}
            variants={cardVariants}
            initial="off"
            whileInView="on"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="feature-modern-icon">{f.icon}</div>
            <div className="feature-modern-title">{f.title}</div>
            <div className="feature-modern-desc">{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LandingFeatures;