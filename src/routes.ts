import { type RouteConfig, index, route } from '@react-router/dev/routes';
import qs from 'query-string';

export const pathnames = {
  home: () => '/',
  login: (redirect?: string, clear?: boolean) =>
    `/login${
      redirect || clear
        ? `?${qs.stringify({ r: redirect, clear: clear ? 1 : 0 })}`
        : ''
    }`,
  analytics: () => '/analytics',
  style: () => '/style',
};

export default [
  index('pages/home.tsx'),
  route(pathnames.login(), 'pages/login.tsx'),
  route(pathnames.analytics(), 'pages/analytics.tsx'),
  route(pathnames.style(), 'pages/style.tsx'),
] satisfies RouteConfig;
