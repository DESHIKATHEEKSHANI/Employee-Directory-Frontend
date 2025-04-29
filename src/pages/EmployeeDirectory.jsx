import React, { useContext, useEffect } from 'react';
import { Container, CircularProgress, Alert, Typography } from '@mui/material';
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
      <Typography variant="h4" gutterBottom>
        Employee Directory
      </Typography>

      {loading && (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <EmployeeList
          employees={employees}
          onDelete={handleDeleteEmployee}
        />
      )}
    </Container>
  );
};

export default EmployeeDirectory;
