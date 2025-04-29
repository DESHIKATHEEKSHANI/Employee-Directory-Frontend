import React, { useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import EmployeeList from '../components/Employee/EmployeeList';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeDirectory = () => {
  const { 
    employees, 
    loading, 
    error, 
    fetchEmployees, 
    deleteEmployee 
  } = useContext(EmployeeContext);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDeleteEmployee = async (id) => {
    await deleteEmployee(id);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <EmployeeList 
        employees={employees} 
        loading={loading} 
        error={error} 
        onDelete={handleDeleteEmployee} 
      />
    </Container>
  );
};

export default EmployeeDirectory;