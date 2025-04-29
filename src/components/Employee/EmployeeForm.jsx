import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Grid,
  Box,
  CircularProgress,
  Typography
} from '@mui/material';

const employeeSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Only alphabetic characters allowed')
    .max(100, 'Name cannot exceed 100 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  department: Yup.string()
    .oneOf(['HR', 'IT', 'Finance', 'Operations'], 'Invalid department')
    .required('Department is required')
});

const EmployeeForm = ({ initialValues, onSubmit, isEdit = false, loading = false }) => {
  const defaultValues = {
    name: '',
    email: '',
    department: ''
  };

  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={employeeSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, values, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {isEdit ? 'Edit Employee' : 'Add New Employee'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl 
                fullWidth 
                variant="outlined" 
                error={touched.department && Boolean(errors.department)}
              >
                <InputLabel id="department-label">Department</InputLabel>
                <Field
                  as={Select}
                  name="department"
                  labelId="department-label"
                  label="Department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="">
                    <em>Select a department</em>
                  </MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </Field>
                {touched.department && errors.department && (
                  <FormHelperText>{errors.department}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                  type="reset"
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || loading}
                >
                  {(isSubmitting || loading) ? (
                    <CircularProgress size={24} />
                  ) : isEdit ? 'Update Employee' : 'Add Employee'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;