import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography, Container, Box, CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitError('');
    const success = await login(values);
    if (success) {
      navigate('/dashboard');
    }
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Employee Directory - Login
        </Typography>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form style={{ width: '100%' }}>
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
                {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
              </Button>
              
              <Box textAlign="center">
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Register
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

export default Login;