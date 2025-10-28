import React, { memo } from 'react';

import clsx from 'clsx';

type Props = {
  required?: boolean;
} & React.HTMLProps<HTMLLabelElement>;

function Label({ className, required, ...props }: Props) {
  return (
    <label
      className={clsx(
        'flex items-center gap-1 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        required && 'after:text-destructive after:content-["*"]',
        className,
      )}
      data-slot="label"
      {...props}
    />
  );
}

export default memo(Label);
