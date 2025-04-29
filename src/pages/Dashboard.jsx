import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { AuthContext } from '../context/AuthContext';
import { EmployeeContext } from '../context/EmployeeContext';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { employees, loading, fetchEmployees } = useContext(EmployeeContext);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    departmentCounts: {}
  });

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    if (employees?.length > 0) {
      // Calculate department counts
      const deptCounts = employees.reduce((acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalEmployees: employees.length,
        departmentCounts: deptCounts
      });
    }
  }, [employees]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Welcome back, {currentUser?.firstName || 'User'}! Here's an overview of your employee directory.
            </Typography>
          </Box>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'primary.light' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
                <Typography variant="h6" component="div">
                  Total Employees
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                {stats.totalEmployees}
              </Typography>
              <Button 
                variant="contained" 
                component={Link} 
                to="/employees"
                size="small"
              >
                View All Employees
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'success.light' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon sx={{ color: 'success.main', mr: 1, fontSize: 32 }} />
                <Typography variant="h6" component="div">
                  Departments
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                {Object.keys(stats.departmentCounts).length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active departments in the system
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'info.light' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ color: 'info.main', mr: 1, fontSize: 32 }} />
                <Typography variant="h6" component="div">
                  Quick Access
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                fullWidth 
                component={Link} 
                to="/employees/new"
                sx={{ mb: 1 }}
                startIcon={<PersonAddIcon />}
              >
                Add New Employee
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                component={Link} 
                to="/employees"
              >
                Manage Employees
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Department Breakdown */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Department Breakdown
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {Object.entries(stats.departmentCounts).map(([dept, count]) => (
                <Grid item xs={6} md={3} key={dept}>
                  <Card sx={{ bgcolor: 'grey.100' }}>
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {dept}
                      </Typography>
                      <Typography variant="h6">
                        {count} {count === 1 ? 'Employee' : 'Employees'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activity - Could be implemented in future versions */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Employee activity tracking will be available in the next version.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;