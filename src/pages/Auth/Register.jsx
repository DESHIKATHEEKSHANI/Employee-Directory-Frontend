import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography, Container, Box, CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Only alphabetic characters allowed')
    .max(50, 'First name too long')
    .required('First name is required'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Only alphabetic characters allowed')
    .max(50, 'Last name too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const Register = () => {
  const { register } = useContext(AuthContext);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitError('');
    const { confirmPassword, ...userData } = values;
    const success = await register(userData);
    if (success) {
      navigate('/login');
    }
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Employee Directory - Register
        </Typography>
        
        <Formik
          initialValues={{ 
            firstName: '', 
            lastName: '', 
            email: '', 
            password: '', 
            confirmPassword: '' 
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form style={{ width: '100%' }}>
              <Box mb={2} sx={{ display: 'flex', gap: 2 }}>
                <Field
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Box>
              
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>
              
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>
              
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Box>
              
              {submitError && (
                <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
                  {submitError}
                </Typography>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mb: 2, py: 1.5 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
              </Button>
              
              <Box textAlign="center">
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Login
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Register;