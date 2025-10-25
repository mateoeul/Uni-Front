import profileService from "../../services/profile-service";
import { useUser } from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AddSection.css";

const AddSection = () => {
    const { user } = useUser();

    cosnt [seccionesDisponibles, setSeccionesDisponibles] = useState([]);
    const [formInput, setFormInput] = useState({
        seccion: "",
        datos: []
    });
    
    const [formData, setFormData] = useState({
        seccion: "",
        datos: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        profileService.getSeccionesDisponibles().then(response => {
            setSeccionesDisponibles(response.data.filter(section => section.tipo_usuario === "Ambos" || section.tipo_usuario === user.usuario.tipo));
        }).catch(error => {
            console.error('Error al obtener secciones disponibles:', error);
        });
    }, []);

    const handleAddSection = async (sectionData) => {
        try {
            const response = await profileService.addSection(sectionData);
            if (response.success) {
                setShowAddSection(false);
            }
        } catch (error) {
            console.error('Error al agregar sección:', error);
        }
    }



    return (
        <div>
            <h1>Agregar sección</h1>
        </div>
    )
}