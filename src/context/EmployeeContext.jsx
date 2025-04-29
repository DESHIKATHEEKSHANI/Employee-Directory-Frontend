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
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError('Failed to fetch employees');
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeById = async (id) => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployeeById(id);
      setSelectedEmployee(data);
      return data;
    } catch (err) {
      setError('Failed to fetch employee');
      toast.error('Failed to fetch employee');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employee) => {
    try {
      setLoading(true);
      const newEmp = await employeeService.createEmployee(employee);
      setEmployees(prev => [...prev, newEmp]);
      toast.success('Employee created successfully');
      return newEmp;
    } catch (err) {
      const message = err?.message || 'Failed to create employee';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, employee) => {
    try {
      setLoading(true);
      const updated = await employeeService.updateEmployee(id, employee);
      setEmployees(prev =>
        prev.map(emp => (emp.id === id ? updated : emp))
      );
      setSelectedEmployee(updated);
      toast.success('Employee updated successfully');
      return updated;
    } catch (err) {
      const message = err?.message || 'Failed to update employee';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      setLoading(true);
      const response = await employeeService.deleteEmployee(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast.success(response.message || 'Employee deleted successfully');
    } catch (err) {
      setError('Failed to delete employee');
      toast.error('Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  const clearSelectedEmployee = () => {
    setSelectedEmployee(null);
  };

  return (
    <EmployeeContext.Provider
      value={{
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
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
