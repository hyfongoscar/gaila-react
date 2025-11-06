import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import redirectToLoginPage from 'containers/auth/AuthProvider/redirectToLoginPage';
import useAuth from 'containers/auth/AuthProvider/useAuth';

type Props = {
  children: React.ReactNode;
  isTeacherPage?: boolean;
  isStudentPage?: boolean;
};

const AuthPageWrapper = ({ isTeacherPage, isStudentPage, children }: Props) => {
  const { isInitialized, isLoaded, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized || !isLoaded) {
      return;
    }
    if (!isLoggedIn || !role) {
      redirectToLoginPage(false, 'private');
      return;
    }
    if (
      (isTeacherPage && role === 'student') ||
      (isStudentPage && ['teacher', 'admin'].includes(role))
    ) {
      navigate(pathnames.home(), { replace: true });
      return;
    }
  }, [
    isInitialized,
    isLoaded,
    isLoggedIn,
    isStudentPage,
    isTeacherPage,
    navigate,
    role,
  ]);

  if (!isLoaded || !isLoggedIn || !role) {
    return null;
  }

  return <>{children}</>;
};

export default AuthPageWrapper;
