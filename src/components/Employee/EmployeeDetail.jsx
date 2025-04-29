import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

const EmployeeDetail = ({ employee, loading }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'MMMM dd, yyyy HH:mm:ss');
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!employee) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" color="error">Employee not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/employees')}
          sx={{ mt: 2 }}
        >
          Back to Employee List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/employees')}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/employees/edit/${employee.id}`)}
        >
          Edit
        </Button>
      </Box>

      <Card elevation={3}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">{employee.name}</Typography>
              <Chip label={employee.department} color="primary" sx={{ mt: 1 }} />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Employee ID</Typography>
              <Typography>{employee.id}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Email</Typography>
              <Typography>{employee.email}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Department</Typography>
              <Typography>{employee.department}</Typography>
            </Grid>

            <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Created At</Typography>
              <Typography variant="body2">{formatDate(employee.createdAt)}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Updated At</Typography>
              <Typography variant="body2">{formatDate(employee.updatedAt)}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeDetail;
