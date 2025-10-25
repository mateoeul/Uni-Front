import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import profileService from '../../services/profile-service';
import DynamicSection from '../../components/profileSections/DynamicSection';
import { useUser } from '../../contexts/UserContext';
import './Profile.css';


const Profile = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [edit, setEdit] = useState(false);
    const [showAddSection, setShowAddSection] = useState(false);
    
    // Detectar si es el perfil del usuario logueado
    const isOwnProfile = user?.usuario?.id && parseInt(id) === user.usuario.id;

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

    const handleSectionUpdate = async (section, newData) => {
        try {
            // Aquí puedes implementar la lógica para actualizar la sección
            console.log('Updating section:', section, 'with data:', newData);
            // await profileService.updateSection(section.id_perfil_x_seccion, newData);
        } catch (error) {
            console.error('Error updating section:', error);
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

    if (loading) return <div className="loading">Cargando perfil...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;
    if (!profile) return <div className="error">Perfil no encontrado</div>;

    return (
        <div className="user-profile-container">
            {/* User Card con Banner */}
            <div className="user-card">
                {/* Banner superior */}
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
                
                {/* Cuerpo de la tarjeta */}
                <div className="user-card__body">
                    {/* Avatar */}
                    <div className="user-avatar">
                        {profile.foto_perfil ? (
                            <img src={profile.foto_perfil} alt="Avatar" className="avatar-img" />
                        ) : (
                            <div className="avatar-placeholder">
                                {profile.nombreusuario?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    
                    {/* Información del usuario */}
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
                    
                    {/* Botón de agregar sección (solo si es tu perfil) */}
                    <div className="profile-actions">
                        {isOwnProfile ? (
                            <button 
                                className="btn btn-primary" 
                                onClick={() => setShowAddSection(!showAddSection)}
                            >
                                {showAddSection ? 'Cancelar' : 'Agregar sección'}
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>

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
                                onEditSection={handleEditSection}
                            />
                        ))
                ) : (
                    <div className="no-sections">
                        <p>No hay secciones configuradas para este perfil.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;