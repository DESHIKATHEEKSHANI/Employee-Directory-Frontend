import api from './api';

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  validateToken: async () => {
    try {
      const response = await api.get('/auth/validate');
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;