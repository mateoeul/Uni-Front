import React, { useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UNIVERSITIES } from './data';
import './universityProfile.css';
import ProfileHeader from './components/ProfileHeader';
import Tabs from './components/Tabs';
import AboutSection from './components/AboutSection';
import EventsTable from './components/EventsTable';
import FacultyList from './components/FacultyList';
import BackgroundDecor from './components/BackgroundDecor';

const UniversityProfile = () => {
  const { slug } = useParams();
  const university = useMemo(() => {
    const decoded = decodeURIComponent(slug || '');
    return UNIVERSITIES.find((u) => u.name === decoded);
  }, [slug]);

  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = Math.round(window.scrollY * 0.5);
      if (bgRef.current) {
        bgRef.current.style.setProperty('--bg-offset', `${offset}px`);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!university) {
    return (
      <div className="university-profile">
        <p>No encontramos la universidad.</p>
        <Link to="/universities">Volver</Link>
      </div>
    );
  }

  return (
    <>
      <div ref={bgRef} className="bg-lines" aria-hidden="true" />
      <BackgroundDecor />
      <div className="university-profile">
      <ProfileHeader logoText={university.logoText} name={university.name} type={university.type} />

      <Tabs />

      <div className="profile-content">
        <AboutSection name={university.name} faculties={university.faculties} />

        <div className="card-grid">
          <FacultyList />
          <EventsTable />
        </div>

        <section className="card">
          <h3>Carreras de grado</h3>
          <div className="career-grid">
            {['Arquitectura','Abogacía','Diseño','Comunicación','Negocios','Ingeniería','Medicina','Contador Público','Farmacia','Bioquímica'].map((c) => (
              <span key={c} className="career-pill">{c}</span>
            ))}
          </div>
        </section>
      </div>
      </div>
    </>
  );
};

export default UniversityProfile;


