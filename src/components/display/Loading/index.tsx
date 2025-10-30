import React from 'react';

import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

type Props = {
  className?: string;
};

const Loading = ({ className }: Props) => {
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loading;
