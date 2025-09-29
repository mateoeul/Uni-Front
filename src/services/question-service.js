import axios from 'axios';

const API_URL = 'http://localhost:3000/questions/';

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

const questionService = {
  async getQuestions() {
    try {
      const response = await api.get('preguntas');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message ||
                     error.response?.data?.error ||
                     'Error al obtener preguntas';
      throw new Error(message);
    }
  },

  async saveAnswers(answers) {
    try {
      const response = await api.post('respuestas', answers);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message ||
                     error.response?.data?.error ||
                     'Error al guardar respuestas';
      throw new Error(message);
    }
  },

  async getResults() {
    try {
      const response = await api.get('resultados');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message ||
                     error.response?.data?.error ||
                     'Error al obtener resultados';
      throw new Error(message);
    }
  }
};

export default questionService;
