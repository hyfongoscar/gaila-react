import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';

type Props = { icon?: React.ReactNode } & React.ComponentProps<
  typeof TextField
>;

const TextInput = ({
  className,
  label,
  multiline,
  size = multiline ? 'medium' : 'small',
  variant = 'filled',
  type,
  icon,
  ...props
}: Props) => {
  return (
    <TextField
      className={clsx(['w-full', className])}
      label={label}
      multiline={multiline}
      size={size}
      slotProps={{
        input: {
          disableUnderline: true,
          ...(icon
            ? {
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              }
            : {}),
        },
      }}
      sx={
        label
          ? {}
          : {
              '& .MuiInputBase-root': {
                paddingTop: 1,
              },
              '& .MuiInputBase-input': {
                paddingTop: 0,
              },
            }
      }
      type={type}
      variant={variant}
      {...props}
    />
  );
};

export default TextInput;
