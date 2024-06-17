import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/Provider';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useContext(UserContext);
 
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/acesso-negado" />;
  }

  return children;
};

export default ProtectedRoute;
