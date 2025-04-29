import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import EmployeeForm from '../components/Employee/EmployeeForm';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeCreate = () => {
  const { createEmployee, loading } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await createEmployee(values);
    setSubmitting(false);
    if (result) {
      navigate('/employees');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/employees')}
        >
          Back to Employee List
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Add New Employee
        </Typography>
        
        <EmployeeForm 
          onSubmit={handleSubmit} 
          loading={loading} 
        />
      </Paper>
    </Container>
  );
};

export default EmployeeCreate;