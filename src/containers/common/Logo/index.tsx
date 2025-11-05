import React from 'react';

import clsx from 'clsx';
import { PenTool } from 'lucide-react';
import { useNavigate } from 'react-router';
import { pathnames } from 'routes';

import Clickable from 'components/input/Clickable';

import useAuth from 'containers/auth/AuthProvider/useAuth';

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  const { role } = useAuth();
  const navigate = useNavigate();

  return (
    <Clickable
      className={clsx(
        className,
        'flex items-center gap-2 flex-shrink-0  w-[250px]',
      )}
      onClick={() => navigate(pathnames.home())}
    >
      <PenTool className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
      <h1 className="text-lg sm:text-2xl font-bold">GAILA</h1>
      <span className="hidden sm:inline text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-full capitalize">
        {role}
      </span>
    </Clickable>
  );
};

export default Logo;
