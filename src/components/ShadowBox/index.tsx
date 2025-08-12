import React from 'react';

import clsx from 'clsx';

type Props = { className?: string; children?: React.ReactNode };

const ShadowBox = ({ className, children }: Props) => {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-lg shadow-xl ring ring-gray-900/5 ',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ShadowBox;
