import axios from 'axios';

const API_URL = 'http://localhost:3000/chatbot/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach bearer token if present (keeps consistency with other services)
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

const chatbotService = {
  async sendMessage(message) {
    try {
      const response = await api.post('message', { message });
      // Backend returns { success, data: { reply, meta } }
      const reply = response?.data?.data?.reply ?? response?.data?.reply ?? '';
      return reply;
    } catch (error) {
      const message = error.response?.data?.message ||
                      error.response?.data?.error ||
                      'Error al enviar mensaje al chatbot';
      throw new Error(message);
    }
  }
};

export default chatbotService;
