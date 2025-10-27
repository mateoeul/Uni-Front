import profileService from "../../services/profile-service";
import { useUser } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import SectionFormManager from "../../components/SectionForms/SectionFormManager";
import "../../components/SectionForms/SectionForms.css";
import "./AddSection.css";

const AddSection = () => {
    const { user } = useUser();
    const [seccionesDisponibles, setSeccionesDisponibles] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [existingSectionIds, setExistingSectionIds] = useState([]);
    
    useEffect(() => {
        profileService.getSeccionesDisponibles()
            .then(response => {
                if (response.success) {
                    const filteredSections = response.data.filter(section => 
                        section.tipo_usuario === "Ambos" || 
                        section.tipo_usuario === user?.usuario?.tipo         
                    );
                    setSeccionesDisponibles(filteredSections);
                }
            })
            .catch(error => {
                console.error('Error al obtener secciones disponibles:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.usuario?.tipo]);

    useEffect(() => {
        const uid = user?.usuario?.id;
        if (!uid) return;
        profileService.getProfileById(uid)
            .then(response => {
                if (response.success) {
                    const ids = (response.data?.secciones || []).map(s => s.seccion?.id).filter(Boolean);
                    setExistingSectionIds(ids);
                }
            })
            .catch(error => {
                console.error('Error al obtener secciones del perfil:', error);
            });
    }, [user?.usuario?.id]);

    const handleSectionSelect = (e) => {
        const sectionId = e.target.value;
        if (sectionId) {
            const section = seccionesDisponibles
                .filter(s => !existingSectionIds.includes(s.id))
                .find(s => s.id === parseInt(sectionId));
            setSelectedSection(section);
        } else {
            setSelectedSection(null);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            // Evitar duplicados si ya existe en el perfil
            if (existingSectionIds.includes(selectedSection?.id)) {
                console.warn('La sección ya existe en el perfil.');
                return;
            }

            const basePayload = {
                idseccion: selectedSection?.id,
                visible: true,
                orden: 0,
            };

            // Mapeo específico para sección de eventos (seccion_events)
            if (selectedSection?.nombre && /event/i.test(String(selectedSection.nombre))) {
                const first = Array.isArray(formData?.eventos) ? formData.eventos[0] : formData;
                const payload = {
                    ...basePayload,
                    seccion_events: {
                        nombre: first?.evento || first?.nombre || "",
                        descripcion: first?.descripcion || "",
                        modalidad: first?.modalidad || "",
                        fecha: first?.fecha || "",
                    },
                };
                const res = await profileService.addSection(payload);
                console.log('Sección eventos creada:', res);
                // Actualizar lista local para bloquear re-agregado en la sesión
                setExistingSectionIds(prev => Array.from(new Set([...(prev || []), selectedSection.id])));
                setSelectedSection(null);
                return;
            }

            // Mapeo específico para sección de proyectos (seccion_projects)
            if (selectedSection?.nombre && /project/i.test(String(selectedSection.nombre))) {
                const first = Array.isArray(formData?.proyectos) ? formData.proyectos[0] : formData;
                const payload = {
                    ...basePayload,
                    seccion_projects: {
                        titulo: first?.titulo || first?.name || "",
                        descripcion: first?.descripcion || first?.summary || "",
                        link: first?.link || "",
                        periodo: first?.periodo || first?.period || "",
                    },
                };
                const res = await profileService.addSection(payload);
                console.log('Sección proyectos creada:', res);
                setExistingSectionIds(prev => Array.from(new Set([...(prev || []), selectedSection.id])));
                setSelectedSection(null);
                return;
            }

            // Mapeo específico para sección de educación (seccion_education)
            if (selectedSection?.nombre && /educa/i.test(String(selectedSection.nombre))) {
                const first = Array.isArray(formData?.educaciones) ? formData.educaciones[0] : formData;
                const toNumber = (val) => {
                    const n = Number(val);
                    return Number.isFinite(n) ? n : undefined;
                };
                const payload = {
                    ...basePayload,
                    seccion_education: {
                        institucion: first?.institucion || first?.school || "",
                        carrera: first?.carrera || first?.title || "",
                        ano_inicio: toNumber(first?.ano_inicio),
                        ano_fin: toNumber(first?.ano_fin),
                        descripcion: first?.descripcion || "",
                    },
                };
                const res = await profileService.addSection(payload);
                console.log('Sección educación creada:', res);
                setExistingSectionIds(prev => Array.from(new Set([...(prev || []), selectedSection.id])));
                setSelectedSection(null);
                return;
            }

            // Mapeo específico para sección About (seccion_about)
            if (selectedSection?.nombre && /about/i.test(String(selectedSection.nombre))) {
                const payload = {
                    ...basePayload,
                    seccion_about: {
                        descripcion: formData?.descripcion || "",
                    },
                };
                const res = await profileService.addSection(payload);
                console.log('Sección about creada:', res);
                setExistingSectionIds(prev => Array.from(new Set([...(prev || []), selectedSection.id])));
                setSelectedSection(null);
                return;
            }

            // Fallback: enviar lo recibido si no matchea ninguna sección conocida
            const res = await profileService.addSection({ ...basePayload, ...formData });
            console.log('Sección creada:', res);
            setExistingSectionIds(prev => Array.from(new Set([...(prev || []), selectedSection.id])));
            setSelectedSection(null);
        } catch (error) {
            console.error('Error al enviar sección:', error);
        }
    };

    const handleCancel = () => {
        setSelectedSection(null);
    };

    if (loading) {
        return <div className="loading">Cargando secciones disponibles...</div>;
    }

    const availableOptions = seccionesDisponibles.filter(s => !existingSectionIds.includes(s.id));

    return (
        <div className="add-section-container">
            <h1>Agregar Sección</h1>
            
            {!selectedSection ? (
                <div className="section-selector">
                    <label htmlFor="section-select">Selecciona el tipo de sección:</label>
                    <select 
                        id="section-select"
                        onChange={handleSectionSelect}
                        defaultValue=""
                    >
                        <option value="">-- Seleccionar sección --</option>
                        {availableOptions.map(section => (
                            <option key={section.id} value={section.id}>
                                {section.nombre}
                            </option>
                        ))}
                    </select>
                    {availableOptions.length === 0 && (
                        <div className="no-sections">Ya agregaste todas las secciones disponibles.</div>
                    )}
                </div>
            ) : (
                <SectionFormManager
                    selectedSection={selectedSection.nombre}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}

export default AddSection;