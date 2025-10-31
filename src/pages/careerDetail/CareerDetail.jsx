import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import universityService from '../../services/university-service';
import ProfileHeader from '../universities/components/ProfileHeader';

const CareerDetail = () => {
  const { universityId, careerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [career, setCareer] = useState(null);
  const [university, setUniversity] = useState(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 1) Obtener datos de la universidad (para header)
        const uniRes = await universityService.getById(universityId);
        if (uniRes?.success && uniRes.data) {
          const uni = uniRes.data;
          setUniversity({
            id: uni.id,
            name: uni.nombre,
            type: uni.tipo,
            logoText: uni.abreviacion || uni.nombre?.substring(0, 2)?.toUpperCase() || '',
            photo: uni.foto,
            description: uni.descripcion,
            website: uni.sitio_web,
            linkedin: uni.linkedin,
          });
        }

        // 2) Obtener carreras y seleccionar una
        const res = await universityService.getCarrerasByUniversidad(universityId);
        if (res?.success && Array.isArray(res.data)) {
          const found = res.data.find(
            (c) => String(c.idcarrera ?? c?.carrera?.id ?? c.id) === String(careerId)
          ) || null;
          setCareer(found);
          if (!found) {
            setError('Carrera no encontrada para esta universidad');
          }
        } else {
          setError('No se pudieron cargar las carreras');
        }
      } catch (e) {
        setError(e.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    if (universityId && careerId) loadData();
  }, [universityId, careerId]);

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

  if (loading) return <div className="university-profile"><p>Cargando...</p></div>;
  if (error) return (
    <div className="university-profile">
      <p style={{ color: 'red' }}>{error}</p>
      <Link to={`/${universityId}/profile`} state={{ profileType: 'universidad' }}>Volver al perfil</Link>
    </div>
  );
  if (!career) return null;

  const nombre = career?.nombre || career?.carrera?.nombre || 'Carrera';
  const descripcion = career?.descripcion || career?.carrera?.descripcion || '';
  const duracion = career?.duracion ?? '';
  const costo = career?.costo ?? '';
  const modalidad = career?.modalidad ?? '';
  const titulo = career?.titulo_otorgado ?? '';
  const sede = career?.sede ?? '';
  const perfil = career?.perfil_graduado ?? '';
  const plan = career?.plan_estudios ?? '';
  const foto = career?.foto ?? career?.carrera?.foto ?? '';

  return (
    <div className="university-profile">
      <div ref={bgRef} className="bg-lines" aria-hidden="true" />

      {/* Header igual al del perfil de universidad */}
      <div className="user-card" style={{ background: 'transparent', boxShadow: 'none' }}>
        {university && (
          <ProfileHeader
            logoText={university.logoText}
            name={university.name}
            type={university.type}
            photo={university.photo}
            description={university.description}
            website={university.website}
            linkedin={university.linkedin}
          />
        )}
      </div>

      <div className="profile-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>{nombre}</h2>
          <Link className="btn" to={`/${universityId}/profile`} state={{ profileType: 'universidad' }}>Volver al perfil</Link>
        </div>
        <section className="card">
          <div style={{ display: 'grid', gap: 12 }}>
            {foto ? (
              <img src={foto} alt={nombre} style={{ maxWidth: 360, borderRadius: 8 }} />
            ) : null}
            {descripcion ? <p>{descripcion}</p> : null}

            <div className="university-details">
              {duracion !== '' && <p><strong>Duración:</strong> {duracion} años</p>}
              {modalidad && <p><strong>Modalidad:</strong> {modalidad}</p>}
              {titulo && <p><strong>Título otorgado:</strong> {titulo}</p>}
              {sede && <p><strong>Sede:</strong> {sede}</p>}
              {costo !== '' && <p><strong>Costo:</strong> {Number(costo) === 0 ? 'Gratuita' : `$ ${costo}`}</p>}
            </div>

            {perfil ? (
              <div style={{ marginTop: 8 }}>
                <h4>Perfil del graduado</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{perfil}</p>
              </div>
            ) : null}

            {plan ? (
              <div style={{ marginTop: 8 }}>
                <h4>Plan de estudios</h4>
                <a href={plan} target="_blank" rel="noreferrer">Ver plan de estudios</a>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareerDetail;
