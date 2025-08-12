import React, { useContext } from 'react';

import AuthProviderContext from './context';

const useAuth = () => {
  const auth = useContext(AuthProviderContext);
  return auth;
};

export default useAuth;
