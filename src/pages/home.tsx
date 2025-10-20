import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import useAuth from 'containers/auth/AuthProvider/useAuth';
import Header from 'containers/common/Header';

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(pathnames.login(), { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header title="Dashboard" />
    </>
  );
};

export default HomePage;
