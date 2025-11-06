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
import { pathnames } from 'routes';

import { clearCache } from 'api/_requestor';
import usePersistState from 'utils/service/usePersistState';

import {
  type AuthProviderPropsType,
  type LoginActionParams,
  Provider,
} from './context';

interface Props {
  children: ReactNode;
}

const initialAuth = {
  isLoggedIn: false,
  token: '',
  expiresIn: 0,
  refreshToken: '',
  refreshTokenExpiresIn: 0,
  role: null,
  lang: '',
  serverTime: 0,
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
    if (
      auth.isLoggedIn &&
      auth.token &&
      location.pathname === pathnames.login()
    ) {
      // Redirect users to dashboard home
      navigate(pathnames.home());
    }
    setIsInitialized(true);
  }, [auth.isLoggedIn, auth.token, isLoaded, location.pathname, navigate]);

  const loginAction = useCallback(
    async (payload: LoginActionParams) => {
      // Check response have all data back
      if (payload.token) {
        // Success login
        await setAuth({
          isLoggedIn: true,
          token: payload.token,
          expiresIn: payload.expiresIn,
          refreshToken: payload.refreshToken,
          refreshTokenExpiresIn: payload.refreshTokenExpiresIn,
          role: payload.role,
          lang: payload.lang,
          serverTime: payload.serverTime,
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
    window.gaila.injectedLogout = logoutAction;
  }, [logoutAction]);

  const authValue = useMemo(
    () => ({ ...auth, loginAction, logoutAction, isLoaded, isInitialized }),
    [auth, loginAction, logoutAction, isLoaded, isInitialized],
  );

  return <Provider value={authValue}>{children}</Provider>;
}

export default memo(AuthProvider);
