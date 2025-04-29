import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  CircularProgress, 
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmployeeForm from '../components/Employee/EmployeeForm';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmployee, updateEmployee, loading, error } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setFetchLoading(true);
        const data = await getEmployee(id);
        if (data) {
          setEmployee(data);
          setFetchError(null);
        } else {
          setFetchError('Employee not found');
        }
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch employee data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchEmployee();
  }, [id, getEmployee]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await updateEmployee(id, values);
    setSubmitting(false);
    if (result) {
      navigate('/employees');
    }
  };

  if (fetchLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (fetchError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {fetchError}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/employees')}
        >
          Back to Employee List
        </Button>
      </Container>
    );
  }

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
          Edit Employee
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {employee && (
          <EmployeeForm 
            onSubmit={handleSubmit} 
            loading={loading}
            initialValues={employee}
            isEditMode={true}
          />
        )}
      </Paper>
    </Container>
  );
};

export default EmployeeEdit;