import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import EmployeeForm from '../components/Employee/EmployeeForm';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeCreate = () => {
  const { createEmployee, loading } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await createEmployee(values);
      if (result) {
        resetForm();
        navigate('/employees');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={() => navigate('/employees')}
        >
          Back to Employee List
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Add New Employee
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <EmployeeForm onSubmit={handleSubmit} loading={loading} />
        )}
      </Paper>
    </Container>
  );
};

export default EmployeeCreate;
