import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useJwt from 'utils/useJwt';
import { useUserState } from '../../contexts/UserContext';

interface ProtectedUserRouteProps {
  children: ReactNode;
  permission: string;
}

const ProtectedUserRoute = ({ children, permission }: ProtectedUserRouteProps) => {
  const { remove, getDecoded } = useJwt();
  const { allowedPages } = useUserState();

  const tokenExp = getDecoded().exp;
  if (tokenExp) {
    const currentDate = Date.now() / 1000;
    if (currentDate > tokenExp) {
      remove();
      localStorage.clear();
      return <Navigate to="/login" />;
    } else {
      if (!allowedPages) {
        remove();
        localStorage.clear();
        return <Navigate to="/login" />;
      }
      if (!allowedPages?.includes(permission)) {
        return <Navigate to="/unauthorized" />;
      }
    }
  } else {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedUserRoute;
