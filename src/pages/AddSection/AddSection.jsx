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

    const handleSectionSelect = (e) => {
        const sectionId = e.target.value;
        if (sectionId) {
            const section = seccionesDisponibles.find(s => s.id === parseInt(sectionId));
            setSelectedSection(section);
        } else {
            setSelectedSection(null);
        }
    };

    const handleFormSubmit = (formData) => {
        console.log('Formulario enviado:', formData);
        // Aquí implementarías la lógica para enviar los datos al backend
        // await profileService.addSection(formData);
    };

    const handleCancel = () => {
        setSelectedSection(null);
    };

    if (loading) {
        return <div className="loading">Cargando secciones disponibles...</div>;
    }

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
                        {seccionesDisponibles.map(section => (
                            <option key={section.id} value={section.id}>
                                {section.nombre}
                            </option>
                        ))}
                    </select>
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