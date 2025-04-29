import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import employeeService from '../services/employeeService';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAllEmployees();
      setEmployees(response);
      setError(null);
    } catch (error) {
      setError('Failed to fetch employees');
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeById = async (id) => {
    try {
      setLoading(true);
      const response = await employeeService.getEmployeeById(id);
      setSelectedEmployee(response);
      setError(null);
      return response;
    } catch (error) {
      setError('Failed to fetch employee details');
      toast.error('Failed to load employee details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData) => {
    try {
      setLoading(true);
      const response = await employeeService.createEmployee(employeeData);
      setEmployees([...employees, response]);
      toast.success('Employee created successfully');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create employee';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, employeeData) => {
    try {
      setLoading(true);
      const response = await employeeService.updateEmployee(id, employeeData);
      setEmployees(employees.map(emp => emp.id === id ? response : emp));
      setSelectedEmployee(response);
      toast.success('Employee updated successfully');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update employee';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      setLoading(true);
      await employeeService.deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
      toast.success('Employee deleted successfully');
      return true;
    } catch (error) {
      setError('Failed to delete employee');
      toast.error('Failed to delete employee');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearSelectedEmployee = () => {
    setSelectedEmployee(null);
  };

  const value = {
    employees,
    selectedEmployee,
    loading,
    error,
    fetchEmployees,
    fetchEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    clearSelectedEmployee
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};