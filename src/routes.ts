import { type RouteConfig, index, route } from '@react-router/dev/routes';
import { createSearchParams } from 'react-router';

export const pathnames = {
  home: () => '/',
  login: (redirect?: string, clear?: boolean) =>
    `/login?${createSearchParams({
      ...(redirect ? { r: redirect } : {}),
      ...(clear ? { clear: '1' } : {}),
    }).toString()}`,
  analytics: () => '/analytics',
  style: () => '/style',
};

export default [
  index('pages/home.tsx'),
  route(pathnames.login(), 'pages/login.tsx'),
  route(pathnames.analytics(), 'pages/analytics.tsx'),
  route(pathnames.style(), 'pages/style.tsx'),
] satisfies RouteConfig;
