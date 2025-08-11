import React, {
  type ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router';

import { clearCache } from 'api/_requestor';
import usePersistState from 'utils/service/usePersistState';

import { pathnames } from '../../../routes';
import {
  type AuthProviderPropsType,
  type LoginActionParams,
  Provider,
} from './context';

interface Props {
  children: ReactNode;
}

const initialAuth = {
  accessToken: '',
  username: '',
  role: null,
  isLoggedIn: false,
};

function AuthProvider({ children }: Props) {
  const [auth, setAuth, isLoaded] = usePersistState<AuthProviderPropsType>(
    'auth',
    initialAuth,
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();

  // Initialize auth
  const initAuth = useRef(true);
  useEffect(() => {
    if (!isLoaded || !initAuth.current) return;
    initAuth.current = false;
    if (auth.isLoggedIn && auth.accessToken) {
      if (
        [
          // routes.launch(),
          pathnames.login(),
        ].indexOf(location.pathname) !== -1
      ) {
        // Redirect users to dashboard home
        navigate(pathnames.home());
      }
      // Do not redirect as the link is already valid
    } else {
      // No user
      // No redirecting here to login page, should be handled by Private route
    }
    // Mark as initialized
    setIsInitialized(true);
  }, [
    auth.isLoggedIn,
    auth.accessToken,
    isLoaded,
    location.pathname,
    navigate,
  ]);

  const loginAction = useCallback(
    async (payload: LoginActionParams) => {
      // Check response have all data back
      if (payload.accessToken && payload.username && payload.role) {
        // Success login
        await setAuth({
          isLoggedIn: true,
          accessToken: payload.accessToken,
          username: payload.username,
          role: payload.role,
        });
      } else {
        // Failed login;
        console.error('Login failed. Invalid login action.');
      }
    },
    [setAuth],
  );

  const logoutAction = useCallback(
    async (redirect?: string) => {
      if (redirect) {
        navigate(redirect, { replace: true });
      } else {
        navigate(pathnames.login(), { replace: true });
      }
      await clearCache();
      queryClient.removeQueries();
      await setAuth(initialAuth);
    },
    [navigate, queryClient, setAuth],
  );

  useEffect(() => {
    // window.cbhCms.cbhInjectedLogout = logoutAction;
  }, [logoutAction]);

  const authValue = useMemo(
    () => ({ ...auth, loginAction, logoutAction, isLoaded, isInitialized }),
    [auth, loginAction, logoutAction, isLoaded, isInitialized],
  );

  return <Provider value={authValue}>{children}</Provider>;
}

export default memo(AuthProvider);
