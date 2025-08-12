import React from 'react';

import LoginForm from 'containers/auth/LoginForm';

import type { Route } from './+types/login';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'GAILA' },
    { name: 'GAILA system', content: 'Learning English with AI' },
  ];
}

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
