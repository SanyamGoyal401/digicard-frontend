import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BaseUrl from '../constants';
axios.defaults.withCredentials = true;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const checkAuth = useCallback(async () => {
    try {
      await axios.get(`${BaseUrl}/user/authme`);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BaseUrl}/user/login`, { email, password });
      if (response.data.message === 'Login Successful') {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Login failed', err);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await axios.post(`${BaseUrl}/user/logout`);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, axios }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;