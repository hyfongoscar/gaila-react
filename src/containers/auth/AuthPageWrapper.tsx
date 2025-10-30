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
  const { isLoaded, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!isLoggedIn) {
      navigate(pathnames.login(location.pathname), { replace: true });
    }
    if (allowRoles && role && !allowRoles.includes(role)) {
      navigate(pathnames.home(), { replace: true });
    }
  }, [allowRoles, isLoaded, isLoggedIn, location.pathname, navigate, role]);

  if (!isLoggedIn || !role) {
    return null;
  }

  return <>{children}</>;
};

export default AuthPageWrapper;
