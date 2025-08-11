import redirectToLoginPage from 'container/auth/AuthProvider/redirectToLoginPage';

import { getLocalItem, setLocalItem } from 'utils/service/localStorage';

import { apiUserRefreshToken } from './auth';

const promise: {
  refresh: Promise<unknown> | null;
} = { refresh: null };

// Set authentication token header to apisauce instance
export const setTokenHeader = async (optional = false, apiPath?: string) => {
  // Already have token, skipping
  // TODO: get from window, better speed
  const auth: any = await getLocalItem('auth');

  if (!auth) {
    await redirectToLoginPage(optional, apiPath);
    return false;
  }

  const { token, refreshToken, serverTime, expiresIn, refreshTokenExpiresIn } =
    auth;

  // No existing token
  if (
    !token ||
    !serverTime ||
    !refreshToken ||
    !expiresIn ||
    !refreshTokenExpiresIn
  ) {
    await redirectToLoginPage(optional, apiPath);
    return false;
  }

  // Check if token has expired
  const timeNow = new Date().getTime();

  // First check refresh token
  if (refreshTokenExpiresIn < timeNow - serverTime) {
    // Expired refresh token
    // Redirect user to login page
    await redirectToLoginPage(optional, apiPath);
    return false;
  }

  // Check if access token expired
  if (expiresIn < timeNow - serverTime) {
    // Refresh token
    let data: any = {};
    try {
      if (!promise.refresh) {
        promise.refresh = apiUserRefreshToken(refreshToken);
      }
      data = await promise.refresh;
    } catch (e) {
      // Failed to get token
      await setLocalItem('auth', {});
      await redirectToLoginPage(optional, apiPath);
      return false;
    }
    promise.refresh = null;

    // Check if new token is sufficient
    if (
      !data?.access_token ||
      !data?.refresh_token ||
      !data?.expires_in ||
      !data?.refresh_token_expires_in ||
      !data?.server_time
    ) {
      await redirectToLoginPage(optional, apiPath);
      return false;
    }

    // Pass new token to store
    await setLocalItem('auth', {
      ...auth,
      token: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      refreshTokenExpiresIn: data.refresh_token_expires_in,
      serverTime: data.server_time,
    });

    return data.access_token;
  }

  return token;
};
