import React from 'react';

import LoginForm from '../auth/LoginForm';
import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'GAILA' },
    { name: 'GAILA system', content: 'Learning English with AI' },
  ];
}

export default function Home() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
