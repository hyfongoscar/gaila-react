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

import usePersistState from 'utils/usePersistState';

// import { clearCache } from 'api/_requestor';
// import routes from 'config/routes';
import {
  type AuthProviderPropsType,
  type LoginActionParams,
  Provider,
} from './context';

interface Props {
  children: ReactNode;
}

const initialAuth = {
  token: '',
  refreshToken: '',
  expiresIn: 0,
  serverTime: 0,
  refreshTokenExpiresIn: 0,
  role: null,
  isLoggedIn: false,
};

function AuthProvider({ children }: Props) {
  const [auth, setAuth, isLoaded] = usePersistState<AuthProviderPropsType>(
    'auth',
    initialAuth,
  );
  const [isInitialized, setIsInitialized] = useState(false);
  //   const history = useHistory();

  const queryClient = useQueryClient();

  // Initialize auth
  const initAuth = useRef(true);
  useEffect(() => {
    if (!isLoaded || !initAuth.current) return;
    initAuth.current = false;
    if (auth.isLoggedIn && auth.token) {
      //   if (
      //     [routes.launch(), routes.login()].indexOf(history.location.pathname) !==
      //     -1
      //   ) {
      //     // Redirect users to dashboard home
      //     history.push(routes.home());
      //   }
      // Do not redirect as the link is already valid
    } else {
      // No user
      // No redirecting here to login page, should be handled by Private route
    }
    // Mark as initialized
    setIsInitialized(true);
  }, [auth.isLoggedIn, auth.token, isLoaded]);

  const loginAction = useCallback(
    async (payload: LoginActionParams) => {
      // Check response have all data back
      if (
        payload.token &&
        payload.refreshToken &&
        payload.expiresIn &&
        payload.serverTime &&
        payload.refreshTokenExpiresIn &&
        payload.role
      ) {
        // Success login
        await setAuth({
          isLoggedIn: true,
          token: payload.token,
          refreshToken: payload.refreshToken,
          expiresIn: payload.expiresIn,
          serverTime: payload.serverTime,
          refreshTokenExpiresIn: payload.refreshTokenExpiresIn,
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
      //   if (redirect) {
      //     history.replace(redirect);
      //   } else {
      //     history.replace(routes.login());
      //   }
      //   await clearCache();
      //   queryClient.removeQueries();
      //   await setAuth(initialAuth);
    },
    [queryClient, setAuth],
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
