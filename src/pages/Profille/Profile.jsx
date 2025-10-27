import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import profileService from '../../services/profile-service';
import DynamicSection from '../../components/profileSections/DynamicSection';
import { useUser } from '../../contexts/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import './Profile.css';
import '../universityProfile/universityProfile.css';
import ProfileHeader from '../universities/components/ProfileHeader';


const Profile = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [edit, setEdit] = useState(false);
        const [editedData, setEditedData] = useState({}); // { [sectionId]: partialData }
    const [showAddSection, setShowAddSection] = useState(false);
    
    
    const navigate = useNavigate();
    // Detectar si es el perfil del usuario logueado
    const isOwnProfile = user?.usuario?.id && parseInt(id) === user.usuario.id;
    // Skin universidad
    const isUniversitySkin = (user?.usuario?.tipo && /univers/i.test(user.usuario.tipo))
        || (profile?.tipo && /univers/i.test(profile.tipo));

    useEffect(() => {
        if (id) {
            profileService.getProfileById(id)
                .then(response => {
                    if (response.success) {
                        setProfile(response.data);
                    }
                })
                .catch(setError)
                .finally(() => setLoading(false));
        }
    }, [id]);

    const getSectionPxSId = (section) => (
        section?.id_perfil_x_seccion || section?.config?.id_perfil_x_seccion || section?.config?.id || section?.id
    );

    const handleSectionUpdate = (section, newData) => {
        const key = getSectionPxSId(section) || `${section?.seccion?.id}`;
        setEditedData(prev => ({ ...prev, [key]: { ...(prev[key] || {}), ...newData } }));
    };

    const handleSaveSection = async (section, sectionId) => {
        try {
            if (!sectionId) {
                window.alert('No se pudo determinar el id de la sección a actualizar.');
                return;
            }
            const base = {
                visible: section?.config?.visible ?? true,
                orden: section?.config?.orden ?? 0,
            };
            // Buscar cambios con distintas claves posibles para evitar desfasajes
            const derivedId = getSectionPxSId(section) || `${section?.seccion?.id}`;
            const changes = editedData[sectionId] 
                || editedData[derivedId]
                || {};
            const name = section?.seccion?.nombre || '';

            let payload = { ...base };
            if (/about/i.test(name)) {
                const currentDesc = Array.isArray(section?.datos) && section.datos[0]?.descripcion || '';
                payload.seccion_about = { descripcion: changes.descripcion ?? currentDesc };
            }
            // TODO: agregar otros mapeos (education, projects, events) si se requiere edición completa

            await profileService.updateSection(sectionId, payload);
            window.alert('Sección actualizada con éxito.');
            // refrescar
            const response = await profileService.getProfileById(id);
            if (response.success) setProfile(response.data);
            setEdit(false);
            setEditedData(prev => {
                const clone = { ...prev };
                delete clone[sectionId];
                if (derivedId && derivedId !== sectionId) delete clone[derivedId];
                return clone;
            });
        } catch (error) {
            console.error('Error updating section:', error);
            window.alert(`Error al actualizar sección: ${error.message || 'Desconocido'}`);
        }
    };

    const handleAddSection = async (sectionData) => {
        try {
            console.log('Adding new section:', sectionData);
            // await profileService.addSection(sectionData);
            // Refrescar el perfil después de agregar
            // const response = await profileService.getProfileById(id);
            // if (response.success) setProfile(response.data);
        } catch (error) {
            console.error('Error adding section:', error);
        }
    };

    const handleEditSection = (sectionId) => {
        // Activar modo edición para una sección específica
        setEdit(true);
        // Aquí podrías implementar lógica para editar solo esa sección
    };

    const handleCancelEdit = () => {
        setEdit(false);
        setEditedData({});
    };

    const handleDeleteSection = async (perfilXSeccionId) => {
        try {
            if (!perfilXSeccionId) return;
            const ok = window.confirm('¿Eliminar esta sección? Esta acción no se puede deshacer.');
            if (!ok) return;
            await profileService.deleteSection(perfilXSeccionId);
            window.alert('Sección eliminada con éxito.');
            const response = await profileService.getProfileById(id);
            if (response.success) setProfile(response.data);
        } catch (error) {
            console.error('Error deleting section:', error);
            window.alert(`Error al eliminar la sección: ${error.message || 'Desconocido'}`);
        }
    };

    if (loading) return <div className="loading">Cargando perfil...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;
    if (!profile) return <div className="error">Perfil no encontrado</div>;

    return (
        <>
            {isUniversitySkin && <div className="bg-lines" aria-hidden="true" />}
            <div className={`user-profile-container ${isUniversitySkin ? 'university-profile' : ''}`}>
            {isUniversitySkin ? (
                <div className="user-card" style={{ background: 'transparent', boxShadow: 'none' }}>
                    <ProfileHeader
                        logoText={(profile.abreviacion) || (profile.nombre && profile.nombre.substring(0,2).toUpperCase()) || (profile.nombreusuario && profile.nombreusuario.substring(0,2).toUpperCase()) || ''}
                        name={profile.nombre || profile.nombreusuario || ''}
                        type={profile.tipo || (user?.usuario?.tipo || '')}
                        photo={profile.foto || profile.foto_perfil || ''}
                        description={profile.descripcion || ''}
                        website={profile.sitio_web || ''}
                        linkedin={profile.linkedin || ''}
                    />
                    {/* Acción principal para universidades: Agregar sección si es tu perfil */}
                    {isOwnProfile && (
                        <div className="profile-actions" style={{ marginTop: 12 }}>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/add-section')}
                            >
                                {showAddSection ? 'Cancelar' : 'Agregar sección'}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="user-card">
                    <div 
                        className="user-card__header"
                        style={{
                            backgroundImage: profile.foto_banner 
                                ? `url(${profile.foto_banner})` 
                                : 'linear-gradient(135deg, #2f6fed, #6a9aff)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className="user-card__body">
                        <div className="user-avatar">
                            {profile.foto_perfil ? (
                                <img src={profile.foto_perfil} alt="Avatar" className="avatar-img" />
                            ) : (
                                <div className="avatar-placeholder">
                                    {profile.nombreusuario?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="user-info">
                            <h2 className="user-info__name">{profile.nombreusuario}</h2>
                            <p className="user-info__subtitle">{profile.mail}</p>
                            <div className="chips">
                                <span className={`chip ${profile.activo ? 'active' : 'inactive'}`}>
                                    {profile.activo ? 'Activo' : 'Inactivo'}
                                </span>
                                {profile.emailverificado && (
                                    <span className="chip verified">✓ Verificado</span>
                                )}
                            </div>
                        </div>
                        <div className="profile-actions">
                            {isOwnProfile ? (
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => navigate('/add-section')}
                                >
                                    {showAddSection ? 'Cancelar' : 'Agregar sección'}
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}

            {/* Secciones dinámicas */}
            <div className="profile-sections">
                {profile.secciones && profile.secciones.length > 0 ? (
                    profile.secciones
                        .filter(section => section.config.visible) // Solo mostrar secciones visibles
                        .sort((a, b) => a.config.orden - b.config.orden) // Ordenar por orden
                        .map((section, index) => (
                            <DynamicSection
                                key={`${section.seccion.id}-${index}`}
                                section={section}
                                edit={edit}
                                isOwnProfile={isOwnProfile}
                                onUpdate={handleSectionUpdate}
                                onSave={handleSaveSection}
                                onDelete={handleDeleteSection}
                                onEditSection={handleEditSection}
                                onCancelEdit={handleCancelEdit}
                            />
                        ))
                ) : (
                    <div className="no-sections">
                        <p>No hay secciones configuradas para este perfil.</p>
                    </div>
                )}
            </div>
            </div>
        </>
    );
};

export default Profile;