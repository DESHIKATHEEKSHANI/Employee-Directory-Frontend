import api from './api';

const employeeService = {
  getAllEmployees: async () => {
    try {
      const response = await api.get('/employees');
      return response;
    } catch (error) {
      throw error;
    }
  },

  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createEmployee: async (employeeData) => {
    try {
      const response = await api.post('/employees', employeeData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`/employees/${id}`, employeeData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default employeeService;