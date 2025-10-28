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
  assignments: () => '/assignments',
  assignmentCreate: () => '/assignments/create',
  assignmentEditDetails: (id: string) => `/assignments/edit/${id}`,
  assignmentEditSubmission: (id: string) => `/assignments/submit/${id}`,
  style: () => '/style',
};

export default [
  index('pages/home.tsx'),
  route(pathnames.login(), 'pages/login.tsx'),
  route(pathnames.analytics(), 'pages/analytics.tsx'),
  route(pathnames.assignments(), 'pages/assignments.tsx'),
  route(pathnames.assignmentCreate(), 'pages/assignments.create.tsx'),
  route(pathnames.assignmentEditDetails(':id'), 'pages/assignments.edit.tsx'),
  route(
    pathnames.assignmentEditSubmission(':id'),
    'pages/assignments.submit.tsx',
  ),
  route(pathnames.style(), 'pages/style.tsx'),
] satisfies RouteConfig;
