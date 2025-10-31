import React from 'react';

import clsx from 'clsx';
import { PenTool } from 'lucide-react';

import useAuth from 'containers/auth/AuthProvider/useAuth';

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  const { role } = useAuth();
  return (
    <div
      className={clsx(
        className,
        'flex items-center gap-2 flex-shrink-0  w-[250px]',
      )}
    >
      <PenTool className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
      <h1 className="text-lg sm:text-2xl font-bold">GAILA</h1>
      <span className="hidden sm:inline text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-full capitalize">
        {role}
      </span>
    </div>
  );
};

export default Logo;
