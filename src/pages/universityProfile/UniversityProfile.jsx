import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import universityService from '../../services/university-service';
import './universityProfile.css';
import ProfileHeader from '../universities/components/ProfileHeader';
import Tabs from '../universities/components/Tabs';
import AboutSection from '../universities/components/AboutSection';
import EventsTable from '../universities/components/EventsTable';
import FacultyList from '../universities/components/FacultyList';


const UniversityProfile = () => {
  const { slug } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgRef = useRef(null);

  // Cargar universidad desde el servicio
  useEffect(() => {
    const loadUniversity = async () => {
      try {
        setLoading(true);
        const universityName = decodeURIComponent(slug || '');
        
        // Obtener todas las universidades y buscar por nombre
        const response = await universityService.getAll();
        if (response.success) {
          const foundUniversity = response.data.find(uni => uni.nombre === universityName);
          if (foundUniversity) {
            // Obtener detalles completos por ID
            const detailResponse = await universityService.getById(foundUniversity.id);
            if (detailResponse.success) {
              const uni = detailResponse.data;
              const mappedUniversity = {
                id: uni.id,
                name: uni.nombre,
                type: uni.tipo,
                logoText: uni.abreviacion || uni.nombre.substring(0, 2).toUpperCase(),
                photo: uni.foto,
                description: uni.descripcion,
                contactEmail: uni.contacto_mail,
                contactPhone: uni.contacto_telefono,
                website: uni.sitio_web,
                instagram: uni.instagram,
                linkedin: uni.linkedin,
                bannerPhoto: uni.foto_banner,
                gallery: uni.galeria_fotos,
                studentCount: uni.cantidad_alumnos,
                foundationYear: uni.ano_fundacion,
                careers: uni.carreras,
                faculties: uni.carreras ? uni.carreras.map(c => c.carrera.nombre) : []
              };
              setUniversity(mappedUniversity);
            }
          } else {
            setError('Universidad no encontrada');
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadUniversity();
    }
  }, [slug]);

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

  if (loading) {
    return (
      <div className="university-profile">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="university-profile">
        <p style={{color: 'red'}}>Error: {error}</p>
        <Link to="/universities">Volver</Link>
      </div>
    );
  }

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
      <div className="university-profile">
      <ProfileHeader 
        logoText={university.logoText} 
        name={university.name} 
        type={university.type}
        photo={university.photo}
        description={university.description}
        website={university.website}
        linkedin={university.linkedin}
      />

      <Tabs />

      <div className="profile-content">
        <AboutSection 
          name={university.name} 
          description={university.description}
          studentCount={university.studentCount}
          faculties={university.faculties} 
        />

        <div className="card-grid">
          <EventsTable />
        </div>

        {university.careers && university.careers.length > 0 && (
          <section className="card">
            <h3>Carreras de grado</h3>
            <div className="career-grid">
              {university.careers.map((career) => (
                <Link
                  key={career.carrera.id}
                  className="career-pill"
                  to={`/${university.id}/profile/careers/${career.carrera.id}`}
                >
                  {career.carrera.nombre}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Información de contacto */}
        {(university.foundationYear || university.contactEmail || 
          university.contactPhone || university.instagram) && (
          <section className="card">
            <h3>Información de contacto</h3>
            <div className="university-details">
              {university.foundationYear && (
                <p><strong>Año de fundación:</strong> {university.foundationYear}</p>
              )}
              {university.contactEmail && (
                <p><strong>Email:</strong> <a href={`mailto:${university.contactEmail}`}>{university.contactEmail}</a></p>
              )}
              {university.contactPhone && (
                <p><strong>Teléfono:</strong> <a href={`tel:${university.contactPhone}`}>{university.contactPhone}</a></p>
              )}
              {university.instagram && (
                <p><strong>Instagram:</strong> <a href={`https://instagram.com/${university.instagram}`} target="_blank" rel="noopener noreferrer">@{university.instagram}</a></p>
              )}
            </div>
          </section>
        )}
      </div>
      </div>
    </>
  );
};

export default UniversityProfile;


