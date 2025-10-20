import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { pathnames } from 'routes';

import useAuth from 'containers/auth/AuthProvider/useAuth';

type Props = {
  children: React.ReactNode;
};

const AuthPageWrapper = ({ children }: Props) => {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(pathnames.login(location.pathname), { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  if (!isLoggedIn || !role) {
    return null;
  }

  return <>{children}</>;
};

export default AuthPageWrapper;
