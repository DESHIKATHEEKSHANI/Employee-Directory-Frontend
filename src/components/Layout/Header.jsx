import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      keepMounted
    >
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMenuClose}
      keepMounted
    >
      {isAuthenticated && (
        <>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard'); }}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/employees'); }}>
            Employees
          </MenuItem>
        </>
      )}
      {!isAuthenticated ? (
        <>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }}>
            Login
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/register'); }}>
            Register
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          Employee Directory
        </Typography>
        
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/employees">
                Employees
              </Button>
            </>
          )}
          
          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                {currentUser?.firstName || 'User'}
              </Typography>
                              <IconButton
                onClick={handleProfileMenuOpen}
                color="inherit"
                edge="end"
              >
                <Avatar 
                  sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                >
                  {currentUser?.firstName?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Box>
          )}
        </Box>
        {profileMenu}
        {mobileMenu}
      </Toolbar>
    </AppBar>
  );
};

export default Header;