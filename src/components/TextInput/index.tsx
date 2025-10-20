import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';

type Props = { icon?: React.ReactNode } & React.ComponentProps<
  typeof TextField
>;

const TextInput = ({
  className,
  size = 'small',
  variant = 'filled',
  type,
  icon,
  ...props
}: Props) => {
  return (
    <TextField
      className={clsx(['w-full', className])}
      size={size}
      slotProps={{
        input: {
          ...(icon
            ? {
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              }
            : {}),
        },
      }}
      type={type}
      variant={variant}
      {...props}
    />
  );
};

export default TextInput;
