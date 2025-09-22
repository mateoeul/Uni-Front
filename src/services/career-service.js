import axios from 'axios';

const API_URL = 'http://localhost:3000/career/';

// Configurar axios con el token de autenticación
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    const token = user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const careerService = {
  async getAll() {
    try {
      const response = await api.get('');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message ||
                     error.response?.data?.error ||
                     'Error al obtener carreras';
      throw new Error(message);
    }
  }
};

export default careerService;


