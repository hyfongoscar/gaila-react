import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import AuthProviderContext from 'containers/auth/AuthProvider/context';

// import getEcho from 'api/_websocket';
import type { ServerAuthToken } from 'api/auth';

interface Props {
  response: ServerAuthToken | null | undefined;
  redirect?: string;
}

function TokenLoginRedirect({ response, redirect: inputRedirect }: Props) {
  const { loginAction } = useContext(AuthProviderContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // Token is invalid
      if (!response?.token) {
        navigate(pathnames.login(), { replace: true });
        return;
      }

      // Call login API
      await loginAction({
        token: response.token,
        expiresIn: response.expiresIn,
        refreshToken: response.refreshToken,
        refreshTokenExpiresIn: response.refreshTokenExpiresIn,
        serverTime: response.serverTime,
        role: response.role,
        lang: response.lang,
      });

      // Initialize websocket after token is initialized
      // getEcho();

      navigate(pathnames.home(), { replace: true });
    })();
  }, [loginAction, inputRedirect, response, navigate]);

  return <></>;
}

export default TokenLoginRedirect;
