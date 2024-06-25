import React, { useContext, useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/Provider';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useContext(UserContext);
  const [usuarioRole, setUsuarioRole] = useState("");

  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/acesso-negado" />;
  }

  return children;
};

export default ProtectedRoute;
