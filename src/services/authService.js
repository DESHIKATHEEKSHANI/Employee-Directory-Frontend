import api from './api';

const authService = {
  login: async (credentials) => {
    try {
      console.log('Sending login request with:', credentials);
      // The post method returns the axios response object with data inside
      const response = await api.post('/auth/login', credentials);
      
      console.log('Login response:', response);
      
      // Check if we have a token in the response
      if (!response.data || !response.data.token) {
        console.error('Invalid token in response');
        throw new Error('Invalid response from server');
      }
      
      return {
        token: response.data.token,
        user: { email: credentials.email }
      };
    } catch (error) {
      console.error('Detailed login error:', {
        message: error.message,
        response: error.response,
        stack: error.stack
      });
      
      let errorMessage = 'Login failed';
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage = error.response.data?.message ||
                      `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Check your network connection.';
      }
      
      throw new Error(errorMessage);
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        throw new Error(error.response.data?.message || 'Registration failed: ' + error.response.status);
      } else if (error.request) {
        throw new Error('No response from server. Check your network connection.');
      } else {
        throw new Error(error.message || 'Registration failed');
      }
    }
  },
};

export default authService;