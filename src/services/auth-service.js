import axios from 'axios';
const API_URL = 'http://localhost:3000/api/user/';

const authService = {
        
    async login(mail, contraseña) {
        try {
            const response = await axios.post(`${API_URL}login`, { 
                mail, 
                contraseña 
            });
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;

        } catch (error) {
                const message = error.response?.data?.error || error.response?.data?.message || "Login failed";
                throw new Error(message);
        }
    },

    async register(userData) {
        try {
            const response = await axios.post(`${API_URL}register`, userData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            throw new Error(message);
        }
    },

    // Helper method to create registration data with student info
    createStudentRegistration(userData, studentData) {
        return {
            tipo: "Estudiante",
            nombreusuario: userData.nombreusuario,
            mail: userData.mail,
            contraseña: userData.contraseña,
            activo: "true",
            emailverificado: false,
            estudiante: {
                nombre: studentData.nombre,
                apellido: studentData.apellido,
                fechanac: studentData.fechanac,
                foto: studentData.foto || null
            }
        };
    },

    logout() {
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default authService