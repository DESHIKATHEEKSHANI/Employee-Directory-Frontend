import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token) {
      setCurrentUser(user ? JSON.parse(user) : { email: '' });
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);
  
  const login = async (credentials) => {
    try {
      setLoading(true);
      console.log('Attempting login with:', credentials);
      const result = await authService.login(credentials);
      
      if (!result || !result.token) {
        console.error('Login failed - no token received');
        throw new Error('Invalid login response');
      }
      
      localStorage.setItem('token', result.token);
      const user = { email: credentials.email };
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      setIsAuthenticated(true);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error('AuthContext login error:', error);
      toast.error(error.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      toast.success('Registration successful! Please login.');
      return true;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    toast.info('You have been logged out');
  };
  
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};