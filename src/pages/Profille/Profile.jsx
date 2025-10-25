import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import profileService from '../../services/profile-service';
import DynamicSection from '../../components/profileSections/DynamicSection';
import './Profile.css';


const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [edit, setEdit] = useState(false);

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

    if (loading) return <div className="loading">Cargando perfil...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;
    if (!profile) return <div className="error">Perfil no encontrado</div>;

    return (
        <div className="profile-container">
            {/* Header del perfil */}
            <div className="profile-header">
                <div className="profile-avatar">
                    {profile.foto_perfil ? (
                        <img src={profile.foto_perfil} alt="Avatar" className="avatar-img" />
                    ) : (
                        <div className="avatar-placeholder">
                            {profile.nombreusuario?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="profile-info">
                    <h1 className="profile-name">{profile.nombreusuario}</h1>
                    <p className="profile-email">{profile.mail}</p>
                    <div className="profile-status">
                        <span className={`status-badge ${profile.activo ? 'active' : 'inactive'}`}>
                            {profile.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        {profile.emailverificado && (
                            <span className="verified-badge">✓ Verificado</span>
                        )}
                    </div>
                </div>
                <div className="profile-actions">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => setEdit(!edit)}
                    >
                        {edit ? 'Cancelar' : 'Editar perfil'}
                    </button>
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
                                onUpdate={handleSectionUpdate}
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