import axios from 'axios';
const API_URL = 'http://localhost:3000/profile/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

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

const profileService = {
  
  async getAll() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Error al obtener perfiles';
      throw new Error(message);
    }
  },

  async getSeccionesDisponibles() {
    try {
      const response = await api.get('/secciones-disponibles');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Error al obtener secciones disponibles';
      throw new Error(message);
    }
  },

  async getAllExpanded() {
    try {
      const response = await api.get('/expanded');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Error al obtener perfiles expandidos';
      throw new Error(message);
    }
  },

  async getProfileById(id) {
    try {
      const response = await api.get(`/${id}/expanded`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Error al obtener perfil';
      throw new Error(message);
    }
  },

  async addSection(sectionData) {
    try {
      const response = await api.post('/section', sectionData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Error al agregar sección';
      throw new Error(message);
    }
  },

  async updateSection(sectionId, sectionData) {
    try {
      const response = await api.put(`/section/${sectionId}`, sectionData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Error al actualizar sección';
      throw new Error(message);
    }
  },

  async deleteSection(sectionId) {
    try {
      const response = await api.delete(`/section/${sectionId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Error al eliminar sección';
      throw new Error(message);
    }
  }

};

export default profileService;