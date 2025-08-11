import React, { useCallback } from 'react';

import { apiUserLogin } from 'api/auth';

const LoginForm = () => {
  const loginAction = useCallback((username: string, password: string) => {
    apiUserLogin({ username, password });
  }, []);

  return <div>LoginForm</div>;
};

export default LoginForm;
