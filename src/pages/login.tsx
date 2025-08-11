import React from 'react';

import LoginForm from '../container/auth/LoginForm';
import type { Route } from './+types/login';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'GAILA' },
    { name: 'GAILA system', content: 'Learning English with AI' },
  ];
}

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
