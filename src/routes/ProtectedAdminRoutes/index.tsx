import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useJwt from 'utils/useJwt';
import { useUserState } from '../../contexts/UserContext';

interface ProtectedAdminRouteProps {
  children: ReactNode;
  permission: string;
}

const ProtectedAdminRoute = ({ children, permission }: ProtectedAdminRouteProps) => {
  const { remove, getDecoded } = useJwt();
  const { allowedPages } = useUserState();

  const tokenExp = getDecoded().exp;
  const role = getDecoded()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

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

  if (!role.toLowerCase().includes('admin'.toLowerCase())) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;
