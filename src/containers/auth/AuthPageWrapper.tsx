import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { pathnames } from 'routes';

import type { Role } from 'containers/auth/AuthProvider/context';
import useAuth from 'containers/auth/AuthProvider/useAuth';

type Props = {
  allowRoles?: Role[];
  children: React.ReactNode;
};

const AuthPageWrapper = ({ allowRoles, children }: Props) => {
  const { isInitialized, isLoaded, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (!isLoggedIn || !role) {
      navigate(pathnames.login(location.pathname), { replace: true });
      return;
    }
    if (allowRoles && !allowRoles.includes(role)) {
      navigate(pathnames.home(), { replace: true });
      return;
    }
  }, [
    allowRoles,
    isInitialized,
    isLoggedIn,
    location.pathname,
    navigate,
    role,
  ]);

  if (!isLoaded || !isLoggedIn || !role) {
    return null;
  }

  return <>{children}</>;
};

export default AuthPageWrapper;
