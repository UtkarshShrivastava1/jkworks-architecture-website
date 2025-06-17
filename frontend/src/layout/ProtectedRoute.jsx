import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext2';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
