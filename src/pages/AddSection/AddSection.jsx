import profileService from "../../services/profile-service";
import { useUser } from "../../contexts/UserContext";
import {useState, useEffect } from "react";

import "./AddSection.css";

const AddSection = () => {

    const { user } = useUser();

    const [seccionesDisponibles, setSeccionesDisponibles] = useState([]);
    
    useEffect(() => {
        profileService.getSeccionesDisponibles().then(response => {
            setSeccionesDisponibles(response.data.filter(section => section.tipo_usuario === "Ambos" || section.tipo_usuario === user.usuario.tipo));
        }).catch(error => {
            console.error('Error al obtener secciones disponibles:', error);
        });
    }, []);

    return (
        <div>
            <h1>Agregar sección</h1>
            <select>
                {seccionesDisponibles.map(section => (
                    <option key={section.id} value={section.id}>
                        {section.nombre}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default AddSection;